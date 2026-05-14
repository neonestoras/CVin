import { useState, useEffect } from "react";
import {
  Newspaper, FileText, ClipboardList, User, Inbox, BarChart3, Star,
  PartyPopper, CheckCircle2, Award, Clock, Lock, Unlock, Target,
  Briefcase, TrendingUp, Handshake, Sparkles, X,
  Circle, ChevronRight, Users, Trophy, ArrowRight,
  Quote, Calendar,
  AlertTriangle, Zap
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

/* ═══════════════════════════════════════════════════════════════
   COLOR SYSTEM — Olive Green Base (warm, organic, earthy)
   ═══════════════════════════════════════════════════════════════ */
const O = {
  900: "#2d3319", 700: "#4a5530", 600: "#5c6b3c",
  500: "#6b7f45", 300: "#a3b57a", 100: "#dde4cc", 50: "#f0f3e8",
  amber: "#d4920a", amberLt: "#fef3c7", amberBg: "#fffbeb",
  red: "#b91c1c", redBg: "#fef2f2",
  text: "#1c1f17", muted: "#6b7280", surface: "#f8f9f4", card: "#ffffff",
  border: "#dde4cc",
};

const heading = "'Newsreader', 'Georgia', serif";
const body = "'Outfit', 'Helvetica Neue', sans-serif";

/* ═══════════════════════════════════════════════════════════════
   SAMPLE DATA — Consistent across all 7 pages
   ═══════════════════════════════════════════════════════════════ */
const FEED = [
  { id: 1, type: "celebration", time: "2 hours ago", initials: "PS", color: "#7a5f3e",
    body: <><B>Priya Sharma</B> landed a Junior Data Analyst role at Deloitte! Reviewed by <B>Marcus Chen</B> and <B>Aisha Okafor</B>. Marcus's suggestions had 92% implementation rate — Impact Credits pending attribution.</> },
  { id: 2, type: "review", time: "5 hours ago", initials: "AO", color: O[600],
    body: <><B>Aisha Okafor</B> completed a review for <B>Tom Nguyen</B>'s CV targeting UX Design internships. 14 actionable suggestions provided, 3 marked high-priority.</> },
  { id: 3, type: "milestone", time: "1 day ago", initials: "MC", color: O[700],
    body: <><B>Marcus Chen</B> earned <Pill bg={O.amberLt} color={O.amber}><Trophy size={10}/> Senior Career Catalyst</Pill> — 22 youth assisted, 87% average implementation rate, 4 employment offers attributed.</> },
  { id: 4, type: "implementation", time: "1 day ago", initials: "LJ", color: "#3e5f7a",
    body: <><B>Lena Johansson</B> implemented 11 of 13 suggestions from her latest review (85%). New CV version uploaded — ready for final review.</>,
    progress: 85 },
  { id: 5, type: "mentorship", time: "2 days ago", initials: "RT", color: "#6b3e7a",
    body: <><B>Dr. Rebecca Torres</B> began an ongoing mentorship with <B>Kwame Asante</B> targeting management consulting roles. This is Rebecca's 8th active mentorship.</> },
  { id: 6, type: "transformation", time: "3 days ago", initials: "FA", color: "#5a6b3e",
    body: <>Before/after snapshot: <B>Fatima Al-Hassan</B>'s CV went from generic summary to impact-led positioning. Interview callback rate increased from 5% to 28% after implementing reviewer suggestions.</> },
];

const SUGGESTIONS = [
  { id: 1, cat: "Content", pri: "high", text: 'Replace generic summary with quantified impact: "Designed component library adopted by 12-person team, reducing UI development time by 30%. Conducted 15+ user research interviews informing 3 shipped features."', def: true },
  { id: 2, cat: "Strategy", pri: "high", text: "Move portfolio link to first line under name — for UX roles, this is the first thing hiring managers scan for. Currently buried below email.", def: true },
  { id: 3, cat: "Formatting", pri: "medium", text: 'Inconsistent date formatting (MM/YYYY vs. "Month YYYY"). Standardize to "Jan 2025 – Present" format throughout all entries.', def: false },
  { id: 4, cat: "Content", pri: "low", text: "Add a \"Tools & Methods\" subsection separating hard skills (Figma, prototyping) from soft skills (client management). UX hiring filters often search for specific tool proficiency.", def: true },
];

const CREDITS = [
  { date: "Feb 2026", event: "Employment — Deloitte", youth: "Priya Sharma", base: 200, mult: 1.84, reason: "92% impl. rate (2.0×) × depth bonus (1.5×) / base adj.", total: 368, locked: false },
  { date: "Jan 2026", event: "Interview — Google", youth: "Kwame Asante", base: 50, mult: 1.5, reason: "Review depth >500 words with examples", total: 75, locked: true, unlock: "Apr 2026" },
  { date: "Dec 2025", event: "Employment — Accenture", youth: "Lena Johansson", base: 200, mult: 2.0, reason: "Implementation rate ≥80%", total: 400, locked: false },
  { date: "Nov 2025", event: "Interview — McKinsey", youth: "Kwame Asante", base: 50, mult: 1.5, reason: "Industry expertise match (consulting)", total: 75, locked: false },
];

const CV_SCORE = [
  { version: "V1 (Oct)", score: 42 },
  { version: "V2 (Nov)", score: 71 },
  { version: "V3 (Dec)", score: 89 },
];

const ORG_DATA = [
  { month: "Jul", interviews: 8, offers: 2, placements: 1 },
  { month: "Aug", interviews: 12, offers: 4, placements: 3 },
  { month: "Sep", interviews: 18, offers: 6, placements: 4 },
  { month: "Oct", interviews: 24, offers: 9, placements: 7 },
  { month: "Nov", interviews: 31, offers: 12, placements: 9 },
  { month: "Dec", interviews: 38, offers: 16, placements: 12 },
];

/* ═══════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function B({ children }) {
  return <span style={{ fontWeight: 700, color: O[900] }}>{children}</span>;
}

function Pill({ children, bg, color: c, style: s }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      padding: "2px 9px", borderRadius: 99,
      background: bg || O[100], color: c || O[700],
      fontSize: 11, fontWeight: 600, fontFamily: body,
      letterSpacing: "0.01em", whiteSpace: "nowrap", ...s
    }}>
      {children}
    </span>
  );
}

function Av({ initials, color: c, size = 38 }) {
  return (
    <div style={{
      width: size, height: size, minWidth: size, borderRadius: "50%",
      background: c || O[600],
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontFamily: body,
      fontSize: size * 0.34, fontWeight: 700, letterSpacing: "-0.02em"
    }}>
      {initials}
    </div>
  );
}

function Card({ children, style: s, hover = false, glow, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      onClick={onClick}
      style={{
        background: O.card, borderRadius: 14,
        border: `1px solid ${O.border}`, padding: "18px 20px",
        transition: "all 0.2s ease",
        boxShadow: h && hover
          ? "0 8px 28px rgba(45,51,25,0.10)"
          : glow
            ? `0 0 20px ${O.amberLt}`
            : "0 1px 3px rgba(45,51,25,0.04)",
        transform: h && hover ? "translateY(-2px)" : "none",
        cursor: onClick ? "pointer" : undefined,
        ...s
      }}
    >
      {children}
    </div>
  );
}

function Lbl({ children, style: s }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.1em", color: O[600],
      marginBottom: 8, fontFamily: body, ...s
    }}>
      {children}
    </div>
  );
}

function PBar({ value, max, height = 8 }) {
  const pct = Math.round((value / max) * 100);
  const c = pct >= 80 ? O[600] : pct >= 60 ? O.amber : O.red;
  return (
    <div>
      <div style={{ width: "100%", height, borderRadius: 99, background: O[100], overflow: "hidden" }}>
        <div style={{
          width: `${pct}%`, height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, ${c}, ${c}dd)`,
          transition: "width 0.6s ease-out"
        }} />
      </div>
      <div style={{ fontSize: 12, color: O.muted, marginTop: 3, fontFamily: body, fontWeight: 500 }}>
        {value} of {max} ({pct}%)
      </div>
    </div>
  );
}

function PriDot({ pri }) {
  const c = { high: O.red, medium: O.amber, low: O[500] };
  return <span style={{ width: 7, height: 7, borderRadius: "50%", background: c[pri] || O.muted, display: "inline-block" }} />;
}

function AnimStat({ icon, value, label, trend, context, delay = 0 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      background: O.card, borderRadius: 14,
      border: `1px solid ${O.border}`,
      borderTop: `3px solid ${O[500]}`,
      padding: "16px 14px", flex: "1 1 140px", minWidth: 130,
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(14px)",
      transition: "all 0.45s ease"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, background: O[50],
          display: "flex", alignItems: "center", justifyContent: "center",
          color: O[600]
        }}>
          {icon}
        </div>
        {trend && (
          <span style={{
            marginLeft: "auto", fontSize: 10.5, fontWeight: 700,
            color: trend.includes("↑") || trend.includes("↓") ? O[600] : O.muted,
            fontFamily: body
          }}>
            {trend}
          </span>
        )}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: O[900], fontFamily: heading, lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ fontSize: 11.5, color: O.muted, marginTop: 3, fontFamily: body, fontWeight: 500 }}>
        {label}
      </div>
      {context && (
        <div style={{ fontSize: 10, color: O[300], marginTop: 2, fontFamily: body }}>
          {context}
        </div>
      )}
    </div>
  );
}

function ComplexDots({ level, max = 5 }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{
          width: 8, height: 8, borderRadius: "50%",
          background: i < level ? O[600] : O[100]
        }} />
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION TABS
   ═══════════════════════════════════════════════════════════════ */
const TABS = [
  { id: "feed", label: "Social Feed", icon: <Newspaper size={15} /> },
  { id: "review", label: "CV Review", icon: <FileText size={15} /> },
  { id: "progress", label: "My Progress", icon: <ClipboardList size={15} /> },
  { id: "portfolio", label: "Impact Portfolio", icon: <User size={15} /> },
  { id: "queue", label: "Review Queue", icon: <Inbox size={15} /> },
  { id: "org", label: "Org Dashboard", icon: <BarChart3 size={15} /> },
  { id: "showcase", label: "Showcase", icon: <Star size={15} /> },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE 1 — SOCIAL FEED
   ═══════════════════════════════════════════════════════════════ */
function PageFeed() {
  const [congrats, setCongrats] = useState({});
  const icons = {
    celebration: <PartyPopper size={14} color={O.amber} />,
    review: <FileText size={14} color={O[600]} />,
    milestone: <Award size={14} color={O.amber} />,
    implementation: <CheckCircle2 size={14} color={O[600]} />,
    mentorship: <Handshake size={14} color={O[600]} />,
    transformation: <Zap size={14} color={O[500]} />
  };

  return (
    <div>
      <Card style={{ marginBottom: 18, padding: "13px 18px", background: `linear-gradient(135deg, ${O[50]}, ${O[100]}55)` }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontFamily: body, fontSize: 13, fontWeight: 600, color: O[700] }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Target size={14} color={O[600]} />
            <strong style={{ fontSize: 17, fontFamily: heading }}>12</strong> Youth Placed
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <FileText size={14} color={O[600]} />
            <strong style={{ fontSize: 17, fontFamily: heading }}>47</strong> Reviews
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <TrendingUp size={14} color={O[600]} />
            <strong style={{ fontSize: 17, fontFamily: heading }}>89%</strong> Avg Implementation
          </span>
        </div>
        <div style={{ fontSize: 10.5, color: O.muted, marginTop: 4, fontFamily: body }}>This month's community activity</div>
      </Card>

      {FEED.map((item, idx) => (
        <div key={item.id} style={{ animation: `fadeUp 0.35s ease ${idx * 50}ms both` }}>
          <Card hover style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 12 }}>
              <Av initials={item.initials} color={item.color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  {icons[item.type]}
                  <span style={{ fontSize: 11, color: O.muted, fontFamily: body, fontWeight: 500 }}>{item.time}</span>
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.65, color: O.muted, fontFamily: body }}>
                  {item.body}
                </div>
                {item.progress && (
                  <div style={{ marginTop: 8, maxWidth: 220 }}>
                    <div style={{ width: "100%", height: 6, borderRadius: 99, background: O[100], overflow: "hidden" }}>
                      <div style={{ width: `${item.progress}%`, height: "100%", borderRadius: 99, background: O[600] }} />
                    </div>
                  </div>
                )}
                {item.type === "celebration" && (
                  <button
                    onClick={() => setCongrats(p => ({ ...p, [item.id]: !p[item.id] }))}
                    style={{
                      marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "5px 13px", borderRadius: 99, border: "none",
                      background: congrats[item.id] ? O.amberLt : O[50],
                      color: congrats[item.id] ? O.amber : O.muted,
                      fontSize: 12, fontWeight: 600, cursor: "pointer",
                      fontFamily: body, transition: "all 0.2s"
                    }}
                  >
                    <PartyPopper size={12} />
                    Congratulate{congrats[item.id] ? "d" : ""} · {congrats[item.id] ? 13 : 12}
                  </button>
                )}
                {item.type === "transformation" && (
                  <button style={{
                    marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "5px 13px", borderRadius: 99, border: "none",
                    background: O[50], color: O[700],
                    fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: body
                  }}>
                    View Transformation <ChevronRight size={13} />
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 2 — CV REVIEW
   ═══════════════════════════════════════════════════════════════ */
function PageReview() {
  const [impl, setImpl] = useState(
    SUGGESTIONS.reduce((a, s) => ({ ...a, [s.id]: s.def }), {})
  );
  const done = Object.values(impl).filter(Boolean).length;
  const total = SUGGESTIONS.length;
  const pct = Math.round((done / total) * 100);
  const barC = pct >= 80 ? O[600] : pct >= 60 ? O.amber : O.red;
  const met = pct >= 60;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
        <h2 style={{ margin: 0, fontSize: 19, fontFamily: heading, color: O[900], fontWeight: 700 }}>
          CV Review — Tom Nguyen
        </h2>
        <Pill><FileText size={10} /> Version 3 of 3 · Updated 2 days ago</Pill>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        {/* Left: CV Document */}
        <Card style={{ flex: "1 1 260px", minWidth: 240, padding: "24px 22px" }}>
          <div style={{ borderBottom: `2px solid ${O[900]}`, paddingBottom: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: O[900], fontFamily: body, letterSpacing: "0.02em" }}>
              TOM NGUYEN
            </div>
            <div style={{ fontSize: 12, color: O.muted, marginTop: 1, fontFamily: body }}>
              UX Designer · Melbourne, AU
            </div>
            <div style={{ fontSize: 11, color: O.muted, fontFamily: body }}>
              t.nguyen@email.com · portfolio-link.com
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: O[600], marginBottom: 3 }}>
              SUMMARY
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: O.muted, fontFamily: body }}>
              Creative UX designer with 2 years experience in user research and interface design. Passionate about creating user-centered solutions.
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: O[600], marginBottom: 3 }}>
              EXPERIENCE
            </div>
            {[
              {
                role: "UX Design Intern", co: "Canva", dates: "Jan 2025 – Present",
                bullets: [
                  "Conducted user research interviews with 15+ participants",
                  "Designed component library for internal tools team",
                  "Collaborated with product managers on feature specifications"
                ]
              },
              {
                role: "Junior Designer", co: "Freelance", dates: "Jun 2023 – Dec 2024",
                bullets: [
                  "Created responsive web designs for 8 small business clients",
                  "Managed client relationships and project timelines"
                ]
              },
            ].map(e => (
              <div key={e.role} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, color: O[900] }}>{e.role} — {e.co}</span>
                  <span style={{ color: O.muted, fontSize: 10.5 }}>{e.dates}</span>
                </div>
                <ul style={{ margin: "3px 0 0", paddingLeft: 15, fontSize: 11.5, color: O.muted, lineHeight: 1.7 }}>
                  {e.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: O[600], marginBottom: 3 }}>
              EDUCATION
            </div>
            <div style={{ fontSize: 12, color: O[900], fontWeight: 600 }}>
              Bachelor of Design — RMIT University{" "}
              <span style={{ fontWeight: 400, color: O.muted }}>(2021–2024)</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: O[600], marginBottom: 3 }}>
              SKILLS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {["Figma", "Adobe Creative Suite", "User Research", "Prototyping", "HTML/CSS"].map(s => (
                <span key={s} style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 6,
                  background: O[50], color: O[700], fontWeight: 500, fontFamily: body
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Right: Feedback Panel */}
        <div style={{ flex: "1 1 290px", minWidth: 270 }}>
          <Card style={{ marginBottom: 10, background: O[50], borderLeft: `3px solid ${O[600]}` }}>
            <div style={{ fontSize: 11, color: O.muted, marginBottom: 6, fontFamily: body, display: "flex", alignItems: "center", gap: 6 }}>
              <Av initials="AO" color={O[600]} size={22} />
              Review by <B>Aisha Okafor</B> · UX Lead at Atlassian · 3 days ago
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: O[700], fontFamily: body, fontStyle: "italic" }}>
              "Strong portfolio mention but your summary needs to lead with measurable impact, not adjectives. The Canva internship is undersold — quantify the component library's usage and impact on team velocity. Portfolio link should be the first thing a hiring manager sees."
            </div>
          </Card>

          <Lbl style={{ marginTop: 14 }}>Suggestions ({done}/{total} implemented)</Lbl>

          {SUGGESTIONS.map(s => (
            <Card key={s.id} hover style={{
              marginBottom: 7, padding: "13px 15px",
              borderLeft: `3px solid ${s.pri === "high" ? O.red : s.pri === "medium" ? O.amber : O[500]}`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5, flexWrap: "wrap" }}>
                <Pill
                  bg={s.pri === "high" ? O.redBg : s.pri === "medium" ? O.amberLt : O[50]}
                  color={s.pri === "high" ? O.red : s.pri === "medium" ? O.amber : O[600]}
                >
                  <PriDot pri={s.pri} />
                  {s.pri === "low" ? "Quick Win" : s.pri.charAt(0).toUpperCase() + s.pri.slice(1)}
                </Pill>
                <Pill>{s.cat}</Pill>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.6, color: O.muted, fontFamily: body, marginBottom: 8 }}>
                {s.text}
              </div>
              <button
                onClick={() => setImpl(p => ({ ...p, [s.id]: !p[s.id] }))}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "4px 11px", borderRadius: 8, border: "none",
                  background: impl[s.id] ? `${O[600]}18` : O[50],
                  color: impl[s.id] ? O[600] : O.muted,
                  fontSize: 11.5, fontWeight: 600, cursor: "pointer",
                  fontFamily: body, transition: "all 0.2s"
                }}
              >
                {impl[s.id] ? <CheckCircle2 size={13} /> : <Circle size={13} />}
                {impl[s.id] ? "Implemented" : "Mark implemented"}
              </button>
            </Card>
          ))}

          <Card style={{
            marginTop: 12,
            background: met ? O[50] : O.redBg,
            border: `1px solid ${met ? O[300] + "66" : O.red + "33"}`
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, marginBottom: 7,
              fontFamily: body, fontSize: 13, fontWeight: 700, color: O[900]
            }}>
              {met ? <CheckCircle2 size={15} color={O[600]} /> : <Lock size={15} color={O.red} />}
              Implementation Progress
            </div>
            <div style={{ width: "100%", height: 10, borderRadius: 99, background: O[100], overflow: "hidden", marginBottom: 4 }}>
              <div style={{
                width: `${pct}%`, height: "100%", borderRadius: 99,
                background: `linear-gradient(90deg, ${barC}, ${barC}cc)`,
                transition: "width 0.5s ease-out"
              }} />
            </div>
            <div style={{ fontSize: 12, fontFamily: body, fontWeight: 500, color: O.muted }}>
              {done} of {total} suggestions ({pct}%)
            </div>
            <div style={{
              fontSize: 12, marginTop: 6, fontWeight: 600,
              fontFamily: body, color: met ? O[600] : O.red
            }}>
              {met
                ? "✓ Meets 60% threshold — eligible for next CV submission"
                : `🔒 Implement ${Math.ceil(total * 0.6) - done} more to unlock next submission`}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 3 — MY PROGRESS (Youth Dashboard)
   ═══════════════════════════════════════════════════════════════ */
function PageProgress() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const timeline = [
    { label: "CV Submitted", date: "Oct", detail: "First version uploaded" },
    { label: "Review 1", date: "Oct", detail: "Reviewed by Aisha Okafor" },
    { label: "Implemented", date: "Nov", detail: "9 of 11 suggestions (82%)" },
    { label: "Review 2", date: "Nov", detail: "Reviewed by Marcus Chen" },
    { label: "Implemented", date: "Dec", detail: "11 of 13 suggestions (85%)" },
    { label: "Interview", date: "Dec", detail: "Accenture — consulting" },
    { label: "Offer", date: "Dec", detail: "Junior Consultant role" },
    { label: "Started!", date: "Jan", detail: "🎉 Employed at Accenture" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontFamily: heading, color: O[900], fontWeight: 700 }}>
          Your Career Journey
        </h2>
        <div style={{
          fontSize: 13, color: O.muted, fontFamily: body, marginTop: 3,
          display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap"
        }}>
          <B>Lena Johansson</B>
          <Pill>Management Consultant</Pill>
          <Pill bg={`${O[600]}15`} color={O[600]}>
            <CheckCircle2 size={10} /> Goal Achieved — Employed
          </Pill>
        </div>
      </div>

      {/* Goal + Timeline Card */}
      <Card style={{
        marginBottom: 14,
        background: `linear-gradient(135deg, ${O[50]}, ${O[100]}44)`,
        border: `1px solid ${O[300]}44`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <Target size={15} color={O[600]} />
          <Lbl style={{ margin: 0 }}>Goal Tracker</Lbl>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: O[900], fontFamily: body }}>
          Secure a consulting interview by March 2026
        </div>
        <div style={{ fontSize: 12.5, color: O[600], fontFamily: body, marginTop: 2 }}>
          ✅ Goal achieved! Interview at Accenture → Offer received → Started Jan 2026
        </div>

        <div style={{
          display: "flex", alignItems: "flex-start", gap: 0,
          marginTop: 18, overflowX: "auto", paddingBottom: 6
        }}>
          {timeline.map((t, i) => (
            <div key={i}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                minWidth: 72, position: "relative", cursor: "pointer"
              }}
              onMouseEnter={() => setHoveredStep(i)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <div style={{
                width: i === timeline.length - 1 ? 14 : 10,
                height: i === timeline.length - 1 ? 14 : 10,
                borderRadius: "50%",
                background: i === timeline.length - 1 ? O.amber : O[600],
                border: i === timeline.length - 1 ? `2px solid ${O.amber}` : "none",
                zIndex: 1, transition: "all 0.2s"
              }} />
              {i < timeline.length - 1 && (
                <div style={{
                  position: "absolute", top: 4, left: "50%",
                  width: "100%", height: 2, background: O[600]
                }} />
              )}
              <div style={{
                fontSize: 9.5, fontWeight: 700, color: O[900],
                marginTop: 6, textAlign: "center", fontFamily: body, lineHeight: 1.2
              }}>
                {t.label}
              </div>
              <div style={{ fontSize: 9, color: O.muted, fontFamily: body }}>{t.date}</div>
              {hoveredStep === i && (
                <div style={{
                  position: "absolute", top: -36, background: O[900],
                  color: "#fff", padding: "4px 10px", borderRadius: 8,
                  fontSize: 10, whiteSpace: "nowrap", zIndex: 10,
                  fontFamily: body, boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}>
                  {t.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
        {/* Implementation Scorecard */}
        <Card style={{ flex: "1 1 260px" }}>
          <Lbl>Implementation Scorecard</Lbl>
          {[
            { rev: "Review 1", reviewer: "Aisha Okafor", done: 9, total: 11, pct: 82 },
            { rev: "Review 2", reviewer: "Marcus Chen", done: 11, total: 13, pct: 85 },
          ].map((r, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 3, fontSize: 12.5, fontFamily: body
              }}>
                <span><B>{r.rev}</B> <span style={{ color: O.muted }}>by {r.reviewer}</span></span>
                <Pill bg={`${O[600]}15`} color={O[600]}>{r.pct}%</Pill>
              </div>
              <PBar value={r.done} max={r.total} height={5} />
            </div>
          ))}
          <div style={{
            marginTop: 6, padding: "8px 12px", borderRadius: 8,
            background: O[50], fontSize: 12, fontFamily: body,
            color: O[700], fontWeight: 600
          }}>
            Overall: 20/24 implemented (83%) — Above platform avg (76%)
          </div>
        </Card>

        {/* Access + Outcome */}
        <div style={{ flex: "1 1 250px", display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ background: O[50], borderLeft: `3px solid ${O[600]}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <Unlock size={15} color={O[600]} />
              <span style={{ fontSize: 13, fontWeight: 700, color: O[600], fontFamily: body }}>
                Access Status: UNLOCKED
              </span>
            </div>
            <div style={{ fontSize: 12, color: O.muted, fontFamily: body, lineHeight: 1.6 }}>
              Your implementation rate (83%) exceeds the 60% threshold. You may submit a new CV for review at any time.
            </div>
          </Card>

          <Card>
            <Lbl>Outcome Report</Lbl>
            <div style={{
              padding: "10px 12px", borderRadius: 10,
              background: `${O[600]}0a`, marginBottom: 8
            }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: O[900], fontFamily: body,
                display: "flex", alignItems: "center", gap: 5
              }}>
                <Briefcase size={13} color={O[600]} /> Employed at Accenture
              </div>
              <div style={{ fontSize: 11.5, color: O.muted, fontFamily: body, marginTop: 2 }}>
                Junior Consultant · Started January 2026
              </div>
              <div style={{ fontSize: 10.5, color: O[300], fontFamily: body, marginTop: 2 }}>
                Verification: Self-reported · Pending LinkedIn confirmation
              </div>
            </div>
            <div style={{
              fontSize: 11.5, color: O.muted, fontFamily: body,
              display: "flex", flexDirection: "column", gap: 3
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Sparkles size={12} color={O[600]} /> Impact Credits distributed to Aisha Okafor, Marcus Chen
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={12} color={O.amber} /> 6-month retention check: July 2026
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* CV Strength Chart */}
      <Card>
        <Lbl>CV Strength Over Time</Lbl>
        <div style={{ width: "100%", height: 190 }}>
          <ResponsiveContainer>
            <AreaChart data={CV_SCORE} margin={{ top: 5, right: 16, bottom: 5, left: -10 }}>
              <defs>
                <linearGradient id="cvG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={O[500]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={O[500]} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={O[100]} />
              <XAxis dataKey="version" tick={{ fontSize: 11, fill: O.muted, fontFamily: body }} axisLine={{ stroke: O[100] }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: O.muted }} axisLine={{ stroke: O[100] }} />
              <Tooltip contentStyle={{ background: O[900], border: "none", borderRadius: 8, fontSize: 12, color: "#fff", fontFamily: body }} />
              <Area type="monotone" dataKey="score" stroke={O[600]} strokeWidth={2.5} fill="url(#cvG)" dot={{ fill: O[600], r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 4 — IMPACT PORTFOLIO (Mentor Profile)
   ═══════════════════════════════════════════════════════════════ */
function PagePortfolio() {
  const [tipId, setTipId] = useState(null);
  const stats = [
    { icon: <Target size={16} />, value: "22", label: "Youth Assisted" },
    { icon: <Briefcase size={16} />, value: "4", label: "Offers Attributed" },
    { icon: <TrendingUp size={16} />, value: "87%", label: "Avg Implementation" },
    { icon: <Sparkles size={16} />, value: "1,840", label: "Impact Credits" },
    { icon: <Handshake size={16} />, value: "3", label: "Active Mentorships" },
  ];

  return (
    <div>
      <Card style={{
        marginBottom: 16, padding: "24px 22px",
        background: `linear-gradient(160deg, ${O[50]}, ${O.surface})`
      }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <Av initials="MC" color={O[700]} size={60} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ margin: 0, fontSize: 22, fontFamily: heading, color: O[900], fontWeight: 700 }}>
              Marcus Chen
            </h2>
            <div style={{ fontSize: 13, color: O.muted, fontFamily: body, marginTop: 1 }}>
              Product Manager at Spotify
            </div>
            <div style={{ marginTop: 6, display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <Pill bg={O.amberLt} color={O.amber} style={{ animation: "pulse 2.5s ease-in-out infinite" }}>
                <Trophy size={10} /> Senior Career Catalyst
              </Pill>
              <Pill><Calendar size={10} /> Since March 2024</Pill>
              <Pill bg={`${O[600]}12`} color={O[600]}>
                <CheckCircle2 size={10} /> Accepting 3 reviews/week
              </Pill>
            </div>
            <div style={{
              fontSize: 13, color: O.muted, fontFamily: body,
              lineHeight: 1.6, marginTop: 10, maxWidth: 460
            }}>
              Helping early-career professionals break into tech product roles. I focus on teaching candidates to tell their story through data and measurable impact.
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {stats.map((s, i) => (
          <AnimStat key={i} icon={s.icon} value={s.value} label={s.label} delay={i * 70} />
        ))}
      </div>

      <Lbl>Impact Credit Ledger</Lbl>
      <Card style={{ marginBottom: 16, padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: body, fontSize: 12.5 }}>
            <thead>
              <tr style={{ background: O[50] }}>
                {["Date", "Event", "Youth", "Credits", "Status"].map(h => (
                  <th key={h} style={{
                    textAlign: "left", padding: "9px 13px",
                    fontSize: 10, fontWeight: 700, color: O[700],
                    textTransform: "uppercase", letterSpacing: "0.06em",
                    borderBottom: `1px solid ${O.border}`
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CREDITS.map((r, i) => (
                <tr key={i} style={{
                  opacity: r.locked ? 0.55 : 1,
                  background: r.locked ? O[50] : "transparent"
                }}>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${O.border}`, color: O.muted, fontSize: 11.5 }}>
                    {r.date}
                  </td>
                  <td style={{
                    padding: "11px 13px", borderBottom: `1px solid ${O.border}`,
                    fontWeight: 600, color: O[900],
                    borderLeft: !r.locked ? `3px solid ${O.amberLt}` : "3px solid transparent"
                  }}>
                    {r.event}
                  </td>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${O.border}`, color: O.muted }}>
                    {r.youth}
                  </td>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${O.border}`, position: "relative" }}>
                    <div style={{ fontWeight: 700, color: O[600] }}>+{r.total}</div>
                    <div
                      onMouseEnter={() => setTipId(i)}
                      onMouseLeave={() => setTipId(null)}
                      style={{
                        fontSize: 10, color: O[300], cursor: "help",
                        textDecoration: "underline dotted", display: "inline"
                      }}
                    >
                      {r.base} × {r.mult}×
                    </div>
                    {tipId === i && (
                      <div style={{
                        position: "absolute", bottom: "100%", left: 0,
                        background: O[900], color: "#fff",
                        padding: "6px 10px", borderRadius: 8,
                        fontSize: 10.5, whiteSpace: "normal",
                        zIndex: 10, maxWidth: 260, lineHeight: 1.4,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.25)", fontFamily: body
                      }}>
                        {r.reason}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "11px 13px", borderBottom: `1px solid ${O.border}` }}>
                    {r.locked
                      ? <Pill bg={O[50]} color={O[300]}><Lock size={10} /> Unlocks {r.unlock}</Pill>
                      : <Pill bg={`${O[600]}12`} color={O[600]}><Unlock size={10} /> Unlocked</Pill>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card style={{ marginBottom: 16, background: O[50], borderLeft: `3px solid ${O.amber}` }}>
        <Quote size={18} color={O[300]} style={{ marginBottom: 6 }} />
        <div style={{ fontSize: 14, lineHeight: 1.7, color: O[700], fontFamily: heading, fontStyle: "italic" }}>
          "Marcus didn't just fix my CV — he taught me what hiring managers actually look for. His suggestion to lead every bullet with a metric completely changed my callback rate."
        </div>
        <div style={{
          marginTop: 10, fontSize: 12, fontWeight: 600, color: O[900],
          fontFamily: body, display: "flex", alignItems: "center", gap: 7
        }}>
          <Av initials="PS" color="#7a5f3e" size={22} />
          Priya Sharma, Junior Data Analyst at Deloitte
        </div>
      </Card>

      <Lbl>Tier Progression → Career Architect</Lbl>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "Youth Assisted", cur: 22, need: 50 },
            { label: "Impl. Rate", cur: 87, need: 90 },
            { label: "Offers Attributed", cur: 4, need: 10 },
          ].map((p, i) => (
            <div key={i} style={{ flex: "1 1 140px", minWidth: 130 }}>
              <div style={{
                fontSize: 11.5, fontWeight: 600, color: O.muted,
                marginBottom: 5, fontFamily: body
              }}>
                {p.label}: {p.cur}/{p.need}
              </div>
              <PBar value={p.cur} max={p.need} height={5} />
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: "12px 16px", background: O[50] }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 12.5, fontFamily: body, color: O[700]
        }}>
          <FileText size={14} color={O[600]} />
          Marcus's CV is public and open for community suggestions —{" "}
          <span style={{ fontWeight: 600, color: O[600], cursor: "pointer" }}>View CV →</span>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 5 — REVIEW QUEUE
   ═══════════════════════════════════════════════════════════════ */
function PageQueue() {
  const [claimed, setClaimed] = useState({});

  const active = [
    {
      name: "Kwame Asante", role: "Management Consulting",
      complexity: 3, industry: "Consulting / Strategy",
      claimed: "3 days ago", remaining: 4,
      target: "Associate Consultant roles at MBB firms",
      notes: "Career switcher from engineering — needs positioning help"
    },
    {
      name: "Fatima Al-Hassan", role: "Marketing Coordinator",
      complexity: 2, industry: "Marketing / Communications",
      claimed: "1 day ago", remaining: 6,
      target: "Entry-level marketing roles at agencies",
      notes: "Strong extracurriculars, needs professional experience framing"
    },
  ];

  const available = [
    { id: "rp", name: "Ravi Patel", role: "Software Engineer", complexity: 4, industry: "Tech", matchLabel: "✅", notes: "Bootcamp graduate, no degree — needs strong positioning strategy" },
    { id: "sw", name: "Sophie Williams", role: "Graduate Accountant", complexity: 2, industry: "Finance", matchLabel: "⚠️ Partial", notes: "Straightforward CV, mainly formatting and quantification needed" },
    { id: "do", name: "Daniel Osei", role: "Project Manager", complexity: 3, industry: "General", matchLabel: "✅", notes: "Transitioning from retail management — transferable skills framing" },
  ];

  return (
    <div>
      <h2 style={{ margin: "0 0 14px", fontSize: 20, fontFamily: heading, color: O[900], fontWeight: 700 }}>
        Review Queue
      </h2>

      <Card style={{ marginBottom: 16, background: O[50] }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <BarChart3 size={15} color={O[600]} />
          <span style={{ fontSize: 13, fontWeight: 700, color: O[900], fontFamily: body }}>
            Your Commitment: 3 reviews/week
          </span>
          <Pill bg={`${O[600]}15`} color={O[600]}>
            <CheckCircle2 size={10} /> On track
          </Pill>
        </div>
        <div style={{
          display: "flex", gap: 16, flexWrap: "wrap",
          fontSize: 12.5, fontFamily: body, color: O.muted
        }}>
          <span>This week: <B>1</B> completed, <B>2</B> in progress, <B>0</B> overdue</span>
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 11.5, fontFamily: body, color: O.muted, marginBottom: 3 }}>
            Backlog capacity: 2 of 6 max (2× weekly commitment)
          </div>
          <div style={{ width: "100%", height: 6, borderRadius: 99, background: O[100], overflow: "hidden" }}>
            <div style={{ width: "33%", height: "100%", borderRadius: 99, background: O[500] }} />
          </div>
        </div>
      </Card>

      <Lbl>Active Reviews (In Progress)</Lbl>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        {active.map((cv, i) => (
          <Card key={i} style={{ flex: "1 1 280px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <FileText size={14} color={O[600]} />
              <span style={{ fontSize: 14, fontWeight: 700, color: O[900], fontFamily: body }}>
                {cv.name}
              </span>
              <Pill>{cv.role}</Pill>
            </div>
            <div style={{
              display: "flex", gap: 10, flexWrap: "wrap",
              fontSize: 11.5, color: O.muted, fontFamily: body, marginBottom: 6
            }}>
              <span>Complexity: <ComplexDots level={cv.complexity} /></span>
              <span>Industry: {cv.industry}</span>
            </div>
            <div style={{
              fontSize: 11.5, color: cv.remaining <= 3 ? O.amber : O.muted,
              fontFamily: body, fontWeight: 500, marginBottom: 4,
              display: "flex", alignItems: "center", gap: 4
            }}>
              <Clock size={12} /> Claimed {cv.claimed} · {cv.remaining} days remaining
            </div>
            <div style={{ fontSize: 12, color: O.muted, fontFamily: body, marginBottom: 4 }}>
              Target: {cv.target}
            </div>
            <div style={{
              fontSize: 11.5, color: O[300], fontFamily: body,
              fontStyle: "italic", marginBottom: 8
            }}>
              {cv.notes}
            </div>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "6px 14px", borderRadius: 8, border: "none",
              background: O[600], color: "#fff",
              fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: body
            }}>
              Continue Review <ChevronRight size={13} />
            </button>
          </Card>
        ))}
      </div>

      <Lbl>Available CVs — New Assignments</Lbl>
      {available.map(cv => (
        <Card key={cv.id} hover style={{ marginBottom: 8 }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: 8
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: O[900], fontFamily: body }}>
                  {cv.name}
                </span>
                <Pill>{cv.role}</Pill>
              </div>
              <div style={{
                display: "flex", gap: 10, flexWrap: "wrap",
                fontSize: 11.5, color: O.muted, fontFamily: body, marginBottom: 3
              }}>
                <span>Complexity: <ComplexDots level={cv.complexity} /></span>
                <span>Industry: {cv.matchLabel} {cv.industry}</span>
              </div>
              <div style={{ fontSize: 11.5, color: O[300], fontFamily: body, fontStyle: "italic" }}>
                {cv.notes}
              </div>
              {cv.complexity >= 4 && (
                <div style={{
                  fontSize: 10.5, color: O[500], fontFamily: body,
                  fontWeight: 500, marginTop: 4
                }}>
                  Complex CVs typically earn higher Impact Credits due to greater improvement potential.
                </div>
              )}
            </div>
            <button
              onClick={() => setClaimed(p => ({ ...p, [cv.id]: true }))}
              style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                padding: "7px 16px", borderRadius: 8, border: "none",
                background: claimed[cv.id] ? O[50] : O[600],
                color: claimed[cv.id] ? O[600] : "#fff",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                fontFamily: body, transition: "all 0.2s", flexShrink: 0
              }}
            >
              {claimed[cv.id]
                ? <><CheckCircle2 size={13} /> Claimed</>
                : <>Claim Review</>}
            </button>
          </div>
        </Card>
      ))}

      <Card style={{
        marginTop: 14, background: O.amberBg || "#fffbeb",
        borderLeft: `3px solid ${O.amber}`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <AlertTriangle size={14} color={O.amber} />
          <span style={{ fontSize: 12, fontWeight: 700, color: O.amber, fontFamily: body }}>
            1 CV reassigned this week
          </span>
        </div>
        <div style={{ fontSize: 12, color: O.muted, fontFamily: body, lineHeight: 1.6 }}>
          <B>Mia Tanaka</B> (Graphic Design) — Claimed 8 days ago, no response. Reassigned to Aisha Okafor. No reputation impact for first occurrence.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 6 — ORG DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
function PageOrg() {
  const kpis = [
    { icon: <Target size={16} />, value: "64%", label: "Youth Employment Rate", trend: "↑ 8% vs Q3", context: "Of youth who engaged" },
    { icon: <Clock size={16} />, value: "3.2mo", label: "Avg Time to Employment", trend: "↓ 1.8mo vs baseline", context: "National avg: 5+ months" },
    { icon: <Users size={16} />, value: "78%", label: "Reviewer Retention (12mo)", trend: "↑ 12% vs Q3", context: "Industry avg: ~30%" },
    { icon: <TrendingUp size={16} />, value: "81%", label: "Implementation Rate", trend: "Stable", context: "Above 70% threshold" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <Lbl style={{ color: O[300], marginBottom: 2 }}>Impact Report</Lbl>
        <h2 style={{ margin: 0, fontSize: 21, fontFamily: heading, color: O[900], fontWeight: 700 }}>
          <span style={{ fontWeight: 800 }}>CV</span>
          <span style={{ fontWeight: 400 }}>in</span> Impact Report — Q4 2025
        </h2>
        <div style={{ fontSize: 13, color: O.muted, fontFamily: body }}>
          Global Youth Leaders Association
        </div>
        <div style={{
          fontSize: 12, color: O[300], fontFamily: heading,
          fontStyle: "italic", marginTop: 2
        }}>
          Careers launched, not reviews counted.
        </div>
      </div>

      <div style={{ display: "flex", gap: 9, marginBottom: 18, flexWrap: "wrap" }}>
        {kpis.map((k, i) => (
          <AnimStat key={i} icon={k.icon} value={k.value} label={k.label}
            trend={k.trend} context={k.context} delay={i * 100} />
        ))}
      </div>

      <Card style={{ marginBottom: 18 }}>
        <Lbl>Youth Outcomes Over Time (Jul – Dec 2025)</Lbl>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={ORG_DATA} margin={{ top: 5, right: 16, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={O[100]} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: O.muted, fontFamily: body }} axisLine={{ stroke: O[100] }} />
              <YAxis tick={{ fontSize: 11, fill: O.muted }} axisLine={{ stroke: O[100] }} />
              <Tooltip contentStyle={{ background: O[900], border: "none", borderRadius: 8, fontSize: 12, color: "#fff", fontFamily: body }} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: body }} />
              <Line type="monotone" dataKey="interviews" stroke={O[300]} strokeWidth={2} dot={{ fill: O[300], r: 3.5 }} name="Interviews" />
              <Line type="monotone" dataKey="offers" stroke={O[500]} strokeWidth={2.5} dot={{ fill: O[500], r: 3.5 }} name="Offers" />
              <Line type="monotone" dataKey="placements" stroke={O[700]} strokeWidth={3} dot={{ fill: O[700], r: 4 }} name="Placements" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Lbl>Why This Works</Lbl>
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <Card style={{ flex: "1 1 240px", opacity: 0.7, background: O[50], borderColor: O[100] }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
            <X size={15} color={O.red} />
            <span style={{ fontSize: 12, fontWeight: 700, color: O.red, fontFamily: body }}>
              Traditional Volunteer Model
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: O[300], fontFamily: heading }}>127</div>
          <div style={{ fontSize: 12, color: O[300], fontFamily: body, marginBottom: 10 }}>
            reviews completed
          </div>
          <div style={{ fontSize: 11.5, color: O[300], lineHeight: 1.7, fontFamily: body }}>
            Employment impact: Unknown. Reviewer retention: ~23%. Recognition: Activity badges ("Gold Reviewer — 100 reviews!"). Quality control: None.
          </div>
        </Card>
        <Card style={{
          flex: "1 1 240px",
          background: `linear-gradient(160deg, ${O[50]}, ${O[100]}33)`,
          border: `2px solid ${O[600]}33`
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
            <CheckCircle2 size={15} color={O[600]} />
            <span style={{ fontSize: 12, fontWeight: 700, color: O[600], fontFamily: body }}>
              CVin Outcome Model
            </span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: O[900], fontFamily: heading }}>12</div>
          <div style={{ fontSize: 12, color: O[900], fontWeight: 600, fontFamily: body, marginBottom: 10 }}>
            youth employed this quarter
          </div>
          <div style={{ fontSize: 11.5, color: O[700], lineHeight: 1.7, fontFamily: body }}>
            Employment rate: 64%. Reviewer retention: 78%. Recognition: Impact Credits tied to verified outcomes. Quality: Implementation rates as automatic filter.
          </div>
        </Card>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Card style={{
          flex: "1 1 280px",
          background: `linear-gradient(160deg, ${O.amberLt}44, ${O.surface})`,
          borderLeft: `3px solid ${O.amber}`
        }}>
          <Lbl style={{ color: O.amber }}>Economic Value Created (Q4 2025)</Lbl>
          <div style={{ fontSize: 26, fontWeight: 800, color: O[900], fontFamily: heading, marginBottom: 2 }}>
            $100,000
          </div>
          <div style={{ fontSize: 12, color: O.muted, fontFamily: body, lineHeight: 1.7 }}>
            12 youth placed × 2-month avg search acceleration × $25K avg annual salary ÷ 6
          </div>
          <div style={{
            marginTop: 10, display: "flex", gap: 14, flexWrap: "wrap",
            fontSize: 12, fontFamily: body
          }}>
            <span>
              <span style={{ color: O.muted }}>Platform cost:</span> <B>$330</B>
            </span>
            <span>
              <span style={{ color: O.muted }}>Social ROI:</span>{" "}
              <span style={{ fontWeight: 700, color: O[600] }}>$303 per $1 invested</span>
            </span>
          </div>
        </Card>

        <Card style={{ flex: "1 1 220px" }}>
          <Lbl>Alumni Engagement</Lbl>
          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            fontFamily: body, fontSize: 12.5
          }}>
            {[
              { val: "34", lbl: "Active alumni reviewers" },
              { val: "8", lbl: "Were CVin youth (24%)" },
              { val: "3.1/mo", lbl: "Avg commitment" },
              { val: "84%", lbl: "Alumni retention" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 20, fontWeight: 800, color: O[900], fontFamily: heading }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 11, color: O.muted }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE 7 — SHOWCASE
   ═══════════════════════════════════════════════════════════════ */
function PageShowcase() {
  const kwameTimeline = [
    { date: "Sep 2025", text: "Joined CVin targeting management consulting" },
    { date: "Oct 2025", text: "Matched with Dr. Rebecca Torres (8th mentorship)" },
    { date: "Nov 2025", text: "CV Review 1 — 16 suggestions, 14 implemented (88%)" },
    { date: "Dec 2025", text: "CV Review 2 — Focus on case study framing" },
    { date: "Jan 2026", text: "Interview at McKinsey (Impact Credits: 75 to Rebecca)" },
    { date: "Feb 2026", text: "Interview at Google (credits pending)" },
    { date: "Next", text: "Awaiting outcomes...", pending: true },
  ];

  const wall = [
    { name: "Marcus Chen", tier: "Senior Career Catalyst", icon: "🏅", stat: "22 youth assisted", initials: "MC", color: O[700] },
    { name: "Dr. Rebecca Torres", tier: "Career Architect", icon: "🏆", stat: "54 youth assisted", initials: "RT", color: "#6b3e7a" },
    { name: "Aisha Okafor", tier: "Career Catalyst", icon: "⭐", stat: "11 youth assisted", initials: "AO", color: O[600] },
  ];

  return (
    <div>
      <h2 style={{
        margin: "0 0 16px", fontSize: 20, fontFamily: heading,
        color: O[900], fontWeight: 700,
        display: "flex", alignItems: "center", gap: 6
      }}>
        <Star size={18} color={O.amber} /> Showcase
      </h2>

      <Lbl>Featured Transformation — Priya Sharma</Lbl>
      <div style={{
        display: "flex", gap: 10, marginBottom: 6,
        flexWrap: "wrap", alignItems: "stretch"
      }}>
        <Card style={{ flex: "1 1 240px", background: O[50], borderColor: O[100], opacity: 0.8 }}>
          <Pill bg={O[100]} color={O[300]}>BEFORE — October 2025</Pill>
          <div style={{
            fontSize: 13, fontFamily: heading, fontStyle: "italic",
            color: O[300], lineHeight: 1.7, marginTop: 10
          }}>
            "Data science enthusiast with knowledge of Python and SQL. Looking for opportunities to grow and learn."
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: O.red, fontFamily: body, fontWeight: 600 }}>
            Callback rate: ~5%
          </div>
        </Card>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 4px", color: O[600]
        }}>
          <ArrowRight size={22} />
        </div>
        <Card style={{ flex: "1 1 240px", border: `2px solid ${O[600]}33` }}>
          <Pill bg={`${O[600]}15`} color={O[600]}>AFTER — December 2025</Pill>
          <div style={{
            fontSize: 13, fontFamily: heading, fontStyle: "italic",
            color: O[900], lineHeight: 1.7, marginTop: 10
          }}>
            "Data analyst who built predictive models reducing customer churn by 18% across 50K-user dataset. Python, SQL, Tableau."
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: O[600], fontFamily: body, fontWeight: 600 }}>
            Callback rate: 28%
          </div>
          <div style={{
            fontSize: 11.5, color: O.amber, fontFamily: body,
            fontWeight: 600, marginTop: 2
          }}>
            Outcome: Junior Data Analyst at Deloitte
          </div>
        </Card>
      </div>
      <div style={{
        fontSize: 12, color: O.muted, fontFamily: body,
        marginBottom: 20, textAlign: "center"
      }}>
        Reviewed by <B>Marcus Chen</B> and <B>Aisha Okafor</B>. 92% of suggestions implemented.
      </div>

      <Lbl>Career Progression — Kwame Asante (In Progress)</Lbl>
      <Card style={{ marginBottom: 18 }}>
        {kwameTimeline.map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 12 }}>
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", minWidth: 14
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: t.pending ? O[100] : O[600],
                marginTop: 3, flexShrink: 0
              }} />
              {i < kwameTimeline.length - 1 && (
                <div style={{
                  width: 2, flex: 1,
                  background: t.pending ? O[100] : O[300],
                  minHeight: 20
                }} />
              )}
            </div>
            <div style={{ paddingBottom: 14 }}>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: t.pending ? O[300] : O[600], fontFamily: body
              }}>
                {t.date}
              </span>
              <div style={{
                fontSize: 12.5,
                color: t.pending ? O[300] : O.muted, fontFamily: body
              }}>
                {t.text}
              </div>
            </div>
          </div>
        ))}
      </Card>

      <Lbl>Community Impact</Lbl>
      <Card style={{ marginBottom: 18, background: O[50] }}>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", fontFamily: body }}>
          {[
            { val: "48", lbl: "Transformations completed" },
            { val: "+340%", lbl: "Avg callback improvement" },
            { val: "31", lbl: "Youth crediting CVin" },
            { val: "14mo", lbl: "Longest mentorship" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 20, fontWeight: 800, color: O[900], fontFamily: heading }}>
                {s.val}
              </div>
              <div style={{ fontSize: 11, color: O.muted }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </Card>

      <Lbl>Recognition Wall</Lbl>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {wall.map((w, i) => (
          <Card key={i} hover style={{ flex: "1 1 180px", textAlign: "center", padding: "16px 14px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <Av initials={w.initials} color={w.color} size={44} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: O[900], fontFamily: body }}>
              {w.name}
            </div>
            <div style={{ marginTop: 4 }}>
              <Pill bg={O.amberLt} color={O.amber}>{w.icon} {w.tier}</Pill>
            </div>
            <div style={{ fontSize: 11, color: O.muted, fontFamily: body, marginTop: 6 }}>
              {w.stat}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP — Navigation + Layout
   ═══════════════════════════════════════════════════════════════ */
export default function CVinDemo() {
  const [tab, setTab] = useState("feed");
  const [fadeKey, setFadeKey] = useState(0);

  function go(id) {
    setTab(id);
    setFadeKey(k => k + 1);
  }

  const views = {
    feed: <PageFeed />,
    review: <PageReview />,
    progress: <PageProgress />,
    portfolio: <PagePortfolio />,
    queue: <PageQueue />,
    org: <PageOrg />,
    showcase: <PageShowcase />,
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,400&family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,146,10,0); }
          50% { box-shadow: 0 0 12px 2px rgba(212,146,10,0.2); }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", background: O.surface,
        fontFamily: body, color: O.text
      }}>
        {/* Header */}
        <div style={{
          background: O[900], padding: "11px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <span style={{
            fontSize: 20, color: "#fff", fontFamily: heading,
            letterSpacing: "-0.02em"
          }}>
            <span style={{ fontWeight: 800 }}>CV</span>
            <span style={{ fontWeight: 400 }}>in</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: O[300], fontFamily: body, fontWeight: 500 }}>
              James Miller
            </span>
            <Pill bg={O[700]} color={O[100]}>
              <User size={9} /> Reviewer
            </Pill>
            <Av initials="JM" color={O[600]} size={30} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          background: O.card, borderBottom: `1px solid ${O.border}`,
          padding: "0 10px", display: "flex", gap: 0,
          overflowX: "auto", WebkitOverflowScrolling: "touch"
        }}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => go(t.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "11px 12px", border: "none",
                  background: "transparent", cursor: "pointer",
                  fontSize: 12, fontWeight: active ? 700 : 500,
                  color: active ? O[700] : O.muted, fontFamily: body,
                  borderBottom: active ? `2.5px solid ${O[600]}` : "2.5px solid transparent",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap", flexShrink: 0
                }}
              >
                {t.icon} {t.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div
          key={fadeKey}
          style={{
            maxWidth: 780, margin: "0 auto",
            padding: "20px 14px 48px",
            animation: "fadeUp 0.2s ease"
          }}
        >
          {views[tab]}
        </div>
      </div>
    </>
  );
}
