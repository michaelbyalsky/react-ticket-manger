import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from '../Tickets/Tickets';
import './Main.css';
import NavBar from '../NavBar/NavBar';

const Main = () => {
  const [ticketsData, setTicketsData] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [hiddenTickets, setHiddenTickets] = useState(0);
  const [hiddenData, setHiddenData] = useState([]);
  const [doneTicketsNumber, setDoneTicketsNumber] = useState(0);
  const [ticketsLeftNumber, setTicketsLeftNumber] = useState(0);
  const [doneTicketsList, setDoneTicketsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const sortByDate  = (array) => {
    array.sort((a,b) => new Date(b.creationTime) - new Date(a.creationTime));
  }

  const searchTicket = () => {
    console.log(searchText);
    axios
      .get(`/api/tickets?searchText=${searchText}`)
      .then((response) => {
        console.log(response.data);
        setTicketsData(response.data);
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

  const doneTicket = (currentTicket) => {
    setLoading(true);
    axios
      .post(`/api/tickets/:${currentTicket.id}/done`, currentTicket)
      .then((response) => {
        const allData = response.data;
        const doneTickets = allData.filter((data) => data.updated === true);
        const undoneTickets = allData.filter((data) => data.updated !== true);
        setTicketsData(allData);
        setTicketsLeftNumber(undoneTickets.length);
        setDoneTicketsNumber(doneTickets.length);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restoreTicket = (currentTicket) => {
    setLoading(true);
    axios
      .post(`/api/tickets/:${currentTicket.id}/undone`, currentTicket)
      .then((response) => {
        const allData = response.data;
        const doneTickets = allData.filter((data) => data.updated === true);
        const undoneTickets = allData.filter((data) => data.updated !== true);
        setTicketsData(allData);
        setTicketsLeftNumber(undoneTickets.length);
        setDoneTicketsNumber(doneTickets.length);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const restoreTickets = (currentTicket) => {
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

  // const loadTickets = () => {
  //   axios
  //   .get(`/api/tickets`)
  //   .then((response) => {
  //       console.log(response.data);
  //     setTicketsData(response.data);
  //     setTicketsLeftNumber(response.data.length)
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  const loadTickets = () => {
    axios
      .get('/api/tickets')
      .then((response) => {
        const allData = response.data;
        const doneTickets = allData.filter((data) => data.updated === true);
        const undoneTickets = allData.filter((data) => data.updated !== true);
        setTicketsData(allData);
        setDoneTicketsList(doneTickets);
        setTicketsLeftNumber(undoneTickets.length);
        setDoneTicketsNumber(doneTickets.length);
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
        <NavBar showAllTickets={showAllTickets} 
        restoreTickets={restoreTickets} 
        doneTicketsNumber={doneTicketsNumber} 
        ticketsLeftNumber={ticketsLeftNumber}
        setHiddenTickets={setHiddenTickets} 
        hiddenTickets={hiddenTickets} 
        setSearchText={setSearchText} 
        searchText={searchText} />
      </div>
      <div>
        <Ticket 
        loading={loading}
        restoreTicket={restoreTicket} 
        doneTicket={doneTicket} 
        hideTicket={hideTicket} 
        ticketsData={ticketsData} />
      </div>
    </>
  );
};

export default Main;
