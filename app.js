import React from "react";

export default function App() {
  return React.createElement(
    "div",
    { className: "App" },
    React.createElement(
      "header",
      { className: "App-header", style: { backgroundColor: "pink" } },
      new Set()
        .add(
          React.createElement("img", {
            src: "/img/favicon.ico",
            key: "image",
            style: {
              width: "100%",
              height: "100%",
              borderRadius: 50,
              objectFit: "cover",
            },
          })
        )
        .add(React.createElement("p", { key: "paragraph" }, "hello"))
        .add(
          React.createElement(
            "button",
            { key: "button1", id: "button" },
            "alert"
          )
        )
        .add(
          React.createElement(
            "script",
            {
              key: "script1",
            },
            `document.getElementById("button").onclick=()=>{alert("you are the best!")};`
          )
        )
    )
  );
}
