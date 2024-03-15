import { Footer as FooterType } from '@/types/footer';
import { getFooter } from '@/libs/apis';
import { urlFor } from '@/libs/sanity';
import styles from './Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Footer = async () => {

  const footer: FooterType = await getFooter();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <Image
              src={urlFor(footer.footerLogo).url()}
              width={200}
              height={150}
              alt={footer.footerTitle}
            />
          </div>
          <div className={styles.footerColumn}>
            <div className={styles.footerLinks}>
              <ul className={styles.linksList}>
                {footer.footerMenuItems.map((item) => (
                  <li key={item.label} className={styles.listItem}>
                    <Link href={item.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <div className={styles.footerSocialIcons}>
              <ul className={styles.iconsList}>
                {footer.footerSocialMedia.map((item) => (
                  <li key={item.label} className={styles.iconItem}>
                    <Link target='_blank' href={item.link}>
                      <Image
                        src={urlFor(item.icon).url()}
                        width={30}
                        height={30}
                        alt={item.label}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyrigth}>
          <p>&copy; 2024 Landi Academy. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer