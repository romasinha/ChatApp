
import React from 'react';



import Join from "./components/Join";
import Chat from "./components/Chat";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element = {<Join/>}/>
          <Route path = "/chat" element = {<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
