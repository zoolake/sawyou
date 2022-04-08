/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
  const mintAmount = 10000;
  const uri = "testURI";

  async function print(title) {
    const seller = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2];
    console.log(`\n--------------------  ${title} --------------------`);
    console.log(`Seller: ${seller} ${await getBalance(seller)}`);
    console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
    console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
  }

  it("Bid and confirm", async () => {
    const admin = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2]; // purchaser
    const seller = accounts[3];

    // 1. 테스트를 위한 임의의 ERC-20 토큰 생성 후 10,000 토큰 발행
    ssafyTokenContract = await SsafyToken.deployed();
    await ssafyTokenContract.mint(mintAmount); // 이 메시지의 주체가 admin이라는 뜻인가 ? 맞다면 msg.sender가 admin인 꼴이다.

    // 2. 두 제안자 주소로 1,000 토큰 부여
    await ssafyTokenContract.forceToTransfer(admin, bidder1, 1000);
    await ssafyTokenContract.forceToTransfer(admin, bidder2, 1000);

    // // 3. 판매자 NFT 생성
    nftContract = await SsafyNFT.deployed();
    await nftContract.create(seller, uri);
    const tokenId = await nftContract.current();
    console.log("owner", await nftContract.ownerOf(tokenId));

    salesFactoryContract = await SaleFactory.deployed();
    const now = Math.floor(new Date().getTime() / 1000);

    await salesFactoryContract.createSale(
      tokenId,
      10,
      100,
      now,
      now + 10,
      ssafyTokenContract.address,
      nftContract.address,
      { from: seller }
    );

    const sales = await salesFactoryContract.allSales();
    salesContract = await Sale.at(sales[0]);

    // 사전 조건: Seller가 NFT를 Sale 컨트랙트에게 임시로 준다.
    // await nftContract.approve(salesContract.address, tokenId, { from: seller }); // 필요없다 -> transferFrom에서 "caller != from" 에만 approve 나 setApprovalAll 필요.
    await nftContract.transferFrom(seller, salesContract.address, tokenId, {
      from: seller,
    });

    // 4. 제안자 1, 15 토큰 bid() 호출
    await ssafyTokenContract.approve(salesContract.address, 15, { from: bidder1 }); // bidder1 이 Sale 컨트랙트에게 bidder1이 보유한 15를 쓸 수 있다고 허가
    await salesContract.bid(15, { from: bidder1 });

    // 5. 제안자 2, 20 토큰 bid() 호출
    await ssafyTokenContract.approve(salesContract.address, 20, { from: bidder2 }); // bidder2 가 Sale 컨트랙트에게 bidder2이 보유한 20를 쓸 수 있다고 허가
    await salesContract.bid(20, { from: bidder2 });

    // 6. 10초 후 제안자 2가 confirmItem() 호출

    setTimeout(() => console.log("after"), 10000);
    await salesContract.confirmItem({ from: bidder2 }); // This sale is not finished -- Reason given: Sale: This sale is not finished.

    // 7. 테스트 확인
    assert.equal(bidder2, await nftContract.ownerOf(tokenId), "Confirm Failed");
    assert.equal(1000, await ssafyTokenContract.balanceOf(bidder1), "Refund Failed");

    // 결과 로그
    console.log("owner", await nftContract.ownerOf(tokenId));
    console.log("bidder1", (await ssafyTokenContract.balanceOf(bidder1)).words[0]);
    console.log("bidder2", (await ssafyTokenContract.balanceOf(bidder2)).words[0]);
  });

  it("Bid and Purchase", async () => {
    const owner = accounts[0];
    const seller = accounts[4];
    const bidder = accounts[5];
    const purchaser = accounts[6];

    // 1. 테스트를 위한 임의의 ERC-20 토큰 생성 후 10,000 토큰 발
    ssafyTokenContract = await SsafyToken.deployed();
    await ssafyTokenContract.mint(mintAmount);

    // 2. 두 제안자 주소로 1,000 토큰 부여
    await ssafyTokenContract.forceToTransfer(owner, bidder, 1000);
    await ssafyTokenContract.forceToTransfer(owner, purchaser, 1000);

    // 3. 판매자 NFT 생성
    nftContract = await SsafyNFT.deployed();
    await nftContract.create(seller, uri);
    const tokenId = await nftContract.current();

    salesFactoryContract = await SaleFactory.deployed();
    const now = Math.floor(new Date().getTime() / 1000);

    //sale의 시작
    await salesFactoryContract.createSale(
      tokenId,
      10,
      100,
      now,
      now + 10,
      ssafyTokenContract.address,
      nftContract.address,
      { from: seller }
    );
    const sales = await salesFactoryContract.allSales();
    salesContract = await Sale.at(sales[1]);

    // test: NFT를 다룰 수 있는 권한을 Sale에게 넘겨준다.
    await nftContract.transferFrom(seller, salesContract.address, tokenId, { from: seller });
    // 4. 제안자 15 토큰 bid() 호출
    await ssafyTokenContract.approve(salesContract.address, 15, { from: bidder }); // bidder가 Sale 컨트랙트에게 bidder이 보유한 15를 쓸 수 있다고 허가
    await salesContract.bid(15, { from: bidder });

    // purchaser가 가진 돈에 대한 권한을 Sale에게 넘겨준다.
    const balanceOfPurchaser = await ssafyTokenContract.balanceOf(purchaser);
    await ssafyTokenContract.approve(salesContract.address, balanceOfPurchaser, {
      from: purchaser,
    }); // bidder가 Sale 컨트랙트에게 bidder이 보유한 15를 쓸 수 있다고 허가
    await salesContract.purchase({ from: purchaser });

    assert.equal(purchaser, await nftContract.ownerOf(tokenId), "Not Owned By Purchaser");
    assert.equal(1000, await ssafyTokenContract.balanceOf(bidder), "Refund Failed");
    assert.equal(900, await ssafyTokenContract.balanceOf(purchaser), "Transfer Failed");

    console.log(await ssafyTokenContract.balanceOf(seller));
  });

  it("Bid and Cancel", async () => {
    const admin = accounts[0];
    const bidder = accounts[7];
    const seller = accounts[8];

    // 1. 테스트를 위한 임의의 ERC-20 토큰 생성 후 10,000 토큰 발행
    ssafyTokenContract = await SsafyToken.deployed();
    await ssafyTokenContract.mint(mintAmount); // 이 메시지의 주체가 admin이라는 뜻인가 ? 맞다면 msg.sender가 admin인 꼴이다.

    // 2. 두 제안자 주소로 1,000 토큰 부여
    await ssafyTokenContract.forceToTransfer(admin, bidder, 1000);

    // // 3. 판매자 NFT 생성
    nftContract = await SsafyNFT.deployed();
    await nftContract.create(seller, uri);
    const tokenId = await nftContract.current();
    console.log("owner", await nftContract.ownerOf(tokenId));

    salesFactoryContract = await SaleFactory.deployed();
    const now = Math.floor(new Date().getTime() / 1000);

    await salesFactoryContract.createSale(
      tokenId,
      10,
      100,
      now,
      now + 10,
      ssafyTokenContract.address,
      nftContract.address,
      { from: seller }
    );

    const sales = await salesFactoryContract.allSales();
    salesContract = await Sale.at(sales[2]);

    // 사전 조건: Seller가 NFT를 Sale 컨트랙트에게 임시로 준다.
    // await nftContract.approve(salesContract.address, tokenId, { from: seller }); // 필요없다 -> transferFrom에서 "caller != from" 에만 approve 나 setApprovalAll 필요.
    await nftContract.transferFrom(seller, salesContract.address, tokenId, {
      from: seller,
    });

    // 4. 제안자 1, 15 토큰 bid() 호출
    await ssafyTokenContract.approve(salesContract.address, 15, { from: bidder }); // bidder1 이 Sale 컨트랙트에게 bidder1이 보유한 15를 쓸 수 있다고 허가
    await salesContract.bid(15, { from: bidder });

    // 5. 판매자 cancelSales() 즉시 호출
    await salesContract.cancelSales({ from: seller });

    assert.equal(seller, await nftContract.ownerOf(tokenId), "Cancellation Failed");
    assert.equal(1000, await ssafyTokenContract.balanceOf(bidder), "Refund Failed");
  });
});
