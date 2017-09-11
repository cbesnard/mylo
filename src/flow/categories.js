// @flow

declare type CategoriesType = {
  selected: number,
  map: {[id: string]: CategoryType},
}

declare type CategoryType = {
  id: number,
  name: string,
  color: string,
}
