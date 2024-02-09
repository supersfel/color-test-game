/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Brush from "components/Brush";
import React, { useEffect, useState } from "react";
import { BlackBox } from "styles/box";
import { uiColor } from "styles/color";

interface Props {
  level: number;
  gameStart: () => void;
}

const GameOver = ({ level, gameStart }: Props) => {
  const mentAry = [
    "화가이신가요?! 말도 안되게 잘하시네요!",
    "수준급 시각적 차별력을 지니셨네요!!",
    "평범한 시각적 차별력을 지니셨네요!!",
    "안좋은 시각적 차별력을 지니셨네요!!",
  ];

  const medalColor = [
    uiColor.dia,
    uiColor.gold,
    uiColor.silver,
    uiColor.bronze,
  ];

  const percentAry = [3, 30, 50, 80];

  const [mentIdx, setMentIdx] = useState(-1);
  useEffect(() => {
    const nxIdx = level > 19 ? 0 : level > 14 ? 1 : level > 8 ? 2 : 3;
    setMentIdx(nxIdx);
  }, [level]);

  const isMobile = /Mobi/i.test(window.navigator.userAgent);
  return (
    <Wrapper isMobile={isMobile}>
      <Result>
        <p>결과..</p>
        LV {level}
      </Result>
      <Ment>
        <p>{mentAry[mentIdx]}</p>
        <p>상위 {percentAry[mentIdx]}%입니다!!</p>
      </Ment>
      <BrushArea>
        <Brush color={medalColor[mentIdx]} size="200px"></Brush>
      </BrushArea>
      <ButtonArea>
        <PlayAgainBtn onClick={gameStart}>다시하기</PlayAgainBtn>
        <ShareBtn>공유하기</ShareBtn>
      </ButtonArea>
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

const Result = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;

  font-size: 3rem;
  p {
    text-align: center;
    font-size: 1.5rem;
  }
`;

const Ment = styled(BlackBox)`
  margin-top: 2rem;
  width: 100%;
`;

const BrushArea = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const PlayAgainBtn = styled(BlackBox)`
  font-size: 1.8rem;
  cursor: pointer;
`;

const ShareBtn = styled(BlackBox)`
  font-size: 1.8rem;
  cursor: pointer;
`;

export default GameOver;
