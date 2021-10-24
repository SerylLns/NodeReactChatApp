import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Login() {
  const [login, setLogin] = useState(true);
  
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
              {login ? "Connexion" : "Inscription"}
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              {login ? (
                <SignIn setLogin={setLogin} />
              ) : (
                <SignUp setLogin={setLogin} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1482784160316-6eb046863ece?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHNub3d8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=60"
          alt=""
        />
      </div>
    </div>
  );
}
