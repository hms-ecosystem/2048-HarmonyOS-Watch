/*
 * Copyright 2021. Futurewei Technologies Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import prompt from '@system.prompt';
import storage from '@system.storage';
import vibrator from '@system.vibrator';

const gridBgColors = {
    "0": "#422e03",
    "2": "#3538f2",
    "4": "#07ab4b",
    "8": "#ab07a8",
    "16": "#F65E3B",
    "32": "#8a8506",
    "64": "#e80909",
    "128": "#0b7d22",
    "256": "#910c0c",
    "512": "#560896",
    "1024": "#7ca308",
    "2048": "#0099CC"
};
const gridTxColors = {
    "2": "#FFFFFF",
    "4": "#FFFFFF",
    "others": "#FFFFFF"
};
var grids;
var canvas;
const gridWidth = 70;
const gridMargin = 5;
const fontSize = 24;

export default {
    data: {
        currentScore: 0,
        bestScore: 0,
        isEnd: false
    },
    onInit() {
        storage.get({
            key: "bestScore",
            default: 0,
            success: res => {
                this.bestScore = res.data
            }
        })
        this.initGrids();
        this.addVal();
        this.addVal();
    },
    onShow() {
        canvas = this.$element("canvas").getContext("2d");
        this.drawGrids();
    },
    initGrids() {
        grids = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    },
    drawGrids() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                let gridVal = grids[r][c].toString();
                canvas.fillStyle = gridBgColors[gridVal];
                let leftTopX = c * (gridWidth + gridMargin) + gridMargin;
                let leftTopY = r * (gridWidth + gridMargin) + gridMargin;
                canvas.fillRect(leftTopX, leftTopY, gridWidth, gridWidth);
                canvas.font = "24px";
                if (gridVal != "0") {
                    if (gridVal == "2" || gridVal == "4") {
                        canvas.fillStyle = gridTxColors[gridVal];
                    } else {
                        canvas.fillStyle = gridTxColors["others"];
                    }
                    let offsetX = (4 - gridVal.length) * (gridWidth / 8);
                    let offsetY = (gridWidth - fontSize) / 2;
                    canvas.fillText(gridVal, leftTopX + offsetX, leftTopY + offsetY + fontSize - 5);
                }
            }
        }
    },
    swipeGrids(event) {
        let newGrids = this.changeGrids(event.direction);
        if (newGrids.toString() != grids.toString()) {
            grids = newGrids;
            this.addVal();
            this.drawGrids();
            if (this.isFull() && this.isNotMoveAble()) {
                this.isEnd = true;
            }
        }
    },
    changeGrids(direction) {
        let newGrids = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
        if (direction == 'left' || direction == 'right') {
            let step = 1;
            if (direction == 'right') {
                step = -1;
            }

            for (let row = 0; row < 4; row++) {
                let array = [];

                let column = 0;
                if (direction == 'right') {
                    column = 3;
                }

                for (let i = 0; i < 4; i++) {
                    if (grids[row][column] != 0) {
                        array.push(grids[row][column]);
                    }
                    column += step;
                }

                for (let i = 0; i < array.length - 1; i++) {
                    if (array[i] == array[i + 1]) {
                        array[i] += array[i + 1];
                        this.addScore(array[i]);
                        array[i + 1] = 0;
                        i++;
                    }
                }

                column = 0;
                if (direction == 'right') {
                    column = 3;
                }

                for (let i of array) {
                    if (i != 0) {
                        newGrids[row][column] = i;
                        column += step;
                    }
                }
            }
        } else if (direction == 'up' || direction == 'down') {
            let step = 1;
            if (direction == 'down') {
                step = -1;
            }

            for (let column = 0; column < 4; column++) {
                let array = [];

                let row = 0;
                if (direction == 'down') {
                    row = 3;
                }

                for (let i = 0; i < 4; i++) {
                    if (grids[row][column] != 0) {
                        array.push(grids[row][column]);
                    }
                    row += step;
                }

                for (let i = 0; i < array.length - 1; i++) {
                    if (array[i] == array[i + 1]) {
                        array[i] += array[i + 1];
                        this.addScore(array[i]);
                        array[i + 1] = 0;
                        i++;
                    }
                }

                row = 0;
                if (direction == 'down') {
                    row = 3;
                }

                for (let i of array) {
                    if (i != 0) {
                        newGrids[row][column] = i;
                        row += step;
                    }
                }
            }
        }

        return newGrids;
    },
    addVal() {
        let arr = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (grids[r][c] == "0") {
                    arr.push([r, c]);
                }
            }
        }

        let ranIdx = Math.floor(Math.random() * arr.length);
        let row = arr[ranIdx][0];
        let column = arr[ranIdx][1];
        if (Math.random() < 0.8) {
            grids[row][column] = 2;
        } else {
            grids[row][column] = 4;
        }
    },
    addScore(gridVal) {
        this.currentScore += gridVal;
        vibrator.vibrate({
            mode: 'short',
            success: function(ret) {
                console.log('vibrate is successful');
            },
            fail: function(ret) {
                console.log('vibrate is failed');
            },
            complete: function(ret) {
                console.log('vibrate is completed');
            }
        });
    },

    restart() {
        if (this.currentScore > this.bestScore) {
            storage.set({
                key: "bestScore",
                value: this.currentScore
            });
            this.bestScore = this.currentScore;
        }
        this.currentScore = 0;
        this.isEnd = false;
        this.initGrids();
        this.addVal();
        this.addVal();
        this.drawGrids();
    },
    isFull() {
        return grids.toString().split(",").indexOf("0") == -1;
    },
    isNotMoveAble() {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (c < 3) {
                    if (grids[r][c] == grids[r][c + 1]) {
                        return false;
                    }
                }
                if (r < 3) {
                    if (grids[r][c] == grids[r + 1][c]) {
                        return false;
                    }
                }
            }
        }
        return true;
    },
    checkRestart() {
        prompt.showDialog({
            title: "",
            message: "NEW GAME?",
            buttons: [],
            success: res => {
                if (res.index == 1) {
                    this.restart();
                }
            }
        })
    }
}
