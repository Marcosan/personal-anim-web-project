import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

// import { Footer } from "./components/shared/Footer/footer";
import { Navbar } from "./components/shared/navbar/navbar";
import { Tuberias } from "./components/pages/tuberias/tuberias";

import './App.css';
import './utils/colores.css';

class App extends React.Component {
    constructor(props){
        super();
        this.state = {
            hWindow: 0,
            isLoaded: false,
        }
    }

    componentDidMount() {
        this.setState({ hWindow: window.document.body.offsetHeight, isLoaded: true })
        // this.hWindow = window.document.body.offsetHeight;
    }

    render(){
        return (
            <BrowserRouter>
                <div>
                    {
                        (this.state.isLoaded)
                        ? Array(10).fill(0).map((value, index) => {
                            var hWindow = window.document.body.offsetHeight;
                            return (
                                <div key={index} style={{ width: '20px', height: '1px', borderBottom: "1px solid red",
                                    position: 'absolute', right: '0', top: (hWindow / 10) * index, fontSize: '9px' }}>{(index/10)}</div>
                            );
                        })
                        : null
                    }
                    <Navbar/>
                    <Route
                        render={({ location }) => {
                        return (
                            <Switch location={location}>
                                <Route exact path="/tuberias" component={(props) => 
                                    <Tuberias/>
                                } />
                            </Switch>
                        );
                        }}
                    />
                </div>
                {/* <Footer /> */}
            </BrowserRouter>
        );
    }
}

export default App;
