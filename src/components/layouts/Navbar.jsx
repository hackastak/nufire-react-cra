import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import NuFireLogo from './NuFireLogo';

function Navbar({user}) {
  return (
    <div className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <a href="/"><NuFireLogo /></a>
        </div>
        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              Home
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  user: {username: ''},
}

Navbar.propTypes = {
  user: PropTypes.object,
}

export default Navbar;