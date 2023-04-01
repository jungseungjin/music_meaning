// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import Song from "../../lib/model/song.model";
// import clientPromise from "../../lib/db/mongodb";
import dbConnect from "../../lib/db/dbConnect"
import requestIp from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "POST"){
    try{
      await dbConnect()
      let userIp = requestIp.getClientIp(req);
      userIp = userIp.replace(/\./g,"");
      userIp = userIp.replace("::ffff:","");
      userIp = userIp.replace(/\:/g,"");
      const result = await Song.findOneAndUpdate({key:req.body.id},{$set:{[`vote.${userIp}`] : req.body.type}})
      return res.json({success:true})
    }catch(err){
      return res.json([])
    }
  }
}
