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

        /* main blurb */
          <Link href={`/projects/${slug}`}>
          
            <div key={slug} className={styles.postBlurb}>
            {/* top */}
            <div className={styles.postBlurbTop}>
              <div className={styles.image}>
                <Image 
                  width= {200}
                  height={200}
                  // alt={frontmatter.title}
                  src={'/images/google_drive.png'}
                  />
              </div>
              {/* titles */}
              <div> 
                <h2> {frontmatter.title} </h2>
              </div>
            </div>
            {/* bottom info */}
            <div className={styles.postBlurbBottom}>
              <div>
                about: {frontmatter.about} sdjfasdjkfhjslakd4

              </div>
            </div>
            </div>
          </Link>
      ))}

    </div>

  </div>
  );
}