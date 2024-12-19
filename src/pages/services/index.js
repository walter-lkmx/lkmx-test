import React from "react";
import BaseLayout from "@/layouts/base-layout.js";
import Banner from "@/components/banner.js";
import styles from "./index.module.scss";
import { Block, Column, Page } from "@lkmx/flare-react";
import getLang from "@/lang";
import siteMetadata from "../../meta/siteMetadata";
import HeadSeo from "../../components/HeadSeo";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getServicesIndexed } from "@/lib/content";

export async function getStaticProps({ locale }) {
  try {
    // Obtener solo los servicios principales
    const services = await getServicesIndexed(locale);
    return {
      props: {
        services: services || [],
      },
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      props: {
        services: [],
      },
    };
  }
}

export default function ServicesPage({ services = [] }) {
  const { locale } = useRouter();
  const $t = getLang(locale);

  return (
    <BaseLayout>
      <HeadSeo
        title={$t.services.title + " - " + siteMetadata.companyName}
        description={$t.services.ogDescription}
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

      <Page className={styles.page}>
        <Column
          number={2}
          numberS={1}
          className={styles.page__services}
          weight="right"
          weightS="Normal"
          modeXl="normal"
          modeL="full"
          modeM="full"
        >
          <Block className={styles.page__services__block}>
            <div className={styles.page__services__content}>
              <h1>{$t.services.title}</h1>
              <p>
                {$t.services.hero[0]} <strong>{$t.services.hero[1]}</strong>{" "}
                {$t.services.hero[2]} <strong>{$t.services.hero[3]}</strong>,{" "}
                {$t.services.hero[4]}.
              </p>
            </div>
          </Block>
          <Block className={styles.page__services__dragon}>
            <div className={styles.page__services__dragon__content}>
              <div
                className={
                  styles.page__services__dragon__content__elipseContainer
                }
              >
                <Image
                  fill
                  priority
                  src="/dragonServices.svg"
                  alt="ellipse"
                  className={
                    styles.page__services__dragon__content__elipseContainer__elipse
                  }
                />
              </div>
            </div>
          </Block>
        </Column>

        <Banner>
          <div className={styles.page__about}>
            <div>
              <p>{$t.services.banner[0]}</p>
              <div>
                <h3>{$t.services.banner[1]},</h3>
                <p>{$t.services.banner[2]}.</p>
              </div>
            </div>
            <p>{$t.services.banner[3]}.</p>
          </div>
        </Banner>

        {/* <Column mode="full" className={styles['page__phases-links']}>
          <Block className={styles.page__phasesBox}>
            <div>
              <div className={styles.page__phases}>
                <div className={styles.page__phases__discovery}>
                  <Link href="/services/discovery" legacyBehavior>
                    <Image
                      fill
                      src="/phases/discovery_default.svg"
                      alt="discovery"
                    />
                  </Link>
                </div>
                <div className={styles.page__phases__agileDev}>
                  <Link href="/services/agileDevelopment" legacyBehavior>
                    <Image
                      fill
                      src="/phases/agile-dev_default.svg"
                      alt="discovery"
                    />
                  </Link>                  
                </div>
                <div className={styles.page__phases__agileMain}>
                  <Link href="/services/agileMaintenance" legacyBehavior>
                    <Image
                      fill
                      src="/phases/agile-maintenance_default.svg"
                      alt="discovery"
                    />
                  </Link>                  
                </div>
                <div className={styles.page__phases__scopeDev}>
                  <Link href="/services/scopeDevelopment" legacyBehavior>
                    <Image
                      fill
                      src="/phases/scope-dev_default.svg"
                      alt="discovery"
                    />
                  </Link>                  
                </div>
                <div className={styles.page__phases__contSup}>
                  <Link href="/services/continuousSupport" legacyBehavior>
                    <Image
                      fill
                      src="/phases/cont-support_default.svg"
                      alt="discovery"
                    />
                  </Link>                  
                </div>
              </div>              
              <div className={styles['page__phases-links__arrow']}>
                <div></div>
              </div>
            </div>
          </Block>
        </Column> */}

        <Column
          numberS={1}
          modeL="normal"
          modeS="full"
          className={styles.page__phases2}
        >
          <Block className={styles.page__phases__block}>
            <div className={styles.page__services__cards}>
              {Array.isArray(services) &&
                services.map((service, index) => (
                  <div
                    key={"/" + service.route || index}
                    className={styles.page__services__card}
                  >
                    <Link href={service.route || "#"} legacyBehavior>
                      <div className={styles.page__services__card__content}>
                        <div className={styles.page__services__card__icon}>
                          <Image
                            src={`/icons/${service.iconName}.svg`}
                            width={32}
                            height={32}
                            alt={service.title}
                          />
                        </div>
                        <h3>{service.title || ""}</h3>
                        <p>{service.description || ""}</p>
                        <div className={styles.page__services__card__arrow}>
                          <Image
                            width={24}
                            height={24}
                            src="/icons/arrow-right--pink.svg"
                            alt="arrow"
                          />
                        </div>
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
