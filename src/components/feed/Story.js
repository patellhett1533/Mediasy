import React from 'react';
import dp from '../../asstes/download.png';
import userDp from '../../asstes/cover.jpg';
import userPic from '../../asstes/images.jpeg';

const Story = () => {

    const handleClick = (direction) => {

        const slider = document.querySelector('.story-carousal');
        if (direction === 'left') {
            slider.scrollBy(-400, 0)
        }
        else {
            slider.scrollBy(400, 0)
        }
    }
    return (
        <div className="feed-story">
            <div className="arrow-button">
                <i className='bx bx-chevron-left leftBtns' onClick={() => handleClick('left')}></i>
                <i className='bx bx-chevron-right rightBtns' onClick={() => handleClick('right')}></i>
            </div>
            <div className="story-carousal">
                <div className="self-story story">
                    <div className="story-img">
                        <img src={dp} alt="" />
                        <i className='bx bx-plus'></i>
                    </div>
                </div>
                <div className="user-story story">
                    <div className="story-img">
                        <img src={userDp} alt="" />
                    </div>
                    <div className="story-img">
                        <img src={userPic} alt="" />
                    </div>
                    <div className="story-img">
                        <img src={userDp} alt="" />
                    </div>
                    <div className="story-img">
                        <img src={userPic} alt="" />
                    </div>
                    <div className="story-img">
                        <img src={userDp} alt="" />
                    </div>
                    <div className="story-img">
                        <img src={userPic} alt="" />
                    </div>
                    <div className="story-img">
                        <img src={userDp} alt="" />
                    </div>
                    <div className="story-img">
                        <img src={userPic} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Story