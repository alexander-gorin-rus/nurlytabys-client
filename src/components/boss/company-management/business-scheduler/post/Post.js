import React from 'react';
import './post.css';
import person from '../assets/person2.jpeg';
import { MoreVert } from "@material-ui/icons";
import construction from '../assets/const1.jpg'


const Post = () => {
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img 
                            alt="person" 
                            src={person} 
                            className="postProfileImg"
                        />
                        <span className="postUsername"></span>
                        <span className="postDate">5 min ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">My first post</span>
                    <img 
                        alt="construction"
                        src={construction}
                        className="postImg"
                    />

                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon"  
                            alt='like'
                            src="/assets/like.png"
                        />
                         <img className="likeIcon" 
                            alt='like'
                            src="/assets/heart.png"
                        />
                        <span className="postLikeCounter">32 likes</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">4 comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
