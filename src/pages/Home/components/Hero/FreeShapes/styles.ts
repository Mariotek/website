import styled from "styled-components";

export const Wrapper = styled.div``;

export const StyledWavedLine = styled.div`
  overflow: hidden;
  position: relative;
  width: 200px;
  height: 50px;
  position: absolute;
  right: 41px;
  top: 208px;

  &.left {
    left: 40px;
    top: 117px;
    right: unset;
    width: 150px;
    .ellipse {
      width: 150px;
      opacity: 0.4;
    }

    .ellipse2 {
      opacity: 1;
    }
  }

  .ellipse {
    position: absolute;
    background: radial-gradient(
      ellipse,
      transparent,
      transparent 7px,
      #c74e74 7px,
      #c74e74 10px,
      transparent 11px
    );
    background-size: 36px 40px;
    width: 200px;
    height: 20px;
  }

  .ellipse2 {
    top: 20px;
    left: 18px;
    background-position: 0px -20px;
    opacity: 0.4;
  }
`;

export const StyledCurveSquare = styled.div`
  width: 100px;
  height: 100px;
  background-image: linear-gradient(309deg, #89f7fe 0%, #66a6ff 100%);
  opacity: 0.4;
  border-radius: 34px;
  position: absolute;
  right: 43px;
  top: 70px;
  transform: rotate(45deg);
`;

export const StyledCircle = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
  border-radius: 50%;
  position: absolute;
  left: 29px;
  top: 243px;
  opacity: 0.4;
`;
