import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react"
import { SiInstagram, SiTiktok } from "@icons-pack/react-simple-icons";
import "./Footer.css";

const NAV_LINKS = [
  { label: "About AERA", href: "about" },
  { label: "Our Team", href: "team" },
  { label: "Contact Us", href: "under_construction" },
  { label: "Register Now!", href: "under_construction" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/aera.toronto/", Icon: SiInstagram },
  { label: "TikTok", href: "https://www.tiktok.com/@aera.toronto", Icon: SiTiktok },
];

export default function Footer({ logoSrc }) {
  return (
    <footer className="aera-footer">
        <div className="aera-footer__container">
            <motion.div
                className="aera-footer__index-line-1"   
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 2.5, ease: [0.25, 1, 0.3, 1] }}
            />

            <div className="aera-footer__top">
                <div className="aera-footer__brand-logo">
                {logoSrc ? <img src={logoSrc} alt="AERA logo" /> : <span>AERA logo</span>}
                </div>

                <div>
                    {/* <p className="aera-footer__heading aera-footer__heading--inline">Jump To:</p> */}
                    <ul className="aera-footer__nav-grid">
                        {NAV_LINKS.map((link) => (
                        <li key={link.label}>
                            <a className="aera-footer__nav-link" href={link.href}>
                            {link.label}
                            </a>
                        </li>
                        ))}
                    </ul>
                </div>

                <div className="aera-footer__contact-social">
                    <div className="aera-footer__inline-row">
                        <span className="aera-footer__heading aera-footer__heading--inline">Contact</span>
                        <a className="aera-footer__contact-email" href="mailto:aera.toronto@gmail.com">
                            <Mail size={15} strokeWidth={1.75} />
                            aera.toronto@gmail.com
                        </a>
                    </div>

                    <div className="aera-footer__inline-row">
                        <span className="aera-footer__heading aera-footer__heading--inline">Follow Us</span>
                        <div className="aera-footer__socials">
                            {SOCIALS.map(({ label, href, Icon }) => (
                            <a
                                key={label}
                                className="aera-footer__social-icon"
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                            >
                                <Icon size={14} strokeWidth={1.75} />
                            </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <motion.div
                className="aera-footer__index-line-2"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="aera-footer__bottom">
                <span className="aera-footer__copyright">
                    <strong>Advancing Equity in Research Assembly (AERA)</strong> &copy; {new Date().getFullYear()}. All rights reserved.
                </span>
            </div>
        </div>
    </footer>
  );
}