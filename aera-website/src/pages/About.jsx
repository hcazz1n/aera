import React from 'react';
import './About.css';

const About = () => {
  return (
    <main className="about-container">
      <aside className="marginalia">
        <h3 className="marginalia-title">Location & Acknowledgement</h3>
        <p className="marginalia-text">
          Land acknowledgement and location acknowledgement.
        </p>
      </aside>

      <article className="editorial-content">
        <section className="editorial-section">
          <h2>Our Mission</h2>
          <p>
            The AERA mission goes here
          </p>
        </section>

        <section className="editorial-section">
          <h2>Our Goals</h2>
          <p>
            The goals of AERA goes here.
          </p>
        </section>

        <section className="editorial-section">
          <h2>Why Join Us?</h2>
          <p>
            Why Join Us? In competition, and the team.
          </p>
        </section>
      </article>
    </main>
  );
};

export default About;