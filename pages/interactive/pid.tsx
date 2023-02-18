import styles from "./pid.module.css";
import React, {useEffect, useRef, useState} from "react";
import {LineGraph} from "../../components/graph/lineGraph";
import {userAgentFromString} from "next/server";
import {Slider} from "../../components/misc/slider";
// import {KnobComp} from "../../components/pid/knob";
// import {Knob} from "../../components/pid/knob";

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// this will be the rolling sample number
let iterations: number = 0;
// the last position
let lastPos = 1;
let currentAccel = 0;
let intergralSum: number = 0;
// the bounds
let bounds = 30;
let sliderLog: number[] = [0];

export default function PID() {
  // the tager position
  const target = 180;
  // max exceleration of the knob
  const maxAccel: number = 2;
  // let kp = 0.75,
  //   kd = 3,
  //   ki = 0.0005;

  // is the user holding down the wheel?
  const [holding, setHolding] = useState(false);

  const handleMouseDown = () => {
    setHolding(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setHolding(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // this will see if the mouse is in bounds
  const handleMouseMove = (event: any) => {
    const element = event.target;
    const elementBounds = element.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (
      mouseX < elementBounds.left ||
      mouseX > elementBounds.right ||
      mouseY < elementBounds.top ||
      mouseY > elementBounds.bottom
    ) {
      setHolding(false);
    }
  };

  // distnce from knob
  const [mouseFromKnob, setMouseFromKnob] = useState({x: 0, y: 0});
  const [knobAngle, setKnobAngle] = useState(1);
  // control the knob
  useEffect(() => {
    if (holding) {
      // reset some values :)
      currentAccel = 0;
      intergralSum = 0;
      const handleMouseMove = (event: any) => {
        // this is the id of the circle
        const element: any = document.getElementById("knobber");
        // console.log(element);
        const rect = element.getBoundingClientRect();
        // get the middle
        const elementX = Math.floor(rect.left + rect.width / 2);
        const elementY = Math.floor(rect.top + rect.height / 2);
        // get the mouse
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        // get the distance
        const dx = mouseX - elementX;
        const dy = mouseY - elementY;
        // const newDistance = Math.sqrt(dx * dx + dy * dy);

        setMouseFromKnob({x: dx, y: dy});
        if (dx < 0) {
          setKnobAngle(Math.floor((Math.atan(dy / dx) * 180) / Math.PI) + 270);
        } else {
          setKnobAngle(Math.floor((Math.atan(dy / dx) * 180) / Math.PI) + 90);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [holding]);

  // set init states
  const [positionData, setPositionData] = useState({
    labels: [0],
    datasets: [
      {
        label: "Position",
        borderColor: "blue",
        data: [0],
      },
      {
        label: "Target",
        borderColor: "green",
        data: [0],
      },
    ],
  });

  // slider hook
  const [targetSlider, setTargetSlider] = useState({
    values: [90],
  });
  const [pSlider, setPSlider] = useState({
    values: [1],
  });
  const [dSlider, setDSlider] = useState({
    values: [0.1],
  });
  const [iSlider, setISlider] = useState({
    values: [0.001],
  });

  // returns the max output of the proportinal control
  function proportional(currentPos: number) {
    let error = targetSlider.values[0] - currentPos;
    // // if the error is greater than out max accel
    if (error > 0) {
      currentAccel += maxAccel;
    } else {
      currentAccel -= maxAccel;
    }
    return currentPos + currentAccel;
  }
  // the derivative
  function derivative(currentPos: number) {
    return currentPos / lastPos;
  }
  // gets values over time
  function intergral(currentPos: number) {
    intergralSum += targetSlider.values[0] - currentPos;
    return intergralSum;
  }
  // calculates pid
  useEffect(() => {
    // when the user isn't touching the knob
    if (!holding) {
      // frames
      // console.log(knobAngle);
      const interval = setInterval(() => {
        // get the proportinal
        let proportion = proportional(knobAngle);
        let derived = derivative(knobAngle);
        let integrated = intergral(knobAngle);
        // the magic
        let kp: number[] = pSlider.values;
        let kd: number[] = dSlider.values;
        let ki: number[] = iSlider.values;
        let newData = kp[0] * proportion - kd[0] * derived + ki[0] * integrated;

        let dataTmp = positionData.datasets[0].data;
        sliderLog.push(targetSlider.values[0]);

        // if its not filled then push
        if (dataTmp.length > 300) {
          dataTmp.shift();
        }
        if (sliderLog.length > 300) {
          sliderLog.shift();
        }
        // put on new data
        dataTmp.push(newData);
        setKnobAngle(newData);

        // save the last position
        lastPos = knobAngle;

        let labelsTmp = positionData.labels;
        if (labelsTmp.length > 300) {
          labelsTmp.shift();
        }
        iterations += 1;
        labelsTmp.push(iterations);

        setPositionData({
          labels: labelsTmp,
          datasets: [
            {
              data: dataTmp,
              label: "Position",
              borderColor: "blue",
            },
            {
              data: sliderLog,
              label: "Target",
              borderColor: "green",
            },
          ],
        });
      }, 5);
      return () => clearInterval(interval);
    }
  });

  // the goods
  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.headerImage}>
          <h1>Spin The Wheel!</h1>
          <p className={styles.undergraph}>
            Guaranteed to help your most indecisive tendencies.
          </p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.split}>
          <div className={styles.interactiveBox}>
            {/* <Knob /> */}
            {/* <div>{positionData.datasets[0].data}</div> */}
            <div
              id="knobber"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className={styles.knobUnderlay}
              style={{transform: `rotate(${knobAngle}deg)`}}
            >
              <div className={styles.knob}></div>
              <div className={styles.arrow}></div>
            </div>
            <div className={styles.sliders}>
              <h3>set target {targetSlider.values}</h3>
              <Slider
                sliderVal={targetSlider}
                setSliderVal={setTargetSlider}
                step={1}
                min={1}
                max={360}
              />
            </div>
            <div className={styles.sliders}>
              <h3>Set p: {pSlider.values}</h3>
              <Slider
                sliderVal={pSlider}
                setSliderVal={setPSlider}
                step={0.01}
                min={0.01}
                max={1}
              />
            </div>
            <div className={styles.sliders}>
              <h3>Set d: {dSlider.values}</h3>
              <Slider
                sliderVal={dSlider}
                setSliderVal={setDSlider}
                step={0.1}
                min={0.01}
                max={6}
              />
            </div>
            <div className={styles.sliders}>
              <h3>Set i: {iSlider.values}</h3>
              <Slider
                sliderVal={iSlider}
                setSliderVal={setISlider}
                step={0.001}
                min={0.001}
                max={1}
              />
            </div>
            {/* <div>x: {mouseFromKnob.x}</div>
            <div>y: {mouseFromKnob.y}</div>
            <div>angle: {knobAngle}</div>
            <div>holding: {holding}</div> */}
          </div>
          <div className={styles.graphBox}>
            <div className={styles.graph}>
              <LineGraph data={positionData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
