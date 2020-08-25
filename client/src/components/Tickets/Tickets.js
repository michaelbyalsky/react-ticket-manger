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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({

  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
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
}));

const Tickets = ({
  hideTicket, ticketsData, restoreTicket, doneTicket, loading
}) => {
  const classes = useStyles();

  function stringToTime(date) {
    let time = new Date(date);
    let createTime = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()} ${time.getHours()}:${
      time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`
    }:${time.getSeconds() > 10 ? time.getSeconds() : `0${time.getSeconds()}`}`;
    return createTime;
  }


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
                        { ticket.updated === true &&
                      <CheckCircleOutlineIcon />
                    }
                    <Button classes={{root: "hideTicketButton"}} onClick={() => hideTicket(ticket)}>Hide</Button>
                      </Typography>
                    </Grid>
                  </Grid>
                  <List className={classes.root}>
                    <Typography color="textSecondary" variant="body2">{ticket.content}</Typography>
                  </List>
                </div>
                { ticket.labels &&
                <Labels className="labels" labels={ticket.labels} />
                  }
                <div className="time_mail">
                  <Typography gutterBottom>{`by ${ticket.userEmail} | ${stringToTime(ticket.creationTime)}`}</Typography>
                </div>
                <div className="status">
               {ticket.updated !== true && 
               <Button onClick={() => doneTicket(ticket)} id="button" variant="contained" color="primary">Done</Button>
            }
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
             { ticket.updated === true && 
             <Button onClick={() => restoreTicket(ticket)} id="button" variant="contained" color="secondary">Undone</Button>
            } 
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
              </div>
            ))
        }
    </div>
  );
};

export default Tickets;
