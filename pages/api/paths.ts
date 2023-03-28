// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"
import Song from "../../lib/model/song.model";
// import clientPromise from "../../lib/db/mongodb";
import dbConnect from "../../lib/db/dbConnect"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === "GET"){
    try{
      await dbConnect()
      const result = await Song.find({meaning:""})
      return res.json(result)
    }catch(err){
      return res.json([])
    }
  }
}
