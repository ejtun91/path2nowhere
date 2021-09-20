import Footer from "../../components/footer/Footer";
import "./contact.scss";

const Contact = () => {
  const handleMessage = (e) => {
    e.preventDefault();
  };

  return (
    <div className="contact">
      <div className="contactWrapper">
        <span className="contactTitle">CONTACT ME</span>
        <p className="contactDesc">
          You are very welcome to send me an email regarding any topic or
          anything that might interest you. If you feel uncomfortable with any
          topic, please notice me so I can review it. Thanks and stay with us!
        </p>
        <form className="contactForm" onSubmit={handleMessage}>
          <label htmlFor="name">
            Name<span class="red-star">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="input"
            placeholder="full name"
          />
          <label htmlFor="email">
            Email<span class="red-star">*</span>
          </label>
          <input
            type="email"
            className="input"
            id="email"
            placeholder="enter your email.."
          />
          <label htmlFor="comment">
            Your Message<span class="red-star">*</span>
          </label>
          <textarea id="comment" className="messageContact"></textarea>
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
