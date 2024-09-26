var currentUser: any;

export const getCurrentUser = (): any => {
  return currentUser;
};

export const setCurrentUser = (user: any) => {
  currentUser = user;
};

export const logoutUser = () => {
  currentUser = null;
};
