import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Team.module.css";

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(" ");

// Optional `image` property can be added to any member object (e.g., image: "/path/to/photo.jpg" or imported asset).
// If omitted or if loading fails, it automatically falls back to the procedural gen.
const TEAM = [
    {
      id: "executive",
      name: "Presidents",
      blurb: "Empty",
      members: [
          { name: "Kristin Zérczi", role: "Co-President", image: "/team/kristin.jpg" },
          { name: "Elisha Yao", role: "Co-President", image: "/team/elisha.jpg" },
      ],
    },
    {
      id: "marketing",
      name: "Marketing",
      blurb: "Empty",
      members: [
          { name: "Erin Cha", role: "Content Creation", image: "/team/erin.jpg" },
          { name: "Maya Cannedy-Azim", role: "Content Creation", image: "/team/maya.jpg" },
          { name: "Victoria Wang", role: "Content Creation", image: "/team/victoria.jpg" },
          { name: "Lindsay Harrison", role: "Content Creation", image: "/team/lindsay.jpg" },
      
      ],
    },
    {
      id: "logi",
      name: "Logistics & Outreach",
      blurb: "Empty",
      members: [
          { name: "Tiffany Zhang", role: "Vice President Logistics", image: "/team/tiffany.jpg" },
          { name: "Harrison Cazzin", role: "Vice President Web Dev", image: "/team/harry.jpg" },
          { name: "Stefan Petrescu", role: "Outreach", image: "/team/stefan.jpg" },
          { name: "Arya Zargarpourfardin", role: "Logistics", image: "/team/arya.jpg" },
      ],
    },
    {
      id: "hr",
      name: "Hiring Team",
      blurb: "Empty",
      members: [
          { name: "Sandra Guo", role: "Vice President Hiring", image: "/team/sandra.jpg" },
      ],
    },
];

const TINTS = [
  "var(--color-tint-3)",
];

// Fun way of having placeholder headshots by having a random config of lines and dots in the headshot profile based on a set seed
function hashSeed(str) {
  let h = 42;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildSeal(name, size) {
  const rand = mulberry32(hashSeed(name));
  const nodeCount = 5 + Math.floor(rand() * 3); // 5–7 nodes
  const center = size / 2;
  const radius = size * 0.34;

  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (i / nodeCount) * Math.PI * 2 + rand() * 0.4;
    const r = radius * (0.7 + rand() * 0.3);
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
    };
  });

  const edges = [];
  nodes.forEach((_, i) => {
    const connections = 1 + Math.floor(rand() * 2); // 1–2 links out
    for (let c = 0; c < connections; c++) {
      const j = Math.floor(rand() * nodeCount);
      if (j !== i) edges.push([i, j]);
    }
  });

  return { nodes, edges, center };
}

function Seal({ name, tint, size = 100 }) {
  const { nodes, edges, center } = useMemo(
    () => buildSeal(name, size),
    [name, size]
  );

  return (
    <svg
      className={cx("team-seal")}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <circle
        className={cx("team-seal-field")}
        cx={center}
        cy={center}
        r={size * 0.49}
      />
      <circle
        className={cx("team-seal-ring")}
        cx={center}
        cy={center}
        r={size * 0.49}
      />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          className={cx("team-seal-edge")}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          style={{ stroke: tint }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          className={cx("team-seal-node")}
          cx={n.x}
          cy={n.y}
          r={size * 0.028}
          style={{ fill: tint }}
        />
      ))}
    </svg>
  );
}

function MemberPhoto({ name, image, tint, size = 100 }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!image || failedSrc === image) {
    return <Seal name={name} tint={tint} size={size} />;
  }

  return (
    <div className={cx("team-photo-wrapper")} style={{ width: size, height: size }}>
      <img
        src={image}
        alt={name}
        className={cx("team-photo")}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailedSrc(image)}
      />
    </div>
  );
}

function PersonCard({ name, role, image, tint, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      className={cx("team-person-card")}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
    >
      <MemberPhoto name={name} image={image} tint={tint} />
      <p className={cx("team-person-name")}>{name}</p>
      <p className={cx("team-person-role")}>{role}</p>
    </motion.li>
  );
}

function DepartmentSection({ department, tint }) {
  //const count = department.members.length;

  return (
    <section className={cx("team-department")} aria-labelledby={`dept-${department.id}`}>
      <div className={cx("team-department-header")}>
        <h2
          id={`dept-${department.id}`}
          className={cx("team-department-name")}
          style={{ "--dept-tint": tint }}
        >
          {department.name}
        </h2>
        {/* <p className="team-department-blurb">{department.blurb}</p> */}{/*Unecessary, can keep if the team wants*/}
      </div>

      <ul className={cx("team-person-grid")}>
        {department.members.map((member, i) => (
          <PersonCard
            key={member.name}
            name={member.name}
            role={member.role}
            image={member.image}
            tint={tint}
            index={i}
          />
        ))}
      </ul>
    </section>
  );
}

export default function TeamPage() {
  return (
    <div className={cx("team-page")}>
      <header className={cx("team-hero")}>
        <p className={cx("team-eyebrow")}>The team making it possible</p>
      </header>

      <main className={cx("team-body")}>
        {TEAM.map((department, i) => (
          <DepartmentSection
            key={department.id}
            department={department}
            tint={TINTS[i % TINTS.length]}
          />
        ))}
      </main>
    </div>
  );
}
