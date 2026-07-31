import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./Team.css";

const TEAM = [
    {
        id: "executive",
        name: "Executive Leadership",
        blurb: "Empty",
        members: [
            { name: "Kristin Zérczi", role: "Co-Founder & Director" },
            { name: "Elisha Yao", role: "Co-Founder & Director" },
        ],
    },
    {
        id: "ops",
        name: "Operations & Logistics",
        blurb: "Empty",
        members: [
            { name: "Marie Curie", role: "Radioactivity Pioneer" },
            { name: "Albert Einstein", role: "Relativity Theory" },
            { name: "Isaac Newton", role: "Classical Mechanics" },
            { name: "Rosalind Franklin", role: "DNA Crystallography" },
            { name: "Jane Goodall", role: "Chimpanzee Research" },
        ],
    },
    {
        id: "outreach",
        name: "Outreach",
        blurb: "Empty",
        members: [
            { name: "Charles Darwin", role: "Evolution Theory" },
            { name: "Nikola Tesla", role: "Alternating Current" },
            { name: "Ada Lovelace", role: "Computer Programming" },
            { name: "Katherine Johnson", role: "Orbital Mathematics" },
            { name: "Alan Turing", role: "Computing Theory" },
            { name: "Richard Feynman", role: "Quantum Electrodynamics" },
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

function Seal({ name, tint, size = 88 }) {
  const { nodes, edges, center } = useMemo(
    () => buildSeal(name, size),
    [name, size]
  );

  return (
    <svg
      className="team-seal"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <circle
        className="team-seal-field"
        cx={center}
        cy={center}
        r={size * 0.44}
      />
      <circle
        className="team-seal-ring"
        cx={center}
        cy={center}
        r={size * 0.46}
      />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          className="team-seal-edge"
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
          className="team-seal-node"
          cx={n.x}
          cy={n.y}
          r={size * 0.028}
          style={{ fill: tint }}
        />
      ))}
    </svg>
  );
}

function PersonCard({ name, role, tint, index }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      className="team-person-card"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
    >
      <Seal name={name} tint={tint} />
      <p className="team-person-name">{name}</p>
      <p className="team-person-role">{role}</p>
    </motion.li>
  );
}

function DepartmentSection({ department, tint }) {
  //const count = department.members.length;

  return (
    <section className="team-department" aria-labelledby={`dept-${department.id}`}>
      <div className="team-department-header">
        <h2
          id={`dept-${department.id}`}
          className="team-department-name"
          style={{ "--dept-tint": tint }}
        >
          {department.name}
        </h2>
        {/* <p className="team-department-blurb">{department.blurb}</p> */}{/*Unecessary, can keep if the team wants*/}
      </div>

      <ul className="team-person-grid">
        {department.members.map((member, i) => (
          <PersonCard
            key={member.name}
            name={member.name}
            role={member.role}
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
    <div className="team-page">
      <header className="team-hero">
        <p className="team-eyebrow">The team making it possible</p>
      </header>

      <main className="team-body">
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