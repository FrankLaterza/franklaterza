import Link from 'next/link';
import { NavBar } from '../../components/navbar';
import styles from './interactive.module.css'
import { randSVG } from '../../lib/random_background';

export default function Interactive() {
  return (
    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")` }} >


  </div>
  );
}