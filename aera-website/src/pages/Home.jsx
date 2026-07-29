import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <main className="home-container">
      
      {/* Absolute Top Action Header
      <nav className="action-header">
        <img 
          src="/src/assets/aera_transparent_notext.png" 
          alt="AERA Logo" 
          className="hero-logo" 
        />
        <button 
          className="btn-primary" 
          onClick={() => window.location.href='/register'}
        >
          Register Now
        </button>
      </nav> */}

      {/*Hero Txt*/}
      <header className="marquee-wrapper">
        <h1 className="marquee-title">
          Explore today,<br/>
          change tomorrow;<br/>
          <span>a new aera of research.</span>
        </h1>
        <span className="editorial-heading">Toronto, ON</span>
        <br/>
        <span className="editorial-heading">January 1st</span>
        <br/>
        <button className="btn-primary" onClick={() => window.location.href='/under_construction'}>
          Register Here
        </button>


      </header>

      {/*Mission*/}
      <section className="editorial-block">
        {/* <span className="editorial-label">The Assembly</span> */}
        <h2 className="editorial-heading">Elevating underrepresented topics in academia.</h2>
        <p className="editorial-body">
          The Advancing Equity in Research Assembly (AERA) is an annual conference hosted in the heart of Canada at the University of Toronto.
        </p>
      </section>

      {/*Structured Data (may get rid of not loving the design rn)*/}
      <section className="data-row-container">
        
        <article className="data-row">
          <div className="data-row-title">Location</div>
          <div className="data-row-content">
            <strong>University of Toronto</strong><br />
            Toronto, Ontario, Canada
          </div>
        </article>

        <article className="data-row">
          <div className="data-row-title">Conference Format</div>
          <div className="data-row-content">
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              <li>Guest speakers</li>
              <li>Student research presentations</li>
              <li>Live judging & awards</li>
            </ul>
          </div>
        </article>

        <article className="data-row">
          <div className="data-row-title">Important Dates</div>
          <div className="data-row-content">
            Registration Opens: <strong>TBA</strong><br />
            Project Submissions: <strong>TBA</strong><br />
            Conference Day: <strong>TBA</strong>
          </div>
        </article>

      </section>
    </main>
  );
}