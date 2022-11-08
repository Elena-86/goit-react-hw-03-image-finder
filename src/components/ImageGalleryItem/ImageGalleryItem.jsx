import React from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image: { id, tags, webformatURL } }) => {
  <GalleryItem key={id}>
    <GalleryItemImage src={webformatURL} alt={tags} />
  </GalleryItem>;
};
export default ImageGalleryItem;
