// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketplace {
    
    struct Listing{
        uint price;
        address seller;
    }

  //  mapping(address =>(mapping(uint => Listings))) public listings;
      mapping(address => mapping(uint => Listing)) public listings;

    modifier isNFTOwner(address nftaddress, uint tokenID){

    require(
        IERC721(nftaddress).ownerOf(tokenID)==msg.sender,"Not the owner"
    );
    _;

    }

    modifier isNotListed(address nftaddress, uint tokenID){
         require(
        listings[nftaddress][tokenID].price == 0,
        " Already listed"
    );
    _;
    }
 
    modifier isListed(address nftaddress, uint tokenID){
       require(
        listings[nftaddress][tokenID].price > 0,"NOT listed"
       );
       _;
    }

    event ListingCreated(
    address nftaddress,
    uint256 tokenID,
    uint256 price,
    address seller
);
    function createListing(
        address nftaddress ,
        uint tokenID,
        uint price
    ) external  
    isNotListed(nftaddress,tokenID)
    isNFTOwner(nftaddress,tokenID)
    {
        require(price>0,"price must be greater than zero");
        IERC721 nftcontract = IERC721(nftaddress);
        
        require(
            nftcontract.isApprovedForAll(msg.sender, address(this)) ||
            nftcontract.getApproved(tokenID) == address(this),
            "No approval for NFT");

          listings[nftaddress][tokenID] = Listing({
            price: price,
            seller: msg.sender
        });

        emit ListingCreated(nftaddress,tokenID,price,msg.sender);
    }
    
    event ListingCancelled(
    address nftaddress,
    uint tokenID,
    address seller
    );
    function cancelListing(
        address nftaddress,
         uint tokenID)
         external
         isListed(nftaddress,tokenID)
         isNFTOwner(nftaddress,tokenID)
    {
       delete listings[nftaddress][tokenID];
       emit ListingCancelled(nftaddress,tokenID,msg.sender);
    }

    event ListingUpdated(
        address nftaddress,
        uint tokenID,
        uint newprice,
        address seller
    );

    function updateListing(
        address nftaddress,
        uint tokenID,
        uint newprice
    )external
    isListed(nftaddress,tokenID)
    isNFTOwner(nftaddress,tokenID)
    {
        require(newprice>0,"price must be greater than 0");

        listings[nftaddress][tokenID].price = newprice;

        emit ListingUpdated(nftaddress, tokenID, newprice, msg.sender);
    }
 
   event ListingPurchased(
    address nftaddress,
    uint tokenID,
    address seller,
    address buyer
   );

   function purchaseListing(
    address nftaddress,
    uint tokenID
   )external payable
    isListed(nftaddress,tokenID)
   {
    Listing memory listing = listings[nftaddress][tokenID];
    require(msg.value== listing.price ,"Incorrect amount ");
    delete listings[nftaddress][tokenID];

     IERC721(nftaddress).safeTransferFrom(
        listing.seller,
        msg.sender,
        tokenID
    );

    (bool sent, ) = payable(listing.seller).call{value: msg.value}("");
    require(sent,"failure");


    emit ListingPurchased(nftaddress,tokenID,listing.seller,msg.sender);
   } 
          
          
}