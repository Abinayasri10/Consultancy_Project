import { Phone, Mail, MapPin, Linkedin, Twitter } from "lucide-react"
import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Anand Agro Agencies</h3>
          <p>Smart Solutions for Modern Agriculture</p>
        </div>

        <div className="footer-section">
          <h4>Contact Information</h4>
          <div className="contact-info">
            <div className="info-item">
              <Phone size={16} />
              <span>+91 1234-567-890</span>
            </div>
            <div className="info-item">
              <Mail size={16} />
              <span>info@anandagro.com</span>
            </div>
            <div className="info-item">
              <MapPin size={16} />
              <span>Indore, Madhya Pradesh, India</span>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Anand Agro Agencies. All rights reserved.</p>
        <p>Environmental commitment: Sustainable agriculture for future generations</p>
      </div>
    </footer>
  )
}

export default Footer
