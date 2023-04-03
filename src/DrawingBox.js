// import React from 'react';
// import { ReactSketchCanvas } from 'react-sketch-canvas';
// import Select from 'react-select';
// import './DrawingBox.css';

// const colorOptions = [
//   { value: 'black', label: 'Black' },
//   { value: 'white', label: 'White' },
//   { value: 'red', label: 'Red' },
//   { value: 'green', label: 'Green' },
//   { value: 'blue', label: 'Blue' },
//   { value: 'yellow', label: 'Yellow' },
//   { value: 'orange', label: 'Orange' },
//   { value: 'pink', label: 'Pink' },
//   { value: 'purple', label: 'Purple' },
//   { value: 'brown', label: 'Brown' },
//   { value: 'gray', label: 'Gray' },
//   { value: 'maroon', label: 'Maroon' },
//   { value: 'teal', label: 'Teal' },
//   { value: 'navy', label: 'Navy' },
//   { value: 'olive', label: 'Olive' },
// ];

// function DrawingBox(props) {
//   const canvasRef = React.useRef(null);
//   const [strokeColor, setStrokeColor] = React.useState('black');

//   function handleClear() {
//     canvasRef.current.clearCanvas();
//   }

//   function handleColorChange(selectedOption) {
//     setStrokeColor(selectedOption.value);
//   }

//   return (
//     <div className="drawing-box">
//       <ReactSketchCanvas
//         ref={canvasRef}
//         width={400}
//         height={400}
//         strokeWidth={4}
//         strokeColor={strokeColor}
//       />
//       <div className="react-select-container">
//         <Select
//           options={colorOptions}
//           defaultValue={colorOptions[0]}
//           onChange={handleColorChange}
//         />
//       </div>
//       <button className="clear-button" onClick={handleClear}>
//         Clear
//       </button>
//     </div>
//   );
// }

// export default DrawingBox;

import React, { useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import Select from 'react-select';
import './DrawingBox.css';

const colorOptions = [
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'purple', label: 'Purple' },
  { value: 'brown', label: 'Brown' },
  { value: 'gray', label: 'Gray' },
  { value: 'maroon', label: 'Maroon' },
  { value: 'teal', label: 'Teal' },
  { value: 'navy', label: 'Navy' },
  { value: 'olive', label: 'Olive' },
];

function DrawingBox(props) {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = React.useState('black');
  const [strokeWidth, setStrokeWidth] = React.useState(4);
  const [image, setImage] = React.useState('')

  function saveDrawing() {
    //const img = canvasRef.current.exportImage("png");

    canvasRef.current.exportImage("png")
    .then(function (dataURL) {
      setImage(dataURL);
      const base64Image = image.split(',')[1];
      console.log(base64Image)
      fetch('http://localhost:5000/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'image': base64Image})
      }).then(response => {
        // Handle the response from the server
        console.log(response.json())
      });
    })
    .catch(function (error) {
      console.log("Export failed: " + error);
    });

    console.log(image);
  }

  function handleClear() {
    canvasRef.current.clearCanvas();
  }

  function handleColorChange(selectedOption) {
    setStrokeColor(selectedOption.value);
  }

  function handleWidthChange(event) {
    setStrokeWidth(event.target.value);
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className="drawing-box">
      <ReactSketchCanvas
        ref={canvasRef}
        width={400}
        height={400}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
      />
      <button onClick={saveDrawing}>Save drawing</button>
      <div className="toolbar">
        <div className="toolbar-item">
        <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>
        <div className="toolbar-brush-slider">
          <input className='toolbar-slider' type="range" min="5" max="30" value={strokeWidth} onChange={handleWidthChange} />
          <span className='slider-text'>{strokeWidth}px</span>
        </div>
        <div className="toolbar-item">
          <Select
              unstyled 
              //styles={customStyles}
              className='custom-select'
              options={colorOptions}
              defaultValue={colorOptions[0]}
              onChange={handleColorChange}
            />
        </div>
      </div>
    </div>
  );
}

export default DrawingBox;