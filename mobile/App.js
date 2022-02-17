import React from 'react';

import Core from './src/Core';
import Authentication from "./src/components/Authentication/Authentication";

export const colors = {
    actionColor: "#04151F"
}

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userUuid: '',
            serverAddress: '',
        }
    }

    render() {
        //replace by === '' to activate authentication
        return this.state.userUuid === '' ?
            <Authentication
                update={(uuid) => this.setState({userUuid: uuid})}
            />
            :
            <Core token={this.state.userUuid} serverAddress={this.state.serverAddress}/>;
    }

}
