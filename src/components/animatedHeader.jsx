import React, { useEffect } from "react";
import "../utils/css/header.css"; // Assuming you store your header CSS here

const AnimatedHeader = () => {
  useEffect(() => {
    // The typewriter effect logic here
    const text =
      "Hi, I'm Ivy!\nI'm a Beauty/Skincare\nProduct Developer.\nLocated in Los Angeles.\nLet's work together!";
    let index = 0;
    const speed = 100; // milliseconds
    const typewriterElement = document.getElementById("typewriter");

    function typeWriter() {
      if (index < text.length) {
        // Handle the newline character '\n' and replace it with a <br />
        if (text.charAt(index) === "\n") {
          typewriterElement.innerHTML += "<br />";
        } else {
          typewriterElement.innerHTML += text.charAt(index);
        }
        index++;
        setTimeout(typeWriter, speed);
      }
    }

    typeWriter();
  }, []); // Empty dependency array to ensure it runs once

  return (
    <div className="typewriter-container">
      <h1 id="typewriter"></h1>
    </div>
  );
};

export default AnimatedHeader;
