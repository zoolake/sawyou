import { CreateInstance } from "./index.jsx";

const instance = CreateInstance();

// 게시글 전체 조회
export const ReadAllPost = () => {
  try {
    const res = instance.get(`/list`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 팔로잉 게시글 조회
export const ReadFollowingPost = () => {
  try {
    const res = instance.get(`/list/following`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 해시태그 게시글 리스트 조회
export const HashTagPost = (num) => {
  try {
    const res = instance.get(`/list/hashtag/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 유저 게시글 리스트 조회
export const UserPost = (num) => {
  try {
    const res = instance.get(`/list/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 계정 검색
export const SearchUserPost = (data) => {
  try {
    const res = instance.get(`/list/search/user`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 해시태그검색
export const SearchHashTagPost = (data) => {
  try {
    const res = instance.get(`/list/search/hashtag`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}


