/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import dompurify from 'dompurify';

import './Main.scss';

export const Main = () => {
  const [link, setLink] = useState('');

  const getShortUrl = async (fullUrl) => {
    const data = { link: fullUrl };

    const returnData = await axios({
      url: 'https://bigred.link/api/new-shortlink',
      method: 'POST',
      data,
    })
      .then((response) => `https://bigred.link/${response.data.short_id}`)
      .catch((error) => console.error(error));

    return returnData;
  };

  useEffect(() => {
    if (link) {
      return;
    }


    chrome.tabs.query({ active: true }, async (tabs) => {
      // console.log(tabs[0]);

      if (tabs[0] && tabs[0].url) {
        const fullUrl = tabs[0].url;

        if (fullUrl.startsWith('http')) {
          console.log('i ran');

          let shortUrl;

          chrome.storage.local.get([fullUrl], (result) => {
            console.log('value in storage for ', fullUrl, result.key);

            if (result.key) {
              shortUrl = result.key;
            }
          });

          if (!shortUrl) {
            shortUrl = await getShortUrl(fullUrl);
            console.log('new data fetched');
          }


          // console.log(shortUrl);
          navigator.clipboard.writeText(dompurify.sanitize(shortUrl));
          chrome.storage.local.set({fullUrl: shortUrl}, () => {
            console.log('value set in storage', fullUrl, shortUrl);
          });

          const shortLinkMarkup = (
            <p id="short-link">
              {dompurify.sanitize(shortUrl)}
              <br />
              <small><em>(copied to clipboard)</em></small>
            </p>
          );

          setLink(shortLinkMarkup);
        } else {
          setLink('brl-ext only works on http/https pages');
        }
      }
    });
  }, [link]);

  return (
    <main>
      {link || <FontAwesomeIcon icon="fa-solid fa-spinner" spin />}
    </main>
  );
};
