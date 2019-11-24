import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import React from 'react';
import WeatherCard from './WeatherCard';
import WindChart from './WindChart';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten('#00F', 0.8),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#00F',
  },
})(LinearProgress);

export default function Forecast(props) {
  const classes = useStyles();

  const { data } = props;

  const { temp, temp_min, temp_max, pressure, humidity, weather, clouds, wind } = data;

  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={5}>
        <WeatherCard code={weather.icon} condition={weather.main} description={weather.description}></WeatherCard>
      </Grid>

      <Grid item xs={7}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  Temperature C&deg;
                </Typography>
              </TableCell>
              <TableCell>{Math.ceil(temp)}&deg;</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  Pressure
                </Typography>
              </TableCell>
              <TableCell>{Math.ceil(pressure)} hPa</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  Humidity
                </Typography>
              </TableCell>
              <TableCell>
                <BorderLinearProgress variant="determinate" value={humidity} />
                {Math.floor(humidity)}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  Clouds
                </Typography>
              </TableCell>
              <TableCell>
                <BorderLinearProgress variant="determinate" value={clouds} />
                {Math.floor(clouds)}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1" gutterBottom>
                  Wind
                </Typography>
              </TableCell>
              <TableCell>
                <WindChart speed={wind.speed} deg={wind.deg}></WindChart>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}

Forecast.propTypes = {
  data: PropTypes.object.isRequired,
};
