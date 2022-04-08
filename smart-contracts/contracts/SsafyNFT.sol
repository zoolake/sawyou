// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// import "./token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721Enumerable{

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    // 추가한 변수
    string private _name;
    string private _symbol;

    constructor() ERC721 (_name, _symbol) {
    }

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public returns (uint256) {
        // 새로운 토큰 식별자를 부여받고 _mint()를 호출한다.
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;
        _mint(to, newTokenId);
        // 상태 변수에 토큰 식별자의 tokenURI 정보를 추가
        tokenURIs[newTokenId] = _tokenURI;
        // 새롭게 생성된 토큰 식별자를 반환한다.
        return newTokenId;
    }
}