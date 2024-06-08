import React, {useEffect} from "react";
import CreateFeed from "../components/CreateFeed";
import { useDispatch, useSelector } from 'react-redux';
import FeedCard from "../components/FeedCard";
import { fetchRecognition } from '../actions/recognitionActions';

const HomePage = () => {
    const dispatch = useDispatch();
    const { recognitionList, loading, error } = useSelector(state => state.recognition);

    useEffect(() => {
        dispatch(fetchRecognition());
    }, [dispatch]);
    

    return(
        <div id="home_page">
            <div className="feeds">
                <CreateFeed />
                <h4 className="page-title">Feeds</h4>
                <div className="feeds-list">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}

                    { recognitionList.length > 0 ?
                        recognitionList.map((recognition, index) => (
                                <FeedCard recognition={recognition} key={index} />
                        )) : (
                            <p>{!loading && "There are no recognitions."}</p>
                        )
                    }
                </div>
            </div>
            <div className="inner-side">
                <div className="current-employee-points">
                    <span>Your Points</span>
                    <h1>1,832</h1>
                </div>
                <div className="honors-roll mb-3">
                    <h4>Top 3 - Today</h4>
                    <ul className="list-unstyled">
                        <li><span className="name"><span className="position one">1</span> John Doe</span> <span className="points">1,342 points</span></li>
                        <li><span className="name"><span className="position two">2</span> Nkosazana Daughter </span> <span className="points">1,234 points</span></li>
                        <li><span className="name"><span className="position three">3</span> Jessica Nkosi </span> <span className="points">840 points</span></li>
                        <li><span className="name"><span className="position two">2</span> Nkosazana Daughter </span> <span className="points">1,234 points</span></li>
                        <li><span className="name"><span className="position three">3</span> Jessica Nkosi </span> <span className="points">840 points</span></li>
                    </ul>
                </div>
                <div className="honors-roll">
                    <h4>Honors Roll <span>(Prev Month)</span></h4>
                    <ul className="list-unstyled">
                        <li><span className="name"><span className="position one">1</span> John Doe</span> <span className="points">1,342 points</span></li>
                        <li><span className="name"><span className="position two">2</span> Nkosazana Daughter </span> <span className="points">1,234 points</span></li>
                        <li><span className="name"><span className="position three">3</span> Jessica Nkosi </span> <span className="points">840 points</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HomePage;