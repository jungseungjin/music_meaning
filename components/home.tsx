import React from "react"
import { NextPage } from "next";
import styled from "styled-components"

import Logo from "../components/logo/index"
import Search from "../components/input/index"
import Item from "../components/item/index"
import Singer from "../components/information/singer"
import Information from "../components/information/text"
import { useRecoilState } from "recoil";
import {itemState } from "../recoil/index" 
import useLoading from "@/hooks/useLoading";
import {Oval} from "react-loader-spinner"

const Container = styled.div`
    display:flex;
    flex-direction:column;
`
const Home:NextPage = ()=>{
    const { loadingStart, loadingEnd, LoadingPortal } = useLoading();
    const [items, setItems] = useRecoilState(itemState)
    return(
        <>
            <Container>
                <Logo></Logo>
                <Search page="home"></Search>
                <Item title="사람들이 많이 찾아본 노래" items={items.popular}></Item>
                <Item title="최신 등록된 노래" items={items.recently}></Item>
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
export default Home
