import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "./features/querySlice.js";
import MainDashboard from "./components/MainDashboard.jsx";

// Redux store configuration
const store = configureStore({
  reducer: {
    query: queryReducer,
  },
  devTools: true,
});

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-900 min-h-screen text-gray-100">
        <MainDashboard />
      </div>
    </Provider>
  );
}

export default App;
