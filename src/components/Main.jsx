/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import dompurify from 'dompurify';

import { db } from '../modules/db.js';

import './Main.scss';

export const Main = () => {
  const [link, setLink] = useState('');

  const getShortUrl = async (longUrl) => {
    const returnData = await axios({
      url: 'https://bigred.link/api/new-shortlink',
      method: 'POST',
      data: { link: longUrl },
    })
      .then((response) => response.data)
      .catch((error) => console.error(error));

    return returnData;
  };

  useEffect(() => {
    if (link) {
      return;
    }

    chrome.tabs.query({ active: true }, async (tabs) => {
      const activeTab = tabs[0];

      console.log(activeTab);

      if (activeTab && activeTab.url) {
        const { favIconUrl: tabFavIconUrl, url: tabUrl } = activeTab;

        if (tabUrl.startsWith('http')) {
          let shortUrlData;
          let shortUrl;

          // check storage for url
          try {
            [shortUrlData] = await db.shortened_links
              .where('original_url')
              .equalsIgnoreCase(tabUrl)
              .toArray();
            // console.log('shortUrlData', shortUrlData);
            shortUrl = `https://bigred.link/${shortUrlData.short_id}`;
          } catch (error) {
            // console.log('no data for this url');
          }

          if (!shortUrl) {
            shortUrlData = await getShortUrl(tabUrl);
            shortUrl = `https://bigred.link/${shortUrlData.short_id}`;
            // console.log('new data fetched');

            // add url and short code to storage
            const dexieData = await db.shortened_links.add({
              original_url: tabUrl,
              short_id: shortUrlData.short_id,
            });

            // console.log('dexieDataPostInsert', dexieData);
          }

          // console.log(shortUrl);
          navigator.clipboard.writeText(dompurify.sanitize(shortUrl));

          const shortLinkMarkup = (
            <div className="mx-auto">
              <div className="flex flex-row">
                <div className="flex">
                  <img
                    className="h-4 rounded mr-2 mt-1"
                    src={tabFavIconUrl}
                    alt="favicon"
                  />
                </div>
                <div className="flex flex-grow whitespace-nowrap overflow-clip">
                  {tabUrl}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="short-link">
                  {dompurify.sanitize(shortUrl)}
                  <br />
                  <small>
                    <em>copied to clipboard</em>
                  </small>
                </div>
              </div>
            </div>
          );

          setLink(shortLinkMarkup);
        } else {
          setLink('brl-ext only works on http/https pages');
        }
      }
    });
  }, [link]);

  return (
    <main>{link || <FontAwesomeIcon icon="fa-solid fa-spinner" spin />}</main>
  );
};
