/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { gameStateType } from "types/game";
import Start from "./Start";
import styled from "@emotion/styled";

const Index = () => {
  const [gameState, setGameState] = useState<gameStateType>("start");

  return (
    <Wrapper>
      <Title>색감 테스트</Title>
      <Start />
    </Wrapper>
  );
};

/* STYLE */
const Wrapper = styled.div`
  margin-top: 7rem;
`;

const Title = styled.p`
  font-size: 3rem;
  text-align: center;
`;

export default Index;
