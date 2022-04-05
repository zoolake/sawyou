import { LoginInstance } from "./index.jsx";
import { CreateInstance } from "./index.jsx";


const LoginInstance2 = LoginInstance();

// 회원가입
export const RegisterUser = (data) => {
  try {
    const res = LoginInstance2.post(`/user/signup`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 아이디 중복체크
export const IdCheck = (data) => {
  try {
    const res = LoginInstance2.post(`/user/idcheck`, data)
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}


// 로그인
export const LoginApi = (data) => {
  try {
    const res = LoginInstance2.post(`/user/login`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 프로필조회
export const Profile = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/user/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 프로필수정
export const EditProfile = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.patch(`/user`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 비밀번호변경
export const ChangePassword = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.patch(`/user/pwd`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 회원탈퇴
export const DeleteUser = () => {
  const instance = CreateInstance();
  try {
    const res = instance.delete(`/user`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로잉
export const FollowingUser = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.patch(`/user/following/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로잉 목록 조회
export const ReadFollowingUser = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/user/following/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로워 목록 조회
export const ReadFollowerUser = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/user/follower/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로워 삭제?
export const DeleteFollowerUser = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.delete(`/user/follower/${num}/block`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 아이디 찾기
export const FindId = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.post(`/user/find/id`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 비밀번호 찾기
export const FindPassword = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.post(`/user/find/pwd`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}


// 프로필 이미지 변경
export const ProfileImage = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.patch(`/user/profile`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}


