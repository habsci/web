import React, { Component } from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { LINEN, CHARCOAL } from '../constants';

import ServiceList from '../components/ServiceList';
import { CircularProgress } from 'material-ui';

const styles = {
  main: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    background: LINEN,
  },
  title: {
    color: CHARCOAL,
  },
};

class ServicesPage extends Component
{
  render()
  {
    const data = this.props.data;

    if (data.loading)
    {
      return(
        <div style={styles.main}>
          <CircularProgress size={100}/>
        </div>
      );
    }

    if (data.error)
    {
      console.log(data);
      return(
        <div style={styles.main}>
          <h1 style={styles.title}>There was an error loading the services</h1>
          <p>{data.error.message}</p>
        </div>
      );
    }

    return(
      <div style={styles.main}>
        <div style={{ width: '50%' }}>
          <ServiceList services={data.allServices}/>
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