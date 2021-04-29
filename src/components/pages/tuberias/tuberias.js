import React, { Fragment } from "react";
import "./tuberias.css"

var marioIsTop = true;
var isScrolling = false;
export class Tuberias extends React.Component {
    constructor(props) {
        super();
        this.state = {
            scrollPosition: '0px',
            eventoTexto: '',
            contJump: 0,
            scrollOld: 0,
        }
        this.refScrollGuide = React.createRef();

        this.animJumpToPlant = this.animJumpToPlant.bind(this);
        this.animMoveMarioPlant = this.animMoveMarioPlant.bind(this);
    }
	componentDidMount() {
        this.scrollManager();
    }

    scrollManager() {
        const hWindow = window.document.body.offsetHeight;
        // const wWindow = window.document.body.offsetWidth;
        let paramsJump;
        var point1 = document.querySelector('#point1');
        var point2 = document.querySelector('#point2');
        var point3 = document.querySelector('#point3');
        var point4 = document.querySelector('#point4');
        var flauta = document.querySelector('#flauta');
        var viento = document.querySelector('#viento');

        const elements = {
            point1: point1,
            point2: point2,
            point3: point3,
            point4: point4,
        }

		window.addEventListener("scroll", (event) => {
		    var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop)
                / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

			if (scrollPercentage < 0.99) {
                // paramsJump['scrollPercentage'] = scrollPercentage;
                this.moveElmScrollManager(elements, scrollPercentage, paramsJump);
                // this.animJumpToPlant(paramsJump);
                // this.refScrollGuide.current.st
                this.setState({ scrollPosition: hWindow * scrollPercentage + 'px' });
			}
		});

        window.onscroll = function() {
            if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
                point4.style.animationPlayState = 'paused';
                flauta.className = flauta.className + ' flauta-anim';
                viento.style.top = point4.offsetTop + 'px';
                viento.style.height = point4.offsetHeight + 'px';
                viento.style.width = point4.offsetWidth + 'px';
                console.log('FIN');
            } else {
                flauta.classList.remove("flauta-anim");
                viento.classList.remove("viento-anim");
                point4.style.visibility = 'visible';
                point4.style.animationPlayState = 'running';
            }
        }
    }

    clickFlauta() {
        var viento = document.querySelector('#viento');
        setTimeout(function(){
            var point4 = document.querySelector('#point4');
            point4.style.visibility = 'hidden';
        }, 50);
        if(!viento.classList.contains("viento-anim")){
            viento.className = viento.className + ' viento-anim';
        }
    }
    
    moveElmScrollManager(elements, scrollPercentage, paramsJump = null) {
        // var point1 = document.querySelector('#point1');
        // var point2 = document.querySelector('#point2');
        var point3 = document.querySelector('#point3');
        
        if (scrollPercentage >= 0 && scrollPercentage < 0.05 ) {
            this.setState({ eventoTexto: 'Tubería Mario 1' });
            if(!elements.point1.classList.contains("point-up")){
                elements.point1.className = elements.point1.className + ' point-up';
            }
        }
        else {
            elements.point1.classList.remove("point-up");
        }

        if (scrollPercentage > 0.1 && scrollPercentage < 0.2 ) {
            this.setState({ eventoTexto: 'Tubería Mario 2' });
            if(!elements.point2.classList.contains("point-up"))
                elements.point2.className = elements.point2.className + ' point-up';
        }
        else {
            elements.point2.classList.remove("point-up");
        }
        
        var minJump = 0.33;
        this.animJumpToPlant(point3, scrollPercentage, minJump);

        this.animMoveMarioPlant(elements.point4, point3, scrollPercentage, 0.39);

        // if (scrollPercentage > 0.96) {
        //     elements.point4.animationPlayState = 'paused';
        // } else {
        //     elements.point4.animationPlayState = 'running';
        // }
        // console.log(scrollPercentage);
        
    }

    animMoveMarioPlant(elemento, elemento2, scrollPercentage, minMovePlant) {
        if (scrollPercentage > minMovePlant) {
            elemento2.style.opacity = 0;
            if(!elemento.classList.contains("anim-move-plant")){
                elemento.className = elemento.className + ' anim-move-plant';
            }
        } else {
            elemento2.style.opacity = 1;
            elemento.classList.remove("anim-move-plant");
        }
    }

    animJumpToPlant(elemento, scrollPercentage, minJump) {
        if (scrollPercentage < minJump) {
            if(!marioIsTop){
                console.log('Mario cruzó hacia arriba!!!');
                elemento.classList.remove("curve-jump");
                elemento.classList.remove("curve-jump-reverse");
                this.setState({ eventoTexto: 'Salto Mario reverse' });
                elemento.style.animation = 'none';
                elemento.getClientRects(); /* trigger reflow */
                elemento.style.animation = null; 
                elemento.className = elemento.className + ' curve-jump-reverse';
            }
            marioIsTop = true;
        } else {
            if(marioIsTop){
                console.log('Mario cruzó hacia abajo!!!');
                elemento.classList.remove("curve-jump");
                elemento.classList.remove("curve-jump-reverse");
                this.setState({ eventoTexto: 'Salto Mario' });
                elemento.style.animation = 'none';
                elemento.getClientRects(); /* trigger reflow */
                elemento.style.animation = null; 
                elemento.className = elemento.className + ' curve-jump';
            }
            marioIsTop = false;
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
                    <div id="point4" className="mario-pipe"></div>
                    {/* <div className="data-content" style={{ height: '200px' }}>
                    </div> */}
                    <div className="plantlarge-content">
                        <img className="plant-large" src="assets/images/plant2.png" alt="pipe"/>
                        {
                            Array(10).fill(0).map((value, index) => {
                                return (
                                    <img key={index} className="plant-large" src="assets/images/plant3.png" alt="pipe"/>
                                );
                            })
                        }
                        <img id='flauta' className="flauta" src="assets/images/flauta.png" alt="pipe"
                            onClick={this.clickFlauta}
                        />
                        <img id='viento' className="viento" src="assets/images/viento.png" alt="pipe"/>
                    </div>
                </div>
                {/* <div style={{ height: '100vh', width: '100vw', backgroundColor: 'green' }}>
                </div> */}
            </Fragment>
		);
	}
}
