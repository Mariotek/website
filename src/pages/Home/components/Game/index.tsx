import React, { useState, useEffect } from "react";
import { IonPhaserCe, GameInstance } from "@ion-phaser-ce/react";
import Phaser from "phaser-ce";
import GameState from "./gameState";
import { StyledGameWrapper } from "./styles";

const gameStates: GameInstance = {
  width: "100%",
  height: "100%",
  renderer: Phaser.AUTO,
  state: GameState,
};

const Game = () => {
  const [initialized, setInitialized] = useState(false);
  const [gameConfig, setGameConfig] = useState<GameInstance>();

  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        setInitialized(true);
        setGameConfig(gameStates);
      }, 200);
    }
  }, [initialized]);

  return (
    <StyledGameWrapper style={{ minHeight: 200 }}>
      <IonPhaserCe class="game" game={gameConfig} />
    </StyledGameWrapper>
  );
};

export default Game;
