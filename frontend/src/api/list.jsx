import { CreateInstance } from "./index.jsx";




// 게시글 전체 조회
export const ReadAllPost = () => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/list`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로잉 게시글 조회
export const ReadFollowingPost = () => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/list/following`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 해시태그 게시글 리스트 조회
export const HashTagPost = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/list/hashtag/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 유저 게시글 리스트 조회
export const UserPost = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/list/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 계정 검색
export const SearchUserPost = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.post(`/list/search/user`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 해시태그검색
export const SearchHashTagPost = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.post(`/list/search/hashtag`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}


