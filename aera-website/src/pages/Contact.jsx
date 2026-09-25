import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { SiInstagram, SiTiktok } from '@icons-pack/react-simple-icons';
import styles from './Contact.module.css';

const cx = (...classNames) => classNames.map((className) => styles[className]).filter(Boolean).join(' ');

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
    <svg className={cx('node-network')} viewBox="-80 0 920 180" aria-hidden="true">
      <g className={cx('network-links')}>
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
      <g className={cx('network-nodes')}>
        {network.nodes.map(([x, y], index) => (
          <circle
            className={index === activeNode ? cx('is-lit') : undefined}
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={index === activeNode ? 4.2 : 2.5}
          />
        ))}
      </g>
    </svg>
  );
}

const SOCIALS = [
  {
    name: 'Instagram',
    handle: '@aera.toronto',
    url: 'https://www.instagram.com/aera.toronto/',
    Icon: SiInstagram,
  },
  {
    name: 'TikTok',
    handle: '@aera.toronto',
    url: 'https://www.tiktok.com/@aera.toronto',
    Icon: SiTiktok,
  },
];

export default function Contact() {
  const [pulse, setPulse] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setPulse((current) => current + 1), 950);
    return () => window.clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('aera.toronto@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  return (
    <main className={cx('contact-page')}>
      <div className={cx('network', 'network--top')} aria-hidden="true">
        <NodeNetwork network={topNetwork} activeNode={topNetwork.traversal[pulse % topNetwork.traversal.length]} />
      </div>

      <section className={cx('contact-content')} aria-labelledby="contact-heading">
        <h1 id="contact-heading" className={cx('title')}>Get in touch!</h1>
        <p className={cx('intro')}>
          Have questions about the conference, registration, or topic guidelines? Send us an e-mail or a message.
        </p>

        <div className={cx('contact-card')}>
          <div className={cx('email-section')}>
            <a
              href="mailto:aera.toronto@gmail.com"
              className={cx('email-link')}
              aria-label="Send email to aera.toronto@gmail.com"
            >
              aera.toronto@gmail.com
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={cx('copy-btn', copied && 'copy-btn--copied')}
              aria-label={copied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <div className={cx('divider')} aria-hidden="true" />

          <div className={cx('social-section')}>
            <h2 className={cx('social-title')}>Follow us:</h2>
            <div className={cx('social-grid')}>
              {SOCIALS.map(({ name, handle, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx('social-pill')}
                  aria-label={`${name} (${handle})`}
                >
                  <Icon size={16} />
                  <span className={cx('social-name')}>{name}</span>
                  <span className={cx('social-handle')}>{handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={cx('network', 'network--bottom')} aria-hidden="true">
        <NodeNetwork network={bottomNetwork} activeNode={bottomNetwork.traversal[pulse % bottomNetwork.traversal.length]} />
      </div>
    </main>
  );
}
