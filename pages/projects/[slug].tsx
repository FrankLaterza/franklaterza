import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from "react-markdown";
import { NavBar } from '../../components/navbar';
import styles from './projects.module.css';
import { randSVG } from '../../lib/random_background';
import Link from 'next/link';
import remarkGfm from 'remark-gfm'


export async function getStaticPaths() {

    const files = fs.readdirSync('posts');
    const paths = files.map((fileName) => ({
        params: {
          slug: fileName.replace('.md', ''),
        },
    }));
    return {
        paths,
        fallback: false,
    };

}

export async function getStaticProps({ params: { slug }}: any ) {
    const fileName = fs.readFileSync(`posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
}

export default function PostPage({ frontmatter, content }: any) {
  return (
    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")` }} >
      <NavBar/>
      <div className={styles.main}>
        <div className={styles.markDown}>
        <Link href={`/projects`}> 
          <div className={styles.backBtn}>Back</div>
        </Link> 
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}