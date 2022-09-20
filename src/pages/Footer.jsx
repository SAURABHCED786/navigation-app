import './Footer.css'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footerLayout'>
      <footer className="footer-distributed">

        <div className="footer-right">

          <a href='#'><i className="fa fa-facebook-official"></i></a>
          <a href='#'><i className="fa fa-twitter"></i></a>
          <a href='#'><i className="fa fa-linkedin"></i></a>
          <a href='#'><i className="fa fa-github"></i></a>

        </div>

        <div className="footer-left">

          <p className="footer-links">
            <Link className="link-1" as={Link} to="/">Home</Link>

            <Link as={Link} to="/blog">Blog</Link>

            <Link as={Link} to="/pricing">Pricing</Link>

            <Link as={Link} to="/about">About</Link>

            <Link as={Link} to="/faq">Faq</Link>

            <Link as={Link} to="/contact">Contact</Link>
          </p>

          <p>Cedcommerce &copy; 2022</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer