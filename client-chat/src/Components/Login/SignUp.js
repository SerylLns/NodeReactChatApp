import { XCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState } from 'react';

const SignUp = ({ setLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pseudo, setPseudo] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = document.querySelector("#error-field");
    const errorDiv = document.querySelector("#error-div");
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/users/register`,
      data: {
        pseudo,
        email,
        password,
      },
    }).then((res) => {
        if (res.data.errors) {
          errorDiv.setAttribute("hidden", "");
          errors.innerHTML = res.data.errors.pseudo;
          errors.innerHTML += res.data.errors.email;
          errors.innerHTML += res.data.errors.password;
        } else {
          setLogin(true)
        }
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      <div>
        <label
          htmlFor="pseudo"
          className="block text-md font-medium text-gray-700"
        >
          Pseudo
        </label>
        <div className="mt-1">
          <input
            id="pseudo"
            name="pseudo"
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-md"
          />
        </div>
      </div>
      <div className="space-y-1">
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
            required
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-md"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label
          htmlFor="passwordConfirm"
          className="block text-md font-medium text-gray-700"
        >
          Confirmer le mot de passe
        </label>
        <div className="mt-1">
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-md"
          />
        </div>
      </div>

      <div hidden id="error-div" className="rounded-md  bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3
              id="error-field"
              className="text-sm font-medium text-red-800"
            ></h3>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          S'inscrire
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
            onClick={() => setLogin(true)}
            className="relative cursor-pointer flex justify-center text-lg"
          >
            <span className="px-2 pb-2 bg-white text-green-500">
              Déja inscrit ?
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;