import React from 'react';
import BaseLayout from '@/layouts/base-layout.js';
import Link from 'next/link';
import { Block, Column, Page } from '@lkmx/flare-react';
import getLang from '@/lang';
import styles from './index.module.scss';
import siteMetadata from '../../meta/siteMetadata';
import HeadSeo from '../../components/HeadSeo';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getSortedStoriesData } from '@/lib/work';

export async function getStaticProps({ locale }) {
    const storiesData = getSortedStoriesData(locale);
    
    // Transform the data to match the expected format
    const projects = storiesData.map(story => ({
        title: story.title || [""],
        services: story.solutions?.length ? [story.solutions.join(", ")] : [""],
        route: `/work/${story.id}`,
        thumbnail: story.thumbnail || "",
        catchphrase: ""
    }));
    
    return {
        props: {
            projects: projects || []
        }
    };
}

export default function StoriesPage({ projects = [] }) {
    const { locale } = useRouter();
    const $t = getLang(locale);

    return (
        <BaseLayout>
            <HeadSeo
                title={$t.stories.title + ' - ' + siteMetadata.companyName}
                description={$t.stories.ogDescription}
                ogImageUrl={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
                ogTwitterImage={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
            />
            <Page className={styles.storiesPage}>
                <Column number="2" numberS="1" weight="right" className={styles.storiesPage__hero}>
                    <Block className={styles.storiesPage__hero__left}>
                        <div className={styles.storiesPage__hero__left__content}>
                            <h1>{$t.stories.title}</h1>
                            <p>
                                {$t.stories.hero[0]}<br/>
                                {$t.stories.hero[1]}<br/>
                                {$t.stories.hero[2]}<br/>
                                {$t.stories.hero[3]}<br/>
                                {$t.stories.hero[4]}
                            </p>
                        </div>   
                        <div className={styles.storiesPage__hero__left__triangle}>
                            <Image
                                fill
                                src="/triangles/triangle-black--left.svg"
                                alt="blue triangle"
                            />
                        </div>                     
                    </Block>
                    <Block className={styles.storiesPage__hero__right}>
                        <div className={styles.storiesPage__hero__right__code}>
                            <Image
                                fill
                                src="/code--cyan-bg.svg"
                                alt="code"
                            />
                        </div>
                        <div className={styles.storiesPage__hero__right__koi}>
                            <Image
                                fill
                                src="/koi-work.svg"
                                alt="KOI"
                            />
                        </div>
                    </Block>
                </Column>
                <Column>
                    <Block className={styles.storiesPage__storiesBlock}>
                        <div className={styles.storiesPage__storiesGrid}> 
                            {projects.map((project, index) => (
                                <div 
                                    className={`${styles.storiesPage__storiesGrid__item} ${
                                        index % 2 === 0 ? styles.storiesPage__storiesGrid__left : ''
                                    }`} 
                                    key={project.route}
                                >
                                    <Link href={project.route}>
                                        <div>
                                            <div className={styles.storiesPage__storiesGrid__item__img}>
                                                <Image
                                                    fill
                                                    src={`/work/${project.thumbnail}.jpg`}
                                                    alt="project image"
                                                />
                                            </div>                                    
                                            <h2>{project.title[0]}<br/> {project.title[1]}</h2>
                                            <span>{project.services[0]} {project.services[1]}<br/>{project.services[2]}</span>
                                        </div>
                                    </Link>                                    
                                </div> 
                            ))}                                                                                                         
                        </div>
                    </Block>
                </Column> 
            </Page>
        </BaseLayout>
    );
}