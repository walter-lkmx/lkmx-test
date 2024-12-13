import React from 'react';
import BaseLayout from '@/layouts/base-layout.js';
import styles from './index.module.scss';
import { Page, Block, Column } from '@lkmx/flare-react';
import getLang from '@/lang';
import siteMetadata from '../../meta/siteMetadata';
import HeadSeo from '../../components/HeadSeo';
import { useRouter } from 'next/router';
import Image from "next/image";
import IndustriesAnchors from '../../components/industriesAnchors';

export default function TechnologyPage() {
  const { locale } = useRouter();
  const $t = getLang(locale);
  const industriesCat = $t.industries.catalogItems

  return (
    <BaseLayout>
      <HeadSeo
        title={$t.industries.title + ' - ' + siteMetadata.companyName}
        description={$t.industries.ogDescription}
        ogImageUrl={
          $t.home.ogImage
            ? $t.home.ogImage
            : locale === 'es'
            ? siteMetadata.ogDefaultImageEs
            : siteMetadata.ogDefaultImageEn
        }
        ogTwitterImage={
          $t.home.ogImage
            ? $t.home.ogImage
            : locale === 'es'
            ? siteMetadata.ogDefaultImageEs
            : siteMetadata.ogDefaultImageEn
        }
      />
      <Page className={styles.industries}>
        <Column
          number="2"
          numberS="1"
          className={styles.industries__hero}
          weight="normal"
          weightXl="right"
          modeXl="normal"
          modeL="normal"
          modeM="full"
          mode="full"
        >
          <Block className={styles.industries__hero__block__left}>            
              <div className={styles.industries__hero__block__left__content}>
                <h2>{$t.industries.title}</h2>
                <p>{$t.industries.hero[0]}</p>
              </div>
          </Block>
          <Block className={styles.industries__hero__block}>
            <div className={styles.industries__hero__block__right}>
              <div className={styles.industries__hero__block__right__waves}>
              <Image
                  fill             
                  priority={true}
                  src="/industries/wave.svg" alt="waves"
                />
              </div>   
              <div className={styles.industries__hero__block__right__cyan}></div>
              <div>
                <Image
                  fill
                  src="/circle--pink.svg"
                  alt="ellipse"
                  className={styles.industries__hero__block__right__elipse}
                />
              </div>                         
            </div>
          </Block>
        </Column>

        <Column modeM="normal" className={styles.industries__intro}>
          <Block className={styles.industries__intro__block}>
            <div className={styles.lkContainer}>
            <h2>{$t.industries.catalogTitle}</h2>
              <p>
                {$t.industries.intro}
              </p>
            </div>
          </Block>
        </Column>
        <IndustriesAnchors anchorsData={industriesCat}/>     
      </Page>
    </BaseLayout>
  );
}