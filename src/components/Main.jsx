import React, { lazy, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dompurify from 'dompurify';

import { buildShortLink, createShortUrl } from '../modules/helpers.js';
import { insertLongUrl, queryForLongUrl } from '../modules/db.js';

import './Main.scss';

const ShortLink = lazy(() => import('./ShortLink.jsx'));

export const Main = () => {
  const [shortLinkMarkup, setShortLinkMarkup] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true }, async (tabs) => {
      const activeTab = tabs[0];
      // console.log(activeTab);

      if (activeTab && activeTab.url) {
        const { favIconUrl: tabFavIconUrl, url: tabUrl } = activeTab;

        if (tabUrl.startsWith('http')) {
          let shortUrl;
          let shortUrlData;

          // check local db for url
          shortUrlData = await queryForLongUrl(tabUrl);

          if (shortUrlData) {
            shortUrl = buildShortLink(shortUrlData.short_id);
          }

          if (!shortUrl) {
            // create new short link from api
            shortUrlData = await createShortUrl(tabUrl);
            shortUrl = buildShortLink(shortUrlData.short_id);

            // add url and short_id to local db
            try {
              await insertLongUrl(tabUrl, shortUrlData.short_id);
            } catch (error) {
              console.error(error);
            }
          }

          // console.log(shortUrl);

          // write short link to clipboard
          navigator.clipboard.writeText(dompurify.sanitize(shortUrl));

          // add short link markup to extension popup
          setShortLinkMarkup(
            <ShortLink
              favIconUrl={tabFavIconUrl}
              longUrl={tabUrl}
              shortUrl={shortUrl}
            />,
          );
        } else {
          setShortLinkMarkup('brl-ext only works on http/https pages');
        }
      }
    });
  }, []);

  return (
    <main>
      {shortLinkMarkup || <FontAwesomeIcon icon="fa-solid fa-spinner" spin />}
    </main>
  );
};
