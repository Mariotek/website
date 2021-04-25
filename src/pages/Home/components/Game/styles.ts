import styled from "styled-components";

export const StyledGameWrapper = styled.div`
  position: relative;

  > * {
    min-height: 500px;
    background: #5c94fc;
  }

  &:after {
    content: "GAME PLAY";
    font-weight: 900;
    position: absolute;
    font-size: 45px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 20px;
    color: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }

  canvas {
    min-height: 500px;
    min-width: 100%;
  }
`;
