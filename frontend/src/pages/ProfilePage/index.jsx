import React from 'react';
import Profile from '../../components/Profile';
import Navbar from '../../components/Navbar';
import Wrapper from './styles';

const ProfilePage = (props) => { 
  // const go = location.pathname

  return (
    <Wrapper>
      <Navbar />
      <Profile></Profile>
    </Wrapper>
  )
}

export default ProfilePage;