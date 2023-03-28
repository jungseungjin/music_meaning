import React from "react"
import {NextPage} from "next"
import Link from "next/link";
import styled from "styled-components"
import fontSize from "@/styles/fontsize"
import palette from "@/styles/palette";
import fontweight from "@/styles/fontweight";
import Arrow_left from "../../image/svg/arrow_left.svg"
import { useRouter } from 'next/router';
const Container = styled.div`
    display:flex;
    width:100%;
    height:40px;
`
const Svg_container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    padding-left:16px;
    width:40px;
    height:40px;
    cursor:pointer;
`

const Navigation_back = () => {
    const router = useRouter()
    return(
        <Container>
            <Svg_container onClick={()=>{router.back()}}>
                <Arrow_left></Arrow_left>
            </Svg_container>
        </Container>
    )
}
export default Navigation_back