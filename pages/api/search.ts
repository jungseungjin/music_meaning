// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import Song from "../../lib/model/song.model";
// import clientPromise from "../../lib/db/mongodb";
import dbConnect from "../../lib/db/dbConnect"

interface song {
  singer:string;
  song:string;
  key:number;
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
      //검색어로 api검색을 하고
      const result = await axios.get(`${process.env.SHAZAM_URI}/search`,{
        params: {term: req.query.search, offset: '0', limit: '5'},
        headers: {
          'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
          'X-RapidAPI-Host': process.env.X_RapidAPI_Host
        }
      })
      //나온 결과들을 db에 저장
      let songs:Array<song> = []
      result.data.tracks.hits.map(async(item:any)=>{
        try{
          const element = {
            singer:item.track.subtitle,
            song:item.track.title,
            key:item.track.key,
            image:item.track.share.image,
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
      return res.json({songs : []})
    }
  }
}
