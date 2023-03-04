import React, { useEffect, useState } from "react";
import styles from "@/components/ourWork.module.scss";
import { Block, Column } from "@lkmx/flare-react";
import Image from "next/image";
import Link from "next/link";
import getLang from '@/lang';
import { useRouter } from "next/router";
import getProjectsIndexed from '../lib/projectsIndex';

export default function OurWork() {
    const { locale } = useRouter();
    const $t = getLang(locale);
    const [first, setFirst] = useState({});
    const [second, setSecond] = useState({});
    const [third, setThird] = useState({});

    useEffect(() => {
        setProjects();
    }, []);

    function setProjects() {
        const projects = getProjectsIndexed(locale);
        const numbers = generateRandom(projects.length);
        setFirst(projects[numbers.one]);
        setSecond(projects[numbers.two]);
        setThird(projects[numbers.three]);
    }

    function generateRandom(maxLimit) {
        const generate = () => Math.floor(Math.random() * maxLimit);
        const values = { one: generate(), two: generate(), three: generate() }
        
        return isUnique(values) ? values : generateRandom(maxLimit);
    }

    function isUnique(obj) {
        const values = Object.values(obj);
        const uniqueValues = [];

        values.forEach((value) => {
            if (!uniqueValues.includes(value)) {
                uniqueValues.push(value);
            }
        });

        return values.length === uniqueValues.length;
    }

    return (first.title && second.title && third.title ?
        <Column className={styles.ourWork} modeXxxl="slim">
            <Block className={styles.ourWork__block}>
                <h2>{$t.ourWork.title}</h2>
                <div className={styles.ourWork__block__heading}>
                    <p>{$t.ourWork.par}</p>
                    <Link href="/work" legacyBehavior>
                        <div
                            className={styles.ourWork__block__heading__btn}
                        >{$t.ourWork.btn}</div>
                    </Link>
                </div>
                <div className={styles.ourWork__block__grid}>
                    <section className={styles.ourWork__block__grid__full}>
                        <Link href={first.route}>
                            <div className={styles.ourWork__block__grid__full__item}>
                                <div className={styles.ourWork__block__grid__full__item__img}>
                                    <Image
                                        fill
                                        src={`/work/${first.thumbnail}.jpg`}
                                        alt="project image"
                                    />
                                </div>
                                <span>{first.catchphrase}</span>
                            </div>
                        </Link>
                    </section>
                    <section className={styles.ourWork__block__grid__half}>
                        <Link href={second.route}>
                            <div className={styles.ourWork__block__grid__half__item}>
                                <div className={styles.ourWork__block__grid__half__item__img}>
                                    <Image
                                        fill
                                        src={`/work/${second.thumbnail}.jpg`}
                                        alt="project image"
                                    />
                                </div>
                                <span>{second.catchphrase}</span>
                            </div>
                        </Link>
                        <Link href={third.route}>
                            <div className={styles.ourWork__block__grid__half__item}>
                                <div className={styles.ourWork__block__grid__half__item__img}>
                                    <Image
                                        fill
                                        src={`/work/${third.thumbnail}.jpg`}
                                        alt="project image"
                                    />
                                </div>
                                <span>{third.catchphrase}</span>
                            </div>
                        </Link>
                    </section>
                </div>
            </Block>
        </Column>
        : <span>Loading</span>
    );
}
