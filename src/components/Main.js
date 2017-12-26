// (c) 2017 Nir Oren
import React from 'react';
import BottomNavbar from '../components/BottomNavbar';

export const Main = () =>
  (
    <div>
      <h1>Welcome to the My Locations App!</h1>
      <h2>Select an icon from the bottom bar to begin</h2>
      <p>This version of the application is intended for big-screen devices</p>
      <BottomNavbar />
    </div>
  );

export default Main;
