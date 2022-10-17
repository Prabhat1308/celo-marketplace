// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {
    
    struct Listings {
        uint price;
        address seller;
    }

    mapping(address =>(mapping(uint => Listings))) public listings;
    
    modifier isNFTOwner(address nftaddress, uint tokenID){

    require(
        IERC721(nftaddress).ownerOf(tokenID)==msg.sender,"Not the owner"
    );
    _;

    }

    modifier isNotListed(){
         require(
        listings[nftAddress][tokenId].price == 0,
        "MRKT: Already listed"
    );
    _;
    }
    

    function createListing(
        address nftaddress ,
        uint tokenID,
        uint price
    ) external {
        
    }


}