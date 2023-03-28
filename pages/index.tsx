import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
//import styles from '../styles/shapes.css';
import ME from "/public/images/me/prof_bush.jpg";
import sus from "/public/images/projects/model.gif";
import pcb from "/public/images/projects/pcb.png";
import nerd from "/public/images/me/nerd.png";
import React, {useEffect, useState} from "react";
import {Selector} from "../components/selector";
import { BiPieChart } from "react-icons/bi";
import {
    FaDraftingCompass,
    FaMicrochip,
    FaCode,
} from "react-icons/fa";



const Home: NextPage = () => {
    // pass some tsx for the blrub for the blurb cycle

    const blurbs = [
        {
            title: "CAD",
            text: "As a 3D printing enthusiast, I have immersed myself in the world of 3D modeling using industry-standard software such as Fusion 360 and SolidWorks. Through my dedication to this craft, I have become highly proficient in creating detailed and precise 3D models. My expertise in 3D modeling has been invaluable both in my personal projects and in my professional work, where I have been able to create complex designs and prototypes with greater ease and efficiency.",
            image: sus,
            icon: <FaDraftingCompass />
        },
        {
            title: "PCB",
            text: "PCB design has been a game-changer for my DIY projects, enabling me to create more efficient and robust circuits. I thoroughly enjoy using Eagle CAD to design PCBs and export Gerber files for rapid prototyping. My experience in PCB design has helped me to refine my skills, and I take pride in producing high-quality designs that meet my needs. Whether it's designing custom PCBs for my personal projects or working in the feild, I am always excited to tackle new challenges and create innovative solutions.",
            image: pcb,
            icon: <FaMicrochip />
        },
        {
            title: "Software",
            text: "Programming is more than just a hobby for me, it's a passion. I enjoy creating and tinkering with various software tools and languages. In fact, I even built this website using TypeScript and Next.js, which was a fun and challenging experience. Through self-teaching, I've become proficient in a variety of programming skills that have proven to be incredibly valuable in my professional work. For me, programming is the key that unlocks countless possibilities and opens doors to new and exciting projects.",
            image: nerd,
            icon: <FaCode />
        },
    ];

    return (
        <div className={styles.container}>
            {/* header */}
            <div className={styles.header}>
                <div className={styles.headerImage}>
                    <h1>
                        Hey There, <br />I am Frank Laterza!
                    </h1>
                    <p className={styles.undergraph}>
                        Welcome to my portfolio website where I keep all my
                        projects!
                    </p>
                </div>
            </div>
            {/* main body */}
            <div className={styles.main}>
                {/* about me */}
                <div className={styles.aboutMe}>
                    {/* image */}
                    <div className={styles.image}>
                        <Image
                            style={{borderRadius: "0.25rem"}}
                            src={ME}
                            width={300}
                            height={320}
                        />
                    </div>
                    {/* about me text */}
                    <div className={styles.aboutMeText}>
                        <h1 className={styles.aboutMeHead}>Who?</h1>
                        <p className={styles.aboutMeBody}>
                            My name is Frank! I am a 3nd-year computer
                            engineering student at the University of Central
                            Florida. I am passionate about computer science and
                            DIY electronics. My skills involve 3D modeling, PCB
                            design, programming, and more. I am always looking
                            for new opportunities!
                        </p>
                    </div>
                </div>
                {/* body */}
                <div className={styles.what}>
                    <h1 className={styles.whatHead}>What?</h1>
                    <p className={styles.whatBody}>
                        This is my website where I keep all my projects. I built
                        this site from scratch with Typescript and NextJs. Check
                        out the projects page to see some of my projects! There
                        is also an interactive page that will keep you
                        entertained.
                    </p>
                </div>

                <Selector blurbs={blurbs} />
            </div>
        </div>
    );
};

export default Home;

