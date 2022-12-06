A Meme generator that allows users to click a "Get a new image" button and add text to create a custom meme.

Can be viewed at http://www.christina-graham.com/projects/meme/

Technical details:
I created this React project using functional components and mainted state by declaring state variables with the useState hook.

    const [allMemes, setAllMemes] = useState([]);
   
I used the React useEffect hook to fetch data from a web API (found here: https://api.imgflip.com/get_memes) along with the fetch function. 

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then((res) => res.json())
        .then((data) => setAllMemes(data.data.memes));
    }, []);

I set use the setAllMemes function to set the state variable allMemes with the data returned in the response.

When a user clicks the "Get a new meme image" button, the onClick method of the button triggers a getMemeImage function.

    <button className="form--button" onClick={getMemeImage}>

The function's purpose is to randomly display a picture with each click along with any text (if any) that a user has entered. In order to generate the random image from the data we have stored in state, I utilized the Math.floor and Math.random with the length of the data array. This prevents returning an undefined value since JavaScript does not have an array out-of-bounds exception.

    const randomNumber = Math.floor(Math.random() * allMemes.length);

I created 2 constant variables to hold the name and URL of the image at the index of the randomly generated number within the array. I revised the project recently to include the name of the image to use in the alt attribute of the image tag to adhere to accessibility standards.

    const name = allMemes[randomNumber].name;
    const url = allMemes[randomNumber].url;

With that information stored in name and url, I used the setMeme function to update the state of the meme object. To accomplish this, I used the spread operator "...".

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
      imageName: name
    }));

The onChange event handler of the input element triggers the handleChange function whenever the user types into the text or Bottom text input fields. The value updates the state of the meme object with each change. This allows the users' text to remain in view even as the user generates new images. 
 
    <input
        type="text"
        placeholder="Top text"
        className="form--input"
        name="topText"
        value={meme.topText}
        onChange={handleChange}
    />

The handleChange function updates the meme object with the new information from the event. In order to display the text in the correct location (Top or Bottom), I destructured the event to extract the name and value properties and to update the meme object. In the setMeme function, we are starting off with the meme state stored in prevMeme, then using the ... spread operator to set the new meme state with the current state along with the value from the onChange event for the correct name key (topText or bottomText)

    const { name, value } = event.target;
    setMeme((prevMeme) => ({
    ...prevMeme,
    [name]: value,
    }));