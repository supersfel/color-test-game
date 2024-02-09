/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React from "react";
import { BlackBox } from "styles/box";

const Start = () => {
  return (
    <Wrapper>
      <Description>
        <p>당신의 시각적 차별력은 얼마나 뛰어나신가요?</p>
        <p>레벨을 측정하고 공유해 보세요!</p>
      </Description>
    </Wrapper>
  );
};

/* STYLE */
const Wrapper = styled.p`
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled(BlackBox)`
  margin-top: 2rem;
  width: 100%;
  min-width: 350px;
  p {
    text-align: center;
  }
`;

export default Start;
