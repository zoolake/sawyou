import React, {useState, useEffect} from 'react';
import Profile from '../../components/Profile';
import Navbar from '../../components/Navbar';
import Wrapper from './styles';
import { useParams } from 'react-router';
import { Profile as Profile2} from '../../api/user'
import { UserPost } from '../../api/list'
import axios from 'axios';

const ProfilePage = () => { 
  // const params = useParams().id;
  // const [profile,setProfile] = useState('')
  // const [post,setPost] = useState('')

  // const Read = async () => {
  //   const res = await Profile2(params)
  //   setProfile(res.data.data)
  // };
  // const Read2 = async () => {
  //   const res = await UserPost(params)
  //   setPost(res.data.data)
  // };



  // useEffect(() => {
  //   Read();
  //   Read2();
  // },[])

  return (
    <Wrapper>
      {/* <Profile profile={profile} post={post} ></Profile> */}
      <Profile ></Profile>
    </Wrapper>
  )
}

export default ProfilePage;