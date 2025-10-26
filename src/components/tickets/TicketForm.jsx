import { useState, useEffect } from "react";
import styles from "./TicketForm.module.css";

const TicketForm = ({ ticket, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || "",
        description: ticket.description || "",
        status: ticket.status || "open",
        priority: ticket.priority || "medium",
      });
    }
  }, [ticket]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    } else if (!["open", "in_progress", "closed"].includes(formData.status)) {
      newErrors.status = "Invalid status value";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
          placeholder="Enter ticket title"
          disabled={loading}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className={`${styles.textarea} ${
            errors.description ? styles.inputError : ""
          }`}
          placeholder="Describe the issue or request..."
          rows="4"
          disabled={loading}
        />
        {errors.description && (
          <span className={styles.error}>{errors.description}</span>
        )}
        <div className={styles.charCount}>
          {formData.description.length}/500 characters
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Status *
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className={`${styles.select} ${
              errors.status ? styles.inputError : ""
            }`}
            disabled={loading}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && (
            <span className={styles.error}>{errors.status}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="priority" className={styles.label}>
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className={styles.select}
            disabled={loading}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className={styles.formActions}>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Saving..." : ticket ? "Update Ticket" : "Create Ticket"}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
