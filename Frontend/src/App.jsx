import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { addUserData } from "./features/user/userFeatures";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import useScrollFadeIn from "./lib/useScrollFadeIn";

function App() {
  const user = useSelector((state) => state.editUser.userData);
  const dispatch = useDispatch();
  const [fadeRef, isVisible] = useScrollFadeIn();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is signed in:", user);
        dispatch(addUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          // Add any other user properties you need
        }));
      } else {
        // User is signed out
        console.log("User is signed out");
        dispatch(addUserData(null));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Header user={user} />
      <div
        ref={fadeRef}
        className={`animated-fadein${isVisible ? " visible" : ""}`}
        style={{ paddingTop: "64px" }}
      >
        <Outlet />
      </div>
      <Toaster />
    </>
  );
}

export default App;
