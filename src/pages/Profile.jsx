import React, { useEffect, useState } from "react";
import tokenHelper from "../Helper/tokenHelper";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";

function Profile() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [QRcode, setQRcode] = useState(null);

  const [updateemail, setupdateEmail] = useState("");
  const [updatephoneNo, setupdatePhoneNo] = useState("");
  const [updatecoverPhoto, setupdateCoverPhoto] = useState(null);
  const [updateprofilePhoto, setupdateProfilePhoto] = useState(null);
  const [updatename, setUpdateName] = useState("");

  const [updateData, setUpdateData] = useState({});

  // const handlesetUserData = (e)=>{
  //     const {name , value} = e.target;
  //     console.log(name , value);
  //     setUserData({ [name]: value });

  // }

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    setupdateCoverPhoto(file);
    console.log(readInputImage(file, setCoverPhoto));
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    setupdateProfilePhoto(file);
    console.log(readInputImage(file, setProfilePhoto));
  };

  const readInputImage = (file, val) => {
    if (file) {
      const reader = new FileReader();
      let img;
      reader.onload = () => {
        img = reader.result;
        // console.log(img)
        val(reader.result);
        // console.log(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(img);
      return img;
    }
  };
  const handleQrCodeChange = (e) => {
    const file = e.target.files[0];
    console.log(readInputImage(file, setQRcode));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(
        updateemail,
        updatephoneNo,
        updatecoverPhoto,
        updateprofilePhoto
      );
      const formData = new FormData();
      updateemail && formData.append("email", updateemail);
      updatecoverPhoto && formData.append("coverPhoto", updatecoverPhoto);
      updateprofilePhoto && formData.append("profilePhoto", updateprofilePhoto);
      updatename && formData.append("name", updatename);
      updatephoneNo && formData.append("phoneNo", updatephoneNo);

      const res = await userService.update(formData);
      if (res.status === 200) {
        setupdateCoverPhoto(null);
        setupdateProfilePhoto(null);
        setupdateEmail("");
        setupdatePhoneNo("");
        getUserDetails();
      }
    } catch (err) {
      console.log(err);
    }

    // Handle form submission here
  };

  const getUserDetails = async () => {
    try {
      const res = await userService.getUser();
      //   setUserData({
      //     name:res?.data?.name,
      //     email:res?.data?.email,
      //     profilePhoto:res?.data?.profilePhoto,
      //     coverPhoto:res?.data?.coverPhoto,
      //     phoneNo:res?.data?.phoneNo,
      //     QRcode:res?.data?.QRcode
      //   })

      const { name, email, profilePhoto, coverPhoto, QRcode, phoneNo } =
        res.data;
      setName(name);
      setCoverPhoto(coverPhoto);
      setEmail(email);
      setPhoneNo(phoneNo);
      setQRcode(QRcode);
      setProfilePhoto(profilePhoto);
      console.log(typeof QRcode);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = tokenHelper.get();
    token ? getUserDetails() : (window.location.href = "/login");
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md md:py-0 py-4 mx-auto bg-white rounded-lg overflow-hidden md:max-w-xl shadow-lg">
          <div className="flex md:flex-row flex-col md:items-center justify-evenly md:px-0 px-4">
            <div className="flex flex-col md:items-start  items-center">
              <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white">
                <img
                  className="h-full w-full object-cover"
                  src={`${profilePhoto}`}
                  alt="Profile Photo"
                />
              </div>
              <div className="w-48">
                <input
                  className="w-full"
                  type="file"
                  onChange={(e) => {
                    handleProfilePhotoChange(e);
                  }}
                />
              </div>
            </div>
            <div className="md:p-8 py-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Name
              </div>
              <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
                {name}
              </h2>
              <div className="mt-2">
                <label className="block text-sm text-gray-600" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setupdateEmail(e.target.value);
                  }}
                  placeholder="john@example.com"
                />
              </div>
              <div className="mt-2">
                <label
                  className="block text-sm text-gray-600"
                  htmlFor="phoneNo"
                >
                  Phone No
                </label>
                <input
                  className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                  type="tel"
                  id="phoneNo"
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.phoneNo);
                    setupdatePhoneNo(e.target.value);
                  }}
                  placeholder="123-456-7890"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-gray-600" htmlFor="QRcode">
                  QR Code
                </label>
                <img
                  className="h-24 w-24 mt-1 object-cover rounded-lg"
                  src={`${QRcode}`}
                  alt="QR Code"
                />
                {/* <input type="file" onChange={(e)=>{handleQrCodeChange(e)}} /> */}
              </div>
            </div>
          </div>
          <div className="mt-4 p-8">
            <label className="block text-sm text-gray-600" htmlFor="cover">
              Cover Photo
            </label>
            <img
              className="h-64 w-full mt-1 object-cover rounded-lg"
              src={`${coverPhoto}`}
              alt="Cover Photo"
            />
            <div className="mt-4">
              <label
                className="block text-sm text-gray-600"
                htmlFor="coverUpload"
              >
                Upload New Cover Photo
              </label>
              <input
                className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                type="file"
                id="coverUpload"
                onChange={handleCoverPhotoChange}
              />
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
