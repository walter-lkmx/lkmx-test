import React from 'react';
import BaseLayout from '@/layouts/base-layout.js';
import styles from './biometricSensors.module.scss';
import { Page, Block, Column } from '@lkmx/flare-react';
import getLang from '@/lang';
import siteMetadata from '../../meta/siteMetadata';
import HeadSeo from '../../components/HeadSeo';
import { useRouter } from 'next/router';
import GoBackBar from "../../components/goBackBar";
import CapabilitiesAnchors from "../../components/capabilitiesAchors";
import Services from "../../components/services";


export default function BiometricSensors() {
  const { locale } = useRouter();
  const $t = getLang(locale);
  const capabilityContents = $t.biometricSensors.sections;
  
  return(
    <BaseLayout>
    <HeadSeo
        title={$t.biometricSensors.hero.span +  ' - ' + siteMetadata.companyName}
        description={$t.biometricSensors.hero.intro}
        ogImageUrl={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
        ogTwitterImage={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
    />
    <Page className={styles.sensors}>
        <GoBackBar destiny={"/industries"}/>
        <Column className={styles.sensors__hero}>
            <Block className={styles.sensors__hero__block}>
                <span>{$t.biometricSensors.hero.span}</span>
                <h1>{$t.biometricSensors.hero.title}</h1>
                <p>{$t.biometricSensors.hero.intro}</p>
            </Block>
        </Column>
        <CapabilitiesAnchors anchorsData={capabilityContents}/>
        <Services/>
    </Page>
  </BaseLayout>
  );
}