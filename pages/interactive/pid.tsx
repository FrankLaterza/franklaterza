import styles from "./pid.module.css";
import React, {useEffect, useRef, useState, useLayoutEffect} from "react";
import {LineGraph} from "../../components/graph/lineGraph";
import {userAgentFromString} from "next/server";
import {Slider} from "../../components/misc/slider";
import Image from "next/image";
import cat from "/public/images/misc/cat.png";
import yarn from "/public/images/misc/yarn.png";
import pid from "/public/images/misc/pid.svg";
import {
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
} from "react-icons/tb";

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

// const blurbButtonSize = 10;
const blurbNums = 3;

export default function PID() {
    // the tager position
    const target = 180;
    // max exceleration of the knob
    const maxAccel: number = 2;
    // let kp = 0.75,
    //   kd = 3,
    //   ki = 0.0005;

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
        values: [0.99],
    });
    const [iSlider, setISlider] = useState({
        values: [0.001],
    });
    const [dSlider, setDSlider] = useState({
        values: [0.1],
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
    // gets values over time (integral)
    function intergral(currentPos: number) {
        intergralSum += targetSlider.values[0] - currentPos;
        return intergralSum;
    }
    // the derivative
    function derivative(currentPos: number) {
        return currentPos / lastPos;
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
            let newData =
                kp[0] * proportion - kd[0] * derived + ki[0] * integrated;

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

    // selector for blurb
    const [selector, setSelector] = useState<number>(16.66);
    const [blurb, setBlurb] = useState<number>(1);

    function reset(p: number, i: number, d: number) {
        setPSlider({values: [p]});
        setISlider({values: [i]});
        setDSlider({values: [d]});
        // the last position
        currentAccel = 0;
        intergralSum = 0;
    }

    function handleSelector(button: number) {
        setBlurb(button);
        if (button === 1) {
            setSelector(16.66);
            reset(0.99, 0.001, 3);
        }
        if (button === 2) {
            setSelector(50);
            reset(0.1, 0.01, 4);
        }
        if (button === 3) {
            setSelector(100 - 16.66);
            reset(0.2, 0.04, 4);
        }
    }

    function blurbCycle() {
        switch (blurb) {
            case 1:
                return (
                    <>
                        <h2 className={styles.blurbTitle}>Underdamped</h2>
                        <p className={styles.blurbBody}>
                            Underdamped control can result in overshooting of
                            the target, which leads to an oscillating motion.
                            Notice that the proportional gain (P) value is set
                            very high in this example. This high proportional
                            control amplifies the error signal and results in an
                            oscillating motion because it&apos;s providing more
                            direct feedback into the system. Move the integral
                            (I) slider around to see how it oscillates even
                            faster, as the I term is responsible for
                            accumulating error over time.
                        </p>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className={styles.blurbTitle}>Overdamped</h2>
                        <p>
                            Overdamped control is designed to prioritize
                            stability over speed, resulting in a slower approach
                            to its target. As a result, it will undershoot its
                            target and the response curve will rise smoothly to
                            the setpoint without oscillating. In this particular
                            example, the P value is set to a low value while the
                            D value contributes to the slow approach. An
                            overdamped system is a great choice for applications
                            where stability is crucial, as it ensures a smooth
                            and steady response without any unpredictable
                            oscillations.
                        </p>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className={styles.blurbTitle}>Critally Damped</h2>
                        <p>
                            Critically damped control is the perfect balance
                            between underdamped and overdamped control. All
                            values are carefully tuned to ensure that the system
                            reaches its destination in a controlled and timely
                            manner. Observe how the system speeds up when the
                            target is far away and slows down when it
                            approaches, demonstrating the precise nature of the
                            PID control system.
                        </p>
                    </>
                );
            default:
                return null; // Return a default value if the state is not any of the expected values
        }
    }

    // hook to get the offest of the selector button size (changes with screen size)
    const [blurbButtonSize, setBlurbButtonSize] = useState(0);
  
    useEffect(() => {
        function handleResize() {
            setBlurbButtonSize(
            document.getElementById("selector")?.clientWidth ?? blurbButtonSize
          );
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, [blurbButtonSize]);

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
                            left: `calc(${followPos / 10}% - ${
                                catImageSize / 2
                            }px`,
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
                            <h3>Set i: {iSlider.values}</h3>
                            <Slider
                                sliderVal={iSlider}
                                setSliderVal={setISlider}
                                step={0.001}
                                min={0.001}
                                max={0.2}
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
                    </div>
                    <div className={styles.graphBox}>
                        <div className={styles.graph}>
                            <LineGraph data={positionData} />
                        </div>
                    </div>
                </div>
                <h1 className={styles.blogTitle}>What is PID?</h1>
                <div className={styles.blogImage}>
                    <Image src={pid} width={800} height={80} />
                </div>
                <p>
                    Welcome to this interactive demonstration of the PID control
                    algorithm! Move the yarn around and watch as the cat
                    attempts to catch it. But have you ever wondered how the cat
                    manages to track the yarn so smoothly? That&apos;s where the
                    PID control system comes in!
                </p>
                <p>
                    The PID control system is made up of three components: P, I,
                    and D. P stands for &quot;proportional,&quot; and it&apos;s
                    responsible for determining how much the cat should move
                    based on the difference between its current position and the
                    yarn&apos;s position. The I stands for &quot;integral,&quot;
                    and it takes into account how long the cat has been trying
                    to catch the yarn. The longer the cat chases, the stronger
                    the integral component becomes. Finally, the D stands for
                    &quot;derivative,&quot; and it measures how quickly the cat
                    is approaching the yarn.
                </p>
                <p>
                    Together, P, I, and D work to ensure that the cat tracks the
                    yarn as smoothly and efficiently as possible. As you can see
                    on the graph, the blue line represents the cat&apos;s
                    position, while the green line represents the yarn&apos;s
                    position. Thanks to the PID control system, the cat is able
                    to move in a way that closely follows the yarn, making it
                    much more likely to catch it. Have fun!
                </p>
                <div className={styles.blurbBar}>
                    <div
                        id={"selector"}
                        className={styles.blurbSelector}
                        style={{
                            left: `calc(${selector}% - ${
                                blurbButtonSize / 2
                            }px)`,
                        }}
                    ></div>
                    <div
                        className={styles.blurbButton}
                        onClick={() => handleSelector(1)}
                    >
                        <TbHexagonNumber1 className={styles.TbHexagon} />
                    </div>
                    <div
                        className={styles.blurbButton}
                        onClick={() => handleSelector(2)}
                    >
                        <TbHexagonNumber2 className={styles.TbHexagon} />
                    </div>
                    <div
                        className={styles.blurbButton}
                        onClick={() => handleSelector(3)}
                    >
                        <TbHexagonNumber3 className={styles.TbHexagon} />
                    </div>
                </div>
                <div className={styles.blurbBox}>{blurbCycle()}</div>
            </div>
        </div>
    );
}
