import React, { useState } from "react";
import FavouritTour from "../Components/Tour/FavouritTour";
import EditUserForm from "../Components/UserProfile/EditUserForm";
import ListOfUserTours from "../Components/UserProfile/ListOfUserTours";
import { useAuth } from "../context/AuthContext";

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    profilePicture: null as File | null,
  });
  const { user } = useAuth();
  const [profileActive, setProfileActive] = useState("profile");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", formData);
  };

  const profileOnClick = () => {
    setProfileActive("profile");
  };
  const tourOnClick = () => {
    setProfileActive("tour");
  };

  const favouritOnClick = () => {
    setProfileActive("favourit");
  };

  return (
    <div className="grid grid-cols-[20%_80%] px-15 h-full">
      <div className="bg-blue-500 py-5 text-white flex flex-col gap-5 justify-start items-center">
        <h1 className="text-xl">User Profile</h1>
        <div className="w-30 bg-gray-200 p-2 rounded-full border-8 border-blue-300">
          <img
            src={`asserts/images/profilePictures/${user?.profileImage}`}
            alt="user profile pic"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="email flex flex-col items-center ">
          <h1>user@gmail.com</h1>
        </div>

        <div className="menu mt-10 flex flex-col w-full pl-[20%]">
          {/* Profile Information Tab */}
          <div
            className={`w-full flex flex-row gap-5 px-2 py-3 cursor-pointer  ${
              profileActive === "profile" ? "text-white" : "text-blue-200"
            } `}
            onClick={profileOnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p>Personal Information</p>
          </div>

          {/* Shared Tour Tab */}
          <div
            className={`w-full flex flex-row gap-5 px-2 py-3 text-blue-200 cursor-pointer ${
              profileActive === "tour" ? "text-white" : "text-blue-200"
            }`}
            onClick={tourOnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
              />
            </svg>
            <p>Shared Tours</p>
          </div>

          {/* favourit Tour Tab */}
          <div
            className={`w-full flex flex-row gap-5 px-2 py-3 text-blue-200 cursor-pointer ${
              profileActive === "favourit" ? "text-white" : "text-blue-200"
            }`}
            onClick={favouritOnClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>
            <p>Favourit Tours</p>
          </div>
        </div>
      </div>

      <div className=" bg-gray-100 px-10 py-5">
        {/* edit user form   */}
        <EditUserForm
          profileActive={profileActive}
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />

        {/* list of tour */}
        <ListOfUserTours profileActive={profileActive} />

        {/* list of favourit */}
        <FavouritTour profileActive={profileActive} />
      </div>
    </div>
  );
};

export default UserProfile;
