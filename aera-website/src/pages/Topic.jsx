import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Topic.module.css";

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(" ");

//every entry = 1 paragraph
const PROMPT_PARAGRAPHS = [
    "We will share the prompt one month before the research competition begins to give everyone a fair chance at building something incredible!",
    "Check back soon! Good luck and thank you :)"
];

export default function TopicPage() {
  const stageRef = useRef(null);

  // scrollYProgress runs 0 -> 1 across the full pinned scroll distance
  // defined by .stage-wrapper's height in the CSS.
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  //Hero: stays put, then dims/blurs as the panel scales in ---
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 1, 0.2]);
  const heroBlurPx = useTransform(scrollYProgress, [0, 0.15, 0.4], [0, 0, 10]);
  const heroFilter = useTransform(heroBlurPx, (v) => `blur(${v}px)`);

  //"Scroll for more info" cue: fades almost immediately on scroll
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  
  /*
  Text panel: scales from a small centered card to fullscreen,
  holds while the reader scrolls through the paragraphs, then
  fades slightly as the next section takes over. Scrolling back
  up reverses all of this automatically since it's driven
  directly by scrollYProgress.
  */
  const panelScale = useTransform(
    scrollYProgress,
    [0.12, 0.42, 0.86, 1],
    [0.3, 1, 1, 0.95]
  );
  const panelRadius = useTransform(scrollYProgress, [0.12, 0.42], [28, 0]);
  const panelOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.86, 1],
    [0, 1, 1, 0]
  );

  return (
    <div className={cx("topic-page")}>
      <div className={cx("stage-wrapper")} ref={stageRef}>
        <div className={cx("stage")}>
          <motion.div
            className={cx("hero")}
            style={{ opacity: heroOpacity, filter: heroFilter }}
          >
            <p className={cx("hero-eyebrow")}>This year's research topic...</p>
            <h1 className={cx("hero-title")}>Stay Tuned...</h1>
            <motion.div className={cx("scroll-cue-wrapper")}>
                <div className={cx("scroll-cue")}>
                    <span>Scroll for more info</span>
                    <span className={cx("scroll-cue-arrow")} aria-hidden="true" />
                </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={cx("text-panel")}
            style={{
              scale: panelScale,
              borderRadius: panelRadius,
              opacity: panelOpacity,
            }}
          >
            <div className={cx("text-panel-inner")}>
              <p className={cx("text-panel-eyebrow")}>The Prompt</p>
              {PROMPT_PARAGRAPHS.map((paragraph, i) => (
                <p key={i} className={cx("text-panel-paragraph")}>
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
