import React from "react";
import FormDesign from "./components/FormDesign";
import Preview from './components/Preview';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-300 h-screen">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/QuizClone" element={<FormDesign />} />
            <Route path="/preview" element={<Preview/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
