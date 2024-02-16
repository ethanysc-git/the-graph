# Dragon Mint Marketplace Event Subgraph

## **內容涵蓋**

- DragonMintMarketplace Event:
  - event ItemListed
  - event ItemCanceled
  - event ItemBought
- Dragon Mint Marketplace the Subgraph Event Entity
  - ItemActive
- DragonMintMarketplace Contract Address:
  - 0x1c92920ca2445C3c29A9CcC551152317219C61A6

## **Basic GraphQL**

```graphql
{
  itemBoughts(first: 5) {
    id
    seller
    buyer
    nftAddress
    price
  }
}
{
  itemCanceleds(first: 5) {
    id
    seller
    buyer
    nftAddress
    price
  }
}
{
  itemActives(first: 5) {
    id
    seller
    buyer
    nftAddress
    tokenUri
    price
  }
}
```
