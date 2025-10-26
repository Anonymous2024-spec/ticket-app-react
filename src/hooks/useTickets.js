import { useState, useEffect } from 'react';

// Mock initial tickets data
const initialTickets = [
  {
    id: 1,
    title: 'Login issue on mobile',
    description: 'Users are unable to login from mobile devices',
    status: 'open',
    priority: 'high',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 2,
    title: 'Dashboard loading slow',
    description: 'Dashboard takes more than 10 seconds to load data',
    status: 'in_progress',
    priority: 'medium',
    createdAt: new Date('2024-01-14').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 3,
    title: 'Update user profile picture',
    description: 'Allow users to upload and crop profile pictures',
    status: 'closed',
    priority: 'low',
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString(),
  }
];

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const savedTickets = localStorage.getItem('ticketapp_tickets');
      if (savedTickets) {
        setTickets(JSON.parse(savedTickets));
      } else {
        setTickets(initialTickets);
        localStorage.setItem('ticketapp_tickets', JSON.stringify(initialTickets));
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const createTicket = (ticketData) => {
    const newTicket = {
      id: Date.now(),
      ...ticketData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTickets = [...tickets, newTicket];
    setTickets(updatedTickets);
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
    return newTicket;
  };

  const updateTicket = (id, updates) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === id
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );
    setTickets(updatedTickets);
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
  };

  const deleteTicket = (id) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== id);
    setTickets(updatedTickets);
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
  };

  const getTicket = (id) => {
    return tickets.find(ticket => ticket.id === id);
  };

  return {
    tickets,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicket,
  };
};