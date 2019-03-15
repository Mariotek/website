// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function() {
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik MÃ¶ller. fixes from Paul Irish and Tino Zijdel
    // MIT license

    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
        window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`]
            || window[`${vendors[x]}CancelRequestAnimationFrame`];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
            callback(currTime + timeToCall);
        },
        timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

/**
 * Create sprite animation loop
 * @param options = {canvas , image, width , height , frames , tick}
 */
const makeSpriteLoop = options => {
    let spriteLoop = {};

    const gameLoop = () => {
        const isPaused = window[`${options.canvas}_RAF_Paused`] || false;
        window.requestAnimationFrame(gameLoop);
        if (!isPaused) {
            spriteLoop.update();
            spriteLoop.render();
        }
    };

    const sprite = options => {
        let that = {},
            frameIndex = 0,
            tickCount = 0;
        const ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.update = () => {
            tickCount += 1;

            if (tickCount > ticksPerFrame) {
                tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

        that.render = function(frameIndexPassed = '') {
            if (frameIndexPassed !== '') {
                frameIndex = frameIndexPassed;
            }

            // Clear the canvas
            that.context.clearRect(0, 0, that.width, that.height);

            // Draw the animation
            that.context.drawImage(
                that.image,
                frameIndex * that.width / numberOfFrames,
                0,
                that.width / numberOfFrames,
                that.height,
                0,
                0,
                that.width / numberOfFrames,
                that.height
            );
        };

        return that;
    };

    // Get canvas
    const canvas = document.getElementById(options.canvas);
    canvas.width = options.width;
    canvas.height = options.height;

    // Create sprite sheet
    const spriteImage = new Image();

    // Create sprite
    spriteLoop = sprite({
        context       : canvas.getContext('2d'),
        width         : (options.frames * options.width),
        height        : options.height,
        image         : spriteImage,
        numberOfFrames: options.frames,
        ticksPerFrame : options.tick
    });

    // Load sprite sheet
    spriteImage.addEventListener('load', gameLoop);
    spriteImage.src = options.image;
};

export default makeSpriteLoop;
