/* A Backtracking program in
Javascript to solve Sudoku problem */

import { NOTFOUND } from "dns";
import Router from 'next/router'

 
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
        console.log(board);
        // setBoard(board);
        return true;
    }
    

    // Else for each-row backtrack

    // let num = 1;

    // for(num; num <= 9; num++){
    // // const i = setTimeout(function(){
    //     // get the safe number
    //     if (isSafe(board, row, col, num)){
    //         // sleep(10);
    //         board = [...board];
    //         board[row][col] = num;
    //         console.log(board);
    //         setBoard(board);
    //         // const root = document.getElementById(`${row},${col}`);
    //         // const element = document.createElement('')           
    //         // root?.appendChild(element);
            
    //         if (solveSudoku(board, setBoard)){
    //             // print(board, n);
    //             return true;
    //         } else {
                
    //             // Replace it
    //             board[row][col] = 0;
    //         }
            
    //     }
    // }
    // , 1000)

    

    let num = 1;
    const root = document.getElementById(`${row},${col}`);

    // function updateNum() {
        
    for(num; num <= 9; num++){
    // const i = setTimeout(function(){
        // get the safe number
        if (isSafe(board, row, col, num)){
            //  
            board[row][col] = num;
            root?.setAttribute('value', String(num));
            Router.reload()
            // console.log(board);            
            if (solveSudoku(board, setBoard)){
                // print(board, n);
                return true;
            } else {
                // Replace it
                // roxot?.setAttribute('value', String(0));
                board[row][col] = 0;
            }
        }


        // // update the number
        // if(num != 9){
        //     num++;
        //     window.requestAnimationFrame(updateNum)
            
        // }
        
        
    }



    // updateNum();


    





    // setBoard(board);
    return false;
}

// export function updateDOM(){
    
//     // console.log('start');

//     const tempArr = [ 1, 2, 3, 4, 5];

//     tempArr.map(function(e){
//         const newNum = document.getElementById(`1,${e}`)
//         sleep(200);
//         newNum?.setAttribute('value', '5');
//         console.log(newNum);
//     })
// }

export function updateDOM(num: number){
    

    // console.log(num);
    
    let counter=0;
    num++;
    const i = setTimeout(function(){
        
        
        console.log(counter);
        counter++;
        
        const newNum = document.getElementById(`1,1`);
        
        newNum?.setAttribute('value', String(counter));
        console.log(newNum);
        
        
        if(counter === 5) {
            clearTimeout(i);
        }
        if(updateDOM(num)){
            return true;
        }
        
    }, 1000);
    
    if(num===3){return true}
    
    return false;
}







