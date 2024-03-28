'use client';
import Image from 'next/image';
import { urlFor } from '@/libs/sanity';
import styles from './Carousel.module.scss';
import Slider from 'react-infinite-logo-slider';

type Props = {
  images: {
    _key: string;
    url: string;
  }[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  return (
      <Slider
        width="300px"
        duration={30}
        spacing={0}
        pauseOnHover={true}
        blurBorders={true}
        blurBoderColor={'#ffffff'}
        className={styles.slider}
      >
        {images.map((image) => (
          <Slider.Slide>
            <div key={image._key} className={styles.gridItem}>
              <Image
                className={styles.image}
                src={urlFor(image).url()}
                width={300}
                height={300}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="Gallery image"
              />
            </div>
          </Slider.Slide>
        ))}
      </Slider>
  )
}

export default Carousel