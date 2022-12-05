import React from "react";
import memeface from '../images/memeface.JPG';

export default function Header() {
    return (
        <header className="header">
            <img 
                src={memeface}
                className="header--image"
            alt="memeFace"/>
             <h2 className="header--title">Meme Generator</h2>
            <h4 className="header--project">Meme</h4>
        </header>
    )
}