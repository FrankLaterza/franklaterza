
import styles from './contact.module.css'
import { NavBar } from '../../components/navbar';  
//import { getAllPostsWithFrontMatter } from '../../lib/utils'
import { randSVG } from '../../lib/random_background';

export default function Projects () {
  return (
    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")` }} >
    <NavBar/>
  </div>
  );
}