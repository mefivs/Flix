import React, { useState } from 'react';
import './MovieRow.scss';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function MovieRow({ title, items }: any) {

    const [scrollX, setScrollX] = useState(0);

    function handleLeftArrow() {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    function handleRightArrow() {
        let x = scrollX + Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>
                {title}
            </h2>

            <div className="leftArrow">
                <NavigateBeforeIcon onClick={handleLeftArrow} style={{
                    fontSize: 50
                }} />
            </div>

            <div className="rightArrow">
                <NavigateNextIcon onClick={handleRightArrow} style={{
                    fontSize: 50
                }} />
            </div>

            <div className="listArea">
                <div className="list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150,
                }}>
                    {items.results.length > 0 && items.results.map((item: any, key: any) => {
                        return (
                            <div key={key} className="item">
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                            </div>

                        );
                    })}
                </div>

            </div>
        </div>
    );
}