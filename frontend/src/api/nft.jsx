import { CreateInstance } from "./index.jsx";

const instance = CreateInstance();

// NFT 보유 내역 출력
export const ReadAllNft = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/nft/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 상세 조회
export const ReadNft = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/nft/detail/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 판매중인 NFT 조회
export const ReadCellAllNft = () => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/nft/market`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 판매중인 NFT 상세 조회
export const ReadCellNft = (num) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/nft/market/${num}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 민팅
export const MintingNft = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.post(`/nft/mint`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 판매
export const CellNft = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.post(`/nft/sale`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// NFT 구매
export const BuyNft = (data) => {
  const instance = CreateInstance();
  try {
    const res = instance.patch(`/nft/purchase`, data)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 유저가 판매중인 NFT 내역 조회
export const ReadAllSaleNft = (userId) => {
  const instance = CreateInstance();
  try {
    const res = instance.get(`/nft/on-sale/${userId}`)
    return res
  } catch (error) {
    console.log(error)
  }
}
