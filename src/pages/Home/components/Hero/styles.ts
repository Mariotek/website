import styled from "styled-components";

export const StyledHeroWrapper = styled.div`
  padding: 3.5em 1em 14em 1em;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    background: repeating-linear-gradient(
      -55deg,
      #fff,
      #fff 10px,
      #828282 10px,
      #828282 20px
    );
    width: 100%;
    height: 60px;
    position: absolute;
    top: -22px;
    left: 0;
    transform: skew(4deg) scale(1.2) rotate(-2deg);
    opacity: 0.2;
  }

  h1 {
    margin: 0 0 30px 0 !important;
    font-weight: 900;
    font-size: 3.8em;
    text-shadow: 1px 14px 1px rgb(245 245 245 / 13%),
      1px 24px 23px rgb(197 21 178 / 30%);
    font-family: "LalezarRegular", Tahoma, sans-serif;
    background: -webkit-radial-gradient(#f2081b, #5c94fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .whoAreYou p {
    font-family: "SDF", tahoma, sans-serif;
    font-weight: 600;
    text-align: justify;
    border-radius: 11px;
    background: #fff;
    line-height: 30px;
    font-size: 16px;
    position: absolute;
    left: 50%;
    bottom: -10px;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    padding: 17px 25px 25px;
    color: #6f6f6f;
    border: 4px solid #e2d1d13d;
    min-width: 540px;
    max-width: 100%;
    width: 540px;
  }

  .topTextBrand .whoAreYou #goToDown {
    font-size: 23px;
    transition: all ease-in-out 0.3s;
    color: #9e9797;
    cursor: pointer;
  }

  .topTextBrand .whoAreYou #goToDown:hover {
    color: #093510;
  }

  .topLogo svg {
    width: 187px;
    height: 181px;
    margin-top: 33px;
  }

  .goToDown {
    font-size: 25px;
    opacity: 0.3;
    margin-top: 30px;
  }
`;

export const StyledConnector = styled.div`
  background: linear-gradient(-45deg, transparent 16px, #5c94fc 0),
    linear-gradient(45deg, transparent 16px, #dd4e6d 0);
  background-repeat: repeat-x;
  background-position: left bottom;
  background-size: 22px 23px;
  content: "";
  display: block;
  width: 100%;
  height: 22px;
  position: absolute;
  bottom: 0;
  left: 0px;
  z-index: 1006;
  transform: rotate(180deg);
`;
