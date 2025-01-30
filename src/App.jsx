import React from "react";
import { BrowserRouter, Routes, Route }from "react-router-dom";
import SauLogin from "./views/SauLogin.jsx";
import SauSignup from "./views/SauSignup.jsx";
import SauMyFriend from "./views/SauMyFriend.jsx";
import SauAddMyFriend from "./views/SauAddMyFriend.jsx";
import SauUpdateMyFriend from "./views/SauUpdateMyFriend.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SauLogin />} />
        <Route path="/signup" element={<SauSignup />} />
        <Route path="/myfriend" element={<SauMyFriend />} />
        <Route path="/addmyfriend" element={<SauAddMyFriend />} />
        <Route path="/updatemyfriend/:myfriendId" element={<SauUpdateMyFriend />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
