import {
  UserGroupIcon,
  LogoutIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import Cookies from "js-cookie";

export default function FlyoutChat({ open, setEditUser, setOpenUsersChat, openUsersChat }) {
  const logout = () => {
    if (window !== "undefined") {
      Cookies.remove("jwt", { expires: 1 });
      window.location = "/";
    }
  };

  return (
    <>
      {open && (
        <div className="rounded-lg rounded-r-sm w-52 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
            <div
              onClick={() => setOpenUsersChat(!openUsersChat)}
              className="-m-5 p-3 cursor-pointer	flex items-center block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <UserGroupIcon className="flex-shrink-0 h-6 w-6 mr-3 text-green-600" />
              <p className="text-base font-medium text-gray-900">
                Utilisateurs
              </p>
            </div>
            <div
              onClick={() => setEditUser(true)}
              className="-m-5 p-3 cursor-pointer flex items-center block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
            >
              <UserCircleIcon className="flex-shrink-0 h-6 w-6 mr-3 text-green-600" />
              <p className="text-base font-medium text-gray-900">Profil</p>
            </div>
            <div onClick={() => logout()} className="-m-5 p-4 cursor-pointer flex items-center block rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
              <LogoutIcon className="flex-shrink-0 h-6 w-6 mr-3 text-gray-600" />
              <p className="text-base font-medium text-gray-900">Déconnexion</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
