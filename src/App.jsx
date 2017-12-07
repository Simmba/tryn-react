import 'bootstrap/dist/css/bootstrap.css';

import React, { Component } from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Map from './Map';
import './styles/App.css';
import './styles/Zoom.css';
import environment from './relayEnv';

class App extends Component {
  constructor() {
    super();
    this.state = {
      environment,
    };
  }

  loadRelay() {
    return (
      <QueryRenderer
        environment={this.state.environment}
        query={graphql`
            query AppAllVehiclesQuery($agency: String!, $startTime: String!) {
              trynState(agency: $agency, startTime: $startTime) {
                agency
                startTime
                states {
                  ...Map_state
                }
              }
            }
          `}
        variables={{
          agency: 'muni',
          startTime: Date.now() - 15000,
        }}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <Map state={props.trynState.states[0]} />;
          }
          return <div>Loading</div>;
        }}
      />
    );
  }

  render() {
    return (
      <div>
        {this.loadRelay()}
      </div>
    );
  }
}

export default App;
