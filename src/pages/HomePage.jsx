import React from "react";
import CreateFeed from "../components/CreateFeed";

const HomePage = () => {
    return(
        <div id="home_page">
            <div className="feeds">
                <CreateFeed />
                <div className="feeds-list">

                </div>
            </div>
            <div className="inner-side">
                <h4>inner side</h4>
            </div>
        </div>
    )
}

export default HomePage;