import React from "react";
import styles from "@/components/footer.module.scss";
import Link from "next/link";
import moment from "moment"; 
import { Column, Block } from "@lkmx/flare-react";
import getLang from '@/lang';
import { useRouter } from "next/router";
import siteMetadata from "../meta/siteMetadata";
import Image from "next/image"

export default function Footer() {
  const year = moment().year();
  const { locale } = useRouter();
  const $t = getLang(locale);

  return (
    <footer className={styles.footer}>
      <Column className={styles.footer__top}>
        <Block className={styles.footer__top__block}>
          <div className={styles.footer__top__content}>
            <div className={styles.footer__top__content__pages}>
              <div>
                <h2>{$t.footer.pages.services.title}</h2>
                <ul>
                  <li><Link href="/services" legacyBehavior>{$t.footer.pages.services.items[0]}</Link></li>
                  <li><Link href="/services/discovery" legacyBehavior>{$t.footer.pages.services.items[1]}</Link></li>
                  <li><Link href="/services/agileDevelopment" legacyBehavior>{$t.footer.pages.services.items[2]}</Link></li>
                  <li><Link href="/services/agileMaintenance" legacyBehavior>{$t.footer.pages.services.items[3]}</Link></li>
                  <li><Link href="/services/scopeDevelopment" legacyBehavior>{$t.footer.pages.services.items[4]}</Link></li>
                  <li><Link href="/services/continuousSupport" legacyBehavior>{$t.footer.pages.services.items[5]}</Link></li>
                </ul>
              </div>
              <div> 
                <h2>{$t.footer.pages.methodology.title}</h2>
                <ul>
                  <li><Link href="/industries" legacyBehavior>{$t.footer.pages.methodology.items[0]}</Link></li>
                  {/* <li>{$t.footer.pages.methodology.items[1]}</li>
                  <li>{$t.footer.pages.methodology.items[2]}</li>
                  <li>{$t.footer.pages.methodology.items[3]}</li> */}
                </ul>
              </div>
              <div> 
                <h2>{$t.footer.pages.technology.title}</h2>
                <ul>
                  
                  <li><Link href="/technology" legacyBehavior>{$t.footer.pages.technology.items[0]}</Link></li>
                  {/* <li>{$t.footer.pages.technology.items[1]}</li>
                  <li>{$t.footer.pages.technology.items[2]}</li>
                  <li>{$t.footer.pages.technology.items[3]}</li> */}
                </ul>
              </div>
            </div>
            <div className={styles.footer__top__content__information}>
              <Link href="/">
                <Image fill src="/lkmx-logotype--white.svg" alt="Logo" className={styles.footer__top__content__information__logo}/>
              </Link>
              <ul>
                <li>
                  <Link href={siteMetadata.instagram} passHref target="_blank">
                    <div className={styles.footer__top__content__information__logo__instaContainer}>
                      <Image fill src="/icons/social-instagram.svg" alt="Instagram" className={styles.footer__top__content__information__logo__insta}/>
                      <Image fill src="/icons/social-instagram-hover.svg" alt="Instagram" className={styles.footer__top__content__information__logo__instaHover}/>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={siteMetadata.twitter} target="_blank">
                    <div className={styles.footer__top__content__information__logo__twitterContainer}>
                      <Image fill src="/icons/social-twitter.svg" alt="Twitter" className={styles.footer__top__content__information__logo__twitter}/>
                      <Image fill src="/icons/social-twitter-hover.svg" alt="Twitter" className={styles.footer__top__content__information__logo__twitterHover}/>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={siteMetadata.linkedin} target="_blank">
                    <div className={styles.footer__top__content__information__logo__linkedinContainer}>
                      <Image fill src="/icons/social-linkedin.svg" alt="Linkedin" className={styles.footer__top__content__information__logo__linkedin}/>
                      <Image fill src="/icons/social-linkedin-hover.svg" alt="Linkedin" className={styles.footer__top__content__information__logo__linkedinHover}/>
                    </div>
                  </Link>
                </li>
              </ul>
              <p>{$t.footer.paragraph[0]} <br/>{$t.footer.paragraph[1]} <br/>{$t.footer.paragraph[2]}</p>
            </div>
          </div>
        </Block>
        <Block className={styles.footer__top__privacy}>
          <Link href={"/privacy-policy"} className={styles.footer__top__privacy__anchor}>{$t.footer.privacy}</Link>  
          <Link href={"/terms-conditions"} className={styles.footer__top__privacy__anchor}>{$t.footer.terms_conditions}</Link>
        </Block>
      </Column>
    </footer>
  );
}