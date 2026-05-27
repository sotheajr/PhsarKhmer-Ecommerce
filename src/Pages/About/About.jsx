import React, { useState } from "react";
import { useTranslation } from "../../context/LanguageContext";
import "./About.css";

const team = [
  {
    name: "Royal Hooper",
    role: "CEO / Founder",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Matilda Shelton",
    role: "Head of Product",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Tony Manning",
    role: "Lead Engineer",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Jennifer Davis",
    role: "Operations Manager",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Tommie Harvey",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Christi Hampton",
    role: "Marketing Strategist",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function AboutPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);

  const faqsLocalized = [
    { q: t("aboutPage.faq1.q"), a: t("aboutPage.faq1.a") },
    { q: t("aboutPage.faq2.q"), a: t("aboutPage.faq2.a") },
    { q: t("aboutPage.faq3.q"), a: t("aboutPage.faq3.a") },
    { q: t("aboutPage.faq4.q"), a: t("aboutPage.faq4.a") },
  ];

  return (
    <div className="container">
      {/* ===== HERO ===== */}
      <section className="about-top">
        <h1>{t("aboutPage.heroTitle")}</h1>
        <p className="subtitle">{t("aboutPage.heroSubtitle")}</p>

        {/* រូបភាពកំពូលរៀបជា Grid ស្អាតលើ Mobile */}
        <div className="top-images">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
            alt="Hero 1"
          />
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
            alt="Hero 2"
          />
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
            alt="Hero 3"
          />
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
            alt="Hero 4"
          />
        </div>

        <p className="desc-center">{t("aboutPage.heroDesc")}</p>

        <div className="stats-box">
          <div>
            <h3>25</h3>
            <p>Awards</p>
          </div>
          <div>
            <h3>100+</h3>
            <p>Partners</p>
          </div>
          <div>
            <h3>~500</h3>
            <p>Patents</p>
          </div>
          <div>
            <h3>3,000</h3>
            <p>Customers</p>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION ===== */}
      <section className="solution">
        <div className="solution-left">
          <span className="tag">{t("aboutPage.solutionTag")}</span>
          <h2>{t("aboutPage.solutionTitle")}</h2>
          <p>{t("aboutPage.solutionCopy")}</p>
          <ul>
            <li>{t("aboutPage.solutionBullet1")}</li>
            <li>{t("aboutPage.solutionBullet2")}</li>
          </ul>
        </div>
        <div className="solution-right">
          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c"
            alt="Solution"
          />
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="team">
        <h2>{t("aboutPage.teamTitle")}</h2>
        <div className="team-grid">
          {team.map((m, i) => (
            <div className="card" key={i}>
              <img src={m.img} alt={m.name} />
              <h4>{m.name}</h4>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq">
        <h2>{t("aboutPage.faqTitle")}</h2>
        {faqsLocalized.map((f, i) => (
          <div className="faq-item" key={i}>
            <div className="q" onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <span>{open === i ? "-" : "+"}</span>
            </div>
            {open === i && <div className="a">{f.a}</div>}
          </div>
        ))}
      </section>
    </div>
  );
}
