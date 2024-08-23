import React, { useLayoutEffect, useState, useRef } from "react";
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
    // const targetRef = useRef(null);
    // const [height, setHeight] = useState(null);

    // useLayoutEffect(() => {
    //     console.log(targetRef.current)
    //     if (targetRef.current) {
    //         const { height } = targetRef.current.offsetHeight;
    //         setHeight(height);
    //         console.log(height);
    //       }
    //     // if(targetRef.current) {
    //     //     const height = targetRef.current.getBoundingClientRect().height;            
    //     //     console.log("it should be available");
    //     //     console.log(`Element height: ${height}px`);
    //     //     document.getElementById("aside").style.height = height + 'px';
    //     // }else {
    //     //     console.log("Why the fuck m I not working")
    //     // }
    // },[targetRef])
    const [height, setHeight] = useState();
    const targetRef = useRef(null);

    useLayoutEffect(() => {
        document.addEventListener('scroll', function () {
            // if(window.innerWidth > 992)
            //     console.log(w);
            // else
                //console.log(window.innerWidth)
            if(window.innerWidth >= 992) {
                if(targetRef.current) {
                    setHeight(targetRef.current.offsetHeight + 200);
                    console.log(height)
                    document.getElementById("aside").style.height = height + 'px';
                }else {
                    console.log("Why the fuck m I not working")
                }
            }            
        }, {
            passive: true
        });
        
    })

    return (
      <BaseLayout>
        <HeadSeo
          title={
            storyData.title[0] +
            " " +
            storyData.title[1] +
            " - " +
            siteMetadata.companyName
          }
          description={storyData.headline[0] + " " + storyData.headline[1]}
          ogImageUrl={
            $t.home.ogImage
              ? $t.home.ogImage
              : locale === "es"
              ? siteMetadata.ogDefaultImageEs
              : siteMetadata.ogDefaultImageEn
          }
          ogTwitterImage={
            $t.home.ogImage
              ? $t.home.ogImage
              : locale === "es"
              ? siteMetadata.ogDefaultImageEs
              : siteMetadata.ogDefaultImageEn
          }
        />
        <Page className={styles.story}>
          <GoBackBar destiny={"/work"} />
          <Column>
            <Block className={styles.story__heroHeading}>
              <span>{storyData.storyType}</span>
              <h1>{storyData.title[0]}</h1>
              <h1>{storyData.title[1]}</h1>
              <span>{storyData.solutions}</span>
              {/* <span>{storyData.headline[0]}<br/> {storyData.headline[1]}</span> */}
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
          <Column
            mode="normal"
            className={styles.story__introduction}
            weight="left"
          >
            <Block className={styles.story__introduction__block}>
              <div className={styles.story__wrapper}>
                <div id="aside" className={styles.story__asideContainer}>
                  <div className={styles.story__aside}>
                    {/* <div className={styles.story__aside__item}>
                                        <span>{$t.story.services}</span>
                                        <ul>
                                            {storyData.services.map((item, key) => <li key={key}>{item}</li>)}
                                    </ul>
                                    </div> */}
                    {/* <div className={styles.story__aside__item}>
                                        <span>{$t.story.methodology}</span>
                                        <ul>
                                            {storyData.methodologies.map((item, key) => <li key={key}>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div className={styles.story__aside__item}>
                                        <span>{$t.story.period}</span>
                                        <ul>
                                            {storyData.period.map((item, key) => <li key={key}>{item}</li>)}
                                        </ul>
                                    </div> */}
                  </div>
                </div>
                <div>
                  <h2>{storyData.introduction.title}</h2>
                  <p>{storyData.introduction.content}</p>
                  {storyData.introduction.content2 != null ? (
                    <p>{storyData.introduction.content2}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Block>
          </Column>
          <Column
            mode="normal"
            modeL="slim"
            className={styles.story__mainContentContainer}
          >
            <Block className={styles.story__mainContentContainer__block}>
              <div
                ref={targetRef}
                className={styles.story__mainContent}
                dangerouslySetInnerHTML={{ __html: storyData.contentHtml }}
              ></div>
            </Block>
          </Column>
          <Services />
        </Page>
      </BaseLayout>
    );
}