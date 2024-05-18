import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as clipboard from 'clipboard-polyfill';
import dompurify from 'dompurify';
import { atom, useAtom } from 'jotai';
import React, { lazy, useEffect } from 'react';

import { insertLongUrl, queryForLongUrl } from '../modules/db.js';
import { buildShortLink, createShortUrl } from '../modules/helpers.js';

import './Main.scss';

const ShortLink = lazy(() => import('./ShortLink.jsx'));

export const shortLinkAtom = atom('');

export const Main = () => {
  const [shortLinkMarkup, setShortLinkMarkup] = useAtom(shortLinkAtom);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true }, async (tabs) => {
      const activeTab = tabs[0];
      // console.log(activeTab);

      if (activeTab?.url) {
        const { favIconUrl: tabFavIconUrl, url: tabUrl } = activeTab;

        if (tabUrl.startsWith('https')) {
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

          // add short link markup to extension popup
          setShortLinkMarkup(
            <ShortLink
              favIconUrl={tabFavIconUrl}
              longUrl={tabUrl}
              shortUrl={shortUrl}
            />
          );

          // write short link to clipboard
          clipboard.writeText(dompurify.sanitize(shortUrl));
        } else {
          setShortLinkMarkup(
            'The BigRed.link Browser Extension only works on https pages'
          );
        }
      }
    });
  }, [setShortLinkMarkup]);

  return (
    <main>
      {shortLinkMarkup || <FontAwesomeIcon icon="fa-solid fa-spinner" spin />}
    </main>
  );
};
