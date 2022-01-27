import React from 'react';

const Header = ({curruntDate}) => {
  return <div className='App-header'>
      <div className='header-content'>
            <span>{curruntDate}</span>
      </div>
  </div>;
};

export default Header;
