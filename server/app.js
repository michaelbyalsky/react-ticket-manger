const express = require('express');

const app = express();

const fs = require('fs').promises;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../client/build'));

app.get('/api/tickets', async (req, res) => {
  const content = await fs.readFile('./data.json');
  const storedTickets = JSON.parse(content);
  if (req.query.searchText) {
    const filteredTickets = storedTickets
      .filter((ticket) => ticket.title.toLowerCase().includes(req.query.searchText));
    res.send(filteredTickets);
  } else {
    res.send(storedTickets);
  }
});

app.post('/api/tickets/:ticketId/done/', async (req, res) => {
  let foundTicket = false
  const content = await fs.readFile('./data.json');
  const storedTickets = JSON.parse(content);
  const currentTicket = req.body;
  currentTicket.updated = true;
  storedTickets.map((ticket) => {
    if (`:${ticket.id}` === req.params.ticketId) {
      foundTicket = true
      Object.assign(ticket, currentTicket);
    }
  });
  if (foundTicket) {
    const message = JSON.stringify(storedTickets);
    await fs.writeFile('./data.json', message);
    res.send(storedTickets);
  } else {
    res.send(storedTickets)
    res.status(404)
  }
});

app.post('/api/tickets/:ticketId/undone/', async (req, res) => {
  let foundTicket = false
  const content = await fs.readFile('./data.json');
  const storedTickets = JSON.parse(content);
  const currentTicket = req.body;
  currentTicket.updated = false;
  storedTickets.forEach((ticket) => {
    if (`:${ticket.id}` === req.params.ticketId) {
      foundTicket = true
      Object.assign(ticket, currentTicket);
    }
  });
  if (foundTicket) {
    const message = JSON.stringify(storedTickets);
    await fs.writeFile('./data.json', message);
    res.send(storedTickets);
  } else {
    res.send(storedTickets)
    res.status(404)
  } 
});

app.get('/', (req, res) => {
  res.send('hello');
});

module.exports = app;
