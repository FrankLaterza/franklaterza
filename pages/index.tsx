import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
//import styles from '../styles/shapes.css';
import ME from '/public/images/me/prof_bush.jpg';
import { NavBar } from '../components/navbar';
import { randSVG } from '../lib/random_background'
import { AiFillCloseCircle } from "react-icons/ai"
import { AiFillMinusCircle } from "react-icons/ai" 
import { AiFillPlusCircle } from "react-icons/ai"
import Squiggle from '/public/images/squiggle.png'
import { Bolts } from '../components/misc/bolts'; 



const Home: NextPage = () => {
  return (


    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")`}} >
      {/* main body */}
      <div className={styles.main}>
        {/* header */}
        <div className={styles.header}>
          <Bolts/>
          <h1>
            Hey There, <br/>
            I am Frank Laterza!
          </h1>
          <p className={styles.undergraph}>
            Welcome to my portfolio website where I keep 
            all my projects!
          </p>
        </div>
        {/* about me */}
        <div className={styles.aboutMe}> 

          {/* image */}
          <div className={styles.image}>
            <div className={styles.iconsImage}>
            <AiFillCloseCircle style={{ color: 'rgb(217, 68, 68)', width: "1rem", height: "1rem" }}/>
            <AiFillMinusCircle style={{ color: 'rgb(217, 130, 68)', width: "1rem", height: "1rem" }}/>
            <AiFillPlusCircle style={{ color: 'rgb(88, 217, 68)', width: "1rem", height: "1rem" }}/>
            </div>
            <Image style={{borderRadius: '0.25rem'}} src={ME} width= {300} height={320}/>
            
          </div>
          {/* <div className={styles.squiggle} > 
            <Image src={Squiggle} width= {600} height={200}/>
          </div> */}
          <div className={styles.aboutMeText}>
            <Bolts/>
            <h1>Who?</h1>
            <p>
            I am a 2nd-year computer engineering student at the 
            University of Central Florida. I have a passion for 
            mathematics and computer science 
            </p>
          </div>
        </div>

        {/* body */}
        <div className={styles.body}>
          <Bolts/>
          <h1>What I Do</h1>
          <p>
            My skills range from 3d modeling, PCB design, 
            and computer programming. I currently work as a 
            sub contractor with a small company called 
            Sparrow Design. 
          </p>
        </div>

      </div>


    </div>
  )
}

export default Home
