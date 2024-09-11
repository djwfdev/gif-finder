import React, { useState } from 'react';
import { Search, LoaderCircle, ChevronDown, ArrowUp } from 'lucide-react';
import { Gif, GIF_LIMIT } from '../utils/constants';
import axios from 'axios';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import GifImage from '../components/gif-image/GifImage';
import styles from './Home.module.scss';

const Home = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [errMsg, setErrMsg] = useState('');

  const searchGifs = async (resetResults = false) => {
    setIsLoading(true);
    const currentOffset = resetResults ? 0 : offset;

    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.giphy.com/v1/gifs/search',
        params: {
          // could not work out how to read from .env on staged deployment (I know this is a security flaw)
          api_key: '8kvPtqIgRn9WY8ESwKoEOt3UgmbxKjrO',
          q: query,
          limit: GIF_LIMIT,
          offset: currentOffset,
          rating: 'pg',
          lang: 'en',
          bundle: 'clips_grid_picker',
        },
      });

      const data = response.data.data as Gif[];

      if (response.status === 200) {
        if (resetResults) {
          setGifs(data);
          setOffset(GIF_LIMIT);
        } else {
          setGifs((prevGifs) => [...prevGifs, ...data]);
          setOffset((prevOffset) => prevOffset + GIF_LIMIT);
        }
      } else {
        setErrMsg(`[${response.status}] Error fetching data`);
      }
    } catch (error) {
      setErrMsg(`[${error.response.status}] Error fetching data`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    searchGifs(true);
  };

  const handleLoadMore = () => {
    searchGifs();
  };

  return (
    <main className={styles.page}>
      {/* Logo */}
      <div className={styles.page__logo}>
        <h1 className={styles.page__logo__title}>GIF Search</h1>
      </div>

      {/* Search Bar */}
      <div className={styles.page__search}>
        <Input
          placeholder="Search for GIFs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? (
            <LoaderCircle
              className={`${styles.icon} ${styles.icon__loader}`}
            />
          ) : (
            <Search className={styles.icon} />
          )}
          &nbsp;Search
        </Button>
      </div>

      {/* GIF Grid */}
      {errMsg && <div className={styles.page__error}>{errMsg}</div>}
      {!errMsg && query.length > 0 && gifs.length > 0 && (
        <div className={styles.page__grid}>
          {gifs.map((gif: Gif, idx: number) => (
            <GifImage
              key={`${gif.id}-${idx}`}
              src={gif.images.fixed_width.url}
              alt={gif.title}
              width={gif.images.fixed_width.width}
              height={gif.images.fixed_width.height}
              url={gif.images.fixed_width.url}
            />
          ))}
        </div>
      )}

      {/* Footer Buttons */}
      {!errMsg && gifs.length > 0 && (
        <div className={styles.page__footerBtns}>
          {/* Load More Button */}
          <Button onClick={handleLoadMore} disabled={isLoading}>
            {isLoading ? (
              <LoaderCircle
                className={`${styles.icon} ${styles.icon__loader}`}
              />
            ) : (
              <ChevronDown className={styles.icon} />
            )}
            &nbsp;Load More
          </Button>
          {/* Return to Top */}
          <Button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          >
            <ArrowUp className={styles.icon} />
            &nbsp;Back to Top
          </Button>
        </div>
      )}
    </main>
  );
};

export default Home;
