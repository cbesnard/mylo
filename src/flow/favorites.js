// @flow

declare type FavoritesType = {
  map: {[id: number]: FavoriteType},
}

declare type FavoriteType = {
  id: string,
  categoryId: number,
  name: string,
  latitude: number,
  longitude: number,
  streetNumber: string,
  streetName: string,
  city: string,
}
