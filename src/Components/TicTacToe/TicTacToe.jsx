import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  let [data, setData] = useState(Array(9).fill(""));
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;
    
    const newData = [...data];
    newData[num] = count % 2 === 0 ? "x" : "o";
    
    e.target.innerHTML = `<img src='${count % 2 === 0 ? cross_icon : circle_icon}' alt='${count % 2 === 0 ? 'X' : 'O'}'/>`;
    
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  };

  const checkWin = (board) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        won(board[a]);
        return;
      }
    }

    // Draw condition
    if (count === 8) {
      titleRef.current.innerHTML = "Game Draw! <span>Reset to play again</span>";
      setLock(true);
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = winner === "x" 
      ? `Congratulations: <img src=${cross_icon} alt='X'/> wins!` 
      : `Congratulations: <img src=${circle_icon} alt='O'/> wins!`;
  };

  const reset = () => {
    setData(Array(9).fill(""));
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "Tic Tac Toe Game In <span>React</span>";
    document.querySelectorAll('.boxes').forEach(box => {
      box.innerHTML = "";
    });
  };


  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      <div className="board">
      <div className="row1">
            <div className="boxes" onClick={(e)=>{toggle(e,0)}}></div>
            <div className="boxes"onClick={(e)=>{toggle(e,1)}}></div>
            <div className="boxes"onClick={(e)=>{toggle(e,2)}}></div>
        </div>
        
        <div className="row2">
            <div className="boxes"onClick={(e)=>{toggle(e,3)}}></div>
            <div className="boxes"onClick={(e)=>{toggle(e,4)}}></div>
            <div className="boxes"onClick={(e)=>{toggle(e,5)}}></div>
        </div>
        
        <div className="row3">
            <div className="boxes"onClick={(e)=>{toggle(e,6)}}></div>
            <div className="boxes"onClick={(e)=>{toggle(e,7)}}></div>
            <div className="boxes"onClick={(e)=>{toggle(e,8)}}></div>
        </div>
      </div>
      <button className='reset' onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;