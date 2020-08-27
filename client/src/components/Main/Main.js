import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ticket from '../Tickets/Tickets';
import NavBar from '../NavBar/NavBar';

const Main = () => {
  const [ticketsData, setTicketsData] = useState([]); // data array of the tickets user can see
  const [searchText, setSearchText] = useState([]); // search input text
  const [hiddenTickets, setHiddenTickets] = useState(0);
  const [hiddenData, setHiddenData] = useState([]); // the array of the hidden tickets
  const [doneTicketsNumber, setDoneTicketsNumber] = useState(0); // counter of the done tickets
  const [ticketsLeftNumber, setTicketsLeftNumber] = useState(0); // counter of the undone tickets

  // show first the ticket that done
  const sortByDone = () => {
    const filteredDone = ticketsData.filter(
      (ticket) => ticket.updated === true,
    );
    const filteredUnDone = ticketsData.filter(
      (ticket) => ticket.updated !== true,
    );
    const sorted = filteredDone.concat(filteredUnDone);
    setTicketsData(sorted);
  };

  // show the tickets that need to be done
  const sortByUnDone = () => {
    const filteredDone = ticketsData.filter(
      (ticket) => ticket.updated === true,
    );
    const filteredUnDone = ticketsData.filter(
      (ticket) => ticket.updated !== true,
    );
    const sorted = filteredUnDone.concat(filteredDone);
    setTicketsData(sorted);
  };

  // search for ticket in the list
  const searchTicket = () => {
    axios
      .get(`/api/tickets?searchText=${searchText}`)
      .then((response) => {
        setTicketsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // call the search ticket function only when user types in the search bar
  useEffect(() => {
    searchTicket();
  }, [searchText]);

  // show the hidden tickets tickets
  const showAllTickets = () => {
    const tempData = hiddenData.concat(ticketsData);
    setTicketsData(tempData);
    setHiddenData([]);
    setHiddenTickets(0);
  };

  // sort by creation time
  const sortByDate = () => {
    const tempData = Array.from(ticketsData);
    tempData.sort((a, b) => a.creationTime - b.creationTime);
    setTicketsData(tempData);
  };

  // hide certain ticket by pressing hide icon
  const hideTicket = (ChosenTicket) => {
    const filteredData = ticketsData.filter(
      (ticket) => ticket.id !== ChosenTicket.id,
    );
    setTicketsData(filteredData);
    setHiddenTickets(hiddenTickets + 1);
    setHiddenData([...hiddenData, ChosenTicket]);
  };

  // update the ticket in the server to be done
  const doneTicket = (currentTicket) => {
    axios
      .post(`/api/tickets/:${currentTicket.id}/done`, currentTicket)
      .then((response) => {
        const allData = response.data;
        const doneTickets = allData.filter((data) => data.updated === true);
        const undoneTickets = allData.filter((data) => data.updated !== true);
        setTicketsData(allData);
        setTicketsLeftNumber(undoneTickets.length);
        setDoneTicketsNumber(doneTickets.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // make the ticket be undone
  const restoreTicket = (currentTicket) => {
    axios
      .post(`/api/tickets/:${currentTicket.id}/undone`, currentTicket)
      .then((response) => {
        const allData = response.data;
        const doneTickets = allData.filter((data) => data.updated === true);
        const undoneTickets = allData.filter((data) => data.updated !== true);
        setTicketsData(allData);
        setTicketsLeftNumber(undoneTickets.length);
        setDoneTicketsNumber(doneTickets.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // show all tickets in order og creation time
  const loadTickets = () => {
    axios
      .get('/api/tickets')
      .then((response) => {
        const allData = response.data;
        const doneTickets = allData.filter((data) => data.updated === true);
        const undoneTickets = allData.filter((data) => data.updated !== true);
        // sorting function
        allData.sort((a, b) => a.creationTime - b.creationTime);
        setTicketsData(allData);
        setTicketsLeftNumber(undoneTickets.length);
        setDoneTicketsNumber(doneTickets.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // load the all tickets only in the first render
  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <>
      <div>
        <NavBar
          showAllTickets={showAllTickets}
          doneTicketsNumber={doneTicketsNumber}
          ticketsLeftNumber={ticketsLeftNumber}
          setHiddenTickets={setHiddenTickets}
          hiddenTickets={hiddenTickets}
          setSearchText={setSearchText}
          searchText={searchText}
          sortByUnDone={sortByUnDone}
          sortByDone={sortByDone}
          sortByDate={sortByDate}
          ticketsData={ticketsData}
        />
      </div>
      <div>
        {ticketsData
        && (
          <Ticket
            restoreTicket={restoreTicket}
            doneTicket={doneTicket}
            hideTicket={hideTicket}
            ticketsData={ticketsData}
          />
        )}
      </div>
    </>
  );
};

export default Main;
