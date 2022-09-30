import { faRotateRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export const initIcons = () => {
  library.add(faClipboard, faRotateRight, faSpinner);
};

export const isProduction = () =>
  !window.location.hostname.includes('localhost') &&
  !window.location.hostname.includes('127.0.0.1');

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

export const buildShortLink = (shortId) => `https://bigred.link/${shortId}`;

export const createShortUrl = async (longUrl) => {
  const returnData = await axios({
    url: 'https://bigred.link/api/new-shortlink',
    method: 'POST',
    data: { link: longUrl },
  })
    .then((response) => response.data)
    .catch((error) => handleError(error));

  return returnData;
};
