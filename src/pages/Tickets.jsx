import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "../hooks/useTickets";
import TicketForm from "../components/tickets/TicketForm";
import TicketCard from "../components/tickets/TicketCard";
import Toast from "../components/ui/Toast";
import styles from "./Tickets.module.css";

const Tickets = () => {
  const { tickets, loading, createTicket, updateTicket, deleteTicket } =
    useTickets();
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateTicket = (ticketData) => {
    try {
      createTicket(ticketData);
      setShowForm(false);
      showToast("Ticket created successfully!");
    } catch (error) {
      showToast("Failed to create ticket", "error");
    }
  };

  const handleUpdateTicket = (ticketData) => {
    try {
      updateTicket(editingTicket.id, ticketData);
      setEditingTicket(null);
      showToast("Ticket updated successfully!");
    } catch (error) {
      showToast("Failed to update ticket", "error");
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        deleteTicket(ticketId);
        showToast("Ticket deleted successfully!");
      } catch (error) {
        showToast("Failed to delete ticket", "error");
      }
    }
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTicket(null);
  };

  // Filter tickets based on status
  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  const ticketCounts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div>Loading tickets...</div>
      </div>
    );
  }

  return (
    <div className={styles.tickets}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>Ticket Management</h1>
              <p className={styles.subtitle}>
                Create, view, and manage support tickets
              </p>
            </div>
            <div className={styles.headerActions}>
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
                disabled={showForm || editingTicket}
              >
                + Create Ticket
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className={styles.content}>
          {/* Sidebar - Form */}
          {(showForm || editingTicket) && (
            <div className={styles.sidebar}>
              <div className={styles.formSection}>
                <h2 className={styles.formTitle}>
                  {editingTicket ? "Edit Ticket" : "Create New Ticket"}
                </h2>
                <TicketForm
                  ticket={editingTicket}
                  onSubmit={
                    editingTicket ? handleUpdateTicket : handleCreateTicket
                  }
                  onCancel={handleCancelForm}
                />
              </div>
            </div>
          )}

          {/* Main Area - Ticket List */}
          <div className={styles.main}>
            {/* Filter Tabs */}
            <div className={styles.filterTabs}>
              {[
                { key: "all", label: "All Tickets", count: ticketCounts.all },
                { key: "open", label: "Open", count: ticketCounts.open },
                {
                  key: "in_progress",
                  label: "In Progress",
                  count: ticketCounts.in_progress,
                },
                {
                  key: "closed",
                  label: "Resolved",
                  count: ticketCounts.closed,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`${styles.filterTab} ${
                    filter === tab.key ? styles.active : ""
                  }`}
                  onClick={() => setFilter(tab.key)}
                >
                  <span className={styles.tabLabel}>{tab.label}</span>
                  <span className={styles.tabCount}>({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Tickets Grid */}
            {filteredTickets.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🎫</div>
                <h3>No tickets found</h3>
                <p>
                  {filter === "all"
                    ? "You haven't created any tickets yet."
                    : `No ${filter.replace("_", " ")} tickets found.`}
                </p>
                {filter === "all" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                  >
                    Create Your First Ticket
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.ticketsGrid}>
                {filteredTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onEdit={handleEditTicket}
                    onDelete={handleDeleteTicket}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Tickets;
