import React from 'react';
import './style.css';
import Data from './data';
import Carousel from "react-elastic-carousel";
import './main.css'
const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 0, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 0, itemsToShow: 3, pagination: false },
    { width: 0, itemsToShow: 5, pagination: false }
];
function Pop() {
    return (
        <>
            <div className="filloutpage">
                <div>
                    <h3 className="pop_nf_h3">Recommended for you</h3>
                </div>
                <div className="pop_main">
                    <Carousel breakPoints={breakPoints} pagination="false">
                        <div className="Card">
                            <img src={Data[0].image} />
                            <h3>{Data[0].name}</h3>
                            <p>{Data[0].link}</p>
                            <h6>{Data[0].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[1].image} />
                            <h3>{Data[1].name}</h3>
                            <p>{Data[1].link}</p>
                            <h6>{Data[1].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[2].image} />
                            <h3>{Data[2].name}</h3>
                            <p>{Data[2].link}</p>
                            <h6>{Data[2].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[3].image} />
                            <h3>{Data[3].name}</h3>
                            <p>{Data[3].link}</p>
                            <h6>{Data[3].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[4].image} />
                            <h3>{Data[4].name}</h3>
                            <p>{Data[4].link}</p>
                            <h6>{Data[4].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[5].image} />
                            <h3>{Data[5].name}</h3>
                            <p>{Data[5].link}</p>
                            <h6>{Data[5].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[6].image} />
                            <h3>{Data[6].name}</h3>
                            <p>{Data[6].link}</p>
                            <h6>{Data[6].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[7].image} />
                            <h3>{Data[7].name}</h3>
                            <p>{Data[7].link}</p>
                            <h6>{Data[7].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[8].image} />
                            <h3>{Data[8].name}</h3>
                            <p>{Data[8].link}</p>
                            <h6>{Data[8].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[9].image} />
                            <h3>{Data[9].name}</h3>
                            <p>{Data[9].link}</p>
                            <h6>{Data[9].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[10].image} />
                            <h3>{Data[10].name}</h3>
                            <p>{Data[10].link}</p>
                            <h6>{Data[10].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[11].image} />
                            <h3>{Data[11].name}</h3>
                            <p>{Data[11].link}</p>
                            <h6>{Data[11].description}</h6>
                        </div>
                        <div className="Card">
                            <img src={Data[12].image} />
                            <h3>{Data[12].name}</h3>
                            <p>{Data[12].link}</p>
                            <h6>{Data[12].description}</h6>
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    );
}
export default Pop;