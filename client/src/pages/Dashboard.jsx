import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TempChart from '../components/TempChart';
import DailySection from '../components/DailySection';
import DataChart from '../components/DataChart';
import WeatherApi from '../services/weather-api.service';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
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
    // minHeight: 240,
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
    this.state = {
      tempSeries: [],
      humiditySeries: [],
      pressureSeries: [],
      rainSeries: [],
      days,
      dailyForecast: null,
    };
  }

  componentDidMount() {
    WeatherApi.getTemperatureSeries().then(series => {
      this.setState({ tempSeries: series });
    });
    WeatherApi.getHumiditySeries().then(series => {
      this.setState({ humiditySeries: series });
    });
    WeatherApi.getPressureSeries().then(series => {
      this.setState({ pressureSeries: series });
    });
    WeatherApi.getRainSeries().then(series => {
      this.setState({ rainSeries: series });
    });
    const { days } = this.state;
    this.getForecast(days[0]);
  }

  getForecast(day) {
    WeatherApi.getDailyForecast(day).then(f => {
      this.setState({ dailyForecast: f });
    });
  }

  render() {
    const { classes } = this.props;

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const { tempSeries, days, dailyForecast, humiditySeries, pressureSeries, rainSeries } = this.state;

    return (
      <Container maxWidth="lg" className={classes.container}>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Temperature chart</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={fixedHeightPaper}>
            <TempChart series={tempSeries} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Daily forecast</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.paper}>
            <DailySection days={days} getForecast={this.getForecast.bind(this)} forecast={dailyForecast} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Humidity chart</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={fixedHeightPaper}>
            <DataChart series={humiditySeries} title="Humidity" yAxisLabel="Percentage %" color="yellow" />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Pressure chart</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={fixedHeightPaper}>
            <DataChart series={pressureSeries} title="Atmospheric pressure" yAxisLabel="Hectopascals" color="green" />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Rain chart</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={fixedHeightPaper}>
            <DataChart series={rainSeries} title="Rain volume per 3 hours" yAxisLabel="mm" color="gray" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
