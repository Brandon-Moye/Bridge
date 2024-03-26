/**
 * If I put content/components outside of the Routes tag, that would not re render when a link is
 * NEED to brush up on dynamic routes
 */

import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Blog from "./components/Blog";
import BlogArray from "./components/BlogArray";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  const blogComponent = BlogArray.map((post) => (
    <Blog key={post.postNum} post={post} />
  ));
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={blogComponent} />
      </Routes>
    </div>
  );
}

export default App;
