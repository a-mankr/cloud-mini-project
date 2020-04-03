import React from "react";
import { render } from "react-dom";
import ButtonAppBar from "./ButtonAppBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./SignIn";
import StickyFooter from "./StickyFooter";

const App = () => {
  return (
    <div>
      <ButtonAppBar />
      <SignIn />
      <StickyFooter />
    </div>
  );
};

render(<App />, document.getElementById("root"));
