import React, { Fragment } from "react";
import "./tuberias.css"

export class Tuberias extends React.Component {
    constructor(props) {
        super();
        this.state = {
            scrollPosition: '0px',
            eventoTexto: '',
            contJump: 0,
        }
        this.refScrollGuide = React.createRef();

        this.animJumpToPlant = this.animJumpToPlant.bind(this);
    }
	componentDidMount() {
        this.scrollManager();
    }

    scrollManager() {
        const hWindow = window.document.body.offsetHeight;
        const wWindow = window.document.body.offsetWidth;

        // var jumpContainer = document.getElementById('jump-container');
        // var point3 = document.getElementById('point3');
        // var path = document.getElementById('path-jump');
        // var svg = document.getElementById('svg-jump');
        // var obj = document.getElementById('obj');
        // var prcnt = 0;

        let paramsJump;
        // Set jump svg
        // var hSvgJump = 300;
        // var wSvgJump = wWindow / 2.6;
        // svg.setAttribute("width", wSvgJump);
        // svg.setAttribute("height", hSvgJump);
        // path.setAttribute("d", `M 0 ${hSvgJump-100} q ${wSvgJump / 2} -${hSvgJump+100} ${wSvgJump} 0`);
        // jumpContainer.style.top = (-point3.offsetTop - 400) + 'px';
        // jumpContainer.style.left = (point3.offsetLeft + 100) + 'px';
        // console.log(svg);
        // console.log(path);
        // console.log(point3.offsetLeft, point3.offsetTop);
        // var pathLength = Math.floor( path.getTotalLength() );
        // let paramsJump = {
        //     pathLength: pathLength,
        //     obj: point3,
        //     path: path,
        //     prcnt: prcnt,
        // }

		window.addEventListener("scroll", (event) => {
		    var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop)
                / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

			if (scrollPercentage < 0.99) {
                // paramsJump['scrollPercentage'] = scrollPercentage;
                this.moveElmScrollManager(scrollPercentage, paramsJump);
                // this.animJumpToPlant(paramsJump);
                // this.refScrollGuide.current.st
                this.setState({ scrollPosition: hWindow * scrollPercentage + 'px' });
			}
		});
    }
    
    moveElmScrollManager(scrollPercentage, paramsJump = null) {
        var point1 = document.querySelector('#point1');
        var point2 = document.querySelector('#point2');
        var point3 = document.querySelector('#point3');
        var obj = document.querySelector('#obj');
        
        if (scrollPercentage >= 0 && scrollPercentage < 0.05 ) {
            this.setState({ eventoTexto: 'Tubería Mario 1' });
            if(!point1.classList.contains("point-up")){
                point1.className = point1.className + ' point-up';
            }
        }
        else {
            point1.classList.remove("point-up");
        }

        if (scrollPercentage > 0.1 && scrollPercentage < 0.2 ) {
            this.setState({ eventoTexto: 'Tubería Mario 2' });
            if(!point2.classList.contains("point-up"))
                point2.className = point2.className + ' point-up';
        }
        else {
            point2.classList.remove("point-up");
        }
        
        // if (scrollPercentage > 0.22 && scrollPercentage < 0.26) {
        //     this.setState({ eventoTexto: 'Tubería Mario 3' });
        //     if(!point3.classList.contains("point-up-plant"))
        //         point3.className = point3.className + ' point-up-plant';
        // } else {
        //     point3.classList.remove("point-up-plant");
        // }
        var minJump = 0.26;
        var maxJump = 0.29;
        if (scrollPercentage > minJump && scrollPercentage < maxJump) {
            this.setState({ eventoTexto: 'Salto Mario' });
            // this.animJumpToPlant(obj, scrollPercentage, minJump, maxJump, 200)
            // Modificar el path de salto para igualarlo con point3 y mantener continuidad
            // point3.classList.remove("curve-jump-reverse");
            if(!point3.classList.contains("curve-jump")){
                point3.style.offsetPath = "path('M 100 115 q 250 -300 500 0')";
                point3.className = point3.className + ' curve-jump';
            }
            // this.animJumpToPlant(scrollPercentage, paramsJump, minJump, maxJump);
        }
    }

    animJumpToPlant(elemento, scrollPerc, minJump, maxJump, h, jumpInterval) {
    }

    animJumpToPlant2(scrollPercentage, paramsJump, minJump, maxJump) {
        // Get x and y values at a certain point in the line
        var newPrcnt = (scrollPercentage - minJump) / (maxJump - minJump);
        console.log("(" + scrollPercentage + " - " + minJump + ") / (" + maxJump + " - " + minJump + ")");
        console.log(newPrcnt);
        paramsJump.prcnt = (newPrcnt * paramsJump.pathLength);
        var pt = paramsJump.path.getPointAtLength(paramsJump.prcnt);
        pt.x = Math.round(pt.x);
        pt.y = Math.round(pt.y);
        paramsJump.obj.style.webkitTransform = 'translate3d('+pt.x+'px,'+pt.y+'px, 0)';
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
                <div className='tuberia-flotante'>
                    {this.state.eventoTexto}
                </div>
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
                    <div className="data-content" style={{ height: '200px' }}>
                        <img className="pipe-left" src="assets/images/pipe02.png" alt="pipe" onClick={() => this.animPlant(3)}
                            style={{ backgroundColor: "#eaeaea", height: "238px" }}
                        />
                        {/* <img id="point3" className="mario-pipe" src="assets/images/mario.png" alt="pipe"/> */}
                        <div id="point3" className="mario-pipe"></div>
                        <div id="plant3" className="plant-pipe"></div>
                        {/* <div id="obj"></div> */}
                        {/* <div id="jump-container" style={{ position: 'absolute', top: '00px', zIndex: '999' }}>
                            <div id="obj"></div>
                            <svg id='svg-jump' height="150" width="300">
                                <path id="path-jump" fill="none" stroke="#000000"
                                d="M 0 150 q 150 -300 300 0"/>
                            </svg>
                        </div> */}
                    </div>
                    <div className="plantlarge-content">
                        <img className="plant-large" src="assets/images/plant2.png" alt="pipe"/>
                        {
                            Array(10).fill(0).map((value, index) => {
                                return (
                                    <img key={index} className="plant-large" src="assets/images/plant3.png" alt="pipe"/>
                                );
                            })
                        }
                    </div>
                </div>
            </Fragment>
		);
	}
}
