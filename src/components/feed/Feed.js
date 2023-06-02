import React from 'react';
import './feed.css';
import MobileSearch from './mobileSearch';
import Post from './Post';

const Feed = () => {
    return (
        <div className="feed-section">
            <div className="feed-area">
                <MobileSearch />
                <Post />
            </div>
        </div>
    )
}

export default Feed