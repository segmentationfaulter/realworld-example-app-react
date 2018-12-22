import React from 'react'
import { Link } from '@reach/router'

import NavLink from '../../components/NavLink'

const Header = ({ userLoggedIn }) => {
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          conduit
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/'>
              Home
            </NavLink>
          </li>
          {userLoggedIn &&
            <React.Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/editor'>
                  <i className='ion-compose' />&nbsp;New Post
                </NavLink>
              </li>
            </React.Fragment>
          }
          {!userLoggedIn &&
            <React.Fragment>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Sign in
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>
                  Sign up
                </NavLink>
              </li>
            </React.Fragment>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Header
