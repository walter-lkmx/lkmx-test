// Ruta del archivo: src/pages/solutions/index.js

import React from 'react';
import BaseLayout from '@/layouts/base-layout.js';
import styles from './index.module.scss';
import { Page, Block, Column } from '@lkmx/flare-react';
import getLang from '@/lang';
import siteMetadata from '../../meta/siteMetadata';
import HeadSeo from '../../components/HeadSeo';
import { useRouter } from 'next/router';
import Image from "next/image";
import { getIndustriesIndexed, getIndustryData, getAllIndustriesIds } from '@/lib/content'
import SolutionsAnchors from '../../components/solutionsAnchors';

export async function getStaticProps({ locale }) {
  const solutions = getSolutionsIndexed(locale);
  
  return {
    props: {
      solutions
    }
  };
}

export default function SolutionsPage({ solutions = [] }) {
  const { locale } = useRouter();
  const $t = getLang(locale);

  return (
    <BaseLayout>
      <HeadSeo
        title={`${$t.solutions.title} - ${siteMetadata.companyName}`}
        description={$t.solutions.ogDescription}
        ogImageUrl={$t.home?.ogImage || (locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
        ogTwitterImage={$t.home?.ogImage || (locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn)}
      />
      <Page className={styles.solutions}>
        <Column
          number="2"
          numberS="1"
          className={styles.solutions__hero}
          weight="normal"
          weightXl="right"
          modeXl="normal"
          modeL="normal"
          modeM="full"
          mode="full"
        >
          <Block className={styles.solutions__hero__block__left}>            
            <div className={styles.solutions__hero__block__left__content}>
              <h2>{$t.solutions.title}</h2>
              <p>{$t.solutions.hero[0]}</p>
            </div>
          </Block>
          <Block className={styles.solutions__hero__block}>
            <div className={styles.solutions__hero__block__right}>
              <div className={styles.solutions__hero__block__right__waves}>
                <Image
                  fill             
                  priority={true}
                  src="/industries/wave.svg" 
                  alt="Wave decoration"
                />
              </div>   
              <div className={styles.solutions__hero__block__right__cyan}></div>
              <div>
                <Image
                  fill
                  src="/circle--pink.svg"
                  alt="Circle decoration"
                  className={styles.solutions__hero__block__right__elipse}
                />
              </div>                         
            </div>
          </Block>
        </Column>

        <Column modeM="normal" className={styles.solutions__intro}>
          <Block className={styles.solutions__intro__block}>
            <div className={styles.lkContainer}>
              <h2>{$t.solutions.catalogTitle}</h2>
              <p>{$t.solutions.catalogDescription}</p>
            </div>
          </Block>
        </Column>

        {solutions && solutions.length > 0 && (
          <SolutionsAnchors anchorsData={solutions} />
        )}
      </Page>
    </BaseLayout>
  );
}