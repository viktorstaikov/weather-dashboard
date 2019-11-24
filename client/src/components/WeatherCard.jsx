import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    // width: 151,
    flex: '1 1 auto',
  },
}));

export default function WeatherCard(props) {
  const classes = useStyles();

  const { description, condition, code } = props;

  return (
    <Container>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {condition}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </CardContent>

        <CardMedia
          className={classes.cover}
          image={`http://openweathermap.org/img/wn/${code}@2x.png`}
          title={condition}
        />
      </Card>
    </Container>
  );
}
