import styles from './navbar.module.css'
import Link from 'next/link';

function NavBar( ){
    return(
    <div className={styles.navbar}>
        <Navlink name='About Me' link='/'/> 
        <Navlink name='Projects' link='/projects'/>
        <Navlink name='Interactive' link='/interactive'/>
    </div>

    );
}

function Navlink( props: {name: string, link: string} ) {
    return (
    <Link href={props.link}>        
        <a className={styles.navlink}>
            {props.name}
        </a>
    </Link>
    );
}

export { NavBar }