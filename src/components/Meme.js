import React from "react";
import { useEffect } from "react";
import { useState } from 'react';

/**
 * 
 * @returns This code will return an HTML main element containing a 
 * form element with two input fields and a button, a div element 
 * with an image, and two h2 elements containing the meme's text.
 */
export default function Meme() {
  const [meme, setMeme] = useState({
    imageName:"",
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  
  /**
   * This is a React hook that uses the built-in useEffect hook. 
   * It will fetch data from the URL specified and set the data 
   * in a state variable called allMemes using the setAllMemes function. 
   * The empty array at the end of the function ensures that the effect 
   * is only run once when the component is first rendered.
   */
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  /**
   * This function is used to get a random meme image from an array of meme objects 
   * and set it to the "meme" object. This function uses the Math.floor and Math.random 
   * methods to generate a random number representing the index of the meme object in 
   * the array, and then sets the URL and name of the meme object to the "meme" object.
   */
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const name = allMemes[randomNumber].name;
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
      imageName: name
    }));
  }

  /**
   * This function takes an event as an argument, gets the name and value from 
   * the event.target, and sets the meme to a new value with the name and value.
   * @param {*} event 
   */
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" alt={meme.imageName} />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
