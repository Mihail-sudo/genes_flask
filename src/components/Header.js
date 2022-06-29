import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({current_user}) => {
  return (
    <header className="site-header">
        <nav className="navbar navbar-expand-md navbar-dark bg-light-green fixed-top">
            <div className="container">
                <span className="navbar-brand mr-4"><Link to="/" style={{ textDecoration: 'none', color: '#ffffff'}}>Genes</Link></span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggle">
                    <div className="navbar-nav mr-auto">
                    <span className="nav-item nav-link"><Link to="search" style={{ textDecoration: 'none' }}>Search</Link></span>
                    </div>
                        {current_user.is_authenticated ? 
                        <div className="navbar-nav">
                        <span className="nav-item nav-link"><Link to="createPost" style={{ textDecoration: 'none' }}>New post</Link></span>
                        <span className="nav-item nav-link"><Link to="account" style={{ textDecoration: 'none' }}>My account</Link></span>
                        <span className="nav-item nav-link"><Link to="logout" style={{ textDecoration: 'none' }}>Logout</Link></span>
                        </div> :
                        <div className="navbar-nav">
                        <span className="nav-item nav-link"><Link to="login" style={{ textDecoration: 'none' }}>Login</Link></span>
                        <span className="nav-item nav-link"><Link to="signUp" style={{ textDecoration: 'none' }}>Sign Up</Link></span>
                        </div>}
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header