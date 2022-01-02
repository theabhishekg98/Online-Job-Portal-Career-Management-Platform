import React, { Component } from "react";

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-12 pt-4">
                            <h1>Hello</h1>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


export default Hello;

