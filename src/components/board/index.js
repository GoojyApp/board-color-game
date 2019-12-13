import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { fromJS } from 'immutable'
// Utils
import {
    directions,
    colors
} from '../../constants/game_set'
import { getInitBoard, getBlackSquarePosition, toJS } from '../../utils/funcTools'
import Square from '../square'
import './style.scss'
// Components


const Board = (props) => {

    const [board, setBoard] = useState(getInitBoard())
    // console.log(board)
    // Recalculate every time the board get update!
    const blackSquarePosition = getBlackSquarePosition(board)

    const gridRef = useRef({})

    function onClickSquare(rowIndex, columnIndex, color) {
        const square = { rowIndex, columnIndex, color }
        const isCanMoved = isCanMove(square)
        if (!isCanMoved) return

        makeMove(square)
    }

    function makeMove(square) {
        const direction = getDirectionToSlice(square)
        const updatedSquares = getNewPositionSquares(square)
        updateBoard(square, direction, updatedSquares)
    }

    function isCanMove(square) {
        const { rowIndex, columnIndex } = square
        // Incase the square is the black square
        if (blackSquarePosition.rowIndex === rowIndex &&
            blackSquarePosition.columnIndex === columnIndex) return

        return blackSquarePosition.rowIndex === square.rowIndex ||
            blackSquarePosition.columnIndex === square.columnIndex
    }

    function getRelevantSquares(square) {
        const direction = getDirectionToSlice(square)
        return sliceRelevantSquares(square, direction)
    }

    function getDirectionToSlice(square) {
        if (square.rowIndex === blackSquarePosition.rowIndex) {
            if (square.columnIndex < blackSquarePosition.columnIndex) {
                return directions.RIGHT
            }
            return directions.LEFT
        } else if (square.columnIndex === blackSquarePosition.columnIndex) {
            if (square.rowIndex < blackSquarePosition.rowIndex) {
                return directions.DOWN
            }
            return directions.UP
        }
    }

    function getNewPositionSquares(square) {
        const relevantSquares = getRelevantSquares(square)
        relevantSquares.unshift(relevantSquares.pop())
        return relevantSquares
    }

    function sliceRelevantSquares(square, direction) {
        const relevantSquares = []

        switch (direction) {
            case directions.UP:
                for (let index = square.rowIndex; index >= blackSquarePosition.rowIndex; index--) {
                    relevantSquares.push(board[index][square.columnIndex])
                }
                break;
            case directions.DOWN:
                for (let index = square.rowIndex; index <= blackSquarePosition.rowIndex; index++) {
                    relevantSquares.push(board[index][square.columnIndex])
                }
                break;
            case directions.RIGHT:
                for (let index = square.columnIndex; index <= blackSquarePosition.columnIndex; index++) {
                    relevantSquares.push(board[square.rowIndex][index])
                }
                break;
            case directions.LEFT:
                for (let index = square.columnIndex; index >= blackSquarePosition.columnIndex; index--) {
                    relevantSquares.push(board[square.rowIndex][index])
                }
                break;
        }

        return relevantSquares
    }

    function updateBoard(square, direction, updatedSquares) {
        const copyBoard = toJS(fromJS(board))

        switch (direction) {
            case directions.UP:
                updatedSquares.forEach((color, i) => {
                    copyBoard[square.rowIndex - i][square.columnIndex] = color
                })
                break;
            case directions.DOWN:
                updatedSquares.forEach((color, i) => {
                    copyBoard[square.rowIndex + i][square.columnIndex] = color
                })
                break;
            case directions.RIGHT:
                updatedSquares.forEach((color, i) => {
                    copyBoard[square.rowIndex][square.columnIndex + i] = color
                })
                break;
            case directions.LEFT:
                updatedSquares.forEach((color, i) => {
                    copyBoard[square.rowIndex][square.columnIndex - i] = color
                })
                break;
        }
        setBoard(copyBoard)
        return copyBoard
    }

    // Renders
    function renderSquares(board) {
        console.log(gridRef.current)
        console.log('offsetWidth', gridRef.current.offsetWidth)
        console.log('offsetHeight', gridRef.current.offsetHeight)
        const squares = board.map((columns, rowIndex) => {
            return columns.map((color, columnIndex) => (
                <Square
                    key={`row:${rowIndex}column:${columnIndex}`}
                    color={color}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    onClick={onClickSquare}
                />
            ))
        })
        return squares
    }

    return (
        <Root>
            <Grid
                ref={gridRef}
            >
                {renderSquares(board)}
            </Grid>
        </Root>
    )
}

Board.propTypes = {

}


export default Board


const Root = styled.div`
    width: 100%;
    height: 500px;
`

const Grid = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    background: #141414;
`
