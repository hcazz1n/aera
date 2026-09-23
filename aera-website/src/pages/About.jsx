import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './About.module.css';

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(' ');

const SECTIONS = [
  {
    id: 'mission',
    title: 'Our Mission',
    text: 'AERA\'s mission is to advance research on gender, ethnicity, race, and disabled minority groups while educating and inspiring creativity in high school students.',
  },
  {
    id: 'goals',
    title: 'Our Goals',
    text: 'We want high school students to leave our conference feeling confident in their research capabilities and aware of their potential impact. We hope they benefit from researching a topic that may be unfamiliar or daunting, and with our support, become high school-level experts in their fields confident enough to share their findings with a qualified judge. We hope that the way we frame each topic and how research is approached encourages a deeper understanding of problems in our research practices. We aim to increase representation for minorities in research through our conference advertising and more importantly through the students we hope gain an understanding of the importance of their work, whether award-winning or not.',
  },
  {
    id: 'why-join',
    title: 'Why Join Us?',
    text: 'Our conference offers a low-stakes research experience focused on teaching, understanding and developing skills rather than hyper-intensive competition without any aid. Our conference is skill judged and winners are chosen, but our judging focuses on factors that teach groups how to improve, and more importantly to indulge their passions in their work. Free seminars will be hosted by AERA members to educate students on research and research methods. AERA members, guest judges, guest speakers and others present at the conference are all incredibly valuable people to talk to and learn from, maybe even connect with! Have the opportunity to shadow a research lab if you are awarded first place! Learn more about and be a voice of change and representation for vital areas of research',
  },
  {
    id: 'marginalia',
    title: 'Location & Acknowledgement',
    text: 'We acknowledge the land on which our conference operates, which, for thousands of years, has been the traditional territory of the Huron-Wendat, the Seneca, and the Mississaugas of the Credit First Nation. We recognize the abiding presence of diverse peoples including the First Nations, Inuit, and Métis peoples from throughout Turtle Island and are grateful for the opportunity to learn and assemble on this land. Historically, research has sought to exclude Indigenous peoples, conditions, and ways of knowing. Our conference understands the immense impact of inequity in research, and seeks to improve representation for affected groups. As we continue to work towards reconciliation, we hope to empower high school students to be advocates for Indigenous rights and knowledge. Simultaneously, we hope students learn to recognize inequity in research and feel driven to promote better practices. ',
  },
];

const About = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className={cx('about-page')}>
      <div className={cx('about-container')}>
        <div className={cx('content-layout')}>
          <div className={cx('boxes-column')} role="tablist" aria-orientation="vertical" aria-label="About AERA Sections">
            {SECTIONS.map((section) => {
              const isSelected = activeSection.id === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  role="tab"
                  id={`tab-${section.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${section.id}`}
                  className={cx(
                    'box',
                    isSelected && 'box--active'
                  )}
                  onClick={() => setActiveSection(section)}
                >
                  <h2 className={cx('box-title')}>{section.title}</h2>
                </button>
              );
            })}
          </div>

          <article
            className={cx('detail-panel')}
            role="tabpanel"
            id={`panel-${activeSection.id}`}
            aria-labelledby={`tab-${activeSection.id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeInOut' }}
                className={cx('detail-content')}
              >
                <h2 className={cx('detail-title')}>{activeSection.title}</h2>
                <p className={cx('detail-text')}>{activeSection.text}</p>
              </motion.div>
            </AnimatePresence>
          </article>
        </div>
      </div>
    </main>
  );
};

export default About;
