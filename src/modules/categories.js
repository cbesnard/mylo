// @flow

const actionTypes = {
  SELECT_CATEGORY: 'SELECT_CATEGORY',
};

export const selectCategoryCreator = (id) => ({
  type: actionTypes.SELECT_CATEGORY,
  id,
});

const initialState: CategoriesType = {
  selected: 'all',
  map: {
    all: {
      name: 'all',
      color: null
    }
  }
};

export const selectSelectedCategory = (state: AppStateType): string => state.categories.selected;

export const categoriesReducer = (
  state: CategoriesType = initialState,
  action: any,
): CategoriesType => {
  switch (action.type) {
    case actionTypes.SELECT_CATEGORY:
      return {
        ...state,
        selected: action.id,
      };
    default:
      return state;
  }
};
