import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import './NavBar.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    position: 'fixed',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  toolbar: {
    minHeight: 0,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  buttons2: {
    flexGrow: 1,
  },
  buttons1: {
    display: 'flex',
    justifyItems: 'space-between',
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  button: {
    margin: '2px',
  },
}));

const NavBar = ({
  sortByDate,
  sortByUnDone,
  sortByDone,
  showAllTickets,
  doneTicketsNumber,
  ticketsLeftNumber,
  hiddenTickets,
  searchText,
  setSearchText,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar size="small" className={classes.appBar} id="wrapper">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" noWrap>
            Ticket Manager
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              size="small"
              id="searchInput"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div />
          <div id="buttons" className={classes.buttons1} />
          <div id="buttons" className={classes.buttons2}>
            <IconButton
              id="restoreHideTickets"
              title="show all"
              onClick={showAllTickets}
              size="small"
              variant="contained"
              color="primary"
            >
              <Badge color="secondary">
                <VisibilityIcon color="action" />
              </Badge>
            </IconButton>
            <IconButton
              id="hideTicketsCounter"
              title="hidden tickets"
              size="small"
              variant="contained"
              color="primary"
            >
              <Badge badgeContent={hiddenTickets} color="secondary">
                <VisibilityOffIcon color="action" />
              </Badge>
            </IconButton>
            <IconButton
              title="sort by date"
              id="sortByDate"
              onClick={sortByDate}
              size="small"
              variant="contained"
              color="primary"
            >
              <Badge color="secondary">
                <ScheduleIcon color="action" />
              </Badge>
            </IconButton>
            <IconButton
              id="sortByUnDone"
              title="sort by undone"
              onClick={sortByUnDone}
              size="small"
              variant="contained"
              color="primary"
            >
              <Badge badgeContent={ticketsLeftNumber} color="secondary">
                <EventBusyIcon color="action" />
              </Badge>
            </IconButton>
            <IconButton
              id="sortByDone"
              title="sort by done"
              onClick={sortByDone}
              size="small"
              variant="contained"
              color="primary"
            >
              <Badge badgeContent={doneTicketsNumber} color="secondary">
                <EventAvailableIcon color="action" />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
