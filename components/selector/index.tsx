import React, {useEffect, useState} from "react";
import styles from "./selector.module.css";
import Image from "next/image";
import {
    TbHexagonNumber1,
    TbHexagonNumber2,
    TbHexagonNumber3,
} from "react-icons/tb";

type Blurb = {
    title: string;
    text: string;
    image: any;
};

type BlurbListProps = {
    blurbs: Blurb[];
};

function Selector({blurbs}: BlurbListProps) {
    function handleSelector(button: number) {
        setBlurb(button);
        if (button === 1) {
            setSelector(16.66);
        }
        if (button === 2) {
            setSelector(50);
        }
        if (button === 3) {
            setSelector(100 - 16.66);
        }
    }

    const [selector, setSelector] = useState<number>(16.66);
    const [blurb, setBlurb] = useState<number>(1);

    function blurbCycle() {
        return (
          <div className={styles.blurbMain}>
            <h2 className={styles.blurbTitle}>{blurbs[blurb - 1].title}</h2>
            <div className={styles.blurbBody}>
              {blurbs[blurb - 1].image ? (
                <div className={styles.image}>
                  <Image
                    style={{ borderRadius: "0.25rem" }}
                    src={blurbs[blurb - 1].image}
                    width={420}
                    height={420}
                  />
                </div>
              ) : null}
              <p className={styles.blurbText}>{blurbs[blurb - 1].text}</p>
            </div>
          </div>
        );
      }
    

    // hook to get the offest of the selector button size (changes with screen size)
    const [blurbButtonSize, setBlurbButtonSize] = useState(0);

    useEffect(() => {
        function handleResize() {
            setBlurbButtonSize(
                document.getElementById("selector")?.clientWidth ??
                    blurbButtonSize
            );
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [blurbButtonSize]);

    return (
        <>
            <div className={styles.blurbBar}>
                <div
                    id={"selector"}
                    className={styles.blurbSelector}
                    style={{
                        left: `calc(${selector}% - ${blurbButtonSize / 2}px)`,
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
        </>
    );
}

export {Selector};
