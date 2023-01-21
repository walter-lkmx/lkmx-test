import React from "react";
import styles from "@/components/services.module.scss";
import { Block, Column } from "@lkmx/flare-react";
import Image from "next/image";
import Link from "next/link";
import getLang from '@/lang';
import { useRouter } from "next/router";

export default function Services() {
    const { locale } = useRouter();
    const $t = getLang(locale);
    return (
        <Column mode="normal" modeXl="slim" modexS="full"  number="2" numberS="1" weight="left" className={styles.services__column}>
            <Block className={styles.services__column__block}>
                <h2>{$t.servicesComponent.title[0]} <br/>{$t.servicesComponent.title[1]} <br/>{$t.servicesComponent.title[2]}</h2>
                <p>{$t.servicesComponent.paragraph[0]}<br/>{$t.servicesComponent.paragraph[1]}<br/>{$t.servicesComponent.paragraph[2]}</p>
                <Link href="/services" legacyBehavior>
                    <div
                      className={styles.services__btn}
                    >{$t.servicesComponent.btn}</div>
                </Link>
            </Block>
            <Block className={styles.services__column__block}>
            <div className={styles.services__column__image}>
                    <Image
                    priority
                    fill
                    src={"/lkmx-logo-inverted.gif"}
                    alt="glitchy logo"/>
                </div>
            </Block>
        </Column>
    );
}