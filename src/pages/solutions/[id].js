// Ruta del archivo: src/pages/solutions/[id].js

import React, { useEffect, useState, useRef } from "react";
import BaseLayout from "@/layouts/base-layout.js";
import { Block, Column, Page } from "@lkmx/flare-react";
import { getAllSolutionsIds, getSolutionData } from '@/lib/solutions';
import styles from "./solution.module.scss";
import { useRouter } from 'next/router';
import siteMetadata from "../../meta/siteMetadata";
import HeadSeo from "../../components/HeadSeo";
import getLang from '@/lang';
import Image from "next/image";
import Services from "../../components/services";
import GoBackBar from "../../components/goBackBar";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export async function getStaticPaths({locales}) {
    const paths = getAllSolutionsIds(locales);
    return {
        paths,
        fallback: false
    }
}
      
export async function getStaticProps({ params, locale }) {
    const solutionData = await getSolutionData(params.id, locale);
    return {
        props: {
            solutionData
        }
    }
}

export default function Solution({solutionData}) {
    const { locale } = useRouter();
    const $t = getLang(locale);
    const [height, setHeight] = useState();
    const targetRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 992 && targetRef.current) {
                const newHeight = targetRef.current.offsetHeight + 200;
                setHeight(newHeight);
                const aside = document.getElementById("aside");
                if (aside) {
                    aside.style.height = `${newHeight}px`;
                }
            }
        };

        handleScroll(); // Initial calculation
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <BaseLayout>
            <HeadSeo
                title={`${solutionData.title[0]} - ${siteMetadata.companyName}`}
                description={solutionData.description || ""}
                ogImageUrl={$t.home.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
                ogTwitterImage={$t.home.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
            />
            <Page className={styles.solution}>
                <GoBackBar destiny="/solutions" />
                <Column>
                    <Block className={styles.solution__heroHeading}>
                        <span>{solutionData.storyType || "solution"}</span>
                        <h1>{solutionData.title[0]}</h1>
                    </Block>
                </Column>
                <Column>
                    <Block className={styles.solution__heroImgBlock}>
                        <div className={styles.solution__heroImg}>
                            <Image
                                fill
                                src={`/solutions/${solutionData.cover}.jpg`}
                                alt={solutionData.title[0]}
                                priority
                            />
                        </div>
                    </Block>
                </Column>
                <Column mode="normal" className={styles.solution__introduction} weight="left">
                    <Block className={styles.solution__introduction__block}>
                        <div className={styles.solution__wrapper}>
                            <div id="aside" className={styles.solution__asideContainer}>
                                <div className={styles.solution__aside}></div>
                            </div>
                            <div>
                                <h2>{solutionData.introduction?.title}</h2>
                                <p>{solutionData.introduction?.content}</p>
                                {solutionData.introduction?.content2 && (
                                    <p>{solutionData.introduction.content2}</p>
                                )}
                            </div>
                        </div>
                    </Block>
                </Column>
                <Column mode="normal" modeL="slim" className={styles.solution__mainContentContainer}>
                    <Block className={styles.solution__mainContentContainer__block}>
                        <div
                            ref={targetRef}
                            className={styles.solution__mainContent}
                            dangerouslySetInnerHTML={{ __html: solutionData.contentHtml }}
                        />
                    </Block>
                </Column>
                <Services />
            </Page>
        </BaseLayout>
    );
}