// Ruta del archivo: src/pages/industries/[id].js

import React, { useEffect, useState, useRef } from "react";
import BaseLayout from "@/layouts/base-layout.js";
import { Block, Column, Page } from "@lkmx/flare-react";
import { getAllIndustriesIds, getIndustryData } from '@/lib/content';
import styles from "./industry.module.scss";
import { useRouter } from 'next/router';
import siteMetadata from "../../meta/siteMetadata";
import HeadSeo from "../../components/HeadSeo";
import getLang from '@/lang';
import Image from "next/image";
import Services from "../../components/services";
import GoBackBar from "../../components/goBackBar";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export async function getStaticPaths({locales}) {
    const paths = getAllIndustriesIds(locales);
    return {
        paths,
        fallback: false
    }
}
      
export async function getStaticProps({ params, locale }) {
    const industryData = await getIndustryData(params.id, locale);
    return {
        props: {
            industryData
        }
    }
}

export default function Industry({industryData}) {
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
                title={`${industryData.title[0]} - ${siteMetadata.companyName}`}
                description={industryData.description || ""}
                ogImageUrl={$t.home.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
                ogTwitterImage={$t.home.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
            />
            <Page className={styles.industry}>
                <GoBackBar destiny="/industries" />
                <Column>
                    <Block className={styles.industry__heroHeading}>
                        <span>{industryData.storyType || "industry"}</span>
                        <h1>{industryData.title[0]}</h1>
                        {industryData.title[1] && <h1>{industryData.title[1]}</h1>}
                        {industryData.tags && (
                            <span>{Array.isArray(industryData.tags) ? industryData.tags.join(', ') : industryData.tags}</span>
                        )}
                    </Block>
                </Column>
                <Column>
                    <Block className={styles.industry__heroImgBlock}>
                        <div className={styles.industry__heroImg}>
                            <Image
                                fill
                                src={`/industries/${industryData.id}/${industryData.cover}.jpg`}
                                alt={industryData.title[0]}
                                priority
                            />
                        </div>
                    </Block>
                </Column>
                <Column mode="normal" className={styles.industry__introduction} weight="left">
                    <Block className={styles.industry__introduction__block}>
                        <div className={styles.industry__wrapper}>
                            <div id="aside" className={styles.industry__asideContainer}>
                                <div className={styles.industry__aside}></div>
                            </div>
                            <div>
                                <h2>{industryData.introduction?.title}</h2>
                                <p>{industryData.introduction?.content}</p>
                                {industryData.introduction?.content2 && (
                                    <p>{industryData.introduction.content2}</p>
                                )}
                            </div>
                        </div>
                    </Block>
                </Column>
                <Column mode="normal" modeL="slim" className={styles.industry__mainContentContainer}>
                    <Block className={styles.industry__mainContentContainer__block}>
                        <div
                            ref={targetRef}
                            className={styles.industry__mainContent}
                            dangerouslySetInnerHTML={{ __html: industryData.contentHtml }}
                        />
                    </Block>
                </Column>
                <Services />
            </Page>
        </BaseLayout>
    );
}