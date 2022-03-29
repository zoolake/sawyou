import { createInstance } from "./index.jsx";

const instance = createInstance();

// 게시글 작성
export const WritePost = (data) => {
  try {
    const res = instance.post(`/post`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 게시글 조회
export const ReadPost = (num) => {
  try {
    const res = instance.get(`/post/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 게시글 수정
export const ChangePost = (num, data) => {
  try {
    const res = instance.patch(`/post/${num}`, data )
    return res
  } catch (error) {
    console.log(error)
  }
}

// 게시글 삭제
export const DeletePost = (num) => {
  try {
    const res = instance.delete(`/post/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 게시글 좋아요
export const LikePost = (num) => {
  try {
    const res = instance.patch(`/post/${num}/like`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 댓글 작성
export const WriteComment = (num,data) => {
  try {
    const res = instance.post(`/post/comment/${num}/`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export const ReadCommnet = (num) => {
  try {
    const res = instance.patch(`/post/comment/${num}/`)
    return res
  } catch (error) {
    console.log(error)
  }
}

