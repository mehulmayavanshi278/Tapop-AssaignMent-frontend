// const BaseURL = "http://localhost:5000";
const BaseURL = "https://tapop-assaign-ment-backend.vercel.app";

const loginApi = {
  url: "/user/login",
};
const signupApi = {
  url: "/user/signup",
};
const getUser = {
  url: "/user",
};
const updateUserApi = {
  url: "/user/update",
};
const deleteUserApi = {
  url: "/user/delete",
};

export { BaseURL, loginApi, signupApi, getUser, updateUserApi, deleteUserApi };
