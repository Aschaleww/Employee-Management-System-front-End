import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListEmployee from "./component/ListEmployee";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import AddEmployee from "./component/AddEmployee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListEmployee />}></Route>
          <Route path="/employee" element={<ListEmployee />}></Route>
          <Route path="/add-employee" element={<AddEmployee />}></Route>
          <Route path="/edit-employee/:id" element={<AddEmployee />}></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
