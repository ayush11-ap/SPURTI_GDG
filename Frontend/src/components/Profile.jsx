import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";

const Profile = () => {
  const { user } = useContext(UserDataContext);
  console.log(user);

  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <fieldset className="fieldset w-3xl bg-base-200 border border-base-300 p-4 rounded-box">
        <fieldset className="fieldset w-3xl bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend text-2xl">Profile Page</legend>
          {/* Profile UI */}
          <div className="space-y-6">
            {/* User Initial and Full Name */}
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                {user?.name.charAt(0)}
              </div>
              <div className="text-lg font-semibold">{user?.name}</div>
            </div>

            {/* Email and Mobile Number */}
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-bold">Email:</span> {user?.email}
              </div>
              <div className="text-sm">
                <span className="font-bold">Mobile No:</span> {user?.mobileNo}
              </div>
            </div>

            {/* Address Section */}
            <div className="text-sm">
              <span className="font-bold">Address:</span> {user?.address}
            </div>

            {/* Role and Role Details */}
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-bold">Role:</span> {user?.role}
              </div>
              <div className="text-sm">
                <span className="font-bold">Role Details:</span>
                <ul className="list-disc list-inside">
                  <li>
                    <span className="font-bold">Preferred Area:</span>{" "}
                    {user?.roleDetails.preferredArea}
                  </li>
                  <li>
                    <span className="font-bold">Skills:</span>{" "}
                    {user?.roleDetails.skills}
                  </li>
                </ul>
              </div>
            </div>

            {/* Created Details */}
            <div className="text-sm">
              <span className="font-bold">Created At:</span>{" "}
              {new Date(user?.createdAt).toLocaleString()}
            </div>
          </div>
        </fieldset>
      </fieldset>
    </div>
  );
};

export default Profile;
