import React from "react"
import {NextPage} from "next"
import { useRouter } from "next/router"
import styled from "styled-components"
import fontSize from "@/styles/fontsize"
import palette from "@/styles/palette";
import fontweight from "@/styles/fontweight";
import useLoading from "@/hooks/useLoading";
interface Item {
    _id:string;
    singer : string;
    song:string;
    count:number;
    image:string;
    lyrics:Array<string>;
    meaning:string;
}

const Item = ({title = "",items = []}:{title:string,items:any}) => {
    const router = useRouter()
    const { loadingStart, loadingEnd, LoadingPortal } = useLoading();
    const onClick = (item:any) => {
        loadingStart()
        router.push(`/result/${item.key}`)
    }
    return(
        <>
            <Container>
                <Title>{title}</Title>
                <Item_container>
                    {items.map(({item,index} : {item:any, index:number})=>{
                        return(
                            <Item_element key={`${item?._id}_${index}`}>
                                <div onClick={()=>{onClick(item)}}>
                                    <Item_element_img_div>
                                        <Item_element_img src={item?.image}/>
                                    </Item_element_img_div>
                                    <Text_container>
                                        <Singer>{item?.singer}</Singer>
                                        <Song>{item?.song}</Song>
                                    </Text_container>
                                </div>
                            </Item_element>
                        )
                    })}
                </Item_container>
            </Container>
        </>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
`
const Title = styled.div`
    margin-top:20px;
    display:flex;
    height:40px;
    line-height:40px;
    font-size:${fontSize.large};
    color:${palette.black};
    font-weight:${fontweight["extra-bold"]};
    padding-left:16px;
`
const Item_container = styled.div`
    display:flex;
    padding:20px;
    overflow-x:scroll;
    overflow-y:hidden;
    ::-webkit-scrollbar {
        /* display: none; */
    }
`
const Item_element = styled.div`
    cursor:pointer;
    display:flex;
    flex-direction:column;
    width:calc(37% - 10px);
    min-width:100px;
    max-width:120px;
    margin-right:20px;
`
const Item_element_img_div = styled.div`
    position:relative;
    ::after{
        display: block;
        content: "";
        padding-bottom: 100%;
    }
`
const Item_element_img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius:10px;
`
const Text_container = styled.div`
    height:50px;
    display:flex;
    flex-direction:column;
`
const Singer = styled.div`
    height:25px; 
    width: 100%;
    line-height:25px;
    justify-content:center;
    align-items:center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${fontSize.small};
    color:${palette.black};
    font-weight:${fontweight["bold"]};
`
const Song = styled.div`
    height:25px; 
    width: 100%;
    line-height:25px;
    display:block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:${fontSize.small};
    color:${palette.black};
    font-weight:${fontweight["light"]};
`
export default Item