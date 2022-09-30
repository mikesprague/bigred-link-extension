import PropTypes from 'prop-types';
import React from 'react';

export const ShortLink = ({ favIconUrl, longUrl, shortUrl }) => (
  <div className="mx-auto">
    <div className="flex flex-row">
      <div className="flex">
        <img className="h-4 rounded mr-2 mt-1" src={favIconUrl} alt="favicon" />
      </div>
      <div className="flex flex-grow whitespace-nowrap overflow-clip">
        {longUrl}
      </div>
    </div>
    <div className="flex flex-row">
      <div className="short-link">
        {shortUrl}
        <br />
        <small>
          <em>copied to clipboard</em>
        </small>
      </div>
    </div>
  </div>
);

ShortLink.displayName = 'ShortLink';
ShortLink.propTypes = {
  favIconUrl: PropTypes.string.isRequired,
  longUrl: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
};
export default ShortLink;
