import React, { useEffect, useState, useRef } from "react";
import BaseLayout from "@/layouts/base-layout.js";
import { Block, Column, Page } from "@lkmx/flare-react";
import styles from "./service.module.scss";
import { useRouter } from 'next/router';
import siteMetadata from "../../meta/siteMetadata";
import HeadSeo from "../../components/HeadSeo";
import getLang from '@/lang';
import Image from "next/image";
import Link from "next/link";
import GoBackBar from "../../components/goBackBar";
import { getServiceData, getSubServices } from '@/lib/content';
import path from 'path';
import { promises as fs } from 'fs';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export async function getStaticPaths({ locales }) {
    const servicesDirectory = path.join(process.cwd(), 'src/content/services');
    const paths = [];

    try {
        // Leer los directorios de servicios principales
        const mainServices = await fs.readdir(servicesDirectory);

        for (const serviceId of mainServices) {
            const serviceDir = path.join(servicesDirectory, serviceId);
            const serviceStat = await fs.stat(serviceDir);

            if (serviceStat.isDirectory()) {
                // Primero, agregar las rutas para los servicios principales
                for (const locale of locales) {
                    const mainMdFilename = locale === 'es' ? 'index.md' : `index.${locale}.md`;
                    const mainMdPath = path.join(serviceDir, mainMdFilename);

                    try {
                        await fs.access(mainMdPath);
                        paths.push({
                            params: {
                                slug: [serviceId]
                            },
                            locale
                        });
                    } catch (error) {
                        continue;
                    }
                }

                // Luego, leer los subdirectorios para los subservicios
                const subServices = await fs.readdir(serviceDir);

                for (const subId of subServices) {
                    const subServicePath = path.join(serviceDir, subId);
                    const subServiceStat = await fs.stat(subServicePath);

                    if (subServiceStat.isDirectory()) {
                        for (const locale of locales) {
                            const mdFilename = locale === 'es' ? 'index.md' : `index.${locale}.md`;
                            const mdPath = path.join(subServicePath, mdFilename);

                            try {
                                await fs.access(mdPath);
                                paths.push({
                                    params: {
                                        slug: [serviceId, subId]
                                    },
                                    locale
                                });
                            } catch (error) {
                                continue;
                            }
                        }
                    }
                }
            }
        }

        return {
            paths,
            fallback: false
        };
    } catch (error) {
        console.error('Error generating paths:', error);
        return {
            paths: [],
            fallback: false
        };
    }
}

export async function getStaticProps({ params, locale }) {
    try {
        const [serviceId, subId] = params.slug;
        
        if (subId) {
            // Caso de subservicio
            const subServiceData = await getServiceData(subId, locale, serviceId);
            const parentServiceData = await getServiceData(serviceId, locale);

            return {
                props: {
                    isSubService: true,
                    serviceData: {
                        id: subId,
                        parentId: serviceId,
                        ...subServiceData,
                    },
                    parentServiceData: {
                        id: serviceId,
                        ...parentServiceData,
                    }
                }
            };
        } else {
            // Caso de servicio principal
            const serviceData = await getServiceData(serviceId, locale);
            const subServices = await getSubServices(serviceId, locale);

            return {
                props: {
                    isSubService: false,
                    serviceData: {
                        id: serviceId,
                        ...serviceData
                    },
                    subServices
                }
            };
        }
    } catch (error) {
        console.error('Error fetching service data:', error);
        return {
            notFound: true
        };
    }
}

export default function Service({ isSubService, serviceData, parentServiceData, subServices }) {
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

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (isSubService) {
        return (
            <BaseLayout>
                <HeadSeo
                    title={`${serviceData.title} - ${siteMetadata.companyName}`}
                    description={serviceData.description || ""}
                    ogImageUrl={$t.home?.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
                    ogTwitterImage={$t.home?.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
                />
                <Page className={styles.service}>
                    <GoBackBar destiny={`/services/${parentServiceData.id}`} />

                    <Column>
                        <Block className={styles.service__heroHeading}>
                            <span>{parentServiceData.title}</span>
                            <h1>{serviceData.title}</h1>
                            {serviceData.description && (
                                <p className={styles.service__description}>{serviceData.description}</p>
                            )}
                        </Block>
                    </Column>

                    {serviceData.cover && (
                        <Column>
                            <Block className={styles.service__heroImgBlock}>
                                <div className={styles.service__heroImg}>
                                    <Image
                                        fill
                                        src={`/services/${serviceData.cover}.jpg`}
                                        alt={serviceData.title}
                                        priority
                                    />
                                </div>
                            </Block>
                        </Column>
                    )}

                    <Column mode="normal" className={styles.service__introduction} weight="left">
                        <Block className={styles.service__introduction__block}>
                            <div className={styles.service__wrapper}>
                                <div id="aside" className={styles.service__asideContainer}>
                                    <div className={styles.service__aside}></div>
                                </div>
                                {serviceData.introduction && (
                                    <div>
                                        <h2>{serviceData.introduction.title}</h2>
                                        <p>{serviceData.introduction.content}</p>
                                    </div>
                                )}
                            </div>
                        </Block>
                    </Column>

                    <Column mode="normal" modeL="slim" className={styles.service__mainContentContainer}>
                        <Block className={styles.service__mainContentContainer__block}>
                            <div
                                ref={targetRef}
                                className={styles.service__mainContent}
                                dangerouslySetInnerHTML={{ __html: serviceData.contentHtml }}
                            />
                        </Block>
                    </Column>
                </Page>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <HeadSeo
                title={`${serviceData.title} - ${siteMetadata.companyName}`}
                description={serviceData.description || ""}
                ogImageUrl={$t.home?.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
                ogTwitterImage={$t.home?.ogImage || (locale === "es" ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
            />
            <Page className={styles.service}>
                <GoBackBar destiny="/services" />
                <Column>
                    <Block className={styles.service__heroHeading}>
                        <span>{serviceData.storyType || "service"}</span>
                        <h1>{serviceData.title}</h1>
                    </Block>
                </Column>
                {serviceData.cover && (
                    <Column>
                        <Block className={styles.service__heroImgBlock}>
                            <div className={styles.service__heroImg}>
                                <Image
                                    fill
                                    src={`/services/${serviceData.cover}.jpg`}
                                    alt={serviceData.title}
                                    priority
                                />
                            </div>
                        </Block>
                    </Column>
                )}
                <Column mode="normal" className={styles.service__introduction} weight="left">
                    <Block className={styles.service__introduction__block}>
                        <div className={styles.service__wrapper}>
                            <div id="aside" className={styles.service__asideContainer}>
                                <div className={styles.service__aside}></div>
                            </div>
                            <div>
                                <h2>{serviceData.introduction?.title}</h2>
                                <p>{serviceData.description}</p>
                            </div>
                        </div>
                    </Block>
                </Column>

                <Column mode="normal" modeL="slim" className={styles.service__mainContentContainer}>
                    <Block className={styles.service__mainContentContainer__block}>
                        <div
                            ref={targetRef}
                            className={styles.service__mainContent}
                            dangerouslySetInnerHTML={{ __html: serviceData.contentHtml }}
                        />
                    </Block>
                </Column>

                {serviceData.isMainCategory && subServices.length > 0 && (
                    <Column mode="normal" className={styles.service__subServices}>
                        <Block>
                            <h2>Our Services</h2>
                            <div className={styles.service__subServices__grid}>
                                {subServices.map((subService) => (
                                    <div key={subService.id} className={styles.service__subServices__item}>
                                        <Link href={`/services/${serviceData.id}/${subService.id}`}>
                                            <h3>{subService.title}</h3>
                                            <p>{subService.description}</p>
                                            <div className={styles.service__subServices__arrow}>
                                                <Image 
                                                    width={24} 
                                                    height={24} 
                                                    src="/icons/arrow-right--pink.svg" 
                                                    alt="arrow" 
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Block>
                    </Column>
                )}
            </Page>
        </BaseLayout>
    );
}