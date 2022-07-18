import Link from 'next/link';
import { NavBar } from '../../components/navbar';
import styles from './interactive.module.css'
import { randSVG } from '../../lib/random_background';
import React, { Component, useState } from "react";



// const [winner, setWinner] = useState([''])

// function handleWinner(w: string) {
//   setWinner([w]);
// }



const colorList = ['red', 'blue', 'green', 'gold']

function Wheel ({list, setWinner}: any) {
  
  // gets half the agngle
  const angle = 360/list.length;
  const angleHalf = angle/2;
  // solve right triangle
  // height is 50 because half of 100
  const side = Math.tan((angleHalf) * Math.PI / 180) * 50;
  
  const handleClick = (event: any) => {
    const max = 10 * 360  , min = 5 * 360;
    const randRotation = Math.floor(Math.random() * (max - min + 1)) + min;
    event.currentTarget.style.transform = `rotate(-${randRotation}deg)`;
    setWinner(Math.floor((randRotation+angleHalf)/angle) % list.length)
    console.log(colorList[Math.floor((((randRotation+angleHalf)/angle) % list.length) % colorList.length)])
  };

  return (
    <div onClick={handleClick} className={styles.wheel} style={{backgroundColor: `${colorList[0]}`}}>
      {list.map((element: any, index: number) => (
        <div
        key={element}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          color: 'white',
          textAlign: 'left',
          background: `${colorList[index % colorList.length] }`,
          shapeOutside: `polygon(${50-side}% 0%, 50% 50%, ${50+side}% 0%)`,
          clipPath: `polygon(${50-side}% 0%, 50% 50%, ${50+side}% 0%)`,
          transform: `rotate(${angle*index}deg)`,
        }}
        >
          <div className={styles.wheelText}>
            {element.choice}
          </div>
        </div>
      ))}
    </div>
  );

}


const setOnceSVG = randSVG()

export default function Interactive() {
  
  const maxBtn = 10;
  
  const [choiceList, setChoiceList] = useState([
    {choice: 'choice 1' }
    
  ])
  
  function addChoice () {
    setChoiceList([...choiceList, {choice: ''}]);
  }
  
  function removeChoice (index: number) {
    const list = [...choiceList];
    list.splice(index, 1);
    setChoiceList(list)
  }
  
  function handleChange(e: any, index: number){
    const {name, value}:any  = e.target;
    const list:any = [...choiceList];
    list[index][name] = value;
    setChoiceList(list);
    
  }


  const [winner, setWinner] = useState(0)

  function handleWinner(w: number) {
    setTimeout(() => {
      setWinner(w);
    }, 5000);
  }




  return (
    <div className={styles.container} style={{backgroundImage: `url("${setOnceSVG}")` }} >
      <div className={styles.main}>
        <div className={styles.box}>
          {/* choice box */}
          <div className={styles.choiceBox}>
            {/* list all the choices */}
            {choiceList.map((element, index) => (
              <div key={index} className={styles.choice}>
                <div className={styles.firstDivision}>
                  { /* input box */}
                  <input name='choice' type='text' id='choice'
                  value={element.choice}
                  onChange={(e) => handleChange(e, index)}
                  />
                  {/* if the last button */}
                  {(choiceList.length - 1 === index && index < 10 && choiceList.length > 0) ? 
                    <button onClick={addChoice}>add</button> : null} 
                </div>
                <div className={styles.secondDivision}>
                  {(choiceList.length > 1) ? 
                  <button onClick={() => removeChoice(index)}>remove</button> : null}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.wheelContainer}>
          <div className={styles.pointer}></div>
          <Wheel list={choiceList} setWinner={handleWinner}></Wheel>
          </div>
          <div>{choiceList[winner].choice}</div>
        </div>
      </div>
    </div>
  );
}