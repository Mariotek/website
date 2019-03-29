import React from 'react';

import Cookies from 'js-cookie';
import makeSpriteLoop from '../../../helpers/spriteHelper';
import TopWavesSvg from './TopWavesSvg';
import GameSounds from './GameSounds';


let MARIO_WALK_TIMEOUT = 0;
let MARIO_WALK_TIMER = 0;
let MARIO_JUMP_TIMEOUT = 0;
let MARIO_SEAT_TIMEOUT = 0;
let MARIO_DIRECTION = 'Right';

class SuperMarioGame extends React.Component {
    componentDidMount(){
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
            this.updateMarioChar('stand');
        }, 400);

        if (Cookies.get('backgroundMusicControl') !== '0') {
            this.playSound('background');
        }
        this.addKeypressEvents();
    }

    /**
     * Check if mario should fall down
     */
    checkMarioFallDown() {
        /**
         * Is mario on available boards
         */
        const marioHolder = document.getElementById('marioCharacterHolder') || null;
        const checkScoreBarHit = this.checkHitMario('.scoreBar', false);
        const checkGroundHit = this.checkHitMario('.groundHolder > div', false);

        if (!checkScoreBarHit.result && !checkGroundHit.result) {
            marioHolder.style.bottom = '85px';
        }
    }


    /**
     * Change mario face
     * @param to
     */
    updateMarioChar(to = 'stand') {
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
    playSound(key) {
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
    pauseSound(key) {
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
    checkHitMario(objectSelector, sideHit = false, headHit = false) {
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


                console.log('bottomSpaceMario :: ', bottomSpaceMario, 'objectTop : ', objectTop);
                if (
                    leftSpaceMario <= objectRight
                    && marioRight >= leftSpaceObj
                    && (
                        (sideHit && bottomSpaceMario <= objectTop)
                        || (!sideHit && !headHit && bottomSpaceMario >= objectTop)
                        || (headHit && bottomSpaceMario < objectTop)
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
                        bottom: bottomSpaceObj,
                        mario : {
                            left  : leftSpaceMario,
                            right : marioRight,
                            top   : marioTop,
                            bottom: bottomSpaceMario
                        }
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
    turnMarioDirection(dir) {
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
    doJumpMario() {
        clearTimeout(MARIO_JUMP_TIMEOUT);

        window.marioCharacter_RAF_Paused = true;
        this.updateMarioChar('jump');

        const marioHolder = document.getElementById('marioCharacterHolder') || null;
        const styleMarioChar = window.getComputedStyle(marioHolder),
            bottomSpaceMario = parseInt(styleMarioChar.getPropertyValue('bottom'));

        const checkHitToScore = this.checkHitMario('.scoreBar', false, true);
        if (checkHitToScore.result) {
            console.log('HIIIIIT :: ', checkHitToScore);
            marioHolder.style.bottom = `${bottomSpaceMario + (checkHitToScore.bottom - 170)}px`;
            this.playSound('bump');
        } else {
            this.playSound('jump');
            marioHolder.style.bottom = `${bottomSpaceMario + 110}px`;
        }
        MARIO_JUMP_TIMEOUT = setTimeout(() => {
            const checkScoreBarHit = this.checkHitMario('.scoreBar', false);
            const checkGroundHit = this.checkHitMario('.groundHolder > div', false);

            if (checkScoreBarHit.result) {
                marioHolder.style.bottom = `${checkScoreBarHit.top + 1}px`;
            } else if (checkGroundHit.result) {
                marioHolder.style.bottom = `${checkGroundHit.top + 1}px`;
            } else {
                marioHolder.style.bottom = '85px';
            }
            setTimeout(() => this.updateMarioChar('stand'), 300);
        }, 400);
    }


    /**
     * Timeout for mario walking animation
     */
    waitTillWalking() {
        MARIO_WALK_TIMEOUT = setTimeout(() => {
            const now = new Date().getTime();
            if ((now - MARIO_WALK_TIMER) >= 400 && MARIO_WALK_TIMER !== 0) {
                window.marioCharacter_RAF_Paused = true;
                this.updateMarioChar('stand');
            }
        }, 400);
    }

    /**
     * Do walk mario character
     */
    doWalkMario() {
        const marioHolder = document.getElementById('marioCharacterHolder') || null;

        window.marioCharacter_RAF_Paused = false;
        MARIO_WALK_TIMER = new Date().getTime();
        clearTimeout(MARIO_WALK_TIMEOUT);
        if (marioHolder) {
            const fromLeft = marioHolder.offsetLeft;
            let walkSize = 8;

            if (MARIO_DIRECTION === 'Right') {
                if (this.checkHitMario('.groundHolder .wellRight', true).result) {
                    walkSize = 0;
                }
                const newSpaceLeft = fromLeft + walkSize;
                const maxSpaceLeft = window.innerWidth - 52;
                marioHolder.style.left = `${newSpaceLeft > maxSpaceLeft ? maxSpaceLeft : newSpaceLeft}px`;
            } else {
                if (this.checkHitMario('.groundHolder .wellLeft', true).result) {
                    walkSize = 0;
                }
                const newSpaceLeft = parseInt(fromLeft) - walkSize;
                marioHolder.style.left = `${newSpaceLeft > 0 ? newSpaceLeft : 0}px`;
            }
            this.checkMarioFallDown();
        }

        this.waitTillWalking();
    }

    /**
     * Build keypress events
     */
    addKeypressEvents() {
        /**
         * Manage key press
         */
        document.removeEventListener('keydown', () => {
        });
        document.addEventListener('keydown', e => {
            if (e.keyCode === 37 || e.key === 'ArrowLeft') {
                e.preventDefault();
                this.turnMarioDirection('Left');
                this.doWalkMario();
            } else if (e.keyCode === 39 || e.key === 'ArrowRight') {
                e.preventDefault();
                this.turnMarioDirection('Right');
                this.doWalkMario();
            } else if (e.keyCode === 32 || e.key === 'Space') {
                e.preventDefault();
                this.doJumpMario();
            } else if (e.keyCode === 40 || e.key === 'Down') {
                e.preventDefault();
                clearTimeout(MARIO_SEAT_TIMEOUT);
                this.updateMarioChar('seat');
                MARIO_SEAT_TIMEOUT = setTimeout(() => this.updateMarioChar('stand'), 300);
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
                                this.playSound('background');
                            } else {
                                li.querySelector('span').classList.remove('active');
                                Cookies.set('backgroundMusicControl', '0');
                                this.pauseSound('background');
                            }
                            break;
                        case 'soundEffectControl':
                            this.pauseSound('jump');
                            break;
                    }
                });
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <GameSounds />
                <div className={'marioTek_container blueGamePlay'}>
                    <TopWavesSvg />
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
                    </div>

                    <canvas id='PoisonousFlower'/>
                </div>

            </React.Fragment>
        );
    }
}

export default SuperMarioGame;
