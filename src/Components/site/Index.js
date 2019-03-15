import React, { useEffect } from 'react';
import Sound from 'react-sound';
import makeSpriteLoop from '../../helpers/spriteHelper';

let MARIO_WALK_TIMEOUT = 0;
let MARIO_WALK_TIMER = 0;
let MARIO_JUMP_TIMEOUT = 0;
let MARIO_SEAT_TIMEOUT = 0;
let MARIO_DIRECTION = 'Right';

const Index = () => {
    useEffect(() => {
        /**
         * Start mario walking
         */
        makeSpriteLoop({
            canvas: 'marioCharacter',
            image : '/static/images/mario/MarioSprite2.png',
            width : 52,
            height: 100,
            frames: 3,
            tick  : 10
        });

        /**
         * Add animation of Poisonous flower
         */
        makeSpriteLoop({
            canvas: 'PoisonousFlower',
            image : '/static/images/mario/enemySprite.png',
            width : 50,
            height: 66,
            frames: 3,
            tick  : 15
        });


        /**
         * Add animation of custom scores
         */
        makeSpriteLoop({
            canvas: 'scoreCustom_j',
            image : '/static/images/mario/Blocks/EmptyStripe.png',
            width : 50,
            height: 50,
            frames: 2,
            tick  : 10
        });

        /**
         * Add animation of custom scores
         */
        makeSpriteLoop({
            canvas: 'scoreCustom_s',
            image : '/static/images/mario/Blocks/EmptyStripe.png',
            width : 50,
            height: 50,
            frames: 2,
            tick  : 10
        });

        /**
         * Add animation of score question
         */
        makeSpriteLoop({
            canvas: 'scoreQuestion',
            image : '/static/images/mario/Blocks/ScoreStripe.png',
            width : 50,
            height: 50,
            frames: 2,
            tick  : 10
        });

        setTimeout(() => {
            window.marioCharacter_RAF_Paused = true;
            updateMarioChar('stand');
        }, 250);

        addKeypressEvents();
    }, []);


    function checkMarioFallDown() {
        /**
         * Is mario on available boards
         */
        const marioHolder = document.getElementById('marioCharacterHolder') || null;
        const checkScoreBarHit = checkHitMario('.scoreBar', false);
        const checkGroundHit = checkHitMario('.groundHolder > div', false);

        if (!checkScoreBarHit.result && !checkGroundHit.result) {
            marioHolder.style.bottom = '85px';
        }
    }

    /**
     * Check if mario character hit to object
     * @param objectSelector
     * @param sideHit
     * @returns {object}
     */
    function checkHitMario(objectSelector, sideHit = false) {
        const marioHolder = document.getElementById('marioCharacterHolder') || null;
        const hitObjects = document.querySelectorAll(objectSelector) || [];
        const hisObjectsArray = Array.from(hitObjects);

        if (hisObjectsArray) {
            let hitObjectElement = {};
            const mapObjectsResult = hisObjectsArray.some(hitObject => {
                const styleMarioChar = window.getComputedStyle(marioHolder),
                    styleObjectElement = window.getComputedStyle(hitObject);

                const
                    bottomSpaceMario = parseInt(styleMarioChar.getPropertyValue('bottom')),
                    leftSpaceMario = parseInt(styleMarioChar.getPropertyValue('left')),
                    marioTop = bottomSpaceMario + 100,
                    marioRight = leftSpaceMario + 52,
                    bottomSpaceObj = parseInt(styleObjectElement.getPropertyValue('bottom')),
                    leftSpaceObj = parseInt(styleObjectElement.getPropertyValue('left')),
                    objectTop = bottomSpaceObj + parseInt(styleObjectElement.getPropertyValue('height')),
                    objectRight = leftSpaceObj + parseInt(styleObjectElement.getPropertyValue('width'));

                console.log('Object  : ', {
                    left  : (leftSpaceMario <= objectRight),
                    right : (marioRight >= leftSpaceObj),
                    top   : ((sideHit && bottomSpaceMario <= objectTop) || (!sideHit && bottomSpaceMario >= objectTop)),
                    bottom: (sideHit || marioTop >= bottomSpaceObj),
                    hitObject
                });

                if (
                    leftSpaceMario <= objectRight
                    && marioRight >= leftSpaceObj
                    && ((sideHit && bottomSpaceMario <= objectTop) || (!sideHit && bottomSpaceMario >= objectTop))
                    && (sideHit || marioTop >= bottomSpaceObj)
                ) {
                    hitObjectElement = {
                        object: hitObject,
                        left  : leftSpaceObj,
                        right : objectRight,
                        top   : objectTop,
                        bottom: bottomSpaceObj
                    };
                    return true;
                }
            });
            if (mapObjectsResult) {
                return {
                    result: true,
                    ...hitObjectElement
                };
            }
        }
        return {
            result: false
        };
    }

    function addKeypressEvents() {
        /**
         * Manage key press
         */
        document.removeEventListener('keydown', () => {
        });
        document.addEventListener('keydown', e => {
            if (e.keyCode === 37 || e.key === 'ArrowLeft') {
                e.preventDefault();
                turnMarioDirection('Left');
                doWalkMario();
            } else if (e.keyCode === 39 || e.key === 'ArrowRight') {
                e.preventDefault();
                turnMarioDirection('Right');
                doWalkMario();
            } else if (e.keyCode === 32 || e.key === 'Space') {
                e.preventDefault();
                clearTimeout(MARIO_JUMP_TIMEOUT);


                window.marioCharacter_RAF_Paused = true;
                updateMarioChar('jump');

                doJumpMario();
            } else if (e.keyCode === 40 || e.key === 'Down') {
                e.preventDefault();
                clearTimeout(MARIO_SEAT_TIMEOUT);
                updateMarioChar('seat');
                MARIO_SEAT_TIMEOUT = setTimeout(() => updateMarioChar('stand'), 300);
            }
        }, false);
    }

    /**
     * Change direction of mario
     * @param dir
     */
    function turnMarioDirection(dir) {
        const marioHolder = document.getElementById('marioCharacterHolder') || null;
        MARIO_DIRECTION = dir;
        if (dir === 'Right') {
            marioHolder.classList.remove('toLeft');
            marioHolder.classList.add('toRight');
        } else {
            marioHolder.classList.remove('toRight');
            marioHolder.classList.add('toLeft');
        }
    }

    function doJumpMario() {
        const marioHolder = document.getElementById('marioCharacterHolder') || null;
        const styleMarioChar = window.getComputedStyle(marioHolder),
            bottomSpaceMario = parseInt(styleMarioChar.getPropertyValue('bottom'));

        marioHolder.style.bottom = `${bottomSpaceMario + 110}px`;
        MARIO_JUMP_TIMEOUT = setTimeout(() => {
            /**
             * Is mario on score bar ?
             */
            const checkScoreBarHit = checkHitMario('.scoreBar', false);
            const checkGroundHit = checkHitMario('.groundHolder > div', false);

            if (checkScoreBarHit.result) {
                marioHolder.style.bottom = `${checkScoreBarHit.top + 1}px`;
            } else if (checkGroundHit.result) {
                marioHolder.style.bottom = `${checkGroundHit.top + 1}px`;
            } else {
                marioHolder.style.bottom = '85px';
            }
            setTimeout(() => updateMarioChar('stand'), 300);
        }, 400);

        playSound('jump');
    }


    /**
     * Change mario face
     * @param to
     */
    function updateMarioChar(to = 'stand') {
        const marioCharacter = document.getElementById('marioCharacter') || null;
        if (marioCharacter) {
            const context = marioCharacter.getContext('2d');
            let frameNumber = 3;
            switch (to) {
                case 'stand':
                    frameNumber = 3;
                    break;
                case 'jump':
                    frameNumber = 4;
                    break;
                case 'seat':
                    frameNumber = 5.03;
                    break;
            }
            const spriteImage = new Image();
            spriteImage.src = '/static/images/mario/MarioSprite2.png';

            // clear and draw again
            context.clearRect(0, 0, 52, 100);
            context.drawImage(
                spriteImage,
                (frameNumber * 52),
                0,
                (52),
                100,
                0,
                0,
                (52),
                100
            );
        }
    }

    function playSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    }

    function doWalkMario() {
        const marioHolder = document.getElementById('marioCharacterHolder') || null;

        window.marioCharacter_RAF_Paused = false;
        MARIO_WALK_TIMER = new Date().getTime();
        clearTimeout(MARIO_WALK_TIMEOUT);
        if (marioHolder) {
            const fromLeft = marioHolder.offsetLeft;
            let walkSize = 8;

            if (MARIO_DIRECTION === 'Right') {
                if (checkHitMario('.groundHolder .wellRight', true).result) {
                    walkSize = 0;
                }
                const newSpaceLeft = fromLeft + walkSize;
                const maxSpaceLeft = window.innerWidth - 52;
                marioHolder.style.left = `${newSpaceLeft > maxSpaceLeft ? maxSpaceLeft : newSpaceLeft}px`;
            } else {
                if (checkHitMario('.groundHolder .wellLeft', true).result) {
                    walkSize = 0;
                }
                const newSpaceLeft = parseInt(fromLeft) - walkSize;
                marioHolder.style.left = `${newSpaceLeft > 0 ? newSpaceLeft : 0}px`;
            }
            checkMarioFallDown();
        }

        waitTillWalking();
    }

    function waitTillWalking() {
        MARIO_WALK_TIMEOUT = setTimeout(() => {
            const now = new Date().getTime();
            if ((now - MARIO_WALK_TIMER) >= 400 && MARIO_WALK_TIMER !== 0) {
                window.marioCharacter_RAF_Paused = true;
                updateMarioChar('stand');
            }
        }, 400);
    }

    return (
        <React.Fragment>
            <Sound
                url='./static/data/audio/overworld.ogg'
                playStatus={Sound.status.PAUSED}
                playFromPosition={0}
                volume={25}
                loop={true}
            />
            <audio data-key="jump" src='./static/data/audio/jump.ogg'></audio>

            <div className={'topLogo'}></div>

            <div className={'topTextBrand'}>
                <h1>پلتفرم آموزشی ماریوتک</h1>
                <div className='whoAreYou'>
                    <p>هدف از ماریوتک ایجاد پلتفرمی متفاوت برای آموزش‌های صحیح و اصولی در
                        زمینه‌های مختلف است ، به گونه ای که مطالب به شکل اصولی و به سادگی آموزش داده شوند ، برای پیش
                        خرید نخستین کتاب ماریوتک ، از مینی گیم زیر استفاده کنید و پیش خرید انجام دهید :)
                    </p>
                    <i className={'fa fa-chevron-down'} id={'goToDown'}/>
                </div>
            </div>


            <div className={'marioTek_container blueGamePlay'}>
                <svg preserveAspectRatio='xMidYMax meet' viewBox='0 0 1600 100' data-height='100'>
                    <path d='M1040,56c0.5,0,1,0,1.6,0c-16.6-8.9-36.4-15.7-66.4-15.7c-56,0-76.8,23.7-106.9,41C881.1,89.3,895.6,96,920,96
C979.5,96,980,56,1040,56z' className={'darkBackWave'}/>
                    <path d='M1699.8,96l0,10H1946l-0.3-6.9c0,0,0,0-88,0s-88.6-58.8-176.5-58.8c-51.4,0-73,20.1-99.6,36.8
c14.5,9.6,29.6,18.9,58.4,18.9C1699.8,96,1699.8,96,1699.8,96z' className={'darkBackWave'}/>
                    <path d='M1400,96c19.5,0,32.7-4.3,43.7-10c-35.2-17.3-54.1-45.7-115.5-45.7c-32.3,0-52.8,7.9-70.2,17.8
c6.4-1.3,13.6-2.1,22-2.1C1340.1,56,1340.3,96,1400,96z' className={'darkBackWave'}/>
                    <path d='M320,56c6.6,0,12.4,0.5,17.7,1.3c-17-9.6-37.3-17-68.5-17c-60.4,0-79.5,27.8-114,45.2
c11.2,6,24.6,10.5,44.8,10.5C260,96,259.9,56,320,56z' className={'darkBackWave'}/>
                    <path d='M680,96c23.7,0,38.1-6.3,50.5-13.9C699.6,64.8,679,40.3,622.2,40.3c-30,0-49.8,6.8-66.3,15.8
c1.3,0,2.7-0.1,4.1-0.1C619.7,56,620.2,96,680,96z' className={'darkBackWave'}/>
                    <path d='M-40,95.6c28.3,0,43.3-8.7,57.4-18C-9.6,60.8-31,40.2-83.2,40.2c-14.3,0-26.3,1.6-36.8,4.2V106h60V96L-40,95.6
z' className={'darkBackWave'}/>
                    <path d='M504,73.4c-2.6-0.8-5.7-1.4-9.6-1.4c-19.4,0-19.6,13-39,13c-19.4,0-19.5-13-39-13c-14,0-18,6.7-26.3,10.4
C402.4,89.9,416.7,96,440,96C472.5,96,487.5,84.2,504,73.4z' className={'littleMiddleWave'}/>
                    <path d='M1205.4,85c-0.2,0-0.4,0-0.6,0c-19.5,0-19.5-13-39-13s-19.4,12.9-39,12.9c0,0-5.9,0-12.3,0.1
c11.4,6.3,24.9,11,45.5,11C1180.6,96,1194.1,91.2,1205.4,85z' className={'littleMiddleWave'}/>
                    <path d='M1447.4,83.9c-2.4,0.7-5.2,1.1-8.6,1.1c-19.3,0-19.6-13-39-13s-19.6,13-39,13c-3,0-5.5-0.3-7.7-0.8
c11.6,6.6,25.4,11.8,46.9,11.8C1421.8,96,1435.7,90.7,1447.4,83.9z' className={'littleMiddleWave'}/>
                    <path d='M985.8,72c-17.6,0.8-18.3,13-37,13c-19.4,0-19.5-13-39-13c-18.2,0-19.6,11.4-35.5,12.8
c11.4,6.3,25,11.2,45.7,11.2C953.7,96,968.5,83.2,985.8,72z' className={'littleMiddleWave'}/>
                    <path d='M743.8,73.5c-10.3,3.4-13.6,11.5-29,11.5c-19.4,0-19.5-13-39-13s-19.5,13-39,13c-0.9,0-1.7,0-2.5-0.1
c11.4,6.3,25,11.1,45.7,11.1C712.4,96,727.3,84.2,743.8,73.5z' className={'littleMiddleWave'}/>
                    <path d='M265.5,72.3c-1.5-0.2-3.2-0.3-5.1-0.3c-19.4,0-19.6,13-39,13c-19.4,0-19.6-13-39-13
c-15.9,0-18.9,8.7-30.1,11.9C164.1,90.6,178,96,200,96C233.7,96,248.4,83.4,265.5,72.3z'
                    className={'littleMiddleWave'}/>
                    <path d='M1692.3,96V85c0,0,0,0-19.5,0s-19.6-13-39-13s-19.6,13-39,13c-0.1,0-0.2,0-0.4,0c11.4,6.2,24.9,11,45.6,11
C1669.9,96,1684.8,96,1692.3,96z' className={'littleMiddleWave'}/>
                    <path
                        d='M25.5,72C6,72,6.1,84.9-13.5,84.9L-20,85v8.9C0.7,90.1,12.6,80.6,25.9,72C25.8,72,25.7,72,25.5,72z'
                        className={'littleMiddleWave'}/>
                    <path d='M-40,95.6C20.3,95.6,20.1,56,80,56s60,40,120,40s59.9-40,120-40s60.3,40,120,40s60.3-40,120-40
s60.2,40,120,40s60.1-40,120-40s60.5,40,120,40s60-40,120-40s60.4,40,120,40s59.9-40,120-40s60.3,40,120,40s60.2-40,120-40
s60.2,40,120,40s59.8,0,59.8,0l0.2,143H-60V96L-40,95.6z' className={'bottomJoinerWave'}/>
                </svg>
                <div className={'cloudsHolder'}/>

                <div className={'scoreBar'}>
                    <div className={'scoreCustom'} data-letter={'S'}>
                        <canvas id='scoreCustom_s'/>
                    </div>
                    <div className={'scoreCustom'} data-letter={'J'}>
                        <canvas id='scoreCustom_j'/>
                    </div>
                    <div className={'scoreBrick sc_Br1'}/>
                    <div className={'scoreBrick sc_Br2'}/>
                    <div className={'scoreBrick sc_Br3'}/>
                    <div className={'scoreBrick sc_Br4'}/>
                    <div className={'scoreQuestion'}>
                        <canvas id={'scoreQuestion'}/>
                    </div>
                </div>
                <div id='marioCharacterHolder' className={`marioCharacter to${MARIO_DIRECTION}`}>
                    <canvas id='marioCharacter'/>
                </div>
                <div className={'groundHolder'}>
                    <div className={'wellRight'}/>
                    <div className={'wellLeft'}/>
                    <canvas id='PoisonousFlower'/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Index;
