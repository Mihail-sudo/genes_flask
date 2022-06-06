import React from 'react'

const Footer = () => {
  return (
    <footer className="site-footer bg-dark-blue">
            <div className="container">
                <div className="row mt-3">
                    <div className="col-4"><a href="#">About us</a></div>
                    <div className="col-4"><a href="#">Write us</a></div>
                    <div className="col-4"><a href="#">One more text</a></div>
                </div>
                <div className="row mt-3">
                    <div className="col-4"><a href="#">Message</a></div>
                    <div className="col-4"><a href="#">Href</a></div>
                    <div className="col-4"><a href="#">Don't kill us</a></div>
                </div>
                <div className="row justify-content-end mt-3 mb-3">
                    <div className="col-4"><a href="#">Message</a></div>
                    <div className="col-4"><a href="#">Href</a></div>
                </div>
            </div>
    </footer>
  )
}

export default Footer
