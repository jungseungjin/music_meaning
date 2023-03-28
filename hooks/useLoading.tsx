import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {loadingState} from "../recoil/index"
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  .modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const useLoading = () => {
  const [loading, setLoading] = useRecoilState(loadingState)
  // const [loading, setLoading] = useState(false);

  const loadingStart = () => {
    setLoading(true);
  };

  const loadingEnd = () => {
    setLoading(false);
  };

  interface IProps {
    children: React.ReactNode;
  }

  const LoadingPortal: React.FC<IProps> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.querySelector("#root-modal");
        ref.current = dom;
      }
    }, []);

    if (ref.current && mounted && loading) {
      return createPortal(
        <Container>
          <div
            className="modal-background"
            role="presentation"
            // onClick={loadingEnd}
          />
          {children}
        </Container>,
        ref.current
      );
    }
    return null
  };

  return {
    loadingStart,
    loadingEnd,
    LoadingPortal,
  };
};

export default useLoading;
