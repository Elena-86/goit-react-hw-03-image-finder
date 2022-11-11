import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image: { id, tags, webformatURL } }) => {
  <GalleryItem key={id}>
    <GalleryItemImage src={webformatURL} alt={tags} />
  </GalleryItem>;
};

ImageGalleryItem.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
