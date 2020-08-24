import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from '../Ticket/Ticket';
import './Main.css';
import InputBase from '@material-ui/core/InputBase';
import NavBar from '../NavBar/NavBar';

const Main = () => {
  const [ticketsData, setTicketsData] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState(0);
  const [hiddenData, setHiddenData] = useState([]);
  const [doneTicketsNumber, setDoneTicketsNumber] = useState(0);
  const [ticketsLeftNumber, setTicketsLeftNumber] = useState(0);
  // const [doneTicketsList, setDoneTicketsList] = useState([]);

  const searchTicket = () => {
    console.log(searchText);
    axios
      .get(`/api/tickets/?searchText=${searchText}`)
      .then((response) => {
        console.log(response.data);
        setTicketsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadTickets = () => {
    axios
      .get('/api/tickets')
      .then((response) => {
        console.log(response.data);
        setTicketsData(response.data);
        setTicketsLeftNumber(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadTickets();
  }, []);

  useEffect(() => {
    searchTicket();
  }, [searchText]);

  const showAllTickets = () => {
    console.log(ticketsData);
    console.log(hiddenData);
    const tempData = hiddenData.concat(ticketsData);
    setTicketsData(tempData);
    console.log(setTicketsData);
    setHiddenData([]);
    setHiddenTickets(0);
  };

  const hideTicket = (ChosenTicket) => {
    const filteredData = ticketsData.filter((ticket) => ticket.id !== ChosenTicket.id);
    setTicketsData(filteredData);
    setHiddenTickets(hiddenTickets + 1);
    setHiddenData([...hiddenData, ChosenTicket]);
  };

  const ticketDone = (currentTicket) => {
    axios
      .post(`/api/tickets/:${currentTicket.id}/done`, currentTicket)
      .then((response) => {
        console.log(response.data);
        setTicketsData(response.data);
        setTicketsLeftNumber(response.data.length);
        setDoneTicketsNumber(doneTicketsNumber + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ticketUnDone = (currentTicket) => {
    axios
      .post(`/api/tickets/:${currentTicket.id}/undone`, currentTicket)
      .then((response) => {
        console.log(response.data);
        setTicketsData(response.data);
        setTicketsLeftNumber(response.data.length);
        setDoneTicketsNumber(doneTicketsNumber - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <>
      <div>
        {/* <NavBar doneTicketsNumber={doneTicketsNumber} ticketsLeftNumber={ticketsLeftNumber} showAllTickets={showAllTickets} setHiddenTickets={setHiddenTickets} hiddenTickets={hiddenTickets} setSearchText={setSearchText} searchText={searchText} /> */}
      </div>
      <div>
        <Ticket className="Ticket" ticketDone={ticketDone} ticketUnDone={ticketUnDone} hideTicket={hideTicket} ticketsData={ticketsData} />
      </div>
    </>
  );
};

export default Main;
