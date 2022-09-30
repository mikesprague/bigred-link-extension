import PropTypes from 'prop-types';
import React from 'react';

export const ShortLink = ({ favIconUrl, longUrl, shortUrl }) => (
  <div className="mx-4 p-4 bg-dark-grey rounded bg-opacity-25">
    <div className="flex flex-row border border-dark-grey border-solid rounded">
      <div className="flex bg-dark-grey min-w-fit w-auto bg-opacity-75">
        <img className="h-4 rounded m-2" src={favIconUrl} alt="favicon" />
      </div>
      <div className="long-url">
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
