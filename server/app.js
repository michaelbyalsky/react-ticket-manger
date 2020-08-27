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

app.get('/api/users', async (req, res) => {
  let ifValid = false;
  const content = await fs.readFile('./users.json');
  const storedUsers = JSON.parse(content);
  storedUsers.forEach((user) => {
    if (user.name === req.query.name
    && user.password === req.query.password) {
      ifValid = true;
    }
  });
  res.send(ifValid);
});

app.post('/api/tickets/:ticketId/done/', async (req, res) => {
  const content = await fs.readFile('./data.json');
  const storedTickets = JSON.parse(content);
  const currentTicket = req.body;
  currentTicket.updated = true;
  storedTickets.forEach((ticket) => {
    if (`:${ticket.id}` === req.params.ticketId) {
      Object.assign(ticket, currentTicket);
    }
  });
  const message = JSON.stringify(storedTickets);
  await fs.writeFile('./data.json', message);
  res.send(storedTickets);
});

app.post('/api/tickets/:ticketId/undone/', async (req, res) => {
  const content = await fs.readFile('./data.json');
  const storedTickets = JSON.parse(content);
  const currentTicket = req.body;
  currentTicket.updated = false;
  storedTickets.forEach((ticket) => {
    if (`:${ticket.id}` === req.params.ticketId) {
      Object.assign(ticket, currentTicket);
    }
  });
  const message = JSON.stringify(storedTickets);
  await fs.writeFile('./data.json', message);
  res.send(storedTickets);
});

app.get('/', (req, res) => {
  res.send('hello');
});

module.exports = app;
