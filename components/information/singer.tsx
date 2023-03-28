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
    align-items:center;
`
const Title = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:${fontSize.medium};
    color:${palette.black};
    font-weight:${fontweight["bold"]};

`
const Text = styled.div`
    margin-top:20px;
    display:block;
    -webkit-line-clamp:3;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:${fontSize.small};
    color:${palette.black};
    font-weight:${fontweight["light"]};
`

const Singer = ({singer="",song=""}:{singer:string, song:string})=>{
    return(
        <Container>
            <Title>{singer}</Title>
            <Text>{song}</Text>
        </Container>
    )
}
export default Singer