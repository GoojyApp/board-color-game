import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
// Utils
import { colorsStr } from '../../constants/game_set'


const Square = (props) => {

    const {
        color,
        rowIndex,
        columnIndex,
        onClick,
    } = props

    useEffect(() => {
        console.log('Mount')
        return () => {
            console.log('Unmount')
        }
    }, [])

    function handleClick() {
        if (typeof onClick === 'function') {
            onClick(rowIndex, columnIndex, color)
        }
    }

    return (
        <Root
            color={color}
            onClick={handleClick}
        >
            {`row:${rowIndex}`}
            {`column:${columnIndex}`}
        </Root>
    )
}

Square.propTypes = {
    color: PropTypes.number.isRequired,
    rowIndex: PropTypes.number.isRequired,
    columnIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func
}


export default Square


const Root = styled.div`
  background: ${p => colorsStr[p.color]};
  transition: all 1s;
  `
//   transition: 0.6s all;
// transition: left 3s linear, background 3s ease-in;




//-----------------
// import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
// import styled from '@emotion/styled'
// // Utils
// import { colorsStr } from '../../constants/game_set'


// const Square = (props) => {

//     const {
//         square,
//         onClick,
//     } = props

//     useEffect(() => {
//         console.log('Mount')
//         return () => {
//             console.log('Unmount')
//         }
//     }, [])

//     function handleClick() {
//         if (typeof onClick === 'function') {
//             onClick(square)
//         }
//     }

//     return (
//         <Root
//             color={square.color}
//             onClick={handleClick}
//         >
//             {`row:${square.x}`}
//             {`column:${square.y}`}
//         </Root>
//     )
// }

// Square.propTypes = {
//     square: PropTypes.shape({
//         color: PropTypes.number.isRequired,
//     }).isRequired,
//     onClick: PropTypes.func
// }


// export default Square


// const Root = styled.div`
//   background: ${p => colorsStr[p.color]};
//   transition: all 1s;
//   `
// //   transition: 0.6s all;
// // transition: left 3s linear, background 3s ease-in;