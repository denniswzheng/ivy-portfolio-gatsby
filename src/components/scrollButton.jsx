import React from "react";

const ScrollButton = () => {
  const scrollToSection = () => {
    // Get the element by its ID or use a ref
    const section = document.getElementById("target-section");
    if (section) {
      // Smoothly scroll to the section
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <a onClick={scrollToSection} style={scrollButtonStyles}>
      <span></span>View More
    </a>
  );
};

// Inline styles for the scroll button
const scrollButtonStyles = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default ScrollButton;
