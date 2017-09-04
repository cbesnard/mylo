// @flow

declare type CategoriesType = {
  selected: string,
  map: {[id: string]: CategoryType},
}

declare type CategoryType = {
  name: string,
  color: string,
}
