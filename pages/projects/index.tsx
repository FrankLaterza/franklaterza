import Link from "next/link";
import styles from "./projects.module.css";
import { GetStaticProps } from "next";
import fs from "fs";
import Image from "next/image";
import matter from "gray-matter";
import { ContentCard } from "../../components/contentCard";
import ME from "/public/images/me/prof_bush.jpg";

interface Props {
	posts: {
		slug: string;
		frontmatter: {
			[key: string]: any;
		};
	}[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const files = fs.readdirSync("posts");
	const posts = files.map((fileName) => {
		const slug = fileName.replace(".md", "");
		const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
		const { data: frontmatter } = matter(readFile);
		// remove the dashes and convert to number
		console.log(frontmatter.date);
		return {
			slug,
			frontmatter,
		};
	});

	posts.sort(function (a, b) {
		return Number(
			a.frontmatter.date.split("-").join("") -
			Number(b.frontmatter.date.split("-").join(""))
		);
	});

	return {
		props: {
			posts,
		},
	};
};

export default function Projects({ posts }: Props) {
	return (
		<div className={styles.container}>
			{/* header */}
			<div className={styles.header}>
				<div className={styles.headerImage}>
					<h1>Projects!</h1>
					<p className={styles.undergraph}>
						Welcome to the projects page! These are some of my projects. Click on a thumbnail to explore!
					</p>
				</div>
			</div>
			{/* main body */}
			<div className={styles.main}>
				{/* main blurb */}
				<div className={styles.postMain}>
					{posts.map(({ slug, frontmatter }) => (
						<div className={styles.content} key={slug}>
							<ContentCard
								title={frontmatter.title}
								text={frontmatter.about}
								image={frontmatter.socialImage}
								link={`/projects/${slug}`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
