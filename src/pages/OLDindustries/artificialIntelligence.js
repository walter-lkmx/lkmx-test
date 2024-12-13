import React from 'react';
import BaseLayout from '@/layouts/base-layout.js';
import styles from './artificialIntelligence.module.scss';
import { Page, Block, Column } from '@lkmx/flare-react';
import getLang from '@/lang';
import siteMetadata from '../../meta/siteMetadata';
import HeadSeo from '../../components/HeadSeo';
import { useRouter } from 'next/router';
import GoBackBar from "../../components/goBackBar";
import CapabilitiesAnchors from "../../components/capabilitiesAchors";
import Services from "../../components/services";

export default function ArtificialIntelligence() {
    const { locale } = useRouter();
    const $t = getLang(locale);
    const capabilityContents = $t.artificial.sections;
    return(
        <BaseLayout>
            <HeadSeo
            title={$t.artificial.hero.span +  ' - ' + siteMetadata.companyName}
            description={$t.artificial.hero.intro}
            ogImageUrl={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
            ogTwitterImage={$t.home.ogImage ? $t.home.ogImage : locale === 'es' ? siteMetadata.ogDefaultImageEs : siteMetadata.ogDefaultImageEn}
            />
            <Page className={styles.artificial}>
                <GoBackBar destiny={"/industries"}/>
                <Column className={styles.artificial__hero}>
                    <Block className={styles.artificial__hero__block}>
                        <span>{$t.artificial.hero.span}</span>
                        <h1>{$t.artificial.hero.title}</h1>
                        <p>{$t.artificial.hero.intro}</p>
                    </Block>
                </Column>
                <CapabilitiesAnchors anchorsData={capabilityContents}/>
                <Services/>
            </Page>
        </BaseLayout>
    );
}