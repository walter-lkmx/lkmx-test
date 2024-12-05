import React, { useEffect, useState, useRef } from "react";
import BaseLayout from "@/layouts/base-layout.js";
import { Block, Column, Page } from "@lkmx/flare-react";
import { getAllStoriesIds, getStoryData } from '@/lib/work';
import styles from "./story.module.scss";
import Router, { useRouter } from 'next/router';
import siteMetadata from "../../meta/siteMetadata";
import HeadSeo from "../../components/HeadSeo";
import getLang from '@/lang';
import Image from "next/image";
import Services from "../../components/services";
import GoBackBar from "../../components/goBackBar";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export async function getStaticPaths({locales}) {
    const paths = getAllStoriesIds(locales);
    return {
        paths,
        fallback: false
    }
}
      
export async function getStaticProps({ params, locale }) {
    const storyData = await getStoryData(params.id, locale);
    return {
        props: {
            storyData
        }
    }
}

export default function SuccessStory({storyData}) {
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
                title={`${storyData.title[0]} ${storyData.title[1]} - ${siteMetadata.companyName}`}
                description={`${storyData.headline[0]} ${storyData.headline[1]}`}
                ogImageUrl={$t.home.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
                ogTwitterImage={$t.home.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
            />
            <Page className={styles.story}>
                <GoBackBar destiny="/work" />
                <Column>
                    <Block className={styles.story__heroHeading}>
                        <span>{storyData.storyType}</span>
                        <h1>{storyData.title[0]}</h1>
                        <h1>{storyData.title[1]}</h1>
                        <span>{storyData.solutions}</span>
                    </Block>
                </Column>
                <Column>
                    <Block className={styles.story__heroImgBlock}>
                        <div className={styles.story__heroImg}>
                            <Image
                                fill
                                src={`/work/${storyData.hero}.jpg`}
                                alt="Heading Image"
                                priority
                            />
                        </div>
                    </Block>
                </Column>
                <Column mode="normal" className={styles.story__introduction} weight="left">
                    <Block className={styles.story__introduction__block}>
                        <div className={styles.story__wrapper}>
                            <div id="aside" className={styles.story__asideContainer}>
                                <div className={styles.story__aside}></div>
                            </div>
                            <div>
                                <h2>{storyData.introduction.title}</h2>
                                <p>{storyData.introduction.content}</p>
                                {storyData.introduction.content2 && <p>{storyData.introduction.content2}</p>}
                            </div>
                        </div>
                    </Block>
                </Column>
                <Column mode="normal" modeL="slim" className={styles.story__mainContentContainer}>
                    <Block className={styles.story__mainContentContainer__block}>
                        <div
                            ref={targetRef}
                            className={styles.story__mainContent}
                            dangerouslySetInnerHTML={{ __html: storyData.contentHtml }}
                        />
                    </Block>
                </Column>
                <Services />
            </Page>
        </BaseLayout>
    );
}