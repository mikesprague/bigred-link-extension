import Dexie from 'dexie';

export const db = new Dexie('bigred-link-local');

db.version(2).stores({
  shortened_links: '&original_url, &short_id',
});
