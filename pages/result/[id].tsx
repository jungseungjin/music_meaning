import React,{useEffect} from "react"
import Head from "next/head"
import { NextPage,GetServerSidePropsContext } from "next";
import styled from "styled-components"
import axios from "axios"
import Navigation_back from "../../components/navigation/index"
import Singer from "../../components/information/singer"
import Text from "../../components/information/text"
import useLoading from "@/hooks/useLoading";
import {Oval} from "react-loader-spinner"
const Container = styled.div`
    display:flex;
    flex-direction:column;
`

interface Props {
    item:{
      _id: string;
      singer: string;
      song: string;
      key: number;
      image: string;
      count: number;
      lyrics: Array<string>;
      meaning: string;
      __v: 0
    },
    message:string
  }
 const Index = ({item,message}:Props)=> {
  
  const { loadingStart, loadingEnd, LoadingPortal } = useLoading();
  useEffect(()=>{
    loadingEnd()
  },[])
  return (
    <>
      <Head>
        <title>{item?.singer} - {item?.song}</title>
        <meta name="description" content={item?.lyrics.join(" ")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Navigation_back></Navigation_back>
        {message && (
          <>
            <Singer singer={item?.singer} song={item?.song}></Singer>
            <Text title={message} information={""}></Text>
          </>
        )}
        {!message && (
          <>      
            <Singer singer={item?.singer} song={item?.song}></Singer>
            <Text title={"가사"} information={item?.lyrics}></Text>
            <Text title={"의미"} information={item?.meaning}></Text>
          </>
        )}
      </Container>
      <LoadingPortal>
          <Oval
            color="#3d66ba"
            height={80}
            width={80}
          />
      </LoadingPortal>
    </>
  )
}
export default Index
export async function getServerSideProps(context:GetServerSidePropsContext){ 
  const id = context.params?.id;
  if(!id){
      return { notFound: true };
  }
  const API_URL:string=process.env.LOCALHOST || ""
  const res = await axios.get(`${API_URL}/api/result/${id}`);
  const data = res.data.result;
  const message = res.data.message || null
  return {
      props:{
          item:data,
          message
      }
  }
}


// //빌드할때 만들것
// export async function getStaticPaths(){
//     const API_URL:string=process.env.LOCALHOST || ""
//     const res = await axios.get(`${API_URL}/api/paths`)
//     const data = res.data;
//     return {
//         paths : data.map((item:any)=>(
//             {params:{id:item.key.toString()}}
//         )),
//         // paths:[
//         //     {params:{id:"740"}},
//         //     {params:{id:"729"}},
//         //     {params:{id:"730"}},
//         // ],
//         fallback:true
//     }
// }

// //
// export async function getStaticProps(context:GetServerSidePropsContext){ 
//     const id = context.params?.id;
//     if(!id){
//         return { notFound: true };
//     }
//     const API_URL:string=process.env.LOCALHOST || ""
//     const res = await axios.get(`${API_URL}/api/result/${id}`);
//     const data = res.data.result;
//     const message = res.data.message || null
//     return {
//         props:{
//             item:data,
//             message
//         }
//     }
// }