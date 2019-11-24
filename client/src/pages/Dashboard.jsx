import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Chart from '../components/Chart';
import DailySection from '../components/DailySection';
import WeatherApi from '../services/weather-api.service';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});
export class Dashboard extends Component {
  constructor() {
    super();

    const moments = [
      moment(),
      moment().add(1, 'day'),
      moment().add(2, 'day'),
      moment().add(3, 'day'),
      moment().add(4, 'day'),
    ];
    const days = moments.map(m => m.toISOString());
    this.state = { tempSeries: [], days, dailyForecast: null };
  }

  componentDidMount() {
    WeatherApi.getTemperatureSeries().then(series => {
      this.setState({ tempSeries: series });
    });
    const { days } = this.state;
    this.getForecast(days[0]);
  }

  getForecast(day) {
    console.log('fetching forecast');
    WeatherApi.getDailyForecast(day).then(f => {
      console.log('forecast fetched', f);
      this.setState({ dailyForecast: f });
    });
  }

  render() {
    // const classes = useStyles();
    const { classes } = this.props;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const { tempSeries, days, dailyForecast } = this.state;
    return (
      <>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart series={tempSeries} />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <DailySection days={days} getForecast={this.getForecast.bind(this)} forecast={dailyForecast} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.symbol.isRequired,
};

export default withStyles(styles)(Dashboard);
