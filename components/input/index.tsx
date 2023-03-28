import React,{useEffect} from "react"
import {NextPage} from "next"
import Link from "next/link";
import styled from "styled-components"
import fontSize from "@/styles/fontsize"
import palette from "@/styles/palette";
import axios from "axios"

import { useRecoilState } from "recoil";
import { searchState } from "../../recoil/index";
import Button_x from "../../image/svg/button_x.svg"

import useLoading from "@/hooks/useLoading";
const Input = ({page=""}:{page:string}) => {

    const { loadingStart, loadingEnd, LoadingPortal } = useLoading();
    const [search, setSearchState] = useRecoilState(searchState);
    const changeSearch = (e:any) => {
        setSearchState({...search,search:e.target.value});
    };
    const onSubmitSearch = async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        loadingStart();
        const result = await axios.get("/api/search",{
            params:{
                search:search.search
            }
        })
        loadingEnd()
        if(result.data){
            setSearchState({...search,search_result:result.data.songs || [],search_mode:true});
        }
    }
    useEffect(()=>{
        // setSearchState({...search,search_mode:false});
        return()=>{
            // setSearchState({
            //     search:"",
            //     search_result:[],
            //     search_mode:false
            // })
        }
    },[])
    return(
        <Container>
            {page === "home" && (
            <>
                <Link href="/search">
                    <div>
                        <Input1>검색하기</Input1>
                    </div>
                </Link>
            </>)}
            {page !== "home" && (
            <>
                <Input2_box onSubmit={onSubmitSearch}>
                    <Input2_container>
                        <Input2 autoComplete="off" name="search" type="search" placeholder="검색하기" value={search?.search} onChange={changeSearch}></Input2>
                        {search?.search?.length > 0 && (
                            <Button_x_container onClick={()=>{setSearchState({...search,search:""})}}>
                                <Button_x></Button_x>
                            </Button_x_container>
                        )}
                    </Input2_container>
                    <Link href="/">
                        <Close>
                            닫기
                        </Close>
                    </Link>
                </Input2_box>
            </>)}
        </Container>
    )
}

const Container = styled.div`
    width:100%;
    height:90px;
    background-color:#D1D1D1;
    margin :0 auto;
`
const Input1 = styled.div`
    padding-left:16px;
    margin :20px auto;
    width:calc(100% - 32px);
    height:50px;
    line-height:50px;
    border-radius:10px;
    background-color:${palette.gray_d9};
    font-size:${fontSize.large};
    color:${palette.gray_807D7D};
`
const Input2_box = styled.form`
    display:flex;
`
const Input2_container = styled.div`
    display:flex;
    padding-left:16px;
    margin :20px auto 20px 16px;
    width:calc(100% - 80px);
    height:50px;
    line-height:50px;
    border-radius:10px;
    background-color:${palette.gray_d9};
    font-size:${fontSize.large};
    color:${palette.gray_807D7D};
`
const Input2 = styled.input`
    width:calc(100% - 80px);
    height:50px;
    border:none;
    border-radius:10px;
    background-color:${palette.gray_d9};
    font-size:${fontSize.large};
    color:${palette.gray_807D7D};
`
const Button_x_container = styled.div`
    cursor:pointer;
    display:flex;
    align-items:center;
    margin:0 16px 0 auto;
`
const Close = styled.div`
    display:flex;
    height:90px;
    align-items:center;
    margin-right:16px;
    font-size:${fontSize.medium};
    color:${palette.black};
`
export default Input