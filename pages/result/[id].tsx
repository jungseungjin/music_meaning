import React,{useEffect, useState} from "react"
import Head from "next/head"
import { NextPage,GetServerSidePropsContext } from "next";
import styled from "styled-components"
import axios from "axios"
import Navigation_back from "../../components/navigation/index"
import Singer from "../../components/information/singer"
import Text from "../../components/information/text"
import useLoading from "@/hooks/useLoading";
import {Oval} from "react-loader-spinner";
import fontsize from "@/styles/fontsize";
import palette from "@/styles/palette";
const Container = styled.div`
    display:flex;
    flex-direction:column;
`
const VoteContainer = styled.div`
  display:flex;
  padding:20px;
  width:100%;
  justify-content:space-between;
`
interface StyledVoteProps {
  vote : string;
}

const Vote = styled.div<StyledVoteProps>`
  display:flex;
  width:49%;
  justify-content:center;
  align-items:center;
  border: ${(props) => props.vote === "upvote" ? `1px solid ${palette.blue}` : "1px solid black"};
  color:${(props) => props.vote === "upvote" ? `${palette.blue}` : "black"};
  box-shadow: ${(props) => props.vote === "upvote" ? `1px 1px 1px 1px ${palette.blue}` : "1px 1px 1px 1px gray"};
  border-radius:10px;
  height:50px;
  font-size:${fontsize.small};
  cursor:pointer;
`
const Vote2 = styled.div<StyledVoteProps>`
  display:flex;
  width:49%;
  justify-content:center;
  align-items:center;
  border: ${(props) => props.vote === "downvote" ? `1px solid ${palette.red}` : "1px solid black"};
  color:${(props) => props.vote === "downvote" ? `${palette.red}` : "black"};
  box-shadow: ${(props) => props.vote === "downvote" ? `1px 1px 1px 1px ${palette.red}` : "1px 1px 1px 1px gray"};
  border-radius:10px;
  height:50px;
  font-size:${fontsize.small};
  cursor:pointer;
`
interface Props {
    item:{
      _id: string;
      singer: string;
      song: string;
      key: string;
      image: string;
      count: number;
      lyrics: Array<string>;
      meaning: string;
      vote:object;
      __v: 0
    },
    message:string,
    vote:string,
    userIp:string
  }
 const Index = ({item,message,vote,userIp}:Props)=> {
  
  const { loadingStart, loadingEnd, LoadingPortal } = useLoading();
  const [voteValue, setVoteValue] = useState(vote)
  useEffect(()=>{
    loadingEnd()
  },[])
  const onClick = async(id:string,type:string) =>{
    try{
      const result = await axios({
        method:"POST",
        url:`${process.env.NEXT_PUBLIC_LOCALHOST}/api/vote`,
        data:{
          id:id,
          type:type
        }
      })
      if(result.data.success === true){
        setVoteValue(type)
      }else{
        alert("잠시 후에 다시 시도해주세요.")
      }
    }catch(err){
      console.log(err)
      alert("잠시 후에 다시 시도해주세요.")
    }
  }
  return (
    <>
      <Head>
        <title>{item?.singer} - {item?.song} - {userIp}</title>
        <meta name="description" content={item?.lyrics?.join("")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Navigation_back></Navigation_back>
        {message && (
          <>
            <Singer  singer={item?.singer} song={item?.song} image={item?.image}></Singer>
            <Text title={message} information={""}></Text>
          </>
        )}
        {!message && (
          <>      
            <Singer singer={item?.singer} song={item?.song} image={item?.image}></Singer>
            <Text title={"가사"} information={item?.lyrics}></Text>
            <Text title={"의미"} information={item?.meaning}></Text>
          </>
        )}
        <VoteContainer>
          <Vote vote={voteValue} onClick={()=>{voteValue === "upvote" ? "" : onClick(item?.key,"upvote")}}>의미에 공감해요😌</Vote>
          <Vote2 vote={voteValue} onClick={()=>{voteValue === "downvote" ? "" : onClick(item?.key,"downvote")}}>의미가 이상해요😅</Vote2>
        </VoteContainer>
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
  let userIp:any = context.req.socket.remoteAddress || null;
  userIp = userIp.replace(/\./g,"");
  userIp = userIp.replace("::ffff:","");
  userIp = userIp.replace(/\:/g,"");
  console.log(userIp)
  const API_URL:string=process.env.LOCALHOST || ""
  const res = await axios({
    method:"GET",
    url:`${API_URL}/api/result/${id}`
  })
  const data = res.data.result;
  const message = res.data.message || null;
  const vote = res.data.result.vote[userIp] || "";
  
  return {
      props:{
          item:data,
          message,
          vote,userIp
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