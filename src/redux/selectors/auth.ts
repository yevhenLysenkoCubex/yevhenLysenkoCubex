const getIsUserLoggedIn = (state: any) => state.auth.isLoggedIn;
const getUsersFirstName = (state: any) => state.auth.user.firstName;
const getUsersLastName = (state: any) => state.auth.user.lastName;
const getUsersEmail = (state: any) => state.auth.user.email;

const authSelectors = {
  getIsUserLoggedIn,
  getUsersFirstName,
  getUsersLastName,
  getUsersEmail,
};

export default authSelectors;
