// import {
//   ItemBought as ItemBoughtEvent,
//   ItemCanceled as ItemCanceledEvent,
//   ItemListed as ItemListedEvent
// } from "../generated/DragonMintMarketplace/DragonMintMarketplace"
// import { ItemBought, ItemCanceled, ItemListed } from "../generated/schema"

// export function handleItemBought(event: ItemBoughtEvent): void {
//   let entity = new ItemBought(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.buyer = event.params.buyer
//   entity.nftAddress = event.params.nftAddress
//   entity.tokenId = event.params.tokenId
//   entity.price = event.params.price

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleItemCanceled(event: ItemCanceledEvent): void {
//   let entity = new ItemCanceled(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.seller = event.params.seller
//   entity.nftAddress = event.params.nftAddress
//   entity.tokenId = event.params.tokenId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleItemListed(event: ItemListedEvent): void {
//   let entity = new ItemListed(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.seller = event.params.seller
//   entity.nftAddress = event.params.nftAddress
//   entity.tokenId = event.params.tokenId
//   entity.price = event.params.price
//   entity.tokenUri = event.params.tokenUri

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

import { BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ItemBought as ItemBoughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent
} from "../generated/DragonMintMarketplace/DragonMintMarketplace"
import { ItemBought, ItemCanceled, ItemListed, ItemActive } from "../generated/schema"
import { log } from '@graphprotocol/graph-ts'

export function handleItemBought(event: ItemBoughtEvent): void {
  log.debug('Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), 
    event.block.hash.toHexString(),
    event.transaction.hash.toHexString(), 
  ])

  let itemBoughtEntity = ItemBought.load(
    event.params.nftAddress.concatI32(event.params.tokenId.toI32())
    )
  let itemItemActiveEntity = ItemActive.load(
    event.params.nftAddress.concatI32(event.params.tokenId.toI32())
    )

  if (!itemBoughtEntity) {
    itemBoughtEntity = new ItemBought(
      event.params.nftAddress.concatI32(event.params.tokenId.toI32())
      )
    }

  if (!itemItemActiveEntity) {
    itemItemActiveEntity = new ItemActive(
      event.params.nftAddress.concatI32(event.params.tokenId.toI32())
      )
    }

  
  itemBoughtEntity.seller = itemItemActiveEntity.seller
  itemBoughtEntity.buyer = event.params.buyer
  itemBoughtEntity.nftAddress = event.params.nftAddress
  itemBoughtEntity.tokenId = event.params.tokenId
  itemBoughtEntity.price = event.params.price

  itemBoughtEntity.blockNumber = event.block.number
  itemBoughtEntity.blockTimestamp = event.block.timestamp
  itemBoughtEntity.transactionHash = event.transaction.hash
  itemBoughtEntity.save()

  itemItemActiveEntity.buyer = event.params.buyer
  itemItemActiveEntity.nftAddress = event.params.nftAddress
  itemItemActiveEntity.tokenId = event.params.tokenId
  itemItemActiveEntity.price = event.params.price

  itemItemActiveEntity.blockNumber = event.block.number
  itemItemActiveEntity.blockTimestamp = event.block.timestamp
  itemItemActiveEntity.transactionHash = event.transaction.hash
  itemItemActiveEntity.save()
  
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
  log.debug('Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), 
    event.block.hash.toHexString(),
    event.transaction.hash.toHexString(), 
  ])

  let itemCanceledEntity = ItemCanceled.load(
    event.params.nftAddress.concatI32(event.params.tokenId.toI32())
    )
  let itemItemActiveEntity = ItemActive.load(
    event.params.nftAddress.concatI32(event.params.tokenId.toI32())
    )

  if (!itemCanceledEntity) {
    itemCanceledEntity = new ItemCanceled(
      event.params.nftAddress.concatI32(event.params.tokenId.toI32())
      )
    }

  if (!itemItemActiveEntity) {
    itemItemActiveEntity = new ItemActive(
      event.params.nftAddress.concatI32(event.params.tokenId.toI32())
      )
    }

  itemCanceledEntity.seller = event.params.seller
  itemCanceledEntity.buyer = event.params.seller
  itemCanceledEntity.nftAddress = event.params.nftAddress
  itemCanceledEntity.tokenId = event.params.tokenId
  itemCanceledEntity.price = new BigInt(0)

  itemCanceledEntity.blockNumber = event.block.number
  itemCanceledEntity.blockTimestamp = event.block.timestamp
  itemCanceledEntity.transactionHash = event.transaction.hash
  itemCanceledEntity.save()

  itemItemActiveEntity.seller = event.params.seller
  itemItemActiveEntity.buyer = event.params.seller
  itemItemActiveEntity.nftAddress = event.params.nftAddress
  itemItemActiveEntity.tokenId = event.params.tokenId
  itemItemActiveEntity.price = new BigInt(0)

  itemItemActiveEntity.blockNumber = event.block.number
  itemItemActiveEntity.blockTimestamp = event.block.timestamp
  itemItemActiveEntity.transactionHash = event.transaction.hash
  itemItemActiveEntity.save()
}

export function handleItemListed(event: ItemListedEvent): void {
  log.debug('Block number: {}, block hash: {}, transaction hash: {}', [
    event.block.number.toString(), 
    event.block.hash.toHexString(),
    event.transaction.hash.toHexString(), 
  ])

  let itemListedEntity = ItemListed.load(
    event.params.nftAddress.concatI32(event.params.tokenId.toI32())
    )
  let itemItemActiveEntity = ItemActive.load(
    event.params.nftAddress.concatI32(event.params.tokenId.toI32())
    )

  if (!itemListedEntity) {
    itemListedEntity = new ItemListed(
      event.params.nftAddress.concatI32(event.params.tokenId.toI32())
      )
    }

  if (!itemItemActiveEntity) {
    itemItemActiveEntity = new ItemActive(
      event.params.nftAddress.concatI32(event.params.tokenId.toI32())
      )
    }

  itemListedEntity.seller = event.params.seller
  itemListedEntity.buyer = Address.fromString("0x0000000000000000000000000000000000000000")
  itemListedEntity.nftAddress = event.params.nftAddress
  itemListedEntity.tokenId = event.params.tokenId
  itemListedEntity.price = event.params.price
  itemListedEntity.tokenUri = event.params.tokenUri

  itemListedEntity.blockNumber = event.block.number
  itemListedEntity.blockTimestamp = event.block.timestamp
  itemListedEntity.transactionHash = event.transaction.hash
  itemListedEntity.save()

  itemItemActiveEntity.seller = event.params.seller
  itemItemActiveEntity.buyer = Address.fromString("0x0000000000000000000000000000000000000000")
  itemItemActiveEntity.nftAddress = event.params.nftAddress
  itemItemActiveEntity.tokenId = event.params.tokenId
  itemItemActiveEntity.price = event.params.price
  itemItemActiveEntity.tokenUri = event.params.tokenUri

  itemItemActiveEntity.blockNumber = event.block.number
  itemItemActiveEntity.blockTimestamp = event.block.timestamp
  itemItemActiveEntity.transactionHash = event.transaction.hash
  itemItemActiveEntity.save()
}