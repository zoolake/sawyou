import { createInstance } from "./index.jsx";

const instance = createInstance();

// export const Login = async (data) => {
//   const res = await instance.post("/api/login/", data);

//   return res;
// }

// 회원가입
export const Signup = (data) => {
  try {
    const res = instance.post(`/user/signup`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 회원가입
export const IdCheck = (data) => {
  try {
    const res = instance.get(`/user/signup/idcheck`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}


// 로그인
export const Login = (data) => {
  try {
    const res = instance.post(`/user/login`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 프로필조회
export const Profile = (num) => {
  try {
    const res = instance.post(`/user/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 프로필수정
export const EditProfile = (data) => {
  try {
    const res = instance.patch(`/user`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 비밀번호변경
export const ChangePassword = (data) => {
  try {
    const res = instance.patch(`/user/pwd`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 회원탈퇴
export const DeleteUser = () => {
  try {
    const res = instance.delete(`/user`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로잉
export const FollowingUser = (num) => {
  try {
    const res = instance.patch(`/user/followiing/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로잉 목록 조회
export const ReadFollowingUser = (num) => {
  try {
    const res = instance.get(`/user/following/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로워 목록 조회
export const ReadFollowerUser = (num) => {
  try {
    const res = instance.get(`/user/follower/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로워 삭제?
export const DeleteFollowerUser = (num) => {
  try {
    const res = instance.delete(`/user/follower/${num}/block`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 아이디 찾기
export const FindId = (data) => {
  try {
    const res = instance.post(`/user/find/id`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 비밀번호 찾기
export const FindPassword = (data) => {
  try {
    const res = instance.post(`/user/find/pwd`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}


