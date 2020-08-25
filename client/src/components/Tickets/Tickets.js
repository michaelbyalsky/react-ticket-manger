import React, { useState, useEffect } from 'react';
import Labels from '../Labels/Labels';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Container from '@material-ui/core/Container';
import './Tickets.css';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
  },
}));

const Tickets = ({
  hideTicket, ticketsData,
}) => {
  const classes = useStyles();

  const stringToTime = (timeString) => {
    const fullTime = new Date(timeString).toString();
    console.log(typeof (fullTime));
    const halfTime = fullTime.slice(0, 25);
    return halfTime;
  };

  if (!ticketsData) {
    return null;
  }

  return (
  // <h1>ddd</h1>
    <div className="ticketContainer">
      {
            ticketsData.map((ticket, i) => (
              <div className="ticket" key={i}>
                <div className="section_1" key={i}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography gutterBottom variant="h5">{ticket.title}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h6">
                        <Button className="hideTicketButton" onClick={() => hideTicket(ticket)}>Hide</Button>
                      </Typography>
                    </Grid>
                  </Grid>
                  <List className={classes.root}>
                    <Typography color="textSecondary" variant="body2">{ticket.content}</Typography>
                  </List>
                </div>
                <Labels className="labels" labels={ticket.labels} />
                <div className="time_mail">
                  {/* <Time timeString={ticket.creationTime}/>     */}
                  <Typography gutterBottom>{`${stringToTime(ticket.creationTime)} | ${ticket.userEmail}`}</Typography>
                </div>
              </div>
            ))
        }
    </div>
  );
};

export default Tickets;
