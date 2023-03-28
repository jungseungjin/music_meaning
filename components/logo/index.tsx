import React from "react";
import styled from "styled-components";
import Link from "next/link";
import palette from "../../styles/palette";
import LogoSVG from "../../image/svg/MM.svg"

const Container = styled.div`
    display:flex;
    width:100%;
    height:50px;
`
const LogoContainer = styled.div`
    display:flex;
    align-items:center;
    width:70px;
    height:100%;
    margin-left:16px;
`

const Logo = () => {
    return(
        <Container>
            <Link href="/">
                <LogoContainer>
                    <LogoSVG/>                    
                </LogoContainer>
            </Link>
        </Container>
    )
}

export default React.memo(Logo)