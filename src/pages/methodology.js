import React from "react";
import BaseLayout from "@/layouts/base-layout.js";
import { Block, Column, Page } from "@lkmx/flare-react";
import getLang from '@/lang';
import siteMetadata from "../meta/siteMetadata"
import HeadSeo from "../components/HeadSeo"
import { useRouter } from "next/router";

export default function MethodologyPage() {

  const { locale } = useRouter();
  const $t = getLang(locale);

  return (
    <BaseLayout>
      <HeadSeo
        title={$t.methodology.title}
        description={$t.methodology.ogDescription}
        ogImageUrl={"https://iili.io/H9S6dIj.jpg"}
        ogTwitterImage={`https://iili.io/H9S6dIj.jpg`}
        ogType={siteMetadata.ogType}
      />
      <Page>
        <Column>
          <Block>
            <h1>Metodología</h1>
          </Block>
        </Column>
      </Page>
    </BaseLayout>
  );
}