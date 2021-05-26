import React, { useEffect, useLayoutEffect, useState } from "react";
import classes from "./index.module.css";
import rough from "roughjs/bundled/rough.cjs";

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, shape) => {
  if (shape === "line") {
    return {
      id,
      x1,
      y1,
      x2,
      y2,
      element: generator.line(x1, y1, x2, y2),
      shape,
    };
  }
  if (shape === "rectangle") {
    return {
      id,
      x1,
      y1,
      x2,
      y2,
      element: generator.rectangle(x1, y1, x2 - x1, y2 - y1),
      shape,
    };
  }
};

const distance = (a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const isInsideElement = (x, y, element) => {
  if (element.shape === "line") {
    const a = { x: element.x1, y: element.y1 };
    const b = { x: element.x2, y: element.y2 };
    const c = { x, y };
    const offset = distance(a, b) - distance(a, c) - distance(b, c);
    return Math.abs(offset) <= 1;
  }
  if (element.shape === "rectangle") {
    const xmin = Math.min(element.x1, element.x2);
    const xmax = Math.max(element.x1, element.x2);
    const ymin = Math.min(element.y1, element.y2);
    const ymax = Math.max(element.y1, element.y2);
    return x > xmin && x < xmax && y > ymin && y < ymax;
  }
};
const getElementByPosition = (x, y, elements) => {
  return elements.find((element) => isInsideElement(x, y, element));
};

const Home = () => {
  const [elements, setElements] = useState([]);
  const [actionType, setActionType] = useState(null);
  const [featureType, setFeatureType] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      roughCanvas.draw(element.element);
    });
  });

  const mouseDownHandle = (e) => {
    if (featureType === null) return;
    if (featureType === "selector") {
      const elementSelector = getElementByPosition(
        e.clientX,
        e.clientY,
        elements
      );
      if (elementSelector) {
        const offsetX = e.clientX - elementSelector.x1;
        const offsetY = e.clientY - elementSelector.y1;
        setActionType("moving");
        setSelectedElement({ elementSelector, offsetX, offsetY });
      }
    }
    if (featureType === "line" || featureType === "rectangle") {
      setActionType("drawing");
      setElements([
        ...elements,
        createElement(
          elements.length,
          e.clientX,
          e.clientY,
          e.clientX,
          e.clientY,
          featureType
        ),
      ]);
    }
  };

  const mouseMoveHandle = (e) => {
    if (!actionType) return;
    if (actionType === "drawing") {
      const index = elements.length - 1;
      const updateElement = createElement(
        elements[index].id,
        elements[index].x1,
        elements[index].y1,
        e.clientX,
        e.clientY,
        featureType
      );
      const updateElements = [...elements];
      updateElements[index] = updateElement;
      setElements(updateElements);
    }
    if (actionType === "moving") {
      e.target.style.cursor = "move";
      const width = Math.abs(
        selectedElement.elementSelector.x1 - selectedElement.elementSelector.x2
      );
      const height = Math.abs(
        selectedElement.elementSelector.y1 - selectedElement.elementSelector.y2
      );
      const newClientX = e.clientX - selectedElement.offsetX;
      const newClientY = e.clientY - selectedElement.offsetY;
      const updateElement = createElement(
        selectedElement.elementSelector.id,
        newClientX,
        newClientY,
        newClientX + width,
        newClientY + height,
        selectedElement.elementSelector.shape
      );
      const updateElements = [...elements];
      updateElements[updateElement.id] = updateElement;
      setElements(updateElements);
    }
  };

  const mouseUpHandle = (e) => {
    setActionType(null);
    setSelectedElement(null);
    e.target.style.cursor = "default";
  };
  return (
    <div className={classes.home}>
      <div className={classes.navbar}>
        <input
          type="radio"
          id="selector"
          name="features"
          checked={featureType === "selector"}
          onChange={() => setFeatureType("selector")}
        ></input>
        <label htmlFor="selector">Selector</label>
        <input
          type="radio"
          id="line"
          name="features"
          checked={featureType === "line"}
          onChange={() => setFeatureType("line")}
        ></input>
        <label htmlFor="line">Line</label>
        <input
          type="radio"
          id="rectangle"
          name="features"
          checked={featureType === "rectangle"}
          onChange={() => setFeatureType("rectangle")}
        ></input>
        <label htmlFor="rectangle">Rectangle</label>
      </div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDownHandle}
        onMouseUp={mouseUpHandle}
        onMouseMove={mouseMoveHandle}
      >
        Canvas
      </canvas>
    </div>
  );
};

export default Home;
