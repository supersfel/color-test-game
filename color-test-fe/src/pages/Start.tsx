/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import Brush from "components/Brush";
import Xylophone from "components/Xylophone";
import { useEffect, useState } from "react";
import { BlackBox } from "styles/box";
import { uiColor } from "styles/color";

interface Props {
  gameStart: () => void;
}

const Start = ({ gameStart }: Props) => {
  const isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일
  const startAry = [
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
    if (doCheckAnswer) gameStart();
    setDoCheckAnswer(false);
  }, [doCheckAnswer, gameStart]);

  const handleStartBtn = () => {
    setDoCheckAnswer(true);
  };

  return (
    <Wrapper isMobile={isMobile}>
      <Description>
        <p>당신의 시각적 차별력은 얼마나 뛰어나신가요?</p>
        <p>레벨을 측정하고 공유해 보세요!</p>
      </Description>

      <BrushArea>
        <Brush color={uiColor.startBrush} size="200px"></Brush>
      </BrushArea>

      <Tutorial>
        <p>아래 10개의 색 중에서 물감과</p>
        <p>똑같은 색을 클릭해 주세요!</p>
      </Tutorial>
      <XylophoneWrapper>
        <Xylophone
          colorAry={startAry}
          doChekcAnswer={doCheckAnswer}
          answer="#464BD8"
          level={0}
        />
      </XylophoneWrapper>

      <StartBtn onClick={handleStartBtn}>시작하기</StartBtn>
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

const Description = styled(BlackBox)`
  margin-top: 2rem;
  width: 100%;
  p {
    text-align: center;
  }
`;

const BrushArea = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tutorial = styled.div`
  p {
    text-align: center;
  }
`;

const XylophoneWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartBtn = styled(BlackBox)`
  margin: 3rem 0;
  font-size: 2rem;
  cursor: pointer;
`;
export default Start;
