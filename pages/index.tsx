import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
//import styles from '../styles/shapes.css';
import ME from "/public/images/me/me.jpg";
import sus from "/public/images/projects/coffee_filler.gif";
import pcb from "/public/images/projects/pcb.png";
import nerd from "/public/images/me/nerd.png";
import lock from "/public/images/projects/door_lock.png";
import moo from "/public/images/projects/moo.png";
import penguin from "/public/images/projects/linux_peng.png";
import light from "/public/images/projects/light_switch.png";
import cow from "/public/images/projects/cow.png";
import linkedin from "/public/images/logo/linkedin.png";
import github from "/public/images/logo/github.png";
import youtube from "/public/images/logo/youtube.png";
import React, { useEffect, useState } from "react";
import { Selector } from "../components/selector";
import { ContentCardPreview } from "../components/contentCard";
import {
    FaDraftingCompass,
    FaMicrochip,
    FaCode,
    FaDownload,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// ilikemen

// import required modules
import { EffectCards, Autoplay } from "swiper";

function Home() {
    // pass some tsx for the blrub for the blurb cycle

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
                    <div className={styles.buttons}>
                        <a className={styles.socialButtons} href="/files/frank_resume.pdf" download="frank_laterza">
                            Resume
                            <FaDownload />
                        </a>

                        <Link href="https://www.linkedin.com/in/laterzafrank/">
                            <div className={styles.socialButtons}>
                                <Image
                                    width={25}
                                    height={25}
                                    src={linkedin}
                                />
                                <b>Linkedin</b>
                            </div>
                        </Link>
                        <Link href="https://github.com/FrankLaterza">
                            <div className={styles.socialButtons}>
                                <Image width={25} height={25} src={github} />
                                <b>Github</b>
                            </div>
                        </Link>
                        <Link href="https://www.youtube.com/user/EPICfranky">
                            <div className={styles.socialButtons}>
                                <Image
                                    width={25}
                                    height={25}
                                    src={youtube}
                                />
                                <b>Youtube</b>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
            {/* main body */}
            <div className={styles.main}>
                {/* about me */}
                <div className={styles.aboutMe}>
                    {/* image */}
                    <div className={styles.image}>
                        <Image
                            style={{ borderRadius: "0.25rem" }}
                            src={ME}
                            width={300}
                            height={300}
                        />
                    </div>
                    {/* about me text */}
                    <div className={styles.aboutMeText}>
                        <p className={styles.aboutMeBody}>
                            My name is Frank! I am a 3rd-year computer
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
                    <p className={styles.whatBody}>
                        This is my website where I keep all my projects. I built
                        this site from scratch with Typescript and NextJs. Check
                        out the projects page to see some of my projects! There
                        is also an interactive page that will keep you
                        entertained.
                    </p>
                </div>

                <h1>Project Highlights</h1>
                {/* content cards */}
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    initialSlide={1}
                    modules={[EffectCards, Autoplay]}
                    className={styles.swiper}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                    }}>
                    <SwiperSlide className={styles.slider}>
                        <ContentCardPreview
                            title={"VM GPU passthrough"}
                            text={"Tutorial on single GPU passthrough on Pop!_OS "}
                            image={penguin}
                            link={"https://www.youtube.com/watch?v=MrA9jW6iCuo  "}
                        />
                    </SwiperSlide>
                    <SwiperSlide className={styles.slider}>
                        <ContentCardPreview

                            title={"IoT Light Switch"}
                            text={"Controlling my light switch with an app"}
                            image={light}
                            link={"/projects/light-switch"}
                        />
                    </SwiperSlide>
                    <SwiperSlide className={styles.slider}>
                        <ContentCardPreview

                            title={"Weblock"}
                            text={"My custom solution to an automatic door lock"}
                            image={lock}
                            link={"/projects/web-lock"}
                        />
                    </SwiperSlide>
                    <SwiperSlide className={styles.slider}>
                        <ContentCardPreview

                            title={"Cow Coding"}
                            text={"The best coding language to be invented"}
                            image={moo}
                            link={"https://www.youtube.com/watch?v=XPVedHlGutg"}
                        />
                    </SwiperSlide>
                </Swiper>


                <h1>Skills</h1>
                {/* some things abt me */}
                <Selector blurbs={[
                    {
                        title: "CAD",
                        text: "As a 3D printing enthusiast, I have immersed myself in the world of 3D modeling using industry-standard software such as Fusion 360 and SolidWorks. Through my dedication to this craft, I have become highly proficient in creating detailed and precise 3D models. My expertise in 3D modeling has been invaluable both in my personal projects and in my professional work, where I have been able to create complex designs and prototypes with greater ease and efficiency.",
                        image: sus,
                        icon: <FaDraftingCompass />,
                        hook: undefined
                    },
                    {
                        title: "PCB",
                        text: "PCB design has been a game-changer for my DIY projects, enabling me to create more efficient and robust circuits. I thoroughly enjoy using Eagle CAD to design PCBs and export Gerber files for rapid prototyping. My experience in PCB design has helped me to refine my skills, and I take pride in producing high-quality designs that meet my needs. Whether it's designing custom PCBs for my personal projects or working in the feild, I am always excited to tackle new challenges and create innovative solutions.",
                        image: pcb,
                        icon: <FaMicrochip />,
                        hook: undefined
                    },
                    {
                        title: "Software",
                        text: "Programming is more than just a hobby for me, it's a passion. I enjoy creating and tinkering with various software tools and languages. In fact, I even built this website using TypeScript and Next.js, which was a fun and challenging experience. Through self-teaching, I've become proficient in a variety of programming skills that have proven to be incredibly valuable in my professional work. For me, programming is the key that unlocks countless possibilities and opens doors to new and exciting projects.",
                        image: nerd,
                        icon: <FaCode />,
                        hook: undefined
                    },
                ]} />
            </div>
        </div>
    );
};

export default Home;

