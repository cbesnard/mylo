// @flow
import randomMC from 'random-material-color';
import appStyle from 'Mylo/style/AppStyles';
import { map } from 'lodash';

const actionTypes = {
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  ADD_CATEGORY: 'ADD_CATEGORY',
};

export const selectCategoryCreator = (id) => ({
  type: actionTypes.SELECT_CATEGORY,
  id,
});

export const addCategoryCreator = () => ({
  type: actionTypes.ADD_CATEGORY,
});

const initialState: CategoriesType = {
  selected: 0,
  map: {
    0: {
      id: 0,
      name: 'all',
      color: appStyle.colors.allCategory,
    }
  }
};

export const selectSelectedCategory = (state: AppStateType): number =>
  state.categories.selected;

export const selectCategories = (state: AppStateType): CategoryType[] =>
  map(state.categories.map, category => category);

export const selectCategoryById = (state: AppStateType, id: number): CategoryType =>
  state.categories.map[id];

const generateCategory = (id) : CategoryType => ({
  id: id,
  name: 'Hello',
  color: randomMC.getColor(),
});

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
    case actionTypes.ADD_CATEGORY:
      const newCategoryId = Math.floor(Math.random() * 100000) + 1;
      return {
        ...state,
        map: {
          ...state.map,
          [newCategoryId]: generateCategory(newCategoryId)
        },
      };
    default:
      return state;
  }
};
