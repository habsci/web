import React, { Component } from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { LINEN, CHARCOAL } from '../constants';

import ServiceList from '../components/ServiceList';

const styles = {
  title: {
    color: CHARCOAL,
  },
};

class ServicesPage extends Component
{
  render()
  {
    return(
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: LINEN
        }}
      >
        <h1 style={styles.title}>Here are all the services we have:</h1>
        <div style={{ width: '50%' }}>
          <ServiceList services={this.props.data.allServices}/>
        </div>
      </div>
    )
  }
}

export default graphql(gql`
query {
  allServices {
    name
  }
}
`
)(ServicesPage);