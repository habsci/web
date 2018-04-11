import React, { Component } from "react";
import { CircularProgress, Typography } from 'material-ui';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import { CHARCOAL } from '../constants';


const styles = {
  title: {
    color: CHARCOAL,
  },
};

class ServiceList extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { expanded: null };
  }

  handleChange(event, expanded)
  {
    console.log(event, expanded);
  }

  render()
  {
    const services = this.props.services;
    const expanded = this.state;

    if (services)
    {
      return (
        <div>
          <h1 style={styles.title}>Here are all the services we have:</h1>
          {
            services.map((service, i) =>
            {
              return(
                <ExpansionPanel key={i} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                  <ExpansionPanelSummary>
                    <Typography>{service.name}</Typography>
                    <Typography>I am an expansion panel</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      {service.name}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })
          }
        </div>
      )
    }

    return <h1>Whoops! We couldn't find any services to list for you!</h1>;
  }
}

export default ServiceList