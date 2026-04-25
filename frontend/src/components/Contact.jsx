import React from "react";

function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Here you would typically send the form data to your backend server
    // For this example, we'll just simulate a successful submission
    setStatus("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  }
  return (
    <div className="ra_contact_container">
      <div className="ra_contact_card">
        <h1>Contact Us</h1>
        <p>If you have any questions or feedback, feel free to reach out</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Message:</label>
            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>

        {status && <p className="ra_status">{status}</p>}

        <ul>
          <li>Email: contact@resumeanalyzer.com</li>
          <li>Phone: (123) 456-7890</li>
        </ul>
      </div>
    </div>
  );
}

export default Contact;
