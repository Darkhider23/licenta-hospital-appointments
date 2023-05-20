import './Footer.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Footer() {
    return (
        <div className='footer-container'>
            <div className="left-side">
                <div className="social-links">
                    <a href="https://facebook.com">
                        <FontAwesomeIcon icon="fa-brands fa-facebook-f" color='#0077b6' fontSize={30} />
                    </a>
                    <a href="https://instagram.com">
                        <FontAwesomeIcon icon="fa-brands fa-instagram" color='#0077b6' fontSize={30} />
                    </a>
                </div>
                <div className="site-mark">
                    © 2023 Spitalul Judetean <br /> Toate drepturile rezervate.
                </div>
            </div>
            <div className="right-side">
                <div className="col-1">
                    <div className="column-title">
                        Utile
                    </div>
                    <div className="column-content">
                        <NavLink to={'/calculator'}>Analisys Calculator</NavLink> <br />
                        <NavLink to={'/bmi'}>BMI Calculator</NavLink><br />
                        GDPR<br />
                    </div>
                </div>
                <div className="col-2">
                    <div className="phone-number">
                        <FontAwesomeIcon icon="fa-solid fa-phone" />
                        <a href="tel:0231584172">0231584172</a>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Footer;
