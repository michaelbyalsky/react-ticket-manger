import React, { useState, useEffect } from "react";
import Labels from "../Labels/Labels";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import "./Tickets.css";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    // maxHeight: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Tickets = ({
  hideTicket,
  ticketsData,
  restoreTicket,
  doneTicket,
  loading,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();

  function stringToTime(date) {
    let dd = new Date(date);
    let getTime =
      dd.getFullYear().toString() +
      "-" +
      ("0" + (dd.getMonth() + 1).toString()).slice(-2) +
      "-" +
      ("0" + dd.getDate().toString()).slice(-2) +
      " " +
      new Date(date).toString().slice(16, 25);
    return getTime;
  }

  if (!ticketsData) {
    return null;
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    // <h1>ddd</h1>
    <div className="ticketContainer">
      {ticketsData.map((ticket, i) => (
        <div className="ticket" key={i}>
          <div className="section_1" key={i}>
            <Accordion
              expanded={expanded === ticket.id}
              onChange={handleChange(ticket.id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography gutterBottom variant="h6">
                      {ticket.title}
                    </Typography>
                    {/* { ticket.updated === true &&
                      <CheckCircleOutlineIcon />
                    } */}
                  </Grid>
                  <Grid item xs>
                    {ticket.updated === true && <CheckCircleOutlineIcon />}
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6">
                      <IconButton
                        classes={{ root: "hideTicketButton" }}
                        onClick={() => hideTicket(ticket)}
                      >
                        <VisibilityOffIcon />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <List className={classes.root}>
                  <Typography color="textSecondary" variant="body2">
                    {ticket.content}
                  </Typography>
                </List>
              </AccordionDetails>
            </Accordion>
          </div>
          {/* <div id="label_date"> */}
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom>{`by ${
                ticket.userEmail
              } | ${stringToTime(ticket.creationTime)}`}</Typography>
            </Grid>
            <Grid item>
              {ticket.labels && (
                <Labels className="labels" labels={ticket.labels} />
              )}
            </Grid>
          </Grid>
          <div className="status">
            {ticket.updated !== true && (
              <Button
                onClick={() => doneTicket(ticket)}
                classes={{ root: 'doneButton' }}
                id={`doneButton_${i}`}
                variant="contained"
                color="primary"
                size="small"
              >
                Done
              </Button>
            )}
            {ticket.updated === true && (
              <Button
                onClick={() => restoreTicket(ticket)}
                classes={{ root: 'doneButton' }}
                id={`doneButton_${i}`}
                variant="contained"
                color="secondary"
                size="small"
              >
                Undone
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tickets;