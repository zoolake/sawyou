import { createInstance } from "./index.jsx";

const instance = createInstance();

// NFT 보유 내역 출력
export const ReadAllNft = (num) => {
  try {
    const res = instance.get(`/nft/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 상세 조회
export const ReadNft = (num) => {
  try {
    const res = instance.get(`/nft/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 판매중인 NFT 조회
export const ReadCellAllNft = () => {
  try {
    const res = instance.get(`/nft/market`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 판매중인 NFT 상세 조회
export const ReadCellNft = (num) => {
  try {
    const res = instance.get(`/nft/market/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 민팅
export const MintingNft = (data) => {
  try {
    const res = instance.post(`/nft/mint`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 판매
export const CellNft = (data) => {
  try {
    const res = instance.post(`/nft/sale`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 구매
export const BuyNft = (data) => {
  try {
    const res = instance.post(`/nft/purchase`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}