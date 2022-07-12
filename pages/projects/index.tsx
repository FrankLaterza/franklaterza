import Link from 'next/link';
import styles from './projects.module.css'
import { NavBar } from '../../components/navbar';  
import { GetStaticProps } from 'next'
import fs from 'fs';
import Image from 'next/image'
import matter from 'gray-matter';
//import { getAllPostsWithFrontMatter } from '../../lib/utils'
import { randSVG } from '../../lib/random_background';


interface Props {
  posts: {
    slug: string;
    frontmatter: {
        [key: string]: any;
    };
  }[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {

  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
      const slug = fileName.replace('.md', '');
      const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
      const { data: frontmatter } = matter(readFile);
      return {
        slug,
        frontmatter,
      };
  });

  return {
    props: {
      posts
    },
  };

}

export default function Projects ( {posts}: Props ) {
  return (
    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")` }} >
    {/* navigatoin bar */}
    <NavBar/>

    {/* main body */}
    <div className={styles.main}>
      {/* header */}
      <div className={styles.header}>
        <h1>
          Projects! <br/>
        </h1>
        <p className={styles.undergraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor 
        </p>
      </div>
      {/* project button */}
      {posts.map(({ slug, frontmatter }) => (
      <div className={styles.postBlurb}>
        <Image 
          width={100}
          height={100}
          alt={frontmatter.title}
          src={`/${frontmatter.socialImage}`}
          />

          <div className={styles.postBlurbInfo}>

            <h2> {frontmatter.title} </h2>
            <p>
              {frontmatter.about}
            </p>
          </div>
      </div>
      ))}

    </div>

  </div>
  );
}