import React from 'react';
import './style.css';
import Data from './data';
import Card from './cards';
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
                        <Card
                            image={Data[0].image}
                            name={Data[0].name}
                            description={Data[0].description}
                            link={Data[0].link}
                        />
                        <Card
                            name={Data[1].name}
                            description={Data[1].description}
                            link={Data[1].link}
                        />
                        <Card
                            name={Data[3].name}
                            description={Data[3].description}
                            link={Data[3].link}
                        />
                        <Card
                            name={Data[4].name}
                            description={Data[4].description}
                            link={Data[4].link}
                        />
                        <Card
                            name={Data[5].name}
                            description={Data[5].description}
                            link={Data[5].link}
                        />
                        <Card
                            name={Data[6].name}
                            description={Data[6].description}
                            link={Data[6].link}
                        />
                        <Card
                            name={Data[7].name}
                            description={Data[7].description}
                            link={Data[7].link}
                        />
                        <Card
                            name={Data[8].name}
                            description={Data[8].description}
                            link={Data[8].link}
                        />
                        <Card
                            name={Data[9].name}
                            description={Data[9].description}
                            link={Data[9].link}
                        />
                        <Card
                            name={Data[10].name}
                            description={Data[10].description}
                            link={Data[10].link}
                        />
                        <Card
                            name={Data[11].name}
                            description={Data[11].description}
                            link={Data[11].link}
                        />
                        <Card
                            name={Data[12].name}
                            description={Data[12].description}
                            link={Data[12].link}
                        />
                    </Carousel>
                </div>
            </div>
        </>
    );
}
export default Pop;