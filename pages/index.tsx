import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
//import styles from '../styles/shapes.css';
import ME from "/public/images/me/prof_bush.jpg";
import {NavBar} from "../components/navbar";
import {AiFillCloseCircle} from "react-icons/ai";
import {AiFillMinusCircle} from "react-icons/ai";
import {AiFillPlusCircle} from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles.header}>
        <div className={styles.headerImage}>
          <h1>
            Hey There, <br />I am Frank Laterza!
          </h1>
          <p className={styles.undergraph}>
            Welcome to my portfolio website where I keep all my projects!
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
              width={400}
              height={420}
            />
          </div>
          {/* about me text */}
          <div className={styles.aboutMeText}>
            <h1>Who?</h1>
            <p>
              I am a 2nd-year computer engineering student at the University of
              Central Florida. I am constantly driven by my passion for technology and
              innovation. This drives me to work hard and excel in my
              studies, and I am determined to make the most of my education and
              put my skills to use in the real world.
            </p>
          </div>
        </div>

        {/* body */}
        <div className={styles.what}>
          <h1>What?</h1>
          <p>
            This is my website where I keep all my projects. I build it from
            scratch with Typescript and NextJs. Check out the projects page to
            see some of my projects that I also started from scratch. There is
            also an interactive page that can keep you entertained if you ever get board
          </p>
        </div>
        {/* <div className={styles.why}>
          <h1>why?</h1>
          <p>Because why not!</p>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
