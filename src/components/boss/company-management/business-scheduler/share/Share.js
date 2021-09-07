import React, { useState } from 'react';
import './share.css';
import person from '../assets/person4.jpg';
import { 
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from '@material-ui/icons'


const Share = () => {

    const [file, setFile] = useState(null);


    const submitHandler = () => {

    }


    const onSubmit = () => {

    }


    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        alt="person" 
                        src={person} 
                        className="shareProfileImg"   
                    />
                    <input 
                        placeholder="Как настроение?"
                        className="shareInput"
                    />
                </div>
                <hr className="shareHr" />

                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Photo or Video</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        </label>
                        <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon" />
                        <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon" />
                        <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                        <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
                
            </div>
        </div>
    )
}

export default Share
