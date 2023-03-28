import React from "react"
import Head from 'next/head'
import { NextPage } from "next";
import styled from "styled-components"

import { searchState } from "@/recoil";
import Search from "../../components/input/index"
import Item from "../../components/item/index"
import { useRecoilState } from "recoil";
import useLoading from "@/hooks/useLoading";
import {Oval} from "react-loader-spinner"

const Container = styled.div`
    display:flex;
    flex-direction:column;
`
 const Index :NextPage = ()=> {

  const { loadingStart, loadingEnd, LoadingPortal } = useLoading();
  const [search,setSearchState] = useRecoilState(searchState)
  return (
    <>
      <Head>
        <title>MusicMeaning</title>
        <meta name="description" content="Music Meaning" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Search page=""></Search>
        <Item title={search.search_mode === false ? "" : search.search_mode === true && search.search_result.length === 0 ? "검색결과가 없습니다." : "검색결과"} items={search.search_result}></Item>
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
