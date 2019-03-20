import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import makeSpriteLoop from '../../helpers/spriteHelper';
import OurTeam from './OurTeam';
import TopBrand from './TopBrand';

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
            tick  : 7
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
        }, 400);

        if (Cookies.get('backgroundMusicControl') !== '0') {
            playSound('background');
        }
        addKeypressEvents();
    }, []);

    /**
     * Check if mario should fall down
     */
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

    /**
     * Play sound based on key
     * @param key
     */
    function playSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        if (key === 'background') {
            audio.volume = 0.5;
        }
        audio.play();
    }

    /**
     * Pause playing sound
     * @param key
     */
    function pauseSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        if (!audio) return;
        audio.pause();
    }

    /**
     * Check if mario character hit to object
     * @param objectSelector
     * @param sideHit
     * @param headHit
     * @returns {object}
     */
    function checkHitMario(objectSelector, sideHit = false, headHit = false) {
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
                    && (
                        (sideHit && bottomSpaceMario <= objectTop)
                        || (!sideHit && bottomSpaceMario >= objectTop)
                        || headHit
                    )
                    && (
                        (sideHit || marioTop >= bottomSpaceObj)
                        || (headHit || (marioTop + 85) >= bottomSpaceObj)
                    )
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


    /**
     * Do jump mario character
     */
    function doJumpMario() {
        clearTimeout(MARIO_JUMP_TIMEOUT);

        window.marioCharacter_RAF_Paused = true;
        updateMarioChar('jump');

        const marioHolder = document.getElementById('marioCharacterHolder') || null;
        const styleMarioChar = window.getComputedStyle(marioHolder),
            bottomSpaceMario = parseInt(styleMarioChar.getPropertyValue('bottom'));

        const checkHitToScore = checkHitMario('.scoreBar', false, true);
        if (checkHitToScore.result) {
            console.log('HIIIIIT :: ', checkHitToScore);
            marioHolder.style.bottom = `${bottomSpaceMario + (checkHitToScore.bottom - 170)}px`;
            playSound('bump');
        } else {
            playSound('jump');
            marioHolder.style.bottom = `${bottomSpaceMario + 110}px`;
        }
        MARIO_JUMP_TIMEOUT = setTimeout(() => {
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
    }


    /**
     * Timeout for mario walking animation
     */
    function waitTillWalking() {
        MARIO_WALK_TIMEOUT = setTimeout(() => {
            const now = new Date().getTime();
            if ((now - MARIO_WALK_TIMER) >= 400 && MARIO_WALK_TIMER !== 0) {
                window.marioCharacter_RAF_Paused = true;
                updateMarioChar('stand');
            }
        }, 400);
    }

    /**
     * Do walk mario character
     */
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

    /**
     * Build keypress events
     */
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
                doJumpMario();
            } else if (e.keyCode === 40 || e.key === 'Down') {
                e.preventDefault();
                clearTimeout(MARIO_SEAT_TIMEOUT);
                updateMarioChar('seat');
                MARIO_SEAT_TIMEOUT = setTimeout(() => updateMarioChar('stand'), 300);
            }
        }, false);

        /**
         * Game control btn click
         */
        document.querySelector('.gameSettingsBtn').addEventListener('click', () => {
            const menu = document.getElementById('gameSettingMenu');
            const isBlock = (menu.getAttribute('data-display') || '') === 'block';
            const newDisplay = (isBlock ? 'none' : 'block');
            menu.style.display = newDisplay;
            menu.setAttribute('data-display', newDisplay);

            const liElements = Array.from(menu.querySelectorAll('li'));
            liElements.map(li => {
                li.addEventListener('click', () => {
                    const id = li.getAttribute('data-id');
                    switch (id) {
                        case 'backgroundMusicControl':
                            if (Cookies.get('backgroundMusicControl') !== '1') {
                                li.querySelector('span').classList.add('active');
                                Cookies.set('backgroundMusicControl', '1');
                                playSound('background');
                            } else {
                                li.querySelector('span').classList.remove('active');
                                Cookies.set('backgroundMusicControl', '0');
                                pauseSound('background');
                            }
                            break;
                        case 'soundEffectControl':
                            pauseSound('jump');
                            break;
                    }
                });
            });
        });
    }


    return (
        <React.Fragment>

            <TopBrand />
            <audio data-key='background' src='./static/audio/overworld.ogg' loop={true}/>
            <audio data-key='jump' src='./static/audio/jump.ogg'/>
            <audio data-key='bump' src='./static/audio/bump.ogg'/>

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
                    <i className={'fa fa-cog gameSettingsBtn'}/>
                    <div id={'gameSettingMenu'} style={{ display: 'none' }}>
                        <ul>
                            <li data-id={'backgroundMusicControl'}>
                                <i className={'fa fa-music ml5'}/> آهنگ پس زمینه
                                <span className={Cookies.get('backgroundMusicControl') === '1' ? 'active' : ''}/>
                            </li>
                            <li data-id={'soundEffectControl'}>
                                <i className={'fa fa-microphone ml5'}/> افکت صوتی
                                <span className={Cookies.get('soundEffectControl') === '1' ? 'active' : ''}/>
                            </li>
                        </ul>
                    </div>
                    <div className={'wellRight'}/>
                    <div className={'wellLeft'}/>
                    <canvas id='PoisonousFlower'/>
                </div>
            </div>

            <div className={'afterGameDescription'}>
                <svg version='1.0' xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 278.000000 213.000000' preserveAspectRatio='xMidYMid meet'>
                    <defs>
                        <linearGradient id='grad2' x1='0%' y1='0%' x2='0%' y2='100%'>
                            <stop offset='0%' stopColor='#fff536' stopOpacity='1' />
                            <stop offset='90%' stopColor='#ffffff' stopOpacity='0.6' />
                        </linearGradient>
                    </defs>
                    <g transform='translate(0.000000,213.000000) scale(0.100000,-0.100000)' fill='url(#grad2)'
                        stroke='none'>
                        <path
                            d='M140 2061 c0 -2 44 -73 98 -157 53 -85 102 -162 107 -172 6 -9 46 -73 89 -142 44 -69 142 -224 219 -345 76 -121 154 -242 172 -270 51 -77 388 -614 419 -668 15 -26 30 -47 33 -47 2 0 2 3 0 8 -2 4 -31 54 -64 112 -33 58 -126 220 -205 360 -80 140 -184 325 -233 410 -48 85 -125 220 -170 300 -45 80 -142 249 -214 377 l-132 231 -59 4 c-33 1 -60 1 -60 -1z'/>
                        <path
                            d='M453 2062 c-24 -2 -43 -5 -43 -8 0 -6 749 -1505 759 -1518 4 -6 34 -68 66 -138 32 -70 60 -126 62 -124 2 1 -47 117 -108 257 -61 140 -144 331 -184 424 -40 94 -128 296 -195 450 -67 154 -158 364 -202 467 -52 122 -86 187 -96 190 -10 1 -36 2 -59 0z'/>
                        <path
                            d='M674 2059 c-2 -4 11 -47 30 -96 19 -48 62 -164 96 -258 140 -386 351 -962 361 -984 10 -25 77 -208 124 -344 46 -129 38 -80 -14 89 -47 151 -89 294 -151 504 -16 52 -72 239 -125 415 -53 176 -120 399 -148 495 l-52 175 -58 5 c-32 3 -61 2 -63 -1z'/>
                        <path
                            d='M948 2062 c-11 -2 -8 -26 18 -135 17 -73 46 -195 64 -272 18 -77 59 -255 92 -395 114 -485 160 -684 195 -842 15 -65 28 -116 30 -114 2 2 -39 259 -92 572 -52 313 -104 623 -115 689 -10 66 -33 202 -49 302 -17 100 -31 184 -31 186 0 6 -91 13 -112 9z'/>
                        <path
                            d='M1247 2062 l-48 -3 6 -47 c9 -81 34 -321 49 -482 25 -259 115 -1153 120 -1190 6 -51 -2 272 -24 940 -11 322 -21 629 -22 682 -3 108 -1 105 -81 100z'/>
                        <path
                            d='M1493 2062 c-20 -3 -22 -11 -27 -105 -4 -56 -13 -325 -21 -597 -8 -272 -20 -622 -26 -777 -6 -155 -9 -287 -6 -295 3 -7 6 3 6 23 1 20 39 417 86 884 47 466 85 851 85 855 0 9 -64 17 -97 12z'/>
                        <path
                            d='M1748 2062 c-15 -3 -22 -38 -98 -512 -10 -63 -62 -371 -114 -684 -53 -313 -95 -571 -93 -572 1 -1 47 189 101 424 55 235 112 479 127 542 15 63 62 264 104 445 41 182 77 335 80 342 4 11 -73 22 -107 15z'/>
                        <path
                            d='M2048 2062 c-46 -3 -47 -4 -62 -50 -24 -78 -96 -317 -281 -937 -97 -324 -190 -632 -206 -684 -35 -111 -33 -132 4 -29 37 107 142 395 255 703 192 523 362 987 362 990 0 7 -28 10 -72 7z'/>
                        <path
                            d='M2280 2063 c-8 -2 -25 -27 -37 -56 -59 -137 -296 -686 -308 -712 -7 -16 -72 -167 -144 -335 -73 -168 -139 -321 -148 -340 -45 -98 -133 -304 -130 -306 1 -2 199 391 440 872 429 857 436 874 409 875 -15 0 -36 2 -47 3 -11 2 -27 1 -35 -1z'/>
                        <path
                            d='M2498 1998 c-19 -35 -103 -184 -188 -333 -84 -148 -199 -351 -255 -450 -56 -99 -149 -261 -205 -360 -56 -99 -124 -218 -150 -265 -26 -47 -57 -103 -70 -125 -12 -22 -25 -44 -29 -50 -18 -24 -72 -125 -67 -125 3 0 20 26 39 58 19 31 152 244 297 472 145 228 349 550 453 715 104 165 221 348 258 406 38 58 69 109 69 112 0 4 -27 7 -59 7 l-60 0 -33 -62z'/>
                        <path
                            d='M60 1867 c0 -67 -51 4 535 -753 72 -93 173 -225 225 -294 244 -320 395 -513 379 -486 -6 11 -93 131 -159 221 -20 28 -131 183 -247 345 -115 162 -232 327 -260 365 -28 39 -142 198 -253 355 -112 157 -207 289 -211 295 -5 5 -9 -16 -9 -48z'/>
                        <path
                            d='M2375 1427 c-192 -269 -363 -509 -380 -532 -42 -61 -337 -471 -375 -522 -18 -24 -30 -43 -27 -43 2 0 37 44 78 98 65 86 121 158 327 424 29 38 79 103 111 145 132 173 262 342 359 467 34 45 107 140 163 212 l100 131 -3 55 -3 55 -350 -490z'/>
                        <path
                            d='M60 1596 c0 -35 3 -66 8 -68 4 -1 72 -75 152 -163 80 -88 163 -180 186 -205 79 -86 478 -526 603 -664 207 -229 231 -251 85 -76 -76 91 -316 378 -533 639 -218 260 -407 488 -420 505 -14 17 -38 46 -53 64 l-28 33 0 -65z'/>
                        <path
                            d='M2642 1553 c-44 -54 -165 -199 -268 -323 -104 -124 -200 -239 -214 -256 -14 -17 -70 -85 -125 -150 -55 -65 -111 -132 -125 -150 -27 -35 -271 -325 -303 -361 -11 -13 -18 -23 -15 -23 3 0 59 60 124 132 65 73 171 189 234 258 63 69 241 265 395 435 154 170 303 334 332 364 51 54 52 58 53 114 0 31 -2 57 -5 57 -2 0 -40 -44 -83 -97z'/>
                        <path
                            d='M60 1331 l0 -58 133 -119 c72 -65 148 -133 167 -150 19 -17 161 -145 315 -284 154 -139 318 -287 365 -329 47 -42 112 -101 145 -131 33 -29 -205 212 -530 538 -324 326 -591 592 -592 592 -2 0 -3 -26 -3 -59z'/>
                        <path
                            d='M2125 788 c-330 -331 -550 -557 -489 -502 323 290 393 353 444 400 52 48 281 254 470 423 192 172 182 159 178 224 l-3 57 -600 -602z'/>
                        <path
                            d='M61 1063 l0 -58 57 -41 c31 -22 125 -87 207 -144 83 -57 227 -158 321 -224 95 -67 220 -155 280 -196 59 -41 156 -110 216 -152 59 -42 108 -75 108 -73 0 2 -30 27 -67 56 -38 30 -189 150 -337 269 -148 118 -292 233 -320 255 -29 22 -143 113 -254 203 -111 89 -205 162 -207 162 -3 0 -5 -26 -4 -57z'/>
                        <path
                            d='M2444 897 c-154 -123 -416 -333 -584 -467 -168 -133 -307 -245 -310 -248 -10 -12 49 28 177 119 73 52 158 112 190 134 31 22 134 94 229 160 94 66 264 185 378 264 l206 145 0 58 c0 32 -2 58 -4 58 -2 0 -129 -100 -282 -223z'/>
                        <path
                            d='M62 800 l3 -63 593 -297 c325 -163 592 -295 592 -294 0 2 -33 22 -72 45 -88 52 -136 80 -533 319 -171 102 -362 217 -425 255 -63 37 -125 75 -138 83 l-23 15 3 -63z'/>
                        <path
                            d='M2665 822 c-33 -21 -123 -76 -200 -122 -77 -46 -212 -127 -300 -180 -88 -53 -261 -157 -385 -230 -124 -73 -229 -138 -235 -143 -8 -7 1174 580 1183 588 2 2 2 30 0 64 l-3 61 -60 -38z'/>
                        <path
                            d='M60 531 c0 -58 1 -60 33 -69 17 -6 115 -36 217 -66 102 -31 291 -88 420 -127 129 -39 294 -88 365 -109 72 -21 139 -41 150 -45 l20 -6 -20 10 c-25 13 -1174 471 -1180 471 -3 0 -5 -27 -5 -59z'/>
                        <path
                            d='M2138 357 c-318 -127 -576 -232 -575 -234 3 -2 249 71 797 237 107 32 234 70 283 85 l87 26 0 59 c0 33 -3 60 -7 59 -5 0 -268 -105 -585 -232z'/>
                        <path
                            d='M60 264 c0 -56 2 -64 18 -64 11 0 223 -20 473 -45 250 -25 501 -50 559 -56 58 -5 116 -13 130 -16 14 -3 23 -3 20 0 -3 3 -257 55 -565 116 -308 62 -577 116 -597 120 l-38 9 0 -64z'/>
                        <path
                            d='M2390 258 c-725 -144 -819 -163 -815 -166 3 -4 1148 108 1153 113 2 1 2 29 0 61 l-3 59 -335 -67z'/>
                    </g>
                </svg>

                <div className={'offerText'}>میتونین کتاب ها رو از طریق سایت سفارش بدین تا دو تا استیکر خوشگل 😍 با
                    المان‌های بازی سوپر ماریو به همراه کتاب 📖 امضای شده توسط نویسنده دریافت کنید.

                <div className={'doPaymentBtn'}><i className={'fa fa-shopping-basket'} /> ثبت سفارش</div>
                </div>


                <OurTeam />

            </div>
        </React.Fragment>
    );
};

export default Index;
