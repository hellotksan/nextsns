// import React from "react";
// import { useContext } from "react";
// import Home from "./home/Home.jsx";
// import Login from "./login/Login.jsx";
// import Profile from "./profile/Profile.jsx";
// import Register from "./register/Register.jsx";
// import Setting from "./settings/Settings.jsx";
// import PostEdit from "./postEdit/PostEdit.jsx";
// import Users from "./users/Users.jsx";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { AuthContext } from "../state/AuthContext";
// import "./index.css";

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={user ? <Home /> : <Register />} />
//         <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
//         <Route
//           path="/register"
//           element={user ? <Navigate to="/" /> : <Register />}
//         />
//         <Route path="/profile/:username" element={<Profile />} />
//         <Route path="/settings/:username" element={<Setting />} />
//         <Route path="/postedit/:username/:postId" element={<PostEdit />} />
//         <Route path="/users" element={<Users />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
