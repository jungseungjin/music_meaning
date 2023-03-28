import React from "react"
import {NextPage} from "next"
import Link from "next/link";
import styled from "styled-components"
import fontSize from "@/styles/fontsize"
import palette from "@/styles/palette";
import fontweight from "@/styles/fontweight";

const Container = styled.div`
    display:flex;
    width:100%;
    padding:20px;
    flex-direction:column;
`
const Title = styled.div`
display:flex;
padding-left:16px;
align-items:center;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
font-size:${fontSize.medium};
color:${palette.black};
font-weight:${fontweight["bold"]};

`
const Information = styled.div`
margin-top:20px;
padding-left:16px;
padding-right:16px;
display:block;
/* -webkit-line-clamp:3;
overflow: hidden;
text-overflow: ellipsis; */
font-size:${fontSize.small};
color:${palette.black};
font-weight:${fontweight["light"]};

`
const Text = ({title="",information=[]} : {title:string, information:any}) =>{
    return(
        <Container>
            <Title>{title}</Title>
            {title === "가사" && (<>
                <Information>
                    {information.map((item:any)=>{
                        return(
                            <p>{item}</p>
                        )
                    })}
                </Information>
            </>)}
            {title === "의미" && (<Information>{information}</Information>)}
        </Container>
    )
}

export default Text;