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
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
const AlbumImage = styled.img`
    width:100%;
    height:300px;
    object-fit:fit-content;
    opacity:0.6;
`
const InformationContainer = styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    position:absolute;

`
const Title = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:${fontSize.large};
    color:${palette.black};
    font-weight:${fontweight["bold"]};
`
const Text = styled.div`
    margin-top:20px;
    display:block;
    -webkit-line-clamp:3;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:${fontSize.medium};
    color:${palette.black};
    font-weight:${fontweight["light"]};
`

const Singer = ({singer="",song="",image=""}:{singer:string, song:string,image:string})=>{
    return(
        <Container>
            <AlbumImage src={image}></AlbumImage>
            <InformationContainer>
                <Title>{singer}</Title>
                <Text>{song}</Text>
            </InformationContainer>
        </Container>
    )
}
export default Singer