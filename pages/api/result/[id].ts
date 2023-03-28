// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import Song from "../../../lib/model/song.model";
import dbConnect from "../../../lib/db/dbConnect"
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_KEY,
});
interface Result{
  _id:string;
  singer : string;
  song:string;
  count:number;
  image:string;
  lyrics:Array<string>;
  meaning:string;
}
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();
const request_meaning = async(result:any,lyrics:Array<string>) => {
  try{
    //가사의미 묻기
    const meaning = await axios(
      {
        url:`https://api.openai.com/v1/chat/completions`,
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_KEY}`
        },
        data:{
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": `I'll give you the lyrics to singer called ${result.singer} and song titled ${result.song}. Tell me the meaning of these lyrics in Korean so that an ordinary person in their 30s living in Korea can easily understand. And reply in Korean.  ${lyrics.join(' ')}`}]
        }
      })
    //응답값 저장
    if(meaning?.data?.choices[0]?.message?.content){
        result = await Song.findOneAndUpdate({_id:result._id},{$set:{meaning:meaning.data.choices[0].message.content}},{new:true})
    }
    return new Promise((resolve, reject) => {
      resolve(result)
    })
  }catch(err){
    console.log(err)
  }
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    if(req.method === "GET"){
      await dbConnect()
      let result = await Song.findOneAndUpdate({key:Number(req.query.id)},{$inc:{count:1}},{new:true})
    
      if(result){
        //가사, 의미가 있으면 그대로 보내기
        if(result.lyrics.length > 0 && result.meaning !== ""){
          return res.json({result})
        }
        //가사가 조회되지 않는 노래면 그대로 보내기
        if(result.lyrics.length === 1){
          return res.json({result})
        }

        //가사만 있으면 의미 조회하기
        if(result.lyrics.length > 0 && result.meaning === ""){
          result = await request_meaning(result,result.lyrics)
          return res.json({result})
        }

        //가사, 의미가 없으면 조회하고 만들어내기
        if(result.lyrics.length === 0){
            const search = await axios.get(`${process.env.SHAZAM_URI}/songs/get-details`,{ 
                params: {key: req.query.id},
                headers: {
                    'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.X_RapidAPI_Host
                }
            })
            if(search.data){
                let lyrics:Array<string> = []
                if(search.data.sections.length > 0){
                    search.data.sections.map(async(item:any)=>{
                        if(item.type === "LYRICS"){
                            //가사
                            lyrics = item.text
                            result = await Song.findOneAndUpdate({_id:result._id},{$set:{lyrics:lyrics}},{new:true})
                        }
                    })
                }
                if(lyrics.length > 0){
                  result = await request_meaning(result,lyrics)
                  return res.json({result})
                }else{
                    await Song.findOneAndUpdate({_id:result._id},{$set:{lyrics:["가사를 찾을 수 없습니다."]}})
                    console.log("가사를 찾을 수 없습니다.")
                    return res.json({result,message:"가사를 찾을 수 없습니다."})
                }
            }
        }
      }else{
        console.log("????")
        return res.json({message:"노래를 찾을 수 없습니다."})
      }
    }
  }catch(err){
    return res.json({})
  }
}
