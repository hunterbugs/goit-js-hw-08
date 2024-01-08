// Described in documentation;
import SimpleLightbox from 'simplelightbox';
// Additional styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items.js';
// Change code below this line

document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.gallery');

  // Function to create a gallery item
  function createGalleryItem(item) {
    const li = document.createElement('li');
    li.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.setAttribute('href', item.original);

    const img = document.createElement('img');
    img.classList.add('gallery__image');
    img.setAttribute('src', item.preview);
    img.setAttribute('data-source', item.original);
    img.setAttribute('alt', item.description);

    link.appendChild(img);
    li.appendChild(link);
    gallery.appendChild(li);
  }

  // Render gallery items
  galleryItems.forEach(item => {
    createGalleryItem(item);
  });
  // Initialize simplelightbox
  const lightbox = new SimpleLightbox('.gallery a', {
    captionType: 'attr', // Set caption type to 'attr'
    captionsData: 'alt', // Use 'alt' attribute for captions
    captionPosition: 'bottom', // Position the caption at the bottom
    captionDelay: 250,
    /* Additional options can be added here if needed */
  });

  // Prevent default link behavior
  gallery.addEventListener('click', function (event) {
    event.preventDefault();
  });

  // Listen for keypress events
  document.addEventListener('keydown', function (event) {
    // Close lightbox if Escape key is pressed and lightbox is open
    if (event.key === 'Escape' && lightbox.visible()) {
      lightbox.close();
    }
  });
});
