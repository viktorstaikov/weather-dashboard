import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import './App.css';
import Header from './components/Header';
import Chart from './components/Chart';

const useStyles = makeStyles(theme => ({
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
}));
export default function App() {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const temp_series = [
    {
      timestamp: 1574510400000,
      temp_min: 5.59,
      temp_max: 6.4
    },
    {
      timestamp: 1574521200000,
      temp_min: 4.66,
      temp_max: 5.27
    },
    {
      timestamp: 1574532000000,
      temp_min: 4.11,
      temp_max: 4.51
    },
    {
      timestamp: 1574542800000,
      temp_min: 3.94,
      temp_max: 4.14
    },
    {
      timestamp: 1574553600000,
      temp_min: 4.16,
      temp_max: 4.16
    },
    {
      timestamp: 1574564400000,
      temp_min: 3.89,
      temp_max: 3.89
    },
    {
      timestamp: 1574575200000,
      temp_min: 4.12,
      temp_max: 4.12
    },
    {
      timestamp: 1574586000000,
      temp_min: 6.39,
      temp_max: 6.39
    },
    {
      timestamp: 1574596800000,
      temp_min: 6.82,
      temp_max: 6.82
    },
    {
      timestamp: 1574607600000,
      temp_min: 5.55,
      temp_max: 5.55
    },
    {
      timestamp: 1574618400000,
      temp_min: 5.88,
      temp_max: 5.88
    },
    {
      timestamp: 1574629200000,
      temp_min: 5.9,
      temp_max: 5.9
    },
    {
      timestamp: 1574640000000,
      temp_min: 5.86,
      temp_max: 5.86
    },
    {
      timestamp: 1574650800000,
      temp_min: 5.76,
      temp_max: 5.76
    },
    {
      timestamp: 1574661600000,
      temp_min: 6.03,
      temp_max: 6.03
    },
    {
      timestamp: 1574672400000,
      temp_min: 7.17,
      temp_max: 7.17
    },
    {
      timestamp: 1574683200000,
      temp_min: 6.83,
      temp_max: 6.83
    },
    {
      timestamp: 1574694000000,
      temp_min: 6.26,
      temp_max: 6.26
    },
    {
      timestamp: 1574704800000,
      temp_min: 5.82,
      temp_max: 5.82
    },
    {
      timestamp: 1574715600000,
      temp_min: 5.75,
      temp_max: 5.75
    },
    {
      timestamp: 1574726400000,
      temp_min: 5.61,
      temp_max: 5.61
    },
    {
      timestamp: 1574737200000,
      temp_min: 5.35,
      temp_max: 5.35
    },
    {
      timestamp: 1574748000000,
      temp_min: 5.02,
      temp_max: 5.02
    },
    {
      timestamp: 1574758800000,
      temp_min: 6.36,
      temp_max: 6.36
    },
    {
      timestamp: 1574769600000,
      temp_min: 7.34,
      temp_max: 7.34
    },
    {
      timestamp: 1574780400000,
      temp_min: 4.89,
      temp_max: 4.89
    },
    {
      timestamp: 1574791200000,
      temp_min: 3.35,
      temp_max: 3.35
    },
    {
      timestamp: 1574802000000,
      temp_min: 2.43,
      temp_max: 2.43
    },
    {
      timestamp: 1574812800000,
      temp_min: 2.29,
      temp_max: 2.29
    },
    {
      timestamp: 1574823600000,
      temp_min: 2.04,
      temp_max: 2.04
    },
    {
      timestamp: 1574834400000,
      temp_min: 2.5,
      temp_max: 2.5
    },
    {
      timestamp: 1574845200000,
      temp_min: 8.37,
      temp_max: 8.37
    },
    {
      timestamp: 1574856000000,
      temp_min: 10.21,
      temp_max: 10.21
    },
    {
      timestamp: 1574866800000,
      temp_min: 6.09,
      temp_max: 6.09
    },
    {
      timestamp: 1574877600000,
      temp_min: 4.67,
      temp_max: 4.67
    },
    {
      timestamp: 1574888400000,
      temp_min: 4.13,
      temp_max: 4.13
    },
    {
      timestamp: 1574899200000,
      temp_min: 5.3,
      temp_max: 5.3
    },
    {
      timestamp: 1574910000000,
      temp_min: 4.76,
      temp_max: 4.76
    },
    {
      timestamp: 1574920800000,
      temp_min: 4.17,
      temp_max: 4.17
    },
    {
      timestamp: 1574931600000,
      temp_min: 9.29,
      temp_max: 9.29
    }
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Header></Header>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart series={temp_series}></Chart>
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
      </main>
    </div>
  );
}
