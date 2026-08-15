
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../config/constants';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="text-gradient" style={{ fontWeight: 800, letterSpacing: '0.1em' }}>
            PRISM
          </span>
          <p className="footer-tagline">
            Privacy-first video preparation for content creators.
          </p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4 className="group-title">Product</h4>
            <Link to={APP_ROUTES.HOME}>Home</Link>
            <Link to={APP_ROUTES.UPLOAD}>Upload</Link>
            <Link to={APP_ROUTES.HOW_IT_WORKS}>How it works</Link>
          </div>
          <div className="link-group">
            <h4 className="group-title">Legal</h4>
            <Link to={APP_ROUTES.PRIVACY}>Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {year} Prism Method. All rights reserved.</p>
        <p className="footer-disclaimer">Not affiliated with TikTok.</p>
      </div>
    </footer>
  );
}