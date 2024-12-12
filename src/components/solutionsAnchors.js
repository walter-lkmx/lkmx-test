// Ruta del archivo: src/components/solutionsAnchors.js

import React, { useEffect } from "react";
import styles from "@/components/solutionsAnchors.module.scss";
import { Block, Column } from "@lkmx/flare-react";
import Image from "next/image";

export default function SolutionsAnchors({anchorsData}) {
    useEffect(() => {
        document.addEventListener('scroll', function () {
            var i = 0;
            var span = "";            
            anchorsData.forEach(element => {
                if(document.getElementById(element.title[0])) {
                    const item = document.getElementById(element.title[0]);
                    const rect = item.getBoundingClientRect();
                    const isInViewport = rect.top <= 56 && rect.top > -350;
    
                    if (isInViewport){
                        span = document.getElementById("span" + i);
                        span.style.color = "#0B0E29";                                    
                    }                    
                    else {
                        span = document.getElementById("span" + i);
                        span.style.color = "#93949E";                        
                    }                        
                    i++; 
                }                
            });
        }, {
            passive: true
        });
    }, [anchorsData])
    
    return(
        <Column mode="normal" modeL="slim" modeXxxl="normal" className={styles.anchors__sections}>
            <Block className={styles.anchors__sections__block}>  
                <div className={styles.anchors__sections__block__wrapper}>
                    <nav className={styles.anchors__sections__block__wrapper__aside}> 
                    {anchorsData.map((data, index) => {
                        return(
                            <a 
                                className={styles.anchors__sections__block__wrapper__aside__anchor} 
                                href={`#${data.title[0]}`} 
                                key={index}
                            >
                                <span id={`span${index}`}>{data.title[0]}</span>                            
                            </a>                       
                        );
                    })}     
                    </nav>  
                </div>                                                                                               
                <section className={styles.anchors__sections__block__black}>        
                    {anchorsData.map((data, index) => {
                        return(
                            <article 
                                className={styles.anchors__sections__block__black__item} 
                                key={index} 
                                id={data.title[0]}
                            >
                                <div className={styles.anchors__sections__block__black__item__image}>
                                    <Image
                                        fill
                                        src={`/icons/${data.iconName}.svg`}
                                        alt="Solution thumbnail"
                                    />
                                </div>                            
                                <div className={styles.anchors__sections__block__black__item__content}>                                
                                    <h2>{data.title[0]}</h2>
                                    <p>{data.title[1]}</p>
                                    <div className={styles.anchors__sections__block__black__item__content__route}>
                                        <a href={data.route}>
                                            Learn more
                                        </a>
                                    </div>
                                </div>
                            </article>
                        )
                    })}                
                </section>
            </Block>
        </Column>
    );
}