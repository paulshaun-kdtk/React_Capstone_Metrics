import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../../assets/menu';
import Mic from '../../assets/mic';
import Network from '../../assets/network';
import Search from '../../assets/search';
import Setting from '../../assets/settings';
import Back from '../../assets/back';
import './Header.css';

export const WebHeader = () => (
  <nav className="webNav">
    <ul className="wNavItems">
      <li className="wNavHome">
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <span className="wNavObjects">
          <a>
            {' '}
            <Network />
            {' '}
          </a>
          <a>
            {' '}
            <Mic />
          </a>
          <a>
            {' '}
            <Setting />
          </a>
        </span>
      </li>
    </ul>
  </nav>
);

export const MobileHomeHeader = () => (
  <nav className="mobileNav">
    <ul className="mNavItems">
      <li className="mNavItemsStart">
        <a><Menu /></a>
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="mNavItemsEnd">
        <a><Network /></a>
        <a><Mic /></a>
        <a id="mobileSearch">
          <Search />
        </a>
      </li>
    </ul>
  </nav>
);
export const MobileSeasonsHeader = () => (
  <nav className="mobileNav">
    <ul className="mNavItems">
      <li className="mNavItemsStart">
        <NavLink to="/">
          <Back />
          {' '}
          Home
        </NavLink>
      </li>
      <li>
        <a>Seasons</a>
      </li>
      <li className="mNavItemsEnd">
        <a><Mic /></a>
        <a><Setting /></a>
      </li>
    </ul>
  </nav>
);
