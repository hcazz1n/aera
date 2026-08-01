import React from 'react';
import styles from './About.module.css';

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(' ');

const About = () => {
  return (
    <main className={cx('about-container')}>
      <aside className={cx('marginalia')}>
        <h3 className={cx('marginalia-title')}>Location & Acknowledgement</h3>
        <p className={cx('marginalia-text')}>
          Land acknowledgement and location acknowledgement.
        </p>
      </aside>

      <article className={cx('editorial-content')}>
        <section className={cx('editorial-section')}>
          <h2>Our Mission</h2>
          <p>
            The AERA mission goes here
          </p>
        </section>

        <section className={cx('editorial-section')}>
          <h2>Our Goals</h2>
          <p>
            The goals of AERA goes here.
          </p>
        </section>

        <section className={cx('editorial-section')}>
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
