NEW_ITEM = 'NEW_ITEM'

export function newItem( item ) {
  return {
    type: NEW_ITEM,
    item: item
  }
}
