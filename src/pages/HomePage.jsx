import React from "react";
import Navigation from "../components/Navigation";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const HomePage = () => {
    return(
        <div id="home_page">
            <Navigation />
            <div className="header-part">
                <div className="user-position">
                    <div className="current-position">
                        <h1>2</h1>
                        <span>Current Position</span>
                    </div>
                    <div className="prev-position">
                        <span className="icon-up"><ArrowDropUpIcon /></span>
                        <span>5</span>
                    </div>
                </div>
            </div>
            <div className="content-part">

            </div>
        </div>
    )
}

export default HomePage;