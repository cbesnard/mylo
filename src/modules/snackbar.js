// @flow

const actionTypes = {
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'HIDE_SNACKBAR',
};

const initialState: SnackbarType = {
  open: false,
  message: '',
};

export const showSnackbarActionCreator = (message: string) => ({
  type: actionTypes.SHOW_SNACKBAR,
  message,
});

export const hideSnackbarActionCreator = (message: string) => ({
  type: actionTypes.HIDE_SNACKBAR,
});

export const selectSnackbarState = (state: AppStateType): boolean => state.snackbar.open;
export const selectSnackbarMessage = (state: AppStateType): string => state.snackbar.message;

export const snackbarReducer = (
  state: SnackbarType = initialState,
  action: any,
): SnackbarType => {
  switch (action.type) {
    case actionTypes.SHOW_SNACKBAR:
      return {
        open: true,
        message: action.message,
      };
    case actionTypes.HIDE_SNACKBAR:
      return initialState;
    default:
      return state;
  }
};
