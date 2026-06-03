import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#070810",
  surface: "#0d1017",
  card: "#111520",
  border: "rgba(255,255,255,0.06)",
  accent: "#00d9a3",
  accent2: "#7c6aff",
  accent3: "#ff6b6b",
  text: "#eef2ff",
  muted: "#6b7a99",
};

const data = {
  name: "Sathyaprakash S",
  title: "Computer Science Engineer",
  tagline: "Building intelligent systems — from Java game engines to SQL-whispering AI.",
  email: "sathyaprakash0607@gmail.com",
  phone: "+91 9566612931",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  leetcode: "https://leetcode.com",
  cgpa: "8.109",
  skills: [
    { label: "Languages", icon: "⌨", items: ["Java", "C#", "Python"] },
    { label: "Web Tech", icon: "🌐", items: ["HTML", "CSS", "JavaScript"] },
    { label: "Tools", icon: "🛠", items: ["Git", "GitHub", "MySQL"] },
    { label: "Domains", icon: "🧠", items: ["DBMS", "DSA", "Cloud Computing", "Machine Learning"] },
  ],
  projects: [
    {
      name: "Query Whisper",
      tech: "Python · MySQL",
      desc: "Turns natural language into SQL instantly and displays results through a clean web interface — bridging plain English and databases.",
      color: "#00d9a3",
      icon: "🔮",
    },
    {
      name: "Home Verse",
      tech: "HTML · CSS · JS",
      desc: "A responsive real-estate themed frontend website focused on UX and modern web design principles.",
      color: "#7c6aff",
      icon: "🏠",
    }
  ],
  internships: [
    {
      company: "Novitech Private Limited",
      role: "AI Intern",
      duration: "1 Month",
      desc: "Hands-on experience in machine learning, data analysis, and real-world AI application development.",
    },
    {
      company: "Crescent Infotech",
      role: "Java Intern",
      duration: "1 Month",
      desc: "Developed Java programs applying core OOP, loops, and exception handling in a professional setting.",
    },
  ],
  education: [
    { school: "VSB Engineering College, Karur", degree: "B.E Computer Science Engineering", year: "2022 – 2026", score: "CGPA 8.109" },
    { school: "Govt. Boys HSS, Sivagiri", degree: "HSC (Class XII)", year: "2022", score: "80.16%" },
    { school: "Govt. Boys HSS, Sivagiri", degree: "SSLC (Class X)", year: "2020", score: "84%" },
  ],
  certs: [
    { name: "Cloud Computing", issuer: "Infosys SpringBoard", icon: "☁️" },
    { name: "Java Foundation", issuer: "Oracle", icon: "☕" },
    { name: "Cloud Computing Workshop", issuer: "AWS", icon: "🏛" },
  ],
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ${delay}s ease, transform 0.65s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.accent, marginBottom: "0.4rem" }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, marginBottom: "2.5rem", color: COLORS.text, fontWeight: 700 }}>
      {children}
    </h2>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{
      fontSize: "0.72rem", fontWeight: 600, padding: "3px 11px",
      borderRadius: 100, border: `1px solid ${color || COLORS.border}`,
      color: color || COLORS.muted, background: color ? `${color}12` : "rgba(255,255,255,0.04)",
      letterSpacing: "0.03em",
    }}>{children}</span>
  );
}

function Nav({ active }) {
  const links = ["about", "skills", "projects", "experience", "education", "contact"];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0.9rem 2.5rem",
      background: scrolled ? "rgba(7,8,16,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
      transition: "all 0.3s",
    }}>
      <a href="#hero" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: COLORS.accent, textDecoration: "none", fontWeight: 700, fontStyle: "italic" }}>
        S.
      </a>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l}`} style={{
              color: active === l ? COLORS.accent : COLORS.muted,
              textDecoration: "none", fontSize: "0.8rem", fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}>{l}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 80); return () => clearInterval(t); }, []);

  const roles = ["Java Developer", "AI Enthusiast", "Cloud Explorer", "Problem Solver"];
  const roleIndex = Math.floor(tick / 30) % roles.length;
  const charCount = tick % 30;
  const displayed = roles[roleIndex].slice(0, charCount);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "6rem 2rem 4rem" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent}18 0%, transparent 70%)`, animation: "float1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "8%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent2}18 0%, transparent 70%)`, animation: "float2 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "50%", right: "25%", width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent3}12 0%, transparent 70%)`, animation: "float1 12s ease-in-out infinite reverse" }} />
      </div>

      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 760 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1.5rem",
          background: `${COLORS.accent}15`, border: `1px solid ${COLORS.accent}35`,
          color: COLORS.accent, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em",
          textTransform: "uppercase", padding: "5px 16px", borderRadius: 100,
          animation: "fadeUp 0.6s ease both",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent, display: "inline-block", animation: "pulse 2s infinite" }} />
          Open to opportunities
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem,8vw,6.5rem)",
          fontWeight: 700, lineHeight: 1.0,
          marginBottom: "0.5rem",
          animation: "fadeUp 0.6s 0.1s ease both",
          opacity: 0, animationFillMode: "forwards",
          background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.muted} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Sathyaprakash
          <span style={{ display: "block", fontStyle: "italic", color: COLORS.accent, WebkitTextFillColor: COLORS.accent }}>S.</span>
        </h1>

        <div style={{ height: 36, marginBottom: "1.25rem", animation: "fadeUp 0.6s 0.2s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <span style={{ fontSize: "1.2rem", color: COLORS.accent2, fontWeight: 500, fontFamily: "monospace" }}>
            {displayed}<span style={{ animation: "blink 1s infinite" }}>|</span>
          </span>
        </div>

        <p style={{
          fontSize: "1.05rem", color: COLORS.muted, maxWidth: 520, margin: "0 auto 2.5rem",
          lineHeight: 1.7, animation: "fadeUp 0.6s 0.3s ease both", opacity: 0, animationFillMode: "forwards",
        }}>
          {data.tagline}
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.6s 0.4s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <a href="#projects" style={{
            padding: "0.8rem 2rem", borderRadius: 10, background: COLORS.accent, color: "#070810",
            fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", letterSpacing: "0.02em",
            transition: "all 0.2s",
          }}>View My Work →</a>
          <a href="#contact" style={{
            padding: "0.8rem 2rem", borderRadius: 10, background: "transparent",
            border: `1px solid ${COLORS.border}`, color: COLORS.text,
            fontWeight: 500, fontSize: "0.9rem", textDecoration: "none",
            transition: "all 0.2s",
          }}>Get in Touch</a>
        </div>

        <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap", animation: "fadeUp 0.6s 0.5s ease both", opacity: 0, animationFillMode: "forwards" }}>
          {[["8.109", "CGPA"], ["3+", "Projects"], ["2", "Internships"], ["3", "Certifications"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 700, color: COLORS.accent, fontFamily: "'Playfair Display', serif" }}>{val}</div>
              <div style={{ fontSize: "0.72rem", color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(25px) scale(0.95)} }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'Outfit', system-ui, sans-serif; }
        a:hover { opacity: 0.85; }
        section { padding: 5.5rem 2rem; }
        .container { max-width: 980px; margin: 0 auto; }
      `}</style>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="container">
        <Reveal>
          <SectionLabel>About Me</SectionLabel>
          <SectionTitle>The Mind Behind the Code</SectionTitle>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}>
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "I'm a final-year Computer Science Engineering student at VSB Engineering College, Karur — graduating in 2026 with a CGPA of 8.109.",
                "My journey spans Java internships, AI research at Novitech, and building projects that blend logic with real-world impact — from game engines to NLP-powered SQL tools.",
                "I'm drawn to the intersection of databases, algorithms, and cloud systems. I believe elegant software isn't just about working code — it's about thoughtful design.",
              ].map((p, i) => (
                <p key={i} style={{ color: COLORS.muted, fontSize: "0.95rem", lineHeight: 1.8 }}>{p}</p>
              ))}
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                {[["linkedin.com", data.linkedin, COLORS.accent2], ["github.com", data.github, COLORS.accent], ["leetcode.com", data.leetcode, COLORS.accent3]].map(([label, href, color]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                    fontSize: "0.8rem", fontWeight: 600, color, textDecoration: "none",
                    padding: "5px 14px", borderRadius: 8, border: `1px solid ${color}35`, background: `${color}10`,
                    transition: "all 0.2s",
                  }}>{label} ↗</a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
              {[
                ["📧", "Email", data.email],
                ["📱", "Phone", data.phone],
                ["🎓", "College", "VSB Engineering College"],
                ["📍", "Location", "Karur, Tamil Nadu"],
                ["🏆", "CGPA", data.cgpa],
                ["💡", "Interests", "DBMS · DSA · Cloud"],
              ].map(([icon, label, val], i) => (
                <div key={label} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "0.9rem 1.25rem",
                  borderBottom: i < 5 ? `1px solid ${COLORS.border}` : "none",
                }}>
                  <span style={{ fontSize: "1rem", width: 24, textAlign: "center" }}>{icon}</span>
                  <span style={{ fontSize: "0.75rem", color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.07em", minWidth: 70 }}>{label}</span>
                  <span style={{ fontSize: "0.875rem", color: COLORS.text, fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <Reveal><SectionLabel>Skills</SectionLabel><SectionTitle>Tools of the Trade</SectionTitle></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
          {data.skills.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16,
                padding: "1.5rem", transition: "all 0.25s", cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${COLORS.accent}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.75rem", color: COLORS.text }}>{s.label}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map(item => <Tag key={item} color={COLORS.accent}>{item}</Tag>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="container">
        <Reveal><SectionLabel>Projects</SectionLabel><SectionTitle>Things I've Built</SectionTitle></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
          {data.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 18,
                padding: "2rem", display: "flex", flexDirection: "column", gap: "0.85rem",
                transition: "all 0.25s", cursor: "default", position: "relative", overflow: "hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${p.color}50`; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ position: "absolute", top: -30, right: -20, fontSize: "5rem", opacity: 0.07, pointerEvents: "none" }}>{p.icon}</div>
                <div style={{ fontSize: "2rem" }}>{p.icon}</div>
                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: p.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.tech}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: COLORS.text, lineHeight: 1.2, fontWeight: 700 }}>{p.name}</div>
                <p style={{ fontSize: "0.875rem", color: COLORS.muted, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${p.color}, transparent)`, marginTop: "0.5rem" }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience">
      <div className="container">
        <Reveal><SectionLabel>Experience</SectionLabel><SectionTitle>Where I've Learned</SectionTitle></Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {data.internships.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14,
                padding: "1.5rem 2rem", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "1.25rem",
                alignItems: "center", transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${COLORS.accent}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${COLORS.accent}15`, border: `1px solid ${COLORS.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                  {i === 0 ? "🤖" : "☕"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: COLORS.text }}>{exp.company}</div>
                  <div style={{ fontSize: "0.82rem", color: COLORS.accent, fontWeight: 600, margin: "2px 0 6px" }}>{exp.role}</div>
                  <div style={{ fontSize: "0.85rem", color: COLORS.muted }}>{exp.desc}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.75rem", color: COLORS.muted, background: COLORS.surface, border: `1px solid ${COLORS.border}`, padding: "4px 12px", borderRadius: 100, whiteSpace: "nowrap" }}>
                    {exp.duration}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
      <div className="container">
        <Reveal><SectionLabel>Education</SectionLabel><SectionTitle>Academic Background</SectionTitle></Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {data.education.map((edu, i) => (
            <Reveal key={edu.school + i} delay={i * 0.08}>
              <div style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14,
                padding: "1.25rem 1.75rem", display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: "0.75rem",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${COLORS.accent2}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.975rem", color: COLORS.text }}>{edu.school}</div>
                  <div style={{ fontSize: "0.82rem", color: COLORS.muted, marginTop: 3 }}>{edu.degree} &nbsp;·&nbsp; {edu.year}</div>
                </div>
                <span style={{
                  fontSize: "0.85rem", fontWeight: 700, color: COLORS.accent,
                  background: `${COLORS.accent}12`, border: `1px solid ${COLORS.accent}30`,
                  padding: "5px 14px", borderRadius: 100,
                }}>{edu.score}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: "3.5rem" }}>
          <Reveal><SectionLabel>Certifications</SectionLabel><SectionTitle>Credentials</SectionTitle></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
            {data.certs.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <div style={{
                  background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12,
                  padding: "1.1rem 1.25rem", display: "flex", alignItems: "flex-start", gap: 12,
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${COLORS.accent}40`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "none"; }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: COLORS.text }}>{c.name}</div>
                    <div style={{ fontSize: "0.75rem", color: COLORS.accent, marginTop: 2 }}>{c.issuer}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section id="resume">
      <div className="container">
        <Reveal>
          <SectionLabel>Resume</SectionLabel>
          <SectionTitle>My Full Resume</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 20,
            padding: "3rem", textAlign: "center",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📄</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", marginBottom: "0.75rem", color: COLORS.text }}>Sathyaprakash S</h3>
            <p style={{ color: COLORS.muted, marginBottom: "0.5rem", fontSize: "0.9rem" }}>B.E Computer Science Engineering · VSB Engineering College, Karur</p>
            <p style={{ color: COLORS.muted, marginBottom: "2rem", fontSize: "0.875rem" }}>CGPA: 8.109 &nbsp;·&nbsp; {data.email} &nbsp;·&nbsp; {data.phone}</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "2.5rem", textAlign: "left" }}>
              {[
                { title: "Skills", items: ["Java", "Python", "C#", "HTML/CSS", "MySQL", "Git"] },
                { title: "Experience", items: ["AI Intern — Novitech", "Java Intern — Crescent Infotech"] },
                { title: "Projects", items: ["Query Whisper", "Home Verse", "Snake Game"] },
              ].map(col => (
                <div key={col.title} style={{ background: COLORS.surface, borderRadius: 12, padding: "1.1rem 1.25rem", border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: COLORS.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.6rem" }}>{col.title}</div>
                  {col.items.map(it => (
                    <div key={it} style={{ fontSize: "0.82rem", color: COLORS.muted, padding: "2px 0" }}>· {it}</div>
                  ))}
                </div>
              ))}
            </div>

            <a
              href="/SATHYAPRAKASH_S_RESUME__1_.pdf"
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "0.85rem 2.25rem", borderRadius: 10,
                background: COLORS.accent, color: "#070810",
                fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                transition: "all 0.2s", letterSpacing: "0.02em",
              }}
            >
              ⬇ Download Full Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.border}` }}>
      <div className="container">
        <Reveal><SectionLabel>Contact</SectionLabel><SectionTitle>Let's Connect</SectionTitle></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
          <Reveal delay={0.1}>
            <div>
              <p style={{ color: COLORS.muted, fontSize: "1rem", lineHeight: 1.8, marginBottom: "1rem" }}>
                I'm actively looking for internships, full-time roles, and exciting collaborations. Whether you have a project in mind or just want to talk tech — I'm all ears.
              </p>
              <p style={{ color: COLORS.muted, fontSize: "0.9rem", lineHeight: 1.7 }}>
                Fast response guaranteed. Let's build something great together.
              </p>
              <a href={`mailto:${data.email}`} style={{
                display: "inline-flex", alignItems: "center", gap: 8, marginTop: "1.5rem",
                padding: "0.85rem 2rem", borderRadius: 10,
                background: COLORS.accent, color: "#070810",
                fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
              }}>✉ Send Email</a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {[
                { icon: "✉", label: "Email", val: data.email, href: `mailto:${data.email}` },
                { icon: "📱", label: "Phone", val: data.phone, href: `tel:${data.phone}` },
                { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/sathyaprakash", href: data.linkedin },
                { icon: "🐙", label: "GitHub", val: "github.com/sathyaprakash", href: data.github },
              ].map(link => (
                <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "0.9rem 1.25rem",
                  background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12,
                  textDecoration: "none", color: COLORS.text, transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${COLORS.accent}45`; e.currentTarget.style.transform = "translateX(5px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "none"; }}
                >
                  <span style={{ fontSize: "1.1rem", width: 28, textAlign: "center" }}>{link.icon}</span>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{link.label}</div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 500, color: COLORS.text }}>{link.val}</div>
                  </div>
                  <span style={{ marginLeft: "auto", color: COLORS.muted, fontSize: "0.8rem" }}>↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      textAlign: "center", padding: "2rem", borderTop: `1px solid ${COLORS.border}`,
      fontSize: "0.8rem", color: COLORS.muted,
    }}>
      © 2026 <span style={{ color: COLORS.accent, fontWeight: 600 }}>Sathyaprakash S</span> · All Rights Reserved
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Nav active={active} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <ResumeSection />
      <Contact />
      <Footer />
    </div>
  );
}
