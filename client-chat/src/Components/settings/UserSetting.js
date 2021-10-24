import {
  AtSymbolIcon,
  BadgeCheckIcon,
  PencilIcon,
  XIcon,
} from "@heroicons/react/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/userAction";

const UserSetting = ({ setEditUser }) => {
  const user = useSelector((state) => state.userReducer);
  const [pseudo, setPseudo] = useState(user.pseudo);
  const [email, setEmail] = useState(user.email);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const editProfil = () => {
    const data = new FormData();
    data.append("pseudo", pseudo);
    data.append("file", image);
    data.append("email", email);
    dispatch(updateUser(user._id, data));
    setEditMode(false);
  };
  const imagePreview = (file) => {
    setImage(file);
    let previewSrc;
    previewSrc = URL.createObjectURL(file);
    const inputImg = document.getElementById("uploadImgRef");
    inputImg.style.background = `url(${previewSrc})`;
    inputImg.style.backgroundSize = "cover";
    inputImg.style.backgroundPosition = "center"

  }
  return (
    <div className="z-50 absolute flex items-center top-0 w-full h-full bg-opacity-100 shadow-md bg-gray-600 right-0 bottom-0 left-0">
      <div className="max-w-md mx-auto relative bg-white w-4/6 shadow-md rounded-lg px-4 sm:max-w-3xl sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <XIcon
          onClick={() => setEditUser(false)}
          className="absolute top-5 right-5 w-8 h-8 cursor-pointer"
        />
        <div className="divide-y divide-warm-gray-200">
          <section className="" aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              className="text-2xl mb-5 font-extrabold text-warm-gray-900 sm:text-3xl"
            >
              Réglages
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
              <div className="bg-gray-50 rounded-md px-3 py-1">
                <h3 className="text-lg font-bold text-warm-gray-900">
                  Pseudo:
                </h3>
                <dl className="mt-2 text-base text-warm-gray-500">
                  <div>
                    {editMode ? (
                      <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder={user.pseudo}
                      />
                    ) : (
                      <dd className="ml-5 text-lg">{user.pseudo}</dd>
                    )}
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 rounded-md px-3 py-1">
                <div className="flex items-center">
                  <AtSymbolIcon className="w-6 h-6 mr-1" />
                  <h3 className="text-lg font-bold text-warm-gray-900">
                    Email:
                  </h3>
                </div>
                <dl className="mt-2 text-base text-warm-gray-500">
                  <div>
                    {editMode ? (
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder={user.email}
                      />
                    ) : (
                      <dd className="ml-5 text-lg">{user.email}</dd>
                    )}
                  </div>
                </dl>
              </div>
              <div>
                <label
                  className={`${
                    editMode ? "" : "disable-this"
                  } w-64 flex flex-col items-center disabled:opacity-50 px-4 py-8 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-400 transition-all hover:text-white`}
                  id="uploadImgRef"
                >
                  <svg
                    className="w-8 h-8  "
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    Changer de photo
                  </span>
                  <input
                    type="file"
                    onChange={(e) => imagePreview(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
              {editMode ? (
                <button
                  onClick={() => editProfil()}
                  className="inline-flex items-center absolute bottom-10 right-16 justify-between w-1/5 h-12 px-5 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg self-end focus:shadow-outline hover:bg-green-800"
                >
                  <span className="text-md font-bold text-white">Valider</span>
                  <BadgeCheckIcon className="w-8 h-8 text-white" />
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="inline-flex items-center absolute bottom-10 right-16 justify-between w-1/5 h-12 px-5 text-green-100 transition-colors duration-150 bg-gray-400 rounded-lg self-end focus:shadow-outline hover:bg-gray-600"
                >
                  <span className="text-md font-bold text-white">Modifier</span>
                  <PencilIcon className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
