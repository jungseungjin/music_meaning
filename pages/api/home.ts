// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Song from "../../lib/model/song.model";
import dbConnect from "../../lib/db/dbConnect"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try{
    if(req.method === "GET"){
      await dbConnect()
      const [result1, result2] = await Promise.all([
        //사람들이 많이 조회해본 가사, 의미가 등록된 노래
        Song.find({meaning:{$ne:""}}).sort({count:-1}).limit(10),
        //최근에 가사, 의미가 등록된 노래
        Song.find({meaning:{$ne:""}}).sort({_id:-1}).limit(10)
      ])
      console.log(result1.length, result2.length)
      return res.json({result1,result2})
    }
  }catch(err){
    console.log(err)
    return res.json({result1:[], result2:[]})
  }
}
