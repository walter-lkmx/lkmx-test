import React from 'react';
import Link from 'next/link';
import styles from '@/components/pages-links.module.scss';
import getLang from '@/lang';
import { useRouter } from 'next/router';
import Image from 'next/image';
import enContent from '@/lang/tranlations/en';

export default function PagesLinks(props) {
  const lang = {
    es: 'ES',
    en: 'EN',
  };

  const { locale, locales, asPath } = useRouter();
  const $t = getLang(locale);
  const navPath = enContent.header

  return (
    <div className={`${styles.headerNavigation}`}>
      <nav
        className={`${styles.links} ${props.className} ${
          props.whiteColor ? styles['white-color'] : ''
        }`}
      >
        <Link href="/services" legacyBehavior>
          <a
            className={`${styles.links__nav} ${
              asPath.includes(navPath.module1.toLowerCase()) ? styles.links__nav__active : ''
            }`}
          >
            {$t.header.module1}
          </a>
        </Link>

        <Link href="/industries" legacyBehavior>
          <a
            className={`${styles.links__nav} ${
              asPath.includes(navPath.module6.toLowerCase()) ? styles.links__nav__active : ''
            }`}
          >
            {$t.header.module6}
          </a>
        </Link>


        <Link href="/solutions" legacyBehavior>
          <a
            className={`${styles.links__nav} ${
              asPath.includes(navPath.module7.toLowerCase()) ? styles.links__nav__active : ''
            }`}
          >
            {$t.header.module7}
          </a>
        </Link>

        <Link href="/technology" legacyBehavior>
          <a
            className={`${styles.links__nav} ${
              asPath.includes(navPath.module3.toLowerCase()) ? styles.links__nav__active : ''
            }`}
          >
            {$t.header.module3}
          </a>
        </Link>

        <Link href="/work" legacyBehavior>
          <a
            className={`${styles.links__nav} ${
              asPath.includes(navPath.module4.toLowerCase()) ? styles.links__nav__active : ''
            }`}
          >
            {$t.header.module4}
          </a>
        </Link>

        <Link
          className={asPath.includes(
            $t.header.module5.toLowerCase() ? styles.links__nav__active : ''
          )}
          href="/team"
          legacyBehavior
        >
          <a
            className={`${styles.links__nav} ${
              asPath.includes(navPath.module5.toLowerCase()) ? styles.links__nav__active : ''
            }`}
          >
            {$t.header.module5}
          </a>
        </Link>
      </nav>
      <div className={`${styles.actions}`}>
        <div className={styles.actions__imgContainer}>
          <Image fill src="/icons/icon-globe.svg" alt="Language" />
        </div>
        {locales.map((l, i) => {
          return (
            <span key={i} className={l === locale ? styles.active : ''}>
              <Link href={asPath} locale={l} legacyBehavior>
                {lang[l]}
              </Link>
            </span>
          );
        })}
      </div>
    </div>
  );
}
