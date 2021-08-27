import React, { Component } from 'react';
import background from '../background.jpg'

class HomeComponent extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={background} className="App-background" alt="background"/>
                </header>
            </div>
        );
    }
}

export default HomeComponent;