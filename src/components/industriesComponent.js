import React, { useEffect, useState } from "react";
import styles from "@/components/industriesComponent.module.scss";
import { Block, Column } from "@lkmx/flare-react";
import Image from "next/image";
import Link from "next/link";
import getLang from "@/lang";
import { useRouter } from "next/router";

export default function IndustriesComponent() {
  const { locale } = useRouter();
  const $t = getLang(locale);
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    fetch(`/api/footer-data?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => setIndustries(data.industries))
      .catch((error) => console.error("Error:", error));
  }, [locale]);

  return (
    <Column className={styles.industries}>
      <Block className={styles.industriesblock}>
        <h2>{$t.industriesComponent.title}</h2>
        <p>
          {$t.industriesComponent.par[0]} <br />
          {$t.industriesComponent.par[1]} <br />
          {$t.industriesComponent.par[2]}
        </p>
        <div className={styles.industriesblockgrid}>
          {Array.isArray(industries) &&
            industries.map((industry, index) => (
              <Link
                href={industry.route}
                key={index}
                className={styles.industriescard}
              >
                <div className={styles.industriescardcontent}>
                  <div className={styles.industriescardicon}>
                    <Image
                      width={32}
                      height={32}
                      src={`/icons/${industry.iconName}.svg`}
                      alt={industry.title}
                    />
                  </div>
                  <h3>{industry.title}</h3>
                  <p>{industry.description || ""}</p>
                  <div className={styles.industriescardarrow}>
                    <Image
                      width={24}
                      height={24}
                      src="/icons/arrow-right--pink.svg"
                      alt="arrow"
                    />
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </Block>
    </Column>
  );
}
