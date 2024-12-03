import React from 'react';
import BaseLayout from '@/layouts/base-layout.js';
import { Block, Column, Page } from '@lkmx/flare-react';
import getLang from '@/lang';
import styles from './index.module.scss';
import siteMetadata from '../meta/siteMetadata';
import HeadSeo from '../components/HeadSeo';
import technologies from '@/service/json/technologies';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageLegacy from 'next/legacy/image';
import Image from 'next/image';
import OurWork from '../components/ourWork';
import Industries from '../components/industriesComponent';

function getTeamList() {
  let r = require.context('/public/images', false, /\.(png|jpe?g|svg)$/);
  return r
    .keys()
    .map((n) => {
      return {
        fileName: n.replace(/\.\//, ''),
        name: n.replace(/\.\/_\d*_/, '').replace(/\.jpg/, ''),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default function Index() {
  // const canvasRef = useRef();
  const { locale } = useRouter();
  const $t = getLang(locale);
  const pictures = getTeamList();
  const fallbackBlurImage =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAKAAoDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9OP2vv+Cy3wV+H/7fvw08BWWg65qnhf4J6++geNdd0/XJrK3m1PWnSzleHTov9Gvray80+YbgneVYIV4NAH9DWmeOfht4h03T9fsNb05rHXLK01iyY3CAtaanBHe2zEc4JhnQnk896d33f3gfxD/E7wv4avdZ/ax1a88O6Fd6pF8Q5hFqVzpNhPqEe3VIyuy8lt3uEwSSNsgwSSOaQH9I3wshhHwx+HIEUQA8B+EAAI0AAHh/T8ADHAFAAP/Z';

  pictures.forEach((e, index) => {
    //TODO: Hacer esto automatico para que agregue los espacios cada 20 fotos.
    if (index + 1 == 10 || index + 1 == 30 || index + 1 == 50) {
      pictures.splice(
        index,
        0,
        { fileName: null, name: null },
        { fileName: null, name: null }
      );
    }
  });
  return (
    <BaseLayout>
      <HeadSeo
        title={$t.home.title + " - " + siteMetadata.companyName}
        description={$t.home.ogDescription}
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

      <Page className={styles.index}>
        <Column mode="normal" className={styles.index__hero}>
          <Block className={styles.index__hero__block}>
            <div className={styles.index__hero__block__content}>
              <div className={styles.index__hero__block__content__left}>
                <h1>
                  {$t.home.title2[0]}
                  <br />
                  {$t.home.title2[1]}
                </h1>
                <p>
                  {$t.home.hero[0]} <br />
                  {$t.home.hero[1]} <br />
                  {$t.home.hero[2]} <br />
                  {$t.home.hero[3]}
                </p>
              </div>
              <div className={styles.index__hero__block__content__right}>
                <div
                  className={
                    styles.index__hero__block__content__right__imgContainer
                  }
                >
                  <Image
                    fill
                    src="/dragon-home.svg"
                    alt="LKMX - Dragon"
                    priority
                  />
                </div>
              </div>
            </div>
          </Block>
        </Column>

        <Column mode="normal" modeM="full" className={styles.index__services}>
          <Block className={styles.index__services__block}>
            <div className={styles.index__services__block__content}>
              <div className={styles.index__services__block__content__left}>
                <div>
                  <h2>{$t.home.servicesTitle}</h2>
                  <p>
                    {$t.home.services[0]} <strong>{$t.home.services[1]}</strong>{" "}
                    <br />
                    {$t.home.services[2]}{" "}
                    <strong
                      className={
                        styles.index__services__block__content__left__cyan
                      }
                    >
                      {$t.home.services[3]}
                    </strong>
                    {$t.home.services[4]} <br />
                    {$t.home.services[5]} <br />
                    {$t.home.services[6]}
                    <br />
                    {$t.home.services[7]} <br />
                    {$t.home.services[8]}
                  </p>
                  <Link href="/services" legacyBehavior>
                    <div
                      className={
                        styles.index__services__block__content__left__btn
                      }
                    >
                      {$t.home.buttons.btnServices}
                    </div>
                  </Link>
                </div>
              </div>
              <div className={styles.index__services__block__content__right}>
                <div
                  className={
                    styles.index__services__block__content__right__imgWrapper
                  }
                >
                  <Image
                    fill
                    src="/triangles/triangle-waves--cyan--left.svg"
                    alt="LKMX - Hero"
                    className={
                      styles.index__services__block__content__right__triangleLeft
                    }
                  />
                </div>
                <div
                  className={
                    styles.index__services__block__content__right__imgWrapper
                  }
                >
                  <Image
                    fill
                    src="/triangles/triangle-code--blue--right.svg"
                    alt="LKMX - Hero"
                    className={
                      styles.index__services__block__content__right__triangleRight
                    }
                  />
                </div>
              </div>
            </div>
          </Block>
        </Column>

        <Column className={styles.index__technologies} mode="normal">
          <Block className={styles.index__technologies__block}>
            <div className={styles.index__technologies__block__title}>
              <h2>{$t.home.technologiesTitle}</h2>
              <p>{$t.home.technologies[0]}</p>
              <p>{$t.home.technologies[1]}</p>
            </div>
            <div className={styles.index__technologies__block__logos}>
              {technologies.map((rows, indexRow) => {
                return (
                  <div
                    key={`technology-row-${indexRow}`}
                    className={`${
                      styles.index__technologies__block__logos__row
                    } ${styles[`row-${indexRow}`]}`}
                  >
                    {rows.map((technology, indexColumn) => {
                      return (
                        <div
                          className={styles.logoContainer}
                          key={`technology-column-${indexColumn}`}
                          style={{ gridArea: `a${indexColumn}` }}
                        >
                          <ImageLegacy
                            layout="fill"
                            src={`/technologies/${technology}`}
                            alt={technology}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </Block>
        </Column>

        <OurWork />

        <Column  mode="normal">
          <Block >
            <div >
              <h2>{$t.home.gcloudTitle}</h2>
              <p>{$t.home.gcloudParagraph}</p>
              
            </div>
          </Block>
          <Block >
            <div >
              <h2>{$t.home.gcloudTitle}</h2>
              <p>{$t.home.gcloudParagraph}</p>
              
            </div>
          </Block>
          
        </Column>

        <Industries />
        <Column className={styles.index__team} mode="full">
          <Block className={styles.index__team__block}>
            <div className={styles.index__team__block__content}>
              <div className={styles.index__team__block__content__koiContainer}>
                <Image
                  fill
                  src="/koi-swimming.svg"
                  className={styles.index__team__block__content__koi}
                  alt="LKMX - Koi"
                />
              </div>
              <div className={styles.index__team__block__content__text}>
                <p>
                  {$t.home.team[0]}
                  <br
                    className={styles.index__team__block__content__text__sbr}
                  />{" "}
                  <strong>{$t.home.team[1]}</strong> {$t.home.team[2]}{" "}
                  <strong
                    className={styles.index__team__block__content__text__pink}
                  >
                    {" "}
                    {$t.home.team[3]}
                  </strong>{" "}
                  {$t.home.team[4]} <br />
                  {$t.home.team[5]} <br />
                  {$t.home.team[6]}
                </p>
                <Link href="/team" legacyBehavior>
                  <div className={styles.index__team__block__content__btn}>
                    {$t.home.buttons.btnTeam}
                  </div>
                </Link>
              </div>
              <div className={styles.index__team__block__content__collabs}>
                {pictures.map((picture, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        picture.fileName
                          ? styles.index__team__block__content__collabs__collabItem
                          : styles["index__team__block__content__card-empty"]
                      }`}
                    >
                      {picture.fileName ? (
                        <ImageLegacy
                          layout={"fill"}
                          placeholder="blur"
                          blurDataURL={fallbackBlurImage}
                          src={`/images/${picture.fileName}`}
                          alt={picture.name}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Block>
        </Column>
      </Page>
    </BaseLayout>
  );
}
