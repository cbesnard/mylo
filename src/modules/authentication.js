// @flow

const actionTypes = {
  LOGIN: 'LOGIN',
};

const initialState: AuthenticationType = {
  user: null,
  token: null,
  googleId: null,
};

export const loginActionCreator = (user,token: string, googleId: string) => ({
  type: actionTypes.LOGIN,
  user,
  token,
  googleId,
});

export const isAuthenticated = (state: AppStateType): boolean => !!state.authentication.token ;

export const authenticationReducer = (
  state: AuthenticationType = initialState,
  action: any,
): SnackbarType => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.user,
        token: action.token,
        googleId: action.googleId,
      };
    default:
      return state;
  }
};
