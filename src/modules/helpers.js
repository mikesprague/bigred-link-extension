import { faRotateRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export const initIcons = () => {
  library.add(faClipboard, faRotateRight, faSpinner);
};

export const isProduction = () =>
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1';

export const isValidUrl = (url) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const validUrl = new URL(url);
  } catch (error) {
    console.error(error);

    return false;
  }

  return true;
};

export const handleError = (error) => {
  console.error(error);
};
