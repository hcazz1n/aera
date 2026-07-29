import { useEffect, useState } from 'react';
import './UnderConstruction.css';

const topNetwork = {
  nodes: [
    [-62, 122], [2, 108], [63, 122], [124, 96], [186, 109], [248, 76], [311, 95],
    [374, 64], [438, 83], [502, 49], [566, 72], [629, 37], [692, 58], [754, 25], [816, 46],
    [187, 151], [374, 125], [566, 106], [754, 83],
  ],
  links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [3, 15], [7, 16], [10, 17], [13, 18]],
  traversal: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
};

const bottomNetwork = {
  nodes: [
    [-50, 126], [14, 99], [77, 118], [140, 85], [202, 104], [266, 70], [330, 91],
    [393, 57], [457, 80], [521, 44], [584, 67], [648, 30], [710, 53], [772, 17], [836, 43],
    [140, 52], [393, 110], [584, 110], [772, 78],
  ],
  links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [3, 15], [7, 16], [10, 17], [13, 18]],
  traversal: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
};

function NodeNetwork({ network, activeNode }) {
  return (
    <svg className="node-network" viewBox="-80 0 920 180" aria-hidden="true">
      <g className="network-links">
        {network.links.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={network.nodes[from][0]}
            y1={network.nodes[from][1]}
            x2={network.nodes[to][0]}
            y2={network.nodes[to][1]}
          />
        ))}
      </g>
      <g className="network-nodes">
        {network.nodes.map(([cx, cy], index) => (
          <circle
            className={index === activeNode ? 'is-lit' : ''}
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={index === activeNode ? 4.2 : 2.5}
          />
        ))}
      </g>
    </svg>
  );
}

export default function UnderConstruction() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setPulse((current) => current + 1), 950);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="construction-page">
      <div className="grain" aria-hidden="true"/>
      <div className="network network--top" aria-hidden="true">
        <NodeNetwork network={topNetwork} activeNode={topNetwork.traversal[pulse % topNetwork.traversal.length]} />
      </div>

      <section className="construction-content" aria-labelledby="construction-title">
        <p className="eyebrow">AERA: Advancing Equity in Research Assembly</p>
        <p className="intro">This page is currently under construction. Thank you for your patience. Check back soon!</p>
      </section>

      <div className="network network--bottom" aria-hidden="true">
        <NodeNetwork network={bottomNetwork} activeNode={bottomNetwork.traversal[pulse % bottomNetwork.traversal.length]} />
      </div>
      <p className="corner-note">Toronto, Canada<br/>Est. 2025</p>
    </main>
  );
}
