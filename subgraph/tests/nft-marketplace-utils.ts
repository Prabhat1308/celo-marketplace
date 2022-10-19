import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ListingCancelled,
  ListingCreated,
  ListingPurchased,
  ListingUpdated
} from "../generated/NFTMarketplace/NFTMarketplace"

export function createListingCancelledEvent(
  nftaddress: Address,
  tokenID: BigInt,
  seller: Address
): ListingCancelled {
  let listingCancelledEvent = changetype<ListingCancelled>(newMockEvent())

  listingCancelledEvent.parameters = new Array()

  listingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "nftaddress",
      ethereum.Value.fromAddress(nftaddress)
    )
  )
  listingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  listingCancelledEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingCancelledEvent
}

export function createListingCreatedEvent(
  nftaddress: Address,
  tokenID: BigInt,
  price: BigInt,
  seller: Address
): ListingCreated {
  let listingCreatedEvent = changetype<ListingCreated>(newMockEvent())

  listingCreatedEvent.parameters = new Array()

  listingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftaddress",
      ethereum.Value.fromAddress(nftaddress)
    )
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingCreatedEvent
}

export function createListingPurchasedEvent(
  nftaddress: Address,
  tokenID: BigInt,
  seller: Address,
  buyer: Address
): ListingPurchased {
  let listingPurchasedEvent = changetype<ListingPurchased>(newMockEvent())

  listingPurchasedEvent.parameters = new Array()

  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "nftaddress",
      ethereum.Value.fromAddress(nftaddress)
    )
  )
  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  listingPurchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return listingPurchasedEvent
}

export function createListingUpdatedEvent(
  nftaddress: Address,
  tokenID: BigInt,
  newprice: BigInt,
  seller: Address
): ListingUpdated {
  let listingUpdatedEvent = changetype<ListingUpdated>(newMockEvent())

  listingUpdatedEvent.parameters = new Array()

  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftaddress",
      ethereum.Value.fromAddress(nftaddress)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newprice",
      ethereum.Value.fromUnsignedBigInt(newprice)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingUpdatedEvent
}
