/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
  const sender = "0xFc41bb279Dd56E2929a77D4bcC3059D02ab31460";
  const receiver = "0xa9Bb2786337b0fA3508f1968160d7231310d12E8";

  it("NFT mint, transfer, and compare URI", async () => {
    let token = await NftCreator.deployed();
    let tokenIdObject = await token.create(
      sender,
      "https://i.pinimg.com/564x/c6/c4/a4/c6c4a486003236a6dc24084f597b369a.jpg"
    );
    // console.log("tokenIdObject", tokenIdObject);
    let tokenId = tokenIdObject.receipt.logs[0].args.tokenId.toString();
    console.log("tokenId:", tokenId);
    let tokenOwner = await token.ownerOf(tokenId);

    // TEST-1
    assert.equal(sender, tokenOwner);

    // // TEST-2
    // await token.transferFrom(sender, receiver, tokenId);
    // let newTokenOwner = await token.ownerOf(tokenId);
    // assert.equal(receiver, newTokenOwner);
    // console.log("receiver:", receiver);
    // console.log("newTokenOwner:", newTokenOwner);

    // // TEST-3
    // let tokenURI = await token.tokenURI(tokenId);
    // console.log("tokenURI:", tokenURI);
    // assert.equal("aaa", tokenURI);

    // // TEST : 특정 사용자의 보유 NFT 개수를 확인하는 테스트 코드
    // // 토큰 하나 더 만들기

    // let balances = await token.balanceOf(receiver);
    // console.log("newOwner balances:", balances);

    // let balances2 = await token.balanceOf(sender);
    // console.log("owner balances:", balances2);
  });
});
