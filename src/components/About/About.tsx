import { getAboutSection } from "@/libs/apis"
import { AboutSection } from "@/types/aboutSection"
import Image from "next/image"
import { FaQuoteLeft } from "react-icons/fa";
import { urlFor } from "@/libs/sanity"
import styles from './About.module.scss';

import bgImage from '@/images/bg-img.png'

const About = async () => {

  const about: AboutSection = await getAboutSection();

  // console.log("about", about)

  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.quoteBlock}>
          <div className={styles.quoteBlockImage}>
            <FaQuoteLeft fontSize="2.5rem" color="#fff" className={styles.quoteIcon} />
            <Image
              src={urlFor(about.roundImage).url()}
              width={350}
              height={350}
              alt={about.name} />
          </div>
          <div className={styles.quoteBlockContent}>
            <p className={styles.quote}>{about.quote}</p>
            <p className={styles.signatureText}>{about.profession} <span>{about.name}</span></p>
          </div>
        </div>
        <div className={styles.aboutContent}>
          <h2 className={styles.title}>{about.title}</h2>
          <div className={styles.wrapper}>
            <div className={styles.aboutData}>
              <div className={styles.aboutDataText}>
                <h3 className={styles.subtitle}>{about.name}</h3>
                <p className={styles.subtext}>{about.profession}</p>
                <ul className={styles.aboutBullets}>
                  {about.aboutBullets.map((bullet) => (
                    <li
                      key={bullet._key}
                      className={styles.bulletItem}
                    >
                      {bullet.text}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.aboutDataImage}>
                <Image
                  src={urlFor(about.image).url()}
                  width={500}
                  height={500}
                  alt={about.name}
                />
                <Image className={styles.imageBg} src={bgImage} alt="bg" />
              </div>
            </div>
            <div className={styles.descriptionBlock}>
              <p className={styles.description}>{about.shortText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About