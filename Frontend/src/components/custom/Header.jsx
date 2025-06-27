import React, { useEffect, useState } from "react";
import logo from "/logo.jpeg";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { getAuth, signOut } from "firebase/auth"; 

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.editUser.userData);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if(user){
      console.log("Printing From Header User Found");
    }
    else{
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // This signs out from Firebase
      // Optionally, you can still call your backend logout if needed:
      // await logoutUser();
      dispatch(addUserData(""));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      id="printHeader"
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md flex justify-between px-10 py-2 items-center"
    >
      <Link to="/">
        <img src={logo} alt="logo" width={180} height={180} />
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Button
              variant="outline"
              className="transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Button>
            <Button className="transition-transform duration-200 hover:scale-105 hover:shadow-lg" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button className="transition-transform duration-200 hover:scale-105 hover:shadow-lg" onClick={() => {
            navigate("/auth/sign-in");
          }}>Get Started</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
