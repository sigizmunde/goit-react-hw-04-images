import css from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
