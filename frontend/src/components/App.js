import React, { Component } from "react";
import { render } from "react-dom";

import Pages from "./pages/MainFile";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Pages />
            </div>
            
        );
    }
}

const appDiv = document.getElementById("app"); //getting the element Div by Id "app" from the index.html (the parent file) in templates folder
render(<App name="Luckyhits"/>, appDiv); //render the App Component inside of the appDiv