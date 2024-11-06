import React, { useEffect, useState } from 'react';
import { fetchTickets, createTicket } from '../services/api';

function KanbanBoard() {
  const [tickets, setTickets] = useState([]); // Initialize with an empty array
  const [newTicket, setNewTicket] = useState({ title: '', status: 'To Do', priority: 'Medium' });

  // Fetch tickets on component mount
  useEffect(() => {
    async function loadTickets() {
      const data = await fetchTickets();
      setTickets(data || []); // Ensure tickets is an array even if data is null or undefined
    }
    loadTickets();
  }, []);

  // Add a new ticket and update the state
  const addTicket = async () => {
    const ticket = await createTicket(newTicket);
    setTickets([...tickets, ticket]); // Append the new ticket to the existing list
    setNewTicket({ title: '', status: 'To Do', priority: 'Medium' }); // Reset form
  };

  return (
    <div>
      <h1>Kanban Board</h1>

      {/* Form to Add New Ticket */}
      <div>
        <h3>Add a New Ticket</h3>
        <input
          type="text"
          placeholder="Title"
          value={newTicket.title}
          onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
        />
        <select
          value={newTicket.status}
          onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select
          value={newTicket.priority}
          onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTicket}>Add Ticket</button>
      </div>

      {/* Display Tickets */}
      <div className="board">
        {tickets && tickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <h2>{ticket.title}</h2>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
