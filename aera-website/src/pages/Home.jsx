import React, { useEffect } from 'react';
import styles from './Home.module.css';

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(' ');

const VALUES = [
  {
    eyebrow: 'Community',
    title: 'Research belongs to everyone.',
    copy: 'A room for brave questions, unexpected disciplines, and the people who have been waiting to be heard.',
    variant: 'vertical',
  },
  {
    eyebrow: 'Impact',
    title: 'Make your work matter.',
    copy: 'Share emerging research, meet generous mentors, and leave with momentum for what comes next.',
    variant: 'horizontal',
  },
  {
    eyebrow: 'Together',
    title: 'Connection is the method.',
    copy: 'A day of conversations that brings research out of silos and into a larger, livelier world.',
    variant: 'mirrored',
  },
];

const SPONSORS = ['Check Back Soon', 'Check Back Soon', 'Check Back Soon', 'Check Back Soon', 'Check Back Soon', 'Check Back Soon', 'Check Back Soon',];
const DNA_RUNG_COUNT = 18;

function DnaHelix({ variant }) {
  return (
    <div className={cx('value-card__dna', `value-card__dna--${variant}`)} aria-hidden="true">
      <div className={cx('dna-helix')}>
        {Array.from({ length: DNA_RUNG_COUNT }, (_, index) => (
          <span className={cx('dna-rung')} key={index} style={{ '--rung-index': index }}>
            <i className={cx('dna-rung__node')} />
            <b className={cx('dna-rung__connector')} />
            <i className={cx('dna-rung__node')} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main className={cx('home-container')}>
      <section className={cx('hero')} aria-labelledby="home-title">
        <div className={cx('parallax-bg')} style={{ '--parallax-speed': '0.6' }}>
          <div className={cx('hero__orb', 'hero__orb--one')} aria-hidden="true" />
        </div>
        <div className={cx('parallax-bg')} style={{ '--parallax-speed': '0.2' }}>
          <div className={cx('hero__orb', 'hero__orb--two')} aria-hidden="true" />
        </div>
        <div className={cx('parallax-bg')} style={{ '--parallax-speed': '0.1' }}>
          <div className={cx('hero__orb', 'hero__orb--three')} aria-hidden="true" />
        </div>
        <div className={cx('parallax-bg')} style={{ '--parallax-speed': '-0.15' }}>
          <div className={cx('hero__spotlight')} aria-hidden="true" />
        </div>

        <h1 id="home-title" className={cx('hero__title')}>
          <span id={cx('topline')} className={cx('hero__title-line')}>A new...</span>
          <span className={cx('hero__title-word')}>AERA</span>
          <span id={cx('botline')} className={cx('hero__title-line')}>of research</span>
        </h1>

        <div className={cx('hero__bottom')}>
          <span>December 5th, 2026</span>
          <span>Toronto, ON</span>
        </div>
      </section>

      <section className={cx('intro')} aria-labelledby="intro-title">
        <div className={cx('parallax-bg')} style={{ '--parallax-speed': '0.2' }}>
        </div>
        <div className={cx('intro__header')}>
          <h2 id="intro-title">A research competition for underrepresented audiences.</h2>
        </div>
        <div className={cx('intro__paragraph')}>
          <p>At AERA, we ask questions that deserve more answers, uplift people that deserve more care, and support a world that needs more voices. Are you ready to challenge the limits of research with us?</p>
        </div>
      </section>

      <section className={cx('details')} aria-labelledby="details-title">
        <div className={cx('parallax-bg')} style={{ '--parallax-speed': '0.15' }}>
        </div>

        <div className={cx('details__intro')}>
          <p className={cx('section-kicker')}>AERA / 2026</p>
          <h2 id="details-title">Make room for a new perspective.</h2>
          <a className={cx('text-link')} href="/topic">This year's topic<span aria-hidden="true">→</span></a>
        </div>
        <div className={cx('details__list')}>
          <article className={cx('detail-row')}>
            <div><h3>Location</h3><p>University of Toronto St. George Campus<br />15 King's College Circle, Toronto, M5S 3H7<br /><small>University College</small></p></div>
          </article>
          <article className={cx('detail-row')}>
            <div><h3>Format</h3><p>Teams of 3-5 give a 20 minute long presentation, prepared over the course of one month, during the single-day conference.<br /><small>Top 3 teams + most creative receive awards</small></p></div>
          </article>
          <article className={cx('detail-row')}>
            <div><h3>When</h3><p>Saturday, December 5th, 2026<br /><small>Registration closes October 28th, 2026</small></p></div>
          </article>
        </div>
      </section>

      <section className={cx('sponsors')} aria-label="Our community partners">
        <div className={cx('parallax-bg')} style={{ '--parallax-speed': '-0.12' }}>
        </div>

        <p className={cx('section-kicker')}>With thanks to our community partners</p>
        <div className={cx('sponsor-ticker')}>
          <div className={cx('sponsor-ticker__track')}>
            {[...SPONSORS, ...SPONSORS].map((sponsor, index) => (
              <span className={cx('sponsor-ticker__item')} key={`${sponsor}-${index}`}>{sponsor}<i aria-hidden="true">✳</i></span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}