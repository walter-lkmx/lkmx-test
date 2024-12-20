import React, { useEffect, useState } from "react";
import styles from "@/components/footer.module.scss";
import Link from "next/link";
import { Column, Block } from "@lkmx/flare-react";
import getLang from "@/lang";
import { useRouter } from "next/router";
import siteMetadata from "../meta/siteMetadata";
import Image from "next/image";

const SocialIcon = ({ href, icon, alt }) => {
  const containerClass =
    styles[`footer__top__content__information__logo__${icon}Container`];
  const iconClass = styles[`footer__top__content__information__logo__${icon}`];
  const hoverClass =
    styles[`footer__top__content__information__logo__${icon}Hover`];

  return (
    <Link href={href} target="_blank">
      <div className={containerClass}>
        <Image
          fill
          src={`/icons/social-${icon}.svg`}
          alt={alt}
          className={iconClass}
        />
        <Image
          fill
          src={`/icons/social-${icon}-hover.svg`}
          alt={alt}
          className={hoverClass}
        />
      </div>
    </Link>
  );
};

const FooterSection = ({ title, items = [], singleItem = null }) => {
  return (
    <div>
      <h2>{title}</h2>
      {singleItem ? (
        <ul>
          <li>
            <Link href={singleItem.route}>{singleItem.title}</Link>
          </li>
        </ul>
      ) : (
        <ul>
          {items?.map((item, index) => (
            <li
              key={`${item.route || ""}-${index}`}
              className={item.isMainService ? styles.mainService : ""}
            >
              <Link href={item.route || "#"}>{item.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Footer() {
  const { locale } = useRouter();
  const $t = getLang(locale);
  const [services, setServices] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/footer-data?locale=${locale}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setServices(data.services || []);
        setIndustries(data.industries || []);
        setSolutions(data.solutions || []);
      } catch (error) {
        console.error("Error loading footer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  const socialIcons = [
    { href: siteMetadata.instagram, icon: "instagram", alt: "Instagram" },
    { href: siteMetadata.twitter, icon: "twitter", alt: "Twitter" },
    { href: siteMetadata.linkedin, icon: "linkedin", alt: "LinkedIn" },
  ];

  const servicesItems = services;
  const industriesItems = industries;
  const solutionsItems = solutions;

  const technologyItem = {
    route: "/technology",
    title: locale === "es" ? "Innovación digital" : "Digital innovation",
  };

  const workItem = {
    route: "/work",
    title: locale === "es" ? "Casos de éxito" : "Success stories",
  };

  const teamItem = {
    route: "/team",
    title: locale === "es" ? "Nuestro talento" : "Our talent",
  };

  const legalItems = [
    {
      route: "/privacy-policy",
      title: locale === "es" ? "Aviso de Privacidad" : "Privacy Policy",
    },
    {
      route: "/terms-conditions",
      title: locale === "es" ? "Términos y Condiciones" : "Terms & Conditions",
    },
  ];

  return (
    <footer className={styles.footer}>
      <Column className={styles.footer__top}>
        <Block className={styles.footer__top__block}>
          <div className={styles.footer__top__content}>
            <div className={styles.footer__top__content__pages}>
              <FooterSection
                title={locale === "es" ? "SERVICIOS" : "SERVICES"}
                items={servicesItems}
              />
              <FooterSection
                title={locale === "es" ? "INDUSTRIAS" : "INDUSTRIES"}
                items={industriesItems}
              />
              <FooterSection
                title={locale === "es" ? "SOLUCIONES" : "SOLUTIONS"}
                items={solutionsItems}
              />
              <div className={styles.footer__sectionGrouper}>
                <FooterSection
                  title={locale === "es" ? "TECNOLOGÍA" : "TECHNOLOGY"}
                  singleItem={technologyItem}
                />
                <FooterSection
                  title={locale === "es" ? "TRABAJO" : "WORK"}
                  singleItem={workItem}
                />
                <FooterSection
                  title={locale === "es" ? "LEGAL" : "LEGAL"}
                  items={legalItems}
                />
              </div>
            </div>
          </div>
        </Block>

        <Block className={styles.footer__top__privacy}>
          <div className={styles.footer__top__content__information}>
            <Link href="/">
              <Image
                fill
                src="/lkmx-logotype--white.svg"
                alt="Logo"
                className={styles.footer__top__content__information__logo}
              />
            </Link>

            <ul>
              {socialIcons.map((icon, index) => (
                <li key={index}>
                  <SocialIcon {...icon} />
                </li>
              ))}
            </ul>

            <p>
              {$t.footer.paragraph[0]} <br />
              {$t.footer.paragraph[1]} <br />
              {$t.footer.paragraph[2]}
            </p>
          </div>

        </Block>
      </Column>
    </footer>
  );
}
