import PropTypes from 'prop-types';

// Product PropTypes
export const productPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  inStock: PropTypes.bool.isRequired,
  stockCount: PropTypes.number.isRequired,
});

// User PropTypes
export const userPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

// Cart Item PropTypes
export const cartItemPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
});

// Wishlist Item PropTypes
export const wishlistItemPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
}); 