/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Brush from "components/Brush";
import Xylophone from "components/Xylophone";
import React from "react";
import { BlackBox } from "styles/box";

const Start = () => {
  const testAry = [
    "#ff0000",
    "#ff8c00",
    "#ffff00",
    "#008000",
    "#0000ff",
    "#4b0082",
    "#800080",
    "#800080",
    "#800080",
    "#800080",
  ];

  return (
    <Wrapper>
      <Description>
        <p>당신의 시각적 차별력은 얼마나 뛰어나신가요?</p>
        <p>레벨을 측정하고 공유해 보세요!</p>
      </Description>

      <BrushArea>
        <Brush color="#464BD8" size="200px"></Brush>
      </BrushArea>
      <XylophoneWrapper>
        <Xylophone colorAry={testAry} />
      </XylophoneWrapper>
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
  justify-content: center;
`;

const Description = styled(BlackBox)`
  margin-top: 2rem;
  width: 100%;
  min-width: 350px;
  p {
    text-align: center;
  }
`;

const BrushArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const XylophoneWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Start;
