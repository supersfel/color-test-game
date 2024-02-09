/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { gameStateType } from "types/game";
import Start from "./Start";
import styled from "@emotion/styled";
import Progress from "./Progress";
import GameOver from "./GameOver";

const Index = () => {
  const [gameState, setGameState] = useState<gameStateType>("start");
  const [level, setLevel] = useState(0);

  const gameStart = () => {
    setGameState("progress");
    setLevel(1);
  };

  const gameEnd = () => {
    setGameState("end");
  };

  const levelUp = () => {
    setLevel(level + 1);
  };

  return (
    <Wrapper>
      <Title>색감 테스트</Title>
      {gameState === "start" ? (
        <Start gameStart={gameStart} levelUp={levelUp} />
      ) : null}
      {gameState === "progress" ? (
        <Progress gameEnd={gameEnd} level={level} levelUp={levelUp} />
      ) : null}
      {gameState === "end" ? (
        <GameOver level={level} gameStart={gameStart} />
      ) : null}
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
