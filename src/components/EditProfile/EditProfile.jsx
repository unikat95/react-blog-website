import React, { useContext, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillCamera } from "react-icons/ai";
import Button from "../Button/Button";
import BlogContext from "../../context/BlogContext";

export default function EditProfile({ currentUser, userRef, updateProfile }) {
  const { picture, setPicture } = useContext(BlogContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userRef.update({
        firstName,
        lastName,
        birthDate: selectedDate.toLocaleDateString("pt-BR"),
        about,
        completed: true,
        picture,
      });

      console.log("Profile updated successfully!");
      updateProfile();
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataUrl = reader.result;
      setPicture(imageDataUrl);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSetDate = (data) => {
    setSelectedDate(data);
  };

  return (
    <>
      <div
        className={`w-full h-auto bg-white rounded-md p-10 flex flex-col gap-10`}
      >
        <div>
          <h1>Edit profile</h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-between items-start gap-10"
          >
            <div className="w-auto">
              <span className="w-[14em] h-[14em] bg-gray-300 rounded-full flex justify-center items-center relative overflow-hidden group">
                <img
                  src={picture}
                  alt=""
                  className="w-full h-full object-cover group-hover:brightness-50 duration-300"
                />
                <label
                  htmlFor="fileInput"
                  className="w-full h-full flex justify-center items-center text-white cursor-pointer absolute scale-0 group-hover:scale-100 duration-200"
                >
                  <AiFillCamera size="50" />
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First name..."
                  className="w-full bg-gray-100 p-2 rounded-sm focus:outline-blue-400"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last name..."
                  className="w-full bg-gray-100 p-2 rounded-sm focus:outline-blue-400"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleSetDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date of birth..."
                  className="w-full bg-gray-100 p-2 rounded-sm focus:outline-blue-400"
                  scrollableMonthYearDropdown
                  useShortMonthInDropdown
                  showYearDropdown
                  showMonthDropdown
                />
              </div>
              <div className="flex">
                <textarea
                  name="about"
                  id="about"
                  cols="30"
                  rows="7"
                  className="w-full bg-gray-100 p-2 rounded-sm focus:outline-blue-400"
                  onChange={(e) => setAbout(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end mt-5">
                <Button value={"Save"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
