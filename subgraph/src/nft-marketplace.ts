import {

  ListingCancelled,
  ListingCreated,
  ListingPurchased,
  ListingUpdated,
  
} from "../generated/NFTMarketplace/NFTMarketplace";
import { store } from "@graphprotocol/graph-ts";
import { ListingEntity } from "../generated/schema";

export function handleListingCreated(event: ListingCreated): void {
  // Create a unique ID that refers to this listing
  // The NFT Contract Address + Token ID + Seller Address can be used to uniquely refer
  // to a specific listing
  const id =
    event.params.nftaddress.toHex() +
    "-" +
    event.params.tokenID.toString() +
    "-" +
    event.params.seller.toHex();

  // Create a new entity and assign it's ID
  let listing = new ListingEntity(id);

  // Set the properties of the listing, as defined in the schema,
  // based on the event
  listing.seller = event.params.seller;
  listing.nftaddress = event.params.nftaddress;
  listing.tokenID = event.params.tokenID;
  listing.price = event.params.price;

  // Save the listing to the nodes, so we can query it later
  listing.save();
}

export function handleListingCanceled(event: ListingCancelled): void {
  const id =
  event.params.nftaddress.toHex() +
  "-" +
  event.params.tokenID.toString() +
  "-" +
  event.params.seller.toHex();

// Load the listing to see if it exists
let listing = ListingEntity.load(id);

// If it does
if (listing) {
  // Remove it from the store
  store.remove("ListingEntity", id);
}
}

export function handleListingPurchased(event: ListingPurchased): void {

  const id =
  event.params.nftaddress.toHex() +
  "-" +
  event.params.tokenID.toString() +
  "-" +
  event.params.seller.toHex();

// Load the listing to see if it exists
let listing = ListingEntity.load(id);

// If it does
if (listing) {
  // Remove it from the store
  store.remove("ListingEntity", id);
}
}

export function handleListingUpdated(event: ListingUpdated): void {
   // Recreate the ID that refers to the listing
  // Since the listing is being updated,
  // the datastore must already have an entity with this ID
  // from when the listing was first created
  const id =
    event.params.nftaddress.toHex() +
    "-" +
    event.params.tokenID.toString() +
    "-" +
    event.params.seller.toHex();

  // Attempt to load a pre-existing entity, instead of creating a new one
  let listing = ListingEntity.load(id);

  // If it exists
  if (listing) {
    // Update the price
    listing.price = event.params.newprice;

    // Save the changes
    listing.save();
  }

}