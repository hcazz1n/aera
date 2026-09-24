import React, { useState, useMemo } from 'react';
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
    text: 'We want high school students to leave our conference feeling confident in their research capabilities and aware of their potential impact. We hope they benefit from researching topics that may feel unfamiliar or daunting, and with our support, become high school-level experts in their fields; confident enough to share their findings with a qualified judge. \n\nWe hope the way we frame each topic and approach research encourages a deeper understanding of current gaps in research practices. We aim to increase representation for minorities in research through our conference outreach and, more importantly, through the students themselves, helping them realize the value of their work whether it is award-winning or not.',
  },
  {
    id: 'why-join',
    title: 'Why Join Us?',
    text: `Our conference offers a low-stakes research experience focused on teaching, skill development, and deep understanding, rather than high-stakes, unassisted competition. While our conference is still judged and winners are selected, our evaluation process emphasizes constructive feedback that helps teams improve and encourages them to integrate their passion into their work. 
    \n• Connect with and from AERA members, guest judges, and guest speakers throughout the conference.
    • First-place winners receive the opportunity to shadow an actual research lab!
    • Leave a lasting impact by becoming a voice of change for underrepresented and vital areas of research.`,
  },
  {
    id: 'marginalia',
    title: 'Location & Acknowledgement',
    text: 'We acknowledge the land on which our conference operates, which, for thousands of years, has been the traditional territory of the Huron-Wendat, the Seneca, and the Mississaugas of the Credit First Nation. We recognize the abiding presence of diverse peoples including the First Nations, Inuit, and Métis peoples from throughout Turtle Island and are grateful for the opportunity to learn and assemble on this land. Historically, research has sought to exclude Indigenous peoples, conditions, and ways of knowing. Our conference understands the immense impact of inequity in research, and seeks to improve representation for affected groups. As we continue to work towards reconciliation, we hope to empower high school students to be advocates for Indigenous rights and knowledge. Simultaneously, we hope students learn to recognize inequity in research and feel driven to promote better practices. ',
  },
]

function parseContent(text) {
  if (!text) return [];
  const normalizedText = Array.isArray(text) ? text.join('\n') : String(text);
  const lines = normalizedText.split('\n');
  const blocks = [];
  let currentParagraph = [];
  let currentList = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join('\n').trim();
      if (content) {
        blocks.push({ type: 'paragraph', content });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: 'list', items: [...currentList] });
      currentList = [];
    }
  };

  for (const line of lines) {
    const bulletMatch = line.match(/^\s*[-*•–]\s*(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      currentList.push(bulletMatch[1]);
    } else if (currentList.length > 0 && line.match(/^\s{2,}\S/)) {
      currentList[currentList.length - 1] += ' ' + line.trim();
    } else {
      flushList();
      currentParagraph.push(line);
    }
  }

  flushParagraph();
  flushList();

  return blocks;
}

const About = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);
  const shouldReduceMotion = useReducedMotion();
  const blocks = useMemo(() => parseContent(activeSection.text), [activeSection.text]);

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
                  <span
                    className={cx(
                      'box-border-flow',
                      isSelected && 'box-border-flow--active'
                    )}
                    aria-hidden="true"
                  />
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
                {blocks.map((block, idx) => {
                  if (block.type === 'list') {
                    return (
                      <ul key={idx} className={cx('detail-list')}>
                        {block.items.map((item, itemIdx) => (
                          <li key={itemIdx} className={cx('detail-list-item')}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className={cx('detail-text')}>
                      {block.content}
                    </p>
                  );
                })}
                {Array.isArray(activeSection.bullets) && activeSection.bullets.length > 0 && (
                  <ul className={cx('detail-list')}>
                    {activeSection.bullets.map((bullet, idx) => (
                      <li key={idx} className={cx('detail-list-item')}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </article>
        </div>
      </div>
    </main>
  );
};

export default About;
