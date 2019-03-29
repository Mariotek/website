import React from 'react';

const GameSounds = () => (
    <div>
        <audio data-key='background' src='./static/audio/overworld.ogg' loop={true}/>
        <audio data-key='jump' src='./static/audio/jump.ogg'/>
        <audio data-key='bump' src='./static/audio/bump.ogg'/>
        <audio data-key='1up' src='./static/audio/1up.ogg'/>
        <audio data-key='coin' src='./static/audio/coin.ogg'/>
    </div>
);

export default GameSounds;
