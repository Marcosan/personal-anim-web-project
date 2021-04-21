import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./navbar.css"

export class Navbar extends React.Component {
    constructor(props){
		super();
        this.refMenu = React.createRef();
        this.state = {
            isOpen: false,
        }
	}

    showMenu() {
        this.setState({ isOpen: !this.state.isOpen }, () => {
            if(this.state.isOpen) {
                this.refMenu.current.className = this.refMenu.current.className + ' open-nav-container'
            } else {
                this.refMenu.current.classList.remove("open-nav-container");
            }
        })
    }

    render() {
        return (
            <nav ref={this.refMenu} className="nav-container azul1">
                <div className='violeta1' onClick={() => this.showMenu()}
                    style={{ height: '20px', width: '20px', cursor: 'pointer', position: 'fixed', top: '0', right: '20px', zIndex: '100' }}>
                </div>
                <div style={{ width: '40px', height: '100%' }}></div>
                <Link to="/tuberias" className="sidenav-trigger">
                    <i className="fa fa-portrait"></i>
                    <div className="itemAElm">Tuberías</div>
                </Link>
                <Link to="/tuberias" className="sidenav-trigger">
                    <i className="fa fa-portrait"></i>
                    <div className="itemAElm">Nubes</div>
                </Link>
            </nav>
        );
    }
};