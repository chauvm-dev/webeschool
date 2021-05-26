import React, { useRef, useEffect } from "react";

const OutsideHandlerWrap = ({ handleClickOutside, children }) => {
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handle = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleClickOutside();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handle);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handle);
    };
  }, [wrapperRef, handleClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideHandlerWrap;
