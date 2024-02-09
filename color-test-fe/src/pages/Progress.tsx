/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Brush from "components/Brush";
import Xylophone from "components/Xylophone";
import React, { useEffect, useState } from "react";
import { BlackBox } from "styles/box";

const Progress = () => {
  const isMobile = /Mobi/i.test(window.navigator.userAgent);
  const [level, setLevel] = useState(1);
  const testAry = [
    "#800080",
    "#4b0082",
    "#0000ff",
    "#464BD8",
    "#104331",
    "#008000",
    "#ffff00",
    "#ff8c00",
    "#f135bc",
    "#ff0000",
  ];

  const [doCheckAnswer, setDoCheckAnswer] = useState(false);

  useEffect(() => {
    setDoCheckAnswer(false);
  }, [doCheckAnswer]);

  const hadleCheckBtn = () => {
    setDoCheckAnswer(true);
  };

  return (
    <Wrapper isMobile={isMobile}>
      <BrushArea>
        <Brush color={"#333333"} size="200px"></Brush>
      </BrushArea>
      <XylophoneWrapper>
        <Xylophone
          colorAry={testAry}
          doChekcAnswer={doCheckAnswer}
          answer="#464BD8"
          level={1}
        />
      </XylophoneWrapper>
      <CheckBtn onClick={hadleCheckBtn}>선택하기</CheckBtn>
    </Wrapper>
  );
};

/* STYLE */

const Wrapper = styled.p<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? "90%" : "60%")};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BrushArea = styled.div`
  margin: 2rem 0;
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

const CheckBtn = styled(BlackBox)`
  margin: 3rem 0;
  font-size: 2rem;
  cursor: pointer;
`;

export default Progress;
