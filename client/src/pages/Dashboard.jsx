import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Chart from '../components/Chart';
import WeatherApi from '../services/weather-api.service';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
});
export class Dashboard extends Component {
  constructor() {
    super();

    this.state = { temp_series: [] };
  }

  componentDidMount() {
    WeatherApi.getTemperatureSeries().then(series => {
      this.setState({ temp_series: series });
    });
  }

  render() {
    // const classes = useStyles();
    const { classes } = this.props;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <React.Fragment>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart series={this.state.temp_series}></Chart>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>Deposists</Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>Orders</Paper>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
