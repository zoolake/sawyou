import React from 'react';
import Profile from '../../components/Profile';
import Navbar from '../../components/Navbar';
import Wrapper from './styles';

const ProfilePage = () => {

  return (
    <Wrapper>
      <Navbar />
      <Profile></Profile>
    </Wrapper>
  )
}

export default ProfilePage;