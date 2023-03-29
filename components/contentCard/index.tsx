import React, { useEffect, useState } from "react";
import styles from "./contentCard.module.css";
import Image from "next/image";
import Link from "next/link";

type Content = {
    title: string;
    text: string;
    image: any;
    link: string;
};

function ContentCardPreview({ title, text, image, link }: Content) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image
                        style={{ borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem" }}
                        src={image}
                        layout="fill"
                    />
                </div>
                <div className={styles.body}>
                    <h3 className={styles.title}>
                        {title}
                    </h3>
                    <p className={styles.text}>
                        {text}
                    </p>
                    <Link href={link}>
                        <div className={styles.button}>
                            learn more
                        </div>

                    </Link>
                </div>
            </div>
        </>
    );
}

function ContentCard({ title, text, image, link }: Content) {

    return (
        <>
            <Link href={link}>
                <div className={styles.container}>
                    <div className={styles.image}>
                        <Image
                            style={{ borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem" }}
                            src={image}
                            layout="fill"
                        />
                    </div>
                    <div className={styles.body}>
                        <h3 className={styles.title}>
                            {title}
                        </h3>
                        <p className={styles.text}>
                            {text}
                        </p>

                    </div>
                </div>
            </Link>
        </>
    );
}

export { ContentCardPreview, ContentCard };
