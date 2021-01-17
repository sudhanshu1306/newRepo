import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navhome() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbarhome'>
        <div className='navbar-contain'>
          {/* <Link to='/' className='nav-logo ' onClick={closeMobileMenu}>
          <i class="fa fa-university" aria-hidden="true"></i> College Connect
          </Link> */}
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/newsfeed' className='nav-link' onClick={closeMobileMenu}>
              <i class="fa fa-fw fa-home"></i>
                News feed
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                to='/chat'
                className='nav-link'
                onClick={closeMobileMenu}
              ><i class="fas fa-fw fa-comment-alt"></i>
                 Chat Section
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                to='/college'
                className='nav-link'
                onClick={closeMobileMenu}
              ><i class="fas fa-fw fa-school"></i>
                 College
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                className='nav-link'>
                <i class="fas fa-search fa-fw"></i><input type='text' placeholder='Search ' id='search-text-input' />
              </Link>
            </li>
            <li className='navbar-item'>
              <Link to='/add' className='nav-link n1' onClick={closeMobileMenu}>
              <i class="fas fa-fw fa-plus-square"></i>
                Add Post
              </Link>
            </li>
            <li className='navbar-item n2'>
              <Link to='/notification' className='nav-link' onClick={closeMobileMenu}>
              <i class="fas fa-fw fa-heart"></i>
                Notifications
              </Link>
            </li>
            <li className='navbar-item n3'>
              <Link to='/profile' className='nav-link' onClick={closeMobileMenu}>
              <i class="fas fa-fw fa-user"></i>
                User Profile
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navhome;
