import React, { useEffect } from 'react';

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

function sleep(milliseconds: number) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
  
 export function solveSudoku(board: number[][], setBoard: any){


    // board = [...board];
    let row = -1;
    let col = -1;
    let isEmpty = true;
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if (board[i][j] == 0)
            {
                row = i;
                col = j;
                
                // We still have some remaining
                // missing values in Sudoku
                isEmpty = false;
                break;
            }
        }
        if (!isEmpty)
        {
            break;
        }
    }
    
    // No empty space left
    if (isEmpty)
    {
        // console.log(board)
        // setBoard(board);

        return true;
    }
    

    // Else for each-row backtrack
    for(let num = 1; num <= 9; num++)
    {

        if (isSafe(board, row, col, num))
        {

            
            board = [...board];
            board[row][col] = num;
            setBoard(board);
            console.log(board)
            sleep(100);
            
            if (solveSudoku(board, setBoard))
            {
                
                // print(board, n);
                return true;
            }
            else
            {
                
                // Replace it
                board[row][col] = 0;
            }
        }
        
    }

    // setBoard(board);
    return false;
}

export function count(setBoard: any){

    let updateState: number[][] = [[]]
        const boardInit =
        [ [ 1, 0, 6, 5, 0, 8, 4, 0, 0 ],
        [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
        [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
        [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
        [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
        [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
        [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] ]

    for(let i = 0; i < 5; i++){
        setBoard({...boardInit})
        sleep(300)
    }
}