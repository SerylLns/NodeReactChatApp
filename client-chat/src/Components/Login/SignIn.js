import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";

const SignIn = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = document.querySelector("#error-field");
    const errorDiv = document.querySelector("#error-div");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/users/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          errorDiv.setAttribute("hidden", "");
          errors.innerHTML = res.data.errors.email;
          errors.innerHTML += res.data.errors.password;
        } else {
          window.location = "/"; //ALler a l'accueil
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-gray-700"
        >
          Email
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-md"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-md font-medium text-gray-700"
        >
          Mot de passe
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-md"
          />
        </div>
      </div>
      {/* error message */}
      <div hidden id="error-div" className="rounded-md  bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 id="error-field" className="text-sm font-medium text-red-800">
              
            </h3>
          </div>
        </div>
      </div>
      {/* end error */}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Se connecter
        </button>
      </div>
      <div>
        <div className="mt-6 relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-500" />
          </div>
          <div
            onClick={() => setLogin(false)}
            className="relative cursor-pointer flex justify-center text-lg"
          >
            <span className="px-2 pb-2 bg-white text-green-500">
              pas encore inscrit ?
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
