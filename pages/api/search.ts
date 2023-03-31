// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import Song from "../../lib/model/song.model";
// import clientPromise from "../../lib/db/mongodb";
import dbConnect from "../../lib/db/dbConnect"

interface song {
  singer:string;
  song:string;
  key:string;
  image:string;
  count:number;
  lyrics:Array<string>;
  meaning:string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET"){
    try{
      await dbConnect()
      console.log(req.query.search)
      console.log(process.env.RAPID_API_X_RapidAPI_Key)
      console.log(process.env.RAPID_API_X_RapidAPI_Host)
      //검색어로 api검색을 하고
      const result = await axios.get(`${process.env.RAPID_API_SPOTIFY_URI}/search/`,{
        params: {
          q: req.query.search,
          type: "multi",
          offset: 0,
          limit: 20,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_X_RapidAPI_Key,
          "X-RapidAPI-Host": process.env.RAPID_API_X_RapidAPI_Host
        }
      })
      
      //나온 결과들을 db에 저장
      let songs:Array<song> = []
      result.data.tracks.items.map(async(item:any)=>{
        try{
          const element = {
            singer:item.data.artists.items[0].profile.name,
            song:item.data.name,
            key:item.data.id,
            image:item.data.albumOfTrack.coverArt.sources[0].url,
            count:0,
            lyrics:[],
            meaning:""
          }
          songs.push(element)
          const data = new Song(element)
          await data.save()
        }catch(err){
          console.log(err)
        }
      })
      return res.json({songs})
    }catch(err){
      console.log(err)
      return res.json({songs : []})
    }
  }
}
