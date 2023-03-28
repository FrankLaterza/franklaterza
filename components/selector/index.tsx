import React, {useEffect, useState} from "react";
import styles from "./selector.module.css";
import Image from "next/image";
type Blurb = {
    title: string;
    text: string;
    image: any;
    icon: any;
    hook: any;
};

type BlurbListProps = {
    blurbs: Blurb[];
};

function Selector({blurbs}: BlurbListProps) {

    const [selector, setSelector] = useState<number>(16.66);
    const [blurb, setBlurb] = useState<number>(1);

    function blurbCycle() {
        return (
            <div className={styles.blurbMain}>
                <h2 className={styles.blurbTitle}>{blurbs[blurb - 1].title}</h2>

                {blurbs[blurb - 1].image ? (
                    <div className={styles.blurbBody}>
                        <div className={styles.image}>
                            <Image
                                style={{borderRadius: "0.25rem"}}
                                src={blurbs[blurb - 1].image}
                                width={420}
                                height={420}
                            />
                        </div>
                        <p className={styles.blurbText}>
                            {blurbs[blurb - 1].text}
                        </p>
                    </div>
                ) : (
                    <p className={styles.blurbText}>{blurbs[blurb - 1].text}</p>
                )}
            </div>
        );
    }

    function handleSelector(button: number) {
        // set props hook
        blurbs[blurb - 1].hook(button);
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
                    <div className={styles.TbHexagon}>{blurbs[0].icon}</div>
                </div>
                <div
                    className={styles.blurbButton}
                    onClick={() => handleSelector(2)}
                >
                    <div className={styles.TbHexagon}>{blurbs[1].icon}</div>
                </div>
                <div
                    className={styles.blurbButton}
                    onClick={() => handleSelector(3)}
                >
                    <div className={styles.TbHexagon}>{blurbs[2].icon}</div>
                </div>
            </div>
            <div className={styles.blurbBox}>{blurbCycle()}</div>
        </>
    );
}

export {Selector};
