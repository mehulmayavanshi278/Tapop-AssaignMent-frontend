import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, auth } from "../COMPONENTS/firebase";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import tokenHelper from "../Helper/tokenHelper";
import GoogleButton from "react-google-button";

const LoginPage = () => {
  const history = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
  
    e.preventDefault();

    console.log("email:", email);
    console.log("Password:", password);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      if (user) {
        const res = await userService.login({ email, password });
        if (res.status === 200) {
          toast.success("logging successfully");
          console.log(res.data);
          tokenHelper.create("token", res.data.token);
          history("/profile");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      let res = await signInWithPopup(auth, GoogleAuthProvider);
      console.log(res);
      if (res) {
        const body = {
          email: res.user?.email,
        };

        res = await userService.login(body);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
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
          </div>

          <div>
            <button
              type="button"
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 hover:bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
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
            don't have an account?
            <button className="text-blue-600 mx-2 underline">
              <Link to="/signup"> signup </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
