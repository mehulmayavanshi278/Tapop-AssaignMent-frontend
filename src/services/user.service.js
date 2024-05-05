import axios from "axios";
import {
  BaseURL,
  deleteUserApi,
  loginApi,
  signupApi,
  updateUserApi,
  getUser,
} from "../Apis/api";
import tokenHelper from "../Helper/tokenHelper";

class userService {
  getUser = async () => {
    try {
      return await axios.get(BaseURL + getUser.url, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: tokenHelper.get(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  signup = async (data) => {
    try {
      console.log("hg", data);
      return await axios.post(BaseURL + signupApi.url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  login = async (data) => {
    try {
      return await axios.post(BaseURL + loginApi.url, data);
    } catch (err) {
      console.log(err);
    }
  };
  update = async (data) => {
    try {
      console.log("tok", tokenHelper.get());
      return await axios.post(BaseURL + updateUserApi.url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: tokenHelper.get(),
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  delete = async (id) => {
    try {
      return await axios.post(BaseURL + deleteUserApi.url + `/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
}

export default userService = new userService();
