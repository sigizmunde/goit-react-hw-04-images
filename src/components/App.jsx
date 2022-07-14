import React from 'react';
import css from './App.module.css';
import fetchImages from '../services/api-query';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { useState, useRef, useEffect } from 'react';

function usePreviousValue(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');
  const [currentImage, setCurrentImage] = useState('');

  const prevItems = usePreviousValue(items);

  useEffect(() => {
    if (!page) return;
    setStatus('loading');
    fetchImages(query, page)
      .then(newItems => {
        setItems(items => [...items, ...newItems]);
      })
      .finally(() => {
        setStatus('idle');
      });
  }, [query, page]);

  useEffect(() => {
    console.log(prevItems, items);
    if (prevItems !== items && page !== 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [items, page, prevItems]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setItems([]);
  };

  const loadMore = () => {
    setPage(page => page + 1);
  };

  const previewClickHandle = ({ image }) => {
    setCurrentImage(image);
    setStatus('modal');
  };

  const modalCloseHandle = () => {
    setStatus('idle');
  };

  return (
    <div className={css.App}>
      <Searchbar onSearch={handleSearch} />
      {status === 'loading' && <Loader />}
      {items.length > 0 && (
        <>
          <ImageGallery items={items} onClick={previewClickHandle} />
          <Button onClick={loadMore} />
        </>
      )}
      {status === 'modal' && (
        <Modal
          closeFunction={modalCloseHandle}
          imageURL={currentImage.imageURL}
          tags={currentImage.tags}
        />
      )}
    </div>
  );
};
