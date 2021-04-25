import {
  Wrapper,
  StyledWavedLine,
  StyledCurveSquare,
  StyledCircle,
} from "./styles";

const FreeShapes = () => (
  <Wrapper>
    <StyledWavedLine>
      <div className="ellipse" />
      <div className="ellipse ellipse2" />
    </StyledWavedLine>

    <StyledWavedLine className="left small">
      <div className="ellipse" />
      <div className="ellipse ellipse2" />
    </StyledWavedLine>

    <StyledCurveSquare />
    <StyledCircle />
  </Wrapper>
);

export default FreeShapes;
