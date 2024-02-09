import styled from "@emotion/styled";
import { uiColor } from "./color";

export const BlackBox = styled.div`
  background-color: ${uiColor.dark};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 1rem 2rem;
  gap: 0.5rem;
`;
