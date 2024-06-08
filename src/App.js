import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Provider} from "react-redux";
import store from './store/store'
import ToastWrapper from "./components/ToastWrapper";

const App = () => {
  
  return(
    <Provider store={store}>
      <RouterProvider router={router} />
	    <ToastWrapper />
    </Provider>
  )
}

export default App;
