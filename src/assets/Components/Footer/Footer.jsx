import React,{memo} from 'react'
import style from './Footer.module.css'
// import evFooter_logo from '../../img/Evangadi-footer-logo.png'
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer className={style.footer}>
        <div className={style.footer_container}>
          <div className={style.footer_left}>
            <div className={style.logo}>
              <img src='/public/img/Evangadi-footer-logo.png' alt="Evangadi-Logo" />
            </div>
            <div className={style.socials}>
              <span><a    
              href="https://www.facebook.com/evangaditech"
              target="_blank"
              rel="noopener noreferrer"><FacebookIcon/></a></span>
              <span><a  href="https://www.instagram.com/evangaditech"
              target="_blank"
              rel="noopener noreferrer"><InstagramIcon/></a></span>
              <span><a 
              href="https://www.youtube.com/@EvangadiTech" 
              target="_blank" 
              rel="noopener noreferrer"><YouTubeIcon/></a></span>
            </div>
          </div>

          <div className={style.footer_middle}>
            <h4>Useful Links</h4>
            <ul>
              <li>
                <Link to="/how-it-work">How it works</Link>
              </li>
              <li>
                <a href="https://evangadi.com/legal/terms">Terms of Service</a>
              </li>
              <li>
                <a href="https://evangadi.com/legal/privacy">Privacy policy</a>
              </li>
            </ul>
          </div>

          <div className={style.footer_right}>
            <h4>Contact Info</h4>
            <ul>
              <li>
                <a href="#">Evangadi Networks</a>
              </li>
              <li>
                <a href="#">support@evangadi.com</a>
              </li>
              <li>
                <a href="#">+1-202-386-2702</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer
