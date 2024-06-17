import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Provider} from "react-redux";
import store from './store/store'
import ToastWrapper from "./components/ToastWrapper";
import UserLoader from "./components/UserLoader";

const App = () => {
  
  return(
    <Provider store={store}>
      <UserLoader>
        <RouterProvider router={router} />
        <ToastWrapper />
      </UserLoader>
    </Provider>
  )
}

export default App;
