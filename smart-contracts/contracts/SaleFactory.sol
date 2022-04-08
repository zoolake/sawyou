// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    address public admin;
    address[] public sales;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    function createSale(
        uint256 itemId,
        uint256 minPrice,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        Sale sale = new Sale(admin,msg.sender,itemId,minPrice,purchasePrice,startTime,endTime,currencyAddress,nftAddress);
        address saleAddress = address(sale);
        sales.push(saleAddress);
        // 권한 이전
        // 토큰 이전
        return saleAddress;
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale{
    // 생성자에 의해 정해지는 값
    address public seller; //판매자 주소
    address public buyer; // 구매자 주소
    address admin; // 수퍼권한자 주소
    uint256 public saleStartTime;// 판매시간
    uint256 public saleEndTime;// 판매종류시간
    uint256 public minPrice;// 최소 제안가
    uint256 public purchasePrice;// 즉시 구매가
    uint256 public tokenId;// 토큰 아이디
    address public currencyAddress;// 거래시 사용할 ERC-20주소
    address public nftAddress;// nft 주소
    bool public ended;

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;

    event HighestBidIncereased(address bidder, uint256 amount);
    event SaleEnded(address winner, uint256 amount);


    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_minPrice > 0);
        tokenId = _tokenId;
        minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        saleStartTime = startTime;
        saleEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
    }

    function bid(uint256 bid_amount) 
    onlyAfterStart
    onlyBeforeEnd 
    onlyNotSeller 
    moreThanMinPrice(bid_amount) 
    moreThanHighestBid(bid_amount) 
    lessThanPurchasePrice(bid_amount)
     public {
        // TODO
        // 1. 최고 제안가와 제안자 정보를 갱신한다.
        // 1-1. 기존 제안자가 있다면 환불을 진행한다.
        if(highestBidder!=address(0)) {
            erc20Contract.transfer(highestBidder, highestBid);
        }
        highestBidder = msg.sender;
        highestBid = bid_amount;
        // 2. Sale 컨트랙트로 제안 금액만큼의 ERC-20 토큰을 송금한다.
        erc20Contract.transferFrom(msg.sender, address(this), bid_amount);
    }

    function purchase() 
    onlyAfterStart
    onlyBeforeEnd
    onlyNotSeller
    public {
        // TODO 
        
        // 1. 기존 제안자가 있다면 환불을 진행한다.
        if(highestBidder!=address(0)) {
            erc20Contract.transferFrom(address(this), highestBidder, highestBid);
        }

        // 2. 구매자의 ERC-20 토큰을 즉시 구매가만큼 판매자에게 송금한다.
        erc20Contract.transferFrom(msg.sender, seller, purchasePrice);

        // 3. NFT 소유권을 구매자에게 이전한다.
        erc721Contract.safeTransferFrom(address(this), msg.sender, tokenId);

        // 4. 컨트랙트의 거래 상태와 구매자 정보를 업데이트 한다.
        _end();
        buyer = msg.sender;
    }

    function confirmItem() onlyHighestBidder public {
        // TODO
        // 1. 최종 제안가를 판매자에게 송금한다.
        erc20Contract.transferFrom(address(this), seller, highestBid);
        // 2. NFT 소유권을 구매자에게 이전한다.
        erc721Contract.safeTransferFrom(address(this), msg.sender, tokenId);    // Sale 컨트랙트 -> (NFT) -> 구매자
        // 3. 컨트랙트의 거래 상태와 구매자 정보를 업데이트 한다.
        _end();
        buyer = msg.sender;
    }
    
    function cancelSales() 
    onlyAfterStart
    onlyBeforeEnd
    onlyAdminOrSeller
    onlyBeforeSoldOut   
    public {
        // TODO
        // 1. 환불을 진행한다.
        if(highestBidder!=address(0)) {
            erc20Contract.transferFrom(address(this), highestBidder, highestBid);
        }
        // 2. NFT 소유권을 판매자에게 되돌려준다.
        erc721Contract.safeTransferFrom(address(this), seller, tokenId);
        // 3. 컨트랙트의 거래 상태를 업데이트 한다.
        _end();
    }

    function getTimeLeft() public view returns (int256) {
        return (int256)(saleEndTime - block.timestamp);
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address,
            address
        )
    {
        return (
            saleStartTime,
            saleEndTime,
            minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress,
            seller
        );
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }


    function getHighestBid() public view returns(uint256){
        return highestBid;
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function getCurrencyAmount() public view returns (uint256) {
        return _getCurrencyAmount();
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다.

    modifier onlyAdminOrSeller() {
        require(msg.sender == admin || msg.sender == seller, "Sale: You are not admin or seller.");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Sale: You are not admin.");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }
    modifier onlyAfterStart() {
        require(
            block.timestamp >= saleStartTime,
            "Sale: This sale is not started."
        );
        _;
    }
    modifier onlyBeforeEnd() {
        require(
            block.timestamp <= saleEndTime,
            "Sale: This sale is finished"
        );
        _;
    }
    modifier onlyNotSeller() {
         require(msg.sender != seller, "Sale: You are seller.");
        _;
    }
    modifier moreThanMinPrice(uint256 bid_amount) {
         require(bid_amount >= minPrice, "bid_amount is low than minPrice");
        _;
    }
    modifier moreThanHighestBid(uint256 bid_amount) {
         require(bid_amount > highestBid, "bid_amount is low than highestBid");
        _;
    }
    modifier lessThanPurchasePrice(uint256 bid_amount) {
         require(bid_amount < purchasePrice, "bid_amount is high than purchasePrice");
        _;
    }
    // modifier ERC20Approve(uint256 bid_amount) {
    //     // function in IERC20) approve(address spender, uint256 amount) returns (bool)
    //     // bool check = erc20Contract.approve(msg.sender, bid_amount);
    //     bool check = erc20Contract.approve(address(this), bid_amount);
    //     require(check == true, "approve!");
    //     _;
    // }

    modifier onlyAfterEnd() {
        require(
            block.timestamp > saleEndTime,
            "Sale: This sale is not finished"
        );
        _;
    }

    modifier onlyHighestBidder() {
        require(
            msg.sender == highestBidder,
            "Sale: This sender is not HighestBidder"
        );
        _;
    }
    
    modifier onlyBeforeSoldOut() {
        require(
            ended != true,
            "Sale: This is sold out"
        );
        _;
    }
}