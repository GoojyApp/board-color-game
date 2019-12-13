import { fromJS } from 'immutable'
import { colors } from '../constants/game_set'
import { createUid } from '../utils/uuid'

export function getEmptyBoard() {
    return [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
}

// colors: 4 white, 4 green, 4 blue, 4 red, 4 orange, 4 yellow, 1 black.
export const getColorsList = () => [
    colors.WHITE,
    colors.WHITE,
    colors.WHITE,
    colors.WHITE,
    colors.GREEN,
    colors.GREEN,
    colors.GREEN,
    colors.GREEN,
    colors.BLUE,
    colors.BLUE,
    colors.BLUE,
    colors.BLUE,
    colors.RED,
    colors.RED,
    colors.RED,
    colors.RED,
    colors.PINK,
    colors.PINK,
    colors.PINK,
    colors.PINK,
    colors.YELLOW,
    colors.YELLOW,
    colors.YELLOW,
    colors.YELLOW,
    colors.BLACK,
]

export const shuffleList = (arr) => arr.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1])

export const getInitBoard = () => {

    const colors = toJS(fromJS(shuffleList(getColorsList())))
    const board = toJS(fromJS(getEmptyBoard()))

    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board.length; column++) {
            board[row][column] = colors.pop() // random color
        }
    }
    return board
}


export function getBlackSquarePosition(board) {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
            const color = board[rowIndex][columnIndex]
            if (color === colors.BLACK) {
                return { rowIndex, columnIndex }
            }
        }
    }
}


// -------
// export const getInitBoard = () => {

//     const colors = toJS(fromJS(shuffleList(getColorsList())))
//     const board = toJS(fromJS(getEmptyBoard()))

//     for (let row = 0; row < board.length; row++) {
//         for (let column = 0; column < board.length; column++) {
//             board[row][column] = { x: row, y: column, color: colors.pop(), id: createUid() }
//         }
//     }
//     return board
// }


// export function getBlackSquarePosition(board) {
//     for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
//         for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
//             const square = board[rowIndex][columnIndex]
//             if (square.color === colors.BLACK) {
//                 return square
//             }
//         }
//     }
// }


export function toJS(immutable) {
    return immutable.toJS()
}