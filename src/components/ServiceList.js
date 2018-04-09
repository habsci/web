import React, { Component } from "react";
import { CircularProgress, Typography } from 'material-ui';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';


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
      return services.map((service, i) =>
      {
        return(
          <ExpansionPanel key={i} expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary>
              <Typography>General settings</Typography>
              <Typography>I am an expansion panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {service.name}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      });
    }

    return <CircularProgress size={100}/>;
  }
}

export default ServiceList