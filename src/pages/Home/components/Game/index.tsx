import React from "react";
import { IonPhaserCe, GameInstance } from "@ion-phaser-ce/react";
import Phaser from "phaser-ce";
import GameState from "./gameState";
import { StyledGameWrapper } from "./styles";

const gameConfig: GameInstance = {
  width: "100%",
  height: "100%",
  renderer: Phaser.AUTO,
  state: GameState,
};

const Game = () => {
  return (
    <StyledGameWrapper style={{ minHeight: 200 }}>
      <IonPhaserCe class="game" game={gameConfig} />
    </StyledGameWrapper>
  );
};

export default Game;
