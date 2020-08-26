import React from 'react';
import Labels from '../Labels/Labels';
import List from '@material-ui/core/List';
import './Tickets.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
}));

const Tickets = ({
  hideTicket,
  ticketsData,
  restoreTicket,
  doneTicket,
}) => {
  const [expanded, setExpanded] = React.useState(false); //set the state of the accordion
  const classes = useStyles();

  //covert time to sql time
  const stringToTime = (date) => {
    const dd = new Date(date);
    const getTime = `${dd.getFullYear().toString()
    }-${
      (`0${(dd.getMonth() + 1).toString()}`).slice(-2)
    }-${
      (`0${dd.getDate().toString()}`).slice(-2)
    } ${
      new Date(date).toString().slice(16, 25)}`;
    return getTime;
  };

  // close and open every ticket content
  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
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
                  </Grid>
                  <Grid item xs>
                    {ticket.updated === true && <CheckCircleOutlineIcon />}
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant="h6">
                      <IconButton
                        classes={{ root: 'hideTicketButton' }}
                        onClick={() => hideTicket(ticket)}
                        title="hide"
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
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom>
                {`by ${
                  ticket.userEmail
                } | ${stringToTime(ticket.creationTime)}`}
              </Typography>
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
