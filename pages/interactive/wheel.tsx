import styles from './interactive.module.css'
import { randSVG } from '../../lib/random_background';
import React, { useRef, useState } from "react";
import { Bolts } from '../../components/misc/bolts'; 


// const [winner, setWinner] = useState([''])

// function handleWinner(w: string) {
//   setWinner([w]);
// }


// disgusting lazy global variable
// fix 
const colorList = ['red', 'blue', 'green', 'gold']

function Wheel ({list, setWinner, lastRotation}: any) {
  
  // gets half the agngle
  const angle = 360/list.length;
  const angleHalf = angle/2;
  // solve right triangle
  // height is 50 because half of 100
  const side = Math.tan((angleHalf) * Math.PI / 180) * 50;
  

  const handleClick = (event: any) => {
    const max = 10 * 360  , min = 5 * 360;
    const randRotation = Math.floor(Math.random() * (max - min + 1)) + min;
    const offset = lastRotation.current % 360;
    lastRotation.current = lastRotation.current + randRotation;
    console.log(lastRotation.current, randRotation);
    event.currentTarget.style.transform = `rotate(-${lastRotation.current}deg)`;
    const winnerIndex = Math.floor((randRotation+angleHalf+offset)/angle) % list.length
    setWinner(winnerIndex);
  };

  return (
    <div onClick={handleClick} className={styles.wheel} style={{}}>
      {list.map((element: any, index: number) => (
        <div
        key={element}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          color: 'white',
          textAlign: 'left',
          zIndex: '2',
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

  let lastRotation = useRef(0);

  const [choiceList, setChoiceList] = useState([
    {choice: ''},
    {choice: ''},
    {choice: ''}
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

  const [winnerColor, setWinnerColor] = useState('white')

  const [winner, setWinner] = useState('')

  function handleWinner(winnerIndex: number) {
    setTimeout(() => {
      setWinnerColor(colorList[winnerIndex % 4]);
      setWinner(choiceList[winnerIndex].choice);
    }, 5000);
  }

  return (
    <div className={styles.container} style={{backgroundImage: `url("${setOnceSVG}")` }} >
      <div className={styles.main}>

        {/* header */}
        <div className={styles.header}>
          <Bolts/>
          <h1>
            Spin The Wheel
          </h1>
          <p className={styles.undergraph}>
            enter your choices and spin the wheel!
            
          </p>
        </div>
        <div className={styles.box}>
          <Bolts/>
          <div className={styles.game}>
            {/* choice box */}
            <div className={styles.choiceBox}>
              {/* list all the choices */}
              <h3> Choices: </h3>
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
                    {(choiceList.length > 3) ? 
                    <button onClick={() => removeChoice(index)}>remove</button> : null}
                  </div>
                </div>
              ))}
            </div>
            {/* wheel */}
            <div className={styles.wheelContainer}>
              <div className={styles.pointer}></div>
              <Wheel list={choiceList} setWinner={handleWinner} lastRotation={lastRotation}></Wheel>
            </div>
          </div>
          <div className={styles.winner}>
            {/* <b>Color: </b> <span style={{color: `${colorList[winner % colorList.length]}`}}>{colorList[winner % colorList.length]}</span> <br/> */}
            <h2><b>Winner: <br/></b> <span style={{color: `${winnerColor}`}}>{winner}</span></h2>
          </div>
        </div>
      </div>
    </div>
  );
}