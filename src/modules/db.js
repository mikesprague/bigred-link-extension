import Dexie from 'dexie';

export const db = new Dexie('bigred-link-local');

db.version(2).stores({
  shortened_links: '&original_url, &short_id',
});

export const queryForLongUrl = async (longUrl) => {
  let returnData;

  try {
    [returnData] = await db.shortened_links
      .where('original_url')
      .equalsIgnoreCase(longUrl)
      .toArray();
  } catch (error) {
    returnData = null;
  }

  return returnData;
};

export const insertLongUrl = async (longUrl, shortId) => {
  const results = await db.shortened_links.add({
    original_url: longUrl,
    short_id: shortId,
  });

  return results;
};
