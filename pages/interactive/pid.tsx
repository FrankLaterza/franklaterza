import styles from "./pid.module.css";
import React, {useEffect, useRef, useState} from "react";
import {LineGraph} from "../../components/graph/lineGraph";
import {userAgentFromString} from "next/server";
import {Slider} from "../../components/misc/slider";
import Image from "next/image";
import cat from "/public/images/misc/cat.png";
import yarn from "/public/images/misc/yarn.png";
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

const catImageSize = 100;
const yarnImageSize = 50;

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

  // follow position hook
  const [followPos, setFollowPos] = useState(1);

  // set init states
  const [positionData, setPositionData] = useState({
    labels: [0],
    datasets: [
      {
        label: "Position",
        borderColor: "blue",
        data: [500],
      },
      {
        label: "Target",
        borderColor: "green",
        data: [500],
      },
    ],
  });

  // slider hook
  const [targetSlider, setTargetSlider] = useState({
    values: [500],
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
    // frames
    // console.log(knobAngle);
    const interval = setInterval(() => {
      // get the proportinal

      let proportion = proportional(followPos);
      let derived = derivative(followPos);
      let integrated = intergral(followPos);
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
      setFollowPos(newData);

      // save the last position
      lastPos = followPos;

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
  });

  // the goods
  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.headerImage}>
          <h1>PID controller</h1>
          <p className={styles.undergraph}>
            Tweak the values and move the yarn!
          </p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.demoBox}>
          <div className={styles.line}>
            <Slider
              sliderVal={targetSlider}
              setSliderVal={setTargetSlider}
              step={1}
              min={1}
              max={1000}
            />
          </div>

          <div
            style={{
              left: `calc(${targetSlider.values[0] / 10}% - ${
                yarnImageSize / 2
              }px`,
            }}
            className={styles.follow}
          >
            <Image
              src={yarn}
              id="case"
              width={yarnImageSize}
              height={yarnImageSize}
            />
          </div>
          <div
            style={{
              left: `calc(${followPos / 10}% - ${catImageSize / 2}px`,
            }}
            className={styles.chase}
          >
            <Image
              src={cat}
              id="case"
              width={catImageSize}
              height={catImageSize}
            />
          </div>
        </div>
        <div className={styles.split}>
          <div className={styles.interactiveBox}>
            {/* <Knob /> */}
            {/* <div>{positionData.datasets[0].data}</div> */}
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
        {/* <h1>How the System works</h1>
        <h6>

          

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </h6> */}
      </div>
    </div>
  );
}
