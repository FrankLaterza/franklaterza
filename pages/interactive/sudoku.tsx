import styles from './sudoku.module.css'
import { randSVG } from '../../lib/random_background';
import React, { useLayoutEffect, useState } from 'react';
import { Bolts } from '../../components/misc/bolts'; 
import { stdin, stdout } from 'node:process';
import { solveSudoku, count } from '../../lib/sudoku'
const setOnceSVG = randSVG()

// let puz = [...Array(9)].map(e => Array(9));


// width and height child of boxes
const width = 2
const height = 2

let boardInit = 
  [ [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
    [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
    [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
    [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
    [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
    [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
    [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ];

export default function Sudoku() {


  const [board, setBoard] = useState(
    boardInit

  )
  function handleChange(e: any, row: number, col: number){

    const {value}  = e.target;
    let newBoard : number[][] = [...board];
    newBoard[row][col] = (value === '') ? 0 : parseInt(value);

    console.log(newBoard)
    setBoard(newBoard);
    
  }

  const handleClick = (e: any, setBoard: any) => {
    count(setBoard);
  };

  return (
    <div className={styles.container} style={{backgroundImage: `url("${setOnceSVG}")` }} >
      <div className={styles.main}>
        {/* header */}
        <div className={styles.header}>
          <Bolts/>
          <h1>
            Sudoku Solver
          </h1>
          <p className={styles.undergraph}>
            generate a rondom puzzle to be solved or enter your own puzzle
          </p>
        </div>
        {/* game */}
        <div className={styles.box}>
            {/* <Bolts/> */}
            <div className={styles.game}>
            {/* display board */}
            {/* <Lines/>  */}
            {boardInit.map((row, rowIndex) =>
                <div key={rowIndex} className={styles.row} 
                style={((rowIndex % 3 === 0) && rowIndex != 0) ? 
                  {borderTopWidth: '2px'} : 
                  {borderTopWidth: '0px'}}
                >
                  {row.map((num, numIndex) =>
                      <input className={styles.val} key={numIndex}
                      style={((numIndex % 3 === 0) && numIndex != 0) ? 
                        {borderLeftWidth: '2px'} : 
                        {borderLeftWidth: '0px'}}
                      maxLength={1}
                      name='val' type='text'
                      value={(num === 0) ? '' : board[rowIndex][numIndex]}
                      // value={ board[rowIndex][numIndex] }
                      onChange={(e) => handleChange(e, rowIndex, numIndex)}
                      />
                      )
                  }
                </div>)
            }

            <div className={styles.parentGrid}>
            </div>
          </div>

          <div className={styles.buttons}>
            <button onClick={(e) => handleClick(e, setBoard)}>Solve</button>
            <button>Generate</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}


/* A Backtracking program in
Javascript to solve Sudoku problem */
 
function isSafe(board: number[][], row: number, col: number, num: number){
     
  // Row has the unique (row-clash)
  for(let d = 0; d < board.length; d++)
  {
       
      // Check if the number we are trying to
      // place is already present in
      // that row, return false;
      if (board[row][d] == num)
      {
          return false;
      }
  }

  // Column has the unique numbers (column-clash)
  for(let r = 0; r < board.length; r++)
  {
        
      // Check if the number
      // we are trying to
      // place is already present in
      // that column, return false;
      if (board[r][col] == num)
      {
          return false;
      }
  }

  // Corresponding square has
  // unique number (box-clash)
  let sqrt = Math.floor(Math.sqrt(board.length));
  let boxRowStart = row - row % sqrt;
  let boxColStart = col - col % sqrt;

  for(let r = boxRowStart;
          r < boxRowStart + sqrt; r++)
  {
      for(let d = boxColStart;
              d < boxColStart + sqrt; d++)
      {
          if (board[r][d] == num)
          {
              return false;
          }
      }
  }

  // If there is no clash, it's safe
  return true;
}
