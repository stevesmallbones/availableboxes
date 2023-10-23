import React from 'react';

const Header = ({ lastUpdated, refresh }) => {
  return (
    <>
        <h1 className="title">Available Box Sizes</h1>
        {lastUpdated && <div className="lastupdated">Last Updated: <span>{lastUpdated}</span></div>}
        {refresh && <div className="refresh">Refresh Fequency: <span>{refresh/1000} seconds</span></div>}
    </>
  );
};

export default Header;
