import React from 'react';
import BaseLayout from '@/layouts/base-layout.js';
import styles from './mobileApps.module.scss';
import { Page, Block, Column } from '@lkmx/flare-react';
import getLang from '@/lang';
import siteMetadata from '../../meta/siteMetadata';
import HeadSeo from '../../components/HeadSeo';
import { useRouter } from 'next/router';
import GoBackBar from "../../components/goBackBar";
import CapabilitiesAnchors from "../../components/capabilitiesAchors";
import Services from "../../components/services";

export default function MobileApps() {
    const { locale } = useRouter();
    const $t = getLang(locale);
    const capabilityContents = $t.mobileApps.sections;
    return (
        <BaseLayout>
            <HeadSeo
            title={$t.mobileApps.hero.span +  ' - ' + siteMetadata.companyName}
            description={$t.mobileApps.hero.intro}
            ogImageUrl={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
            ogTwitterImage={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
            />
            <Page className={styles.apps}>
            <GoBackBar destiny={"/industries"}/>
                <Column className={styles.apps__hero}>
                <Block className={styles.apps__hero__block}>
                    <span>{$t.mobileApps.hero.span}</span>
                    <h1>{$t.mobileApps.hero.title}</h1>
                    <p>{$t.mobileApps.hero.intro}</p>
                </Block>
                </Column>
                <CapabilitiesAnchors anchorsData={capabilityContents}/>
                <Services/>
            </Page>
        </BaseLayout>
    );
}
