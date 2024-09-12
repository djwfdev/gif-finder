import React from 'react';
import { ExternalLink, Link } from 'lucide-react';
import Button from '../button/Button';
import styles from './GifImage.module.scss';

interface GifImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  url: string;
}

const GifImage = ({
  src,
  alt,
  width,
  height,
  url,
}: GifImageProps): JSX.Element => {
  return (
    <div className={styles.gif}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.gif__img}
      />
      <div className={styles.gif__linkBtns}>
        <Button
          className={styles.gif__linkBtns__link}
          onClick={() => navigator.clipboard.writeText(url)}
          size='icon'
          colour='ghost'
        >
          <Link className={styles.gif__linkBtns__link__icon} />
        </Button>
        <Button
          className={styles.gif__linkBtns__url}
          onClick={() => window.open(url, '_blank')}
          size='icon'
          colour='ghost'
        >
          <ExternalLink className={styles.gif__linkBtns__url__icon} />
        </Button>
      </div>
    </div>
  );
};

export default GifImage;
