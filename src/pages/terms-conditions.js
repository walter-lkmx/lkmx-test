import React from "react";
import BaseLayout from "@/layouts/base-layout.js";
import styles from "./privacy.module.scss";
import { Block, Column, Page } from "@lkmx/flare-react";
import getLang from '@/lang';
import siteMetadata from "../meta/siteMetadata"
import HeadSeo from "../components/HeadSeo"
import { useRouter } from "next/router";


export default function PrivacyPage() {
    const { locale } = useRouter();
    const $t = getLang(locale);

    return(
        <BaseLayout>
            <HeadSeo
                title={$t.privacy.title + ' - ' + siteMetadata.companyName}
                description={$t.privacy.ogDescription}
                ogImageUrl={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
                ogTwitterImage={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
            />
            <Page className={styles.privacy}>
                <Column mode="normal" modeL="slim" className={styles.privacy__column}>
                    <Block className={styles.privacy__column__block}>
                        <div className={styles.privacy__column__block__content}>
                            <h1>{$t.termsConditions.section1.title}</h1>
                            <p>{$t.termsConditions.section1.p1}</p>
                            <p>{$t.termsConditions.section1.p2}</p>
                            <p>{$t.termsConditions.section1.p3}</p>
                            <p>{$t.termsConditions.section1.p4}</p>
                            <p>{$t.termsConditions.section1.p5}</p>
                        </div>

                        <div className={styles.privacy__column__block__content}>
                            <h2>{$t.termsConditions.section2.title}</h2>
                            <p>{$t.termsConditions.section2.p1}</p>
                            <p>{$t.termsConditions.section2.p2}</p>
                        </div>
                        
                        <div className={styles.privacy__column__block__content}>
                            <h2>{$t.termsConditions.section3.title}</h2>
                            <p>{$t.termsConditions.section3.p1}</p>
                            <p>{$t.termsConditions.section3.p2}</p>
                            <ul>
                                <li>{$t.termsConditions.section3.li[0]}</li>
                                <li>{$t.termsConditions.section3.li[1]}</li>
                                <li>{$t.termsConditions.section3.li[2]}</li>
                                <li>{$t.termsConditions.section3.li[3]}</li>
                            </ul>
                            <p>{$t.termsConditions.section3.p3}</p>
                        </div>

                        <div className={styles.privacy__column__block__content}>
                            <h2>{$t.termsConditions.section4.title}</h2>
                            <p>{$t.termsConditions.section4.p1}</p>
                            <ul>
                                <li>{$t.termsConditions.section4.li[0]}</li>
                                <li>{$t.termsConditions.section4.li[1]}</li>
                                <li>{$t.termsConditions.section4.li[2]}</li>
                                <li>{$t.termsConditions.section4.li[3]}</li>
                                <li>{$t.termsConditions.section4.li[4]}</li>
                            </ul>
                            <p>{$t.termsConditions.section4.p2}</p>
                            <p>{$t.termsConditions.section4.p3}</p>
                            <ul>
                                <li>{$t.termsConditions.section4.li2[0]}</li>
                                <li>{$t.termsConditions.section4.li2[1]}</li>
                                <li>{$t.termsConditions.section4.li2[2]}</li>
                                <li>{$t.termsConditions.section4.li2[3]}</li>
                                <li>{$t.termsConditions.section4.li2[4]}</li>
                                <li>{$t.termsConditions.section4.li2[5]}</li>
                                <li>{$t.termsConditions.section4.li2[6]}</li>
                            </ul>
                            <p>{$t.termsConditions.section4.p4}</p>
                            <p>{$t.termsConditions.section4.p5}</p>
                            <p>{$t.termsConditions.section4.p6}</p>
                            <p>{$t.termsConditions.section4.p7}</p>
                            <ul>
                                <li>{$t.termsConditions.section4.li3[0]}</li>
                                <li>{$t.termsConditions.section4.li3[1]}</li>
                                <li>{$t.termsConditions.section4.li3[2]}</li>
                            </ul>
                            <p>{$t.termsConditions.section4.p8}</p>
                        </div>

                        <div className={styles.privacy__column__block__content}>
                            <h2>{$t.termsConditions.section5.title}</h2>
                            <p>{$t.termsConditions.section5.p1}</p>
                        </div>

                        <div className={styles.privacy__column__block__content}>
                            <h2>{$t.termsConditions.section6.title}</h2>
                            <p>{$t.termsConditions.section6.p1}</p>
                        </div>
                    </Block>
                </Column>
            </Page>
        </BaseLayout>
    );
}