
import styles from './links.module.css'
import { NavBar } from '../../components/navbar';  
//import { getAllPostsWithFrontMatter } from '../../lib/utils'
import { randSVG } from '../../lib/random_background';
import { Bolts } from '../../components/misc/bolts'; 
import Link from 'next/link';
import Image from 'next/image'


export default function Projects () {
  return (
    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")`}}>

      <div className={styles.main}>
        <div className={styles.header}>
          <Bolts/>
          <h1>
            My Links
          </h1>
        </div>
        
        <Link href='https://www.linkedin.com/in/laterzafrank/'>
          <div className={styles.button}>
            <Image width= {100} height={100} src={'/images/logo/linkedin.png'}/>
            <b>Linkedin</b>
          </div>
        </Link>

        <Link href='https://github.com/FrankLaterza'>
          <div className={styles.button}>
            <Image width= {100} height={100} src={'/images/logo/github.png'}/>
            <b>Github</b>
          </div>
        </Link>

        <Link href='https://www.youtube.com/user/EPICfranky'>
          <div className={styles.button}>
            <Image width= {100} height={100} src={'/images/logo/youtube.png'}/>
            <b>Youtube</b>
          </div>
        </Link>
        
      
      </div>
  </div>
  );
}