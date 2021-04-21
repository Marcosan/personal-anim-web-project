import React, { Fragment } from "react";
import "./tuberias.css"

export class Tuberias extends React.Component {
    constructor(props) {
        super();
        this.state = {
            scrollPosition: '0px'
        }
        this.refScrollGuide = React.createRef();
    }
	componentDidMount() {
        this.scrollManager();
    }

    scrollManager() {
        const hWindow = window.document.body.offsetHeight;
		window.addEventListener("scroll", (event) => {
		    var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop)
                / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
			if (scrollPercentage < 0.99) {
                this.moveElmScrollManager(scrollPercentage);
                // this.refScrollGuide.current.st
                this.setState({ scrollPosition: hWindow * scrollPercentage + 'px' });
			}
		});
    }
    
    moveElmScrollManager(scrollPercentage) {
        var point1 = document.querySelector('#point1');
        var point2 = document.querySelector('#point2');
        var point3 = document.querySelector('#point3');
        
        if (scrollPercentage >= 0 && scrollPercentage < 0.11 ) {
            if(!point1.classList.contains("point-up")){
                point1.className = point1.className + ' point-up';
            }
        }
        else {
            point1.classList.remove("point-up");
        }

        if (scrollPercentage > 0.25 && scrollPercentage < 0.56 ) {
            if(!point2.classList.contains("point-up"))
                point2.className = point2.className + ' point-up';
        }
        else {
            point2.classList.remove("point-up");
        }
        
        if (scrollPercentage > 0.67 && scrollPercentage < 0.9 ) {
            if(!point3.classList.contains("point-up"))
                point3.className = point3.className + ' point-up';
        } else {
            point3.classList.remove("point-up");
        }
    }

    animPlant(index) {
        var plant = document.querySelector('#plant' + index);
        plant.className = plant.className + ' plant-up';

        var point = document.querySelector('#point' + index);
        var hasPoint1 = point.classList.contains("point-up");
        if(hasPoint1){
            point.classList.remove("point-up");
        }
        setTimeout(() => {
            plant.classList.remove("plant-up");
            if(hasPoint1) {
                point.className = point.className + ' point-up';
            }
        }, 1000);
    }
  
	render() {
		return (
            <Fragment>
                <div ref={this.refScrollGuide} style={{ width: '20px', height: '1px', borderBottom: "1px solid blue",
                    position: 'absolute', right: '0', top: this.state.scrollPosition, fontSize: '9px' }}></div>
                <div className="data-container">
                    <div className="data-content">
                        <img className="pipe-left" src="assets/images/pipe01.png" alt="pipe" onClick={() => this.animPlant(1)}/>
                        <img id="point1" className="mario-pipe" src="assets/images/mario-head.png" alt="pipe"/>
                        <div id="plant1" className="plant-pipe"></div>
                    </div>
                    <div className="data-content">
                        <img className="pipe-right" src="assets/images/pipe01.png" alt="pipe" onClick={() => this.animPlant(2)}/>
                        <img id="point2" className="mario-pipe" src="assets/images/mario-head.png" alt="pipe"/>
                        <div id="plant2" className="plant-pipe"></div>
                    </div>
                    <div className="data-content">
                        <img className="pipe-left" src="assets/images/pipe01.png" alt="pipe" onClick={() => this.animPlant(3)}/>
                        <img id="point3" className="mario-pipe" src="assets/images/mario-head.png" alt="pipe"/>
                        <div id="plant3" className="plant-pipe"></div>
                    </div>
                </div>
            </Fragment>
		);
	}
}
