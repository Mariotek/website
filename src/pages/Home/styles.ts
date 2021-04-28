import styled from "styled-components";

export const StyledGithubLink = styled.div`
  position: relative;

  a {
    position: absolute;
    top: 10px;
    svg {
      width: 40px;
      height: 40px;
      transform: rotate(10deg);
      fill: #000;
    }
  }
`;
