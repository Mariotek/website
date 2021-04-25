import styled from "styled-components";

export const StyledGameWrapper = styled.div`
  position: relative;

  > * {
    min-height: 500px;
    background: #5c94fc;
  }

  canvas {
    min-height: 500px;
    min-width: 100%;
  }
`;
