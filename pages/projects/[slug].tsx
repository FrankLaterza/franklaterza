import fs from 'fs';
import matter from 'gray-matter';
import ReactMarkdown from "react-markdown";
import { NavBar } from '../../components/navbar';
import styles from './projects.module.css';
import { randSVG } from '../../lib/random_background';
import Link from 'next/link';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import React, { useLayoutEffect, useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}




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


const CodeBlock = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    // very bad solution
    const [width, height] = useWindowSize();
    const newWidth = (width > 700) ? width*0.48 : width*0.83
    return !inline && match ? (
      <div style={{width: `${newWidth}px`, fontSize: '0.75rem'}}>
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          wrapLine={true}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};


export default function PostPage({ frontmatter, content }: any) {
  return (
    <div className={styles.container} style={{backgroundImage: `url("${randSVG()}")` }} >
      <NavBar/>
      <div className={styles.main}>
        <div className={styles.markDown}>
        <Link href={`/projects`}> 
          <div className={styles.backBtn}>Back</div>
        </Link> 
        <ReactMarkdown rehypePlugins={[remarkGfm]} components={CodeBlock}>
          {content}
        </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}