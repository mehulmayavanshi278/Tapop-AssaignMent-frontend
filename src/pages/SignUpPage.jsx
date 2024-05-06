import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { GoogleAuthProvider, auth } from "../COMPONENTS/firebase";
import axios from "axios";
import { BaseURL } from "../Apis/api";
import userService from "../services/user.service";
import GoogleButton from "react-google-button";
import tokenHelper from "../Helper/tokenHelper";

const SignUpPage = () => {
  const history = useNavigate();

  const notify = () => {
    toast.success("Success Message", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhoto, setprofilePhoto] = useState(null);
  const [coverPhoto, setcoverPhoto] = useState(null);
  const [gender, setGender] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
    console.log("Profile Picture:", profilePhoto);
    console.log("Cover Picture:", coverPhoto);
    console.log("Gender:", gender);
    try {
      if (!name) {
        return toast.error("fill the name", {
          position: "top-center",
        });
      }
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      console.log("user", user);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("profilePhoto", profilePhoto);
      formData.append("coverPhoto", coverPhoto);

      const res = await userService.signup(formData);
      if (res.status === 200) {
        console.log(res.data);
        setName("");
        setEmail("");
        setGender("");
        setPassword("");
        setprofilePhoto(null);
        setcoverPhoto(null);
        history("/login");
      } else {
        toast.error(res.data);
      }
    } catch (err) {
      if (err.status === 400) {
        console.log(err.data);
      }
      err.code &&
        err.code.startsWith("auth/") &&
        toast.error(err.message, {
          position: "top-center",
        });
      console.log("err", err);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      let res = await signInWithPopup(auth, GoogleAuthProvider);
      console.log(res);
      if (res) {
        const body = {
          name: res.user?.displayName,
          email: res.user?.email,
          phoneNo: res.user?.phoneNumber,
          profilePhoto: res.user?.photoURL,
        };

        res = await userService.signup(body);
        res = await userService.login({ email: body?.email });
        if (res.status === 200) {
          tokenHelper.create("token", res.data.token);
          history("/profile");
        }
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
        {/* <form className="mt-8 space-y-6" > */}
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="name" className="text-lg font-medium text-gray-900">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-lg font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="profile-pic"
              className="text-lg font-medium text-gray-900"
            >
              Profile Picture
            </label>
            <input
              id="profile-pic"
              name="profilePhoto"
              type="file"
              accept="image/*"
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              onChange={(e) => setprofilePhoto(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="cover-pic"
              className="text-lg font-medium text-gray-900"
            >
              Cover Profile Picture
            </label>
            <input
              id="cover-pic"
              name="coverPhoto"
              type="file"
              accept="image/*"
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              onChange={(e) => setcoverPhoto(e.target.files[0])}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-lg font-medium text-gray-900"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="show-password"
            name="show-password"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show-password" className="ml-2 text-gray-700">
            Show password
          </label>
        </div>

        <div>
          <button
            type="button"
            onClick={(e) => {
              handleSignUp(e);
            }}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
        <div>
          <GoogleButton
            style={{ width: "100%" }}
            onClick={() => {
              handleSignInWithGoogle();
            }}
          />
        </div>
        <div className="text-center text-gray-900">
          Already have an account?
          <button className="text-blue-600 mx-2 underline">
            <Link to="/login"> Login </Link>
          </button>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
};

export default SignUpPage;
