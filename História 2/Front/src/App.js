const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");

const Signup = require("./users/signup");

function App() {
  return (
    <>
      <Signup />
    </>
  );
}

module.exports = App;
