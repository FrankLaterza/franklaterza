import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
//import styles from '../styles/shapes.css';
import ME from '/public/images/prof_bush.jpg';
import { NavBar } from '../components/navbar';
import { randSVG } from '../lib/random_background'
import { AiFillCloseCircle } from "react-icons/ai"
import { AiFillMinusCircle } from "react-icons/ai" 
import { AiFillPlusCircle } from "react-icons/ai"
import Squiggle from '/public/images/squiggle.png'

const Home: NextPage = () => {
  return (

    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")` }} >
      {/* main body */}
      <div className={styles.main}>
        {/* header */}
        <div className={styles.header}>
          <h1>
            Hey There, <br/>
            I am Frank Laterza!
          </h1>
          <p className={styles.undergraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor 
          </p>
        </div>
        {/* about me */}
        <div className={styles.aboutMe}> 

          {/* image */}
          <div className={styles.image}>
            <div className={styles.icons}>
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
            <h1>Who?</h1>
            <p>
            Sed risus ultricies tristique nulla aliquet enim. Molestie 
            nunc non blandit massa enim nec dui nunc. Amet consectetur 
            adipiscing elit pellentesque habitant morbi tristique senectus 
            et. Consequat mauris nunc congue nisi vitae suscipit tellus 
            </p>
          </div>
        </div>

        {/* body */}
        <div className={styles.body}>
          <h1>What I Do</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut <br/><br/>
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor <br/><br/>
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident <br/><br/>
          sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut <br/><br/>
          enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor <br/><br/>
          in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident <br/><br/>
          sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>

      </div>


    </div>
  )
}

export default Home
