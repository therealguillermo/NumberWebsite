import React, { useState } from 'react';
import DrawingBox from './DrawingBox';
import './App.css';


const AIDescription = "The network consists of several layers, including two convolutional layers, a max pooling layer, two dropout layers, and two fully connected layers.\n" +
  "The first layer is a convolutional layer that takes an input image with one channel (grayscale) and applies 32 filters of size 3x3. The output of this layer is a set of feature maps with 32 channels. The second layer is another convolutional layer that takes the output of the first layer and applies 64 filters of size 3x3. The output of this layer is another set of feature maps with 64 channels.\n" +
  "A max pooling layer is then applied to reduce the spatial dimensions of the feature maps by a factor of 2. A dropout layer is applied to randomly set some of the activations in the feature maps to zero, which helps prevent overfitting. The feature maps are then flattened into a 1D vector and fed into a fully connected layer with 128 neurons.\n" +
  "Another dropout layer is applied to randomly set some of the activations in the fully connected layer to zero. Finally, the output of the fully connected layer is fed into another fully connected layer with 10 neurons, one for each possible digit. During the forward pass, an input image is passed through each layer in turn, and the output of the final layer is a probability distribution over the 10 possible digit classes. The output of the network is this probability distribution over the 10 classes."

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [postFile, setPostFile] = useState(null);

  // function handleFileSelect(event) {
  //   setSelectedFile(event.target.files[0]);

  //   // const reader = new FileReader();
  //   // reader.readAsDataURL(event.target.files[0]);
  //   // reader.onloadend = () => {
  //   //   setPostFile(reader.result);
  //   // };
  //   const file = event.target.files[0].split(',')[1]
  //   fetch('/upload-image', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({image: file})
  //     }).then(response => {
  //       // Handle the response from the server
  //       console.log('here')
  //     });
  //   }

    function handleFileSelect(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        const base64Image = reader.result.split(",")[1];
        uploadImage(base64Image);
      };
    }

    function uploadImage(base64Image) {
      fetch("http://localhost:5000/upload-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

  return (
    <div className="container">
      <div className="div1">
        <div className="text-field">
          <h1>About This Neural Network</h1>
          <text>{AIDescription}</text>
        </div>
        <div className="input-container">
          <h1>Upload an Image</h1>
          <input type="file" id="file-input" onChange={handleFileSelect} />
          <label htmlFor="file-input">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt="Selected file" />
            ) : (
              <span>Choose a file...</span>
            )}
          </label>
        </div>
      </div>
      <div className="div2">
        <DrawingBox />
      </div>
    </div>
  );
}

export default App;



/*

import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileSelect(event) {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div className="container">
      <h1>Upload an Image</h1>
      <div className="input-container">
        <input type="file" id="file-input" onChange={handleFileSelect} />
          <label htmlFor="file-input">
            {selectedFile ? (
              <img src={URL.createObjectURL(selectedFile)} alt="Selected file" />
            ) : (
              <span>Choose a file...</span>
            )}
          </label>
      </div>
    </div>
  );
}

export default App;



import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileSelect(event) {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected file" />}
    </div>
  );
}

export default App;

*/