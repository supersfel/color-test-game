/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { gameStateType } from "types/game";
import Start from "./Start";
import styled from "@emotion/styled";
import Progress from "./Progress";

const Index = () => {
  const [gameState, setGameState] = useState<gameStateType>("start");

  const gameStart = () => {
    setGameState("progress");
  };

  return (
    <Wrapper>
      <Title>색감 테스트</Title>
      {gameState === "start" ? <Start gameStart={gameStart} /> : null}
      {gameState === "progress" ? <Progress /> : null}
    </Wrapper>
  );
};

/* STYLE */
const Wrapper = styled.div`
  margin-top: 3rem;
`;

const Title = styled.p`
  font-size: 3rem;
  text-align: center;
`;

export default Index;
