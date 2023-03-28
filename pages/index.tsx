import React, { useEffect } from "react"
import Head from "next/head"
import { NextPage,GetServerSidePropsContext } from "next";
import Home from "../components/home"
import axios from "axios"
import { useRecoilState } from "recoil";
import {itemState } from "../recoil/index" 

interface Item {
  _id:string;
  singer : string;
  song:string;
  count:number;
  image:string;
  lyrics:Array<string>;
  meaning:string;
}
interface IProps{
  result1 : Array<Item>;
  result2 : Array<Item>;
}

 const Index = ({result1, result2}:IProps)=> {
  const [items, setItems] = useRecoilState(itemState)
  
  useEffect(()=>{
    setItems({
      recently:result2,
      popular:result1,
    })
  },[result1, result2])
  return (
    <>
      <Head>
        <title>MusicMeaning</title>
        <meta name="description" content="Music Meaning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </>
  )
}
export default Index

export async function getServerSideProps(context:GetServerSidePropsContext){ 
  const apiUrl = `${process.env.LOCALHOST}/api/home`;
  const res = await axios.get(apiUrl);
  const {result1, result2} = res.data;
  return {
      props:{
          result1,
          result2
      }
  }
}
