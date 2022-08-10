import styles from './sudoku.module.css'
import { randSVG } from '../../lib/random_background';
import React, { useLayoutEffect, useState } from 'react';
import { Bolts } from '../../components/misc/bolts'; 
import { stdin, stdout } from 'node:process';

const setOnceSVG = randSVG()

// let puz = [...Array(9)].map(e => Array(9));


// width and height child of boxes
const width = 2
const height = 2

let boardInit = [
    [0, 0, 0, 0, 0, 0, 7, 2, 0],
    [9, 0, 0, 0, 4, 0, 0, 0, 1],
    [8, 0, 0, 7, 0, 0, 0, 4, 0],
    [0, 5, 0, 0, 3, 0, 0, 0, 8],
    [0, 6, 0, 1, 0, 0, 5, 0, 2],
    [0, 2, 0, 0, 7, 0, 0, 0, 0],
    [3, 0, 0, 0, 1, 0, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 0, 0, 6, 0, 0, 4],
];

function printArray(arr: any){
    for (let i = 0; i < arr.length; i++)
        console.log(arr[i]);
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

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


  const [width, height] = useWindowSize();

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
        {width}
        <div className={styles.box}>
            {/* <Bolts/> */}
            <div className={styles.game}>
            {/* display board */}
            {/* <Lines/>  */}
            {boardInit.map((row, rowIndex) =>
                <div className={styles.row} key={rowIndex}> 
                    {row.map((num, numIndex) =>
                        <input className={styles.val} key={numIndex}
                        maxLength={1}
                        name='val' type='text'
                        value={(num === 0) ? '' : num}
                        onChange={(e) => handleChange(e, rowIndex, numIndex)}
                        />)
                      }
                      {/* <div className={styles.line}>
                      </div> */}

                </div>)
            }
            
            <div className={styles.parentGrid}>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}