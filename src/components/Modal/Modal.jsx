import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ closeFunction, imageURL, tags }) => {
  useEffect(() => {
    const keyPressed = e => {
      if (e.code === 'Escape') closeFunction();
    };
    window.addEventListener('keydown', keyPressed);
    return () => {
      window.removeEventListener('keydown', keyPressed);
    };
  }, [closeFunction]);

  return (
    <div className={css.Overlay} onClick={closeFunction}>
      <div className={css.Modal}>
        <img src={imageURL} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  closeFunction: PropTypes.func.isRequired,
};

export default Modal;
