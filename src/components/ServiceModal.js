import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import green from 'material-ui/colors/green';
import classNames from 'classnames';
import AddIcon from 'react-material-icons/icons/content/add';
import CheckIcon from 'react-material-icons/icons/navigation/check';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ServiceModal extends Component
{
  constructor(props)
  {
    super(props)
    this.state = { open: false, loading: false, success: false };
  }

  handleClickOpen()
  {
    this.setState({ open: true });
  };

  handleClose()
  {
    this.setState({ open: false });
  };

  handleSubmit()
  {
    this.setState({ open: false, loading: true });

  }

  render()
  {
    const { loading, success } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div style={{ position: 'absolute', bottom: 40, right: 40 }}>
          <Button
            onClick={this.handleClickOpen.bind(this)}
            variant="fab"
            color="primary"
            aria-label="add"
          >
            {success ? <CheckIcon/> : <AddIcon/>}
          </Button>
          {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a new service</DialogTitle>
          <DialogContent style={{ width: 500 }}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
            />
            <div style={{ display: 'flex' }}>
              <TextField
                autoFocus
                margin="dense"
                id="onDuration"
                label="On"
                fullWidth
              />
              <p style={{ fontWeight: 500, marginTop: 30, marginLeft: 25 }}>hours</p>
            </div>
            <div style={{ display: 'flex' }}>
              <TextField
                autoFocus
                margin="dense"
                id="offDuration"
                label="Off"
                fullWidth
              />
              <p style={{ fontWeight: 500, marginTop: 30, marginLeft: 25 }}>hours</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const createService = gql`
  mutation createService($serviceInput: String!) {
    createService(serviceInput: $serviceInput) {
      name,
      onDuration,
      offDuration,
    }
  }
`

export default graphql(createService)(withStyles(styles)(ServiceModal));