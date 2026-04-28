import { useState, useRef, useEffect } from "react";

const Y = "#FFE500";
const BG = "#000";
const W = "#fff";
const G1 = "#111";
const G2 = "#1c1c1c";
const G3 = "#333";
const GM = "#666";

const MODULES = [
  {
    id: 1, title: "What AI Actually Is", tagline: "Stop being confused. Start being in control.", duration: "15 min", icon: "01",
    lesson: `AI is not magic. It's not a robot. It's not going to take your job.

Here's what AI actually is: a very smart assistant that does exactly what you tell it to do.

Think of it like hiring the most patient, fastest employee in the world. They never sleep, never complain, and will rewrite something 50 times without rolling their eyes.

The catch? You have to learn how to give good instructions. That's the whole skill.

WHAT IS A PROMPT?
A prompt is just the message you type to AI. The better your instructions, the better your result. A bad prompt gives you garbage. A good prompt gives you something you can use in your business today.

THE 3-PART FORMULA

1. Role — Tell AI who to be
"Act as a marketing expert for small businesses..."

2. Task — Tell it exactly what to do
"Write a follow-up email for a lead who didn't respond..."

3. Context — Give it your details
"I run a dental practice in Miami Beach. My service is Invisalign. My price is $4,500..."

Role + Task + Context = results you can actually use.`,
    exercise: "Tell me about your business in 2–3 sentences. I'll write your first AI prompt — one you can copy and use today.",
    placeholder: "I have a dental office in Miami Beach. I do Invisalign, veneers, whitening. At $45k/month and want to reach $100k..."
  },
  {
    id: 2, title: "Build Your AI Assistant", tagline: "One setup. Works for you forever.", duration: "20 min", icon: "02",
    lesson: `Here's the game-changer most people miss: you don't have to explain your business every single time you use AI.

You build a Business Profile Prompt — a saved instruction set that tells AI everything about your business once. Then every time you need something, AI already knows who you are.

WHAT GOES IN YOUR BUSINESS PROFILE
- What your business does
- Who your ideal customer is
- Your tone (professional? casual? friendly?)
- Your top 3 services or products
- Your city and market
- Your biggest business goal right now

EXAMPLE
"You are a marketing assistant for [Business Name], a [type of business] in [city]. Our ideal client is [description]. We offer [services]. Our tone is [friendly/professional]. Our current goal is [goal]. Always write in a way that speaks directly to our ideal client."

Once you save this, every output AI gives you will sound like YOU — not a generic robot.`,
    exercise: "Let's build your Business Profile right now. Tell me: What does your business do? Who is your ideal customer? What's your #1 goal this year?",
    placeholder: "I run a bookkeeping firm for restaurant owners. My goal is to get 5 new clients this quarter..."
  },
  {
    id: 3, title: "Automate Repetitive Work", tagline: "Stop doing the same tasks twice.", duration: "25 min", icon: "03",
    lesson: `Every business owner has tasks they do over and over. Answering the same questions. Writing the same emails. Creating the same content.

AI eliminates most of these. Here's how.

THE 5 TASKS OWNERS AUTOMATE MOST

1. Email responses
"Write a professional response to a customer asking about pricing for [service]. Under 150 words. End with a call to book a call."

2. Social media content
"Write 5 Instagram captions for a [type of business]. Under 150 characters, sound human, end with a question."

3. Follow-up sequences
"Write a 3-email follow-up for a lead who filled out my form but hasn't responded. Each email shorter than the last."

4. FAQ answers
"Here are the 10 most common questions my customers ask: [list]. Write clear, friendly answers I can paste on my website."

5. Sales call prep
"I have a call with a [type of business owner]. Give me 5 questions to ask and 3 ways to position my service."

THE KEY HABIT
Once you write a prompt that works — save it. You now have a reusable tool. Run it every week in 30 seconds.`,
    exercise: "Tell me the #1 most repetitive task in your business right now. I'll build you a reusable prompt you can save and run every week.",
    placeholder: "Every Monday I write a newsletter. Or: I spend an hour a day answering the same customer questions..."
  },
  {
    id: 4, title: "Generate More Leads", tagline: "More customers. Less cold calling.", duration: "25 min", icon: "04",
    lesson: `This is where AI starts making you money directly.

STEP 1 — DEFINE YOUR IDEAL LEAD
Be specific. "Small business owners" is bad. "Restaurant owners in Miami doing $500k–$2M who struggle with bookkeeping" is great.

STEP 2 — CREATE A LEAD MAGNET
A lead magnet is something free you give away to get someone's contact info.

Prompt: "Create a 1-page guide called [title] for [ideal client]. It solves one specific problem, is easy to read, and ends with a reason to contact me."

STEP 3 — WRITE YOUR OUTREACH
"Write a cold DM for Instagram targeting [ideal client]. Not salesy. Acknowledge a specific pain point. Offer a free resource or call. Under 5 sentences."

STEP 4 — QUALIFY YOUR LEADS
"Create 5 conversational questions to ask a new lead to find out if they're a good fit for my [service]."

STEP 5 — BUILD YOUR FOLLOW-UP
Most sales happen on follow-up 5 through 8. AI writes your entire sequence in 5 minutes — you set it once, it runs automatically.`,
    exercise: "Tell me your service and who your ideal lead is. I'll write you a lead magnet concept AND an outreach message you can use this week.",
    placeholder: "I do social media management for chiropractors. My ideal lead wants more patients but has no time for social media..."
  },
  {
    id: 5, title: "Workflows That Run Without You", tagline: "Work less. Grow more.", duration: "30 min", icon: "05",
    lesson: `You've learned how to prompt, automate tasks, and generate leads. The final step: connect everything into a workflow — a system that runs even when you're not working.

WHAT IS AN AI WORKFLOW?
A sequence of prompts and actions that handles a business process from start to finish — automatically.

AN EXAMPLE: LEAD GENERATION ON AUTOPILOT
1. Someone sees your Instagram post — written by AI
2. They download your free guide — written by AI
3. They get a welcome email — written by AI, sent automatically
4. 3 days later: follow-up email — written by AI
5. If they reply: AI has pre-written your response options

You set it up once. It runs without you.

THE 3 WORKFLOWS EVERY BUSINESS SHOULD BUILD
1. Lead capture and follow-up — Never lose a lead again
2. Content calendar — 30 days of posts in one sitting
3. Customer onboarding — New clients get everything automatically

TOOLS THAT MAKE IT WORK
- Claude or ChatGPT — Writing and thinking
- Zapier — Connects apps without any code
- Mailchimp or ActiveCampaign — Email sequences`,
    exercise: "Tell me one business process you wish ran automatically. I'll map out the full AI workflow — step by step — that you can start building this week.",
    placeholder: "When someone fills out my contact form, I want them to get a welcome email, then a follow-up 3 days later..."
  }
];

const SKILLS = [
  { id: "s1", title: "Prompt Enhancer", icon: "PE", desc: "Paste any rough prompt — I'll rewrite it to be 10x more effective.", how: "Give me your basic prompt. I'll rebuild it with Role + Task + Context so AI gives you a much better result.", placeholder: "Write me a social media post about my dental office", system: "You are an expert AI prompt engineer. The user gives you a basic prompt. Rewrite it using the Role + Task + Context formula to make it dramatically more effective. Show the improved prompt clearly formatted so they can copy it. Briefly explain what you changed and why. Under 300 words." },
  { id: "s2", title: "Content Machine", icon: "CM", desc: "Tell me about your business — I'll write 30 days of social media posts.", how: "Give me your business type, top service, and ideal customer. I'll generate a full month of post ideas.", placeholder: "My business is a dental office in Miami Beach. My top service is Invisalign. My ideal customer is adults 25–45 who want a better smile.", system: "You are a social media content strategist for small businesses. Create a 30-day social media content calendar with one post idea per day. Format as Day 1:, Day 2:, etc. Each entry is one clear post concept. Group into 4 weekly themes. Be specific to their business." },
  { id: "s3", title: "Lead Magnet Builder", icon: "LM", desc: "Creates a free guide concept that attracts your ideal customer.", how: "Tell me your business and your ideal customer's biggest problem. I'll create the title, outline, and hook.", placeholder: "I run a dental office. My ideal customer's biggest problem is being afraid of the dentist and not knowing what treatments cost.", system: "You are a lead generation expert for small businesses. Create: 1) A compelling lead magnet title, 2) A 5-point outline, 3) A short promotional hook. Make it specific to their business. Under 300 words." },
  { id: "s4", title: "Follow-Up Writer", icon: "FU", desc: "Writes a complete 5-email follow-up sequence for cold leads.", how: "Tell me your service and what the lead originally asked about. I'll write all 5 emails ready to copy and paste.", placeholder: "My service is Invisalign at $4,500. The lead asked about pricing 2 weeks ago and hasn't responded.", system: "You are an expert email copywriter. Write a complete 5-email follow-up sequence. Each email has: Subject line, 3–5 sentence body, clear call to action. Emails get progressively shorter. Human tone, not salesy. Format each email clearly numbered." },
  { id: "s5", title: "Review Responder", icon: "RR", desc: "Writes professional responses to Google reviews in your voice.", how: "Paste the review and your business name. I'll write a response that builds trust with future customers.", placeholder: "Business: Cupo Dental Miami Beach\n\nReview: I had a great experience! Dr. Cupo was gentle and explained everything. Highly recommend!", system: "You are a reputation management expert. Write a warm, professional response to the Google review. If positive: thank them specifically and invite them back. If negative: acknowledge, apologize without admitting fault, offer to resolve offline. Under 100 words. Sound human, not corporate." },
  { id: "s6", title: "Sales Script Builder", icon: "SS", desc: "Word-for-word sales script for phone or in-person conversations.", how: "Tell me your service, price, and the objections you hear most. I'll write a script you can use tomorrow.", placeholder: "My service is Invisalign at $4,500. Patients usually say it's too expensive or they need to think about it.", system: "You are a sales training expert. Write a word-for-word sales script for phone or in-person use. Include: opening, 3 discovery questions, service presentation, handling the top 2 objections, and a natural close. Format it so they can follow along easily. Keep it conversational." }
];

async function askAI(messages, system) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system })
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text;
}

function TutorChat({ mod, onClose }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: mod.exercise }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError("");
    const history = [...msgs, { role: "user", content: text }];
    setMsgs(history);
    setInput("");
    setLoading(true);
    try {
      const apiMsgs = history.map(m => ({ role: m.role, content: m.content }));
      const reply = await askAI(
        apiMsgs,
        `You are an expert AI business coach teaching Module ${mod.id}: "${mod.title}" in a $99 course called "AI for Business Owners." Your student is a business owner who is a total beginner to AI. Be warm, direct, practical — zero jargon. Task: ${mod.exercise}. Always deliver a concrete, copyable output they can use TODAY. Max 300 words. End with one follow-up question or next step.`
      );
      setMsgs(p => [...p, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("Couldn't reach AI. Tap retry.");
    }
    setLoading(false);
  };

  const retry = () => {
    const lastUser = [...msgs].reverse().find(m => m.role === "user");
    if (!lastUser) return;
    setError("");
    setMsgs(p => p.filter((_, i) => i < p.length - 1));
    setInput(lastUser.content);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: BG, display: "flex", flexDirection: "column", height: "100dvh" }}>
      <div style={{ background: G1, borderBottom: `1px solid ${G2}`, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ color: Y, fontSize: "10px", letterSpacing: "2px", marginBottom: "3px", fontWeight: "800", fontFamily: "monospace" }}>AI TUTOR · MODULE {mod.id}</div>
          <div style={{ color: W, fontWeight: "700", fontSize: "15px" }}>{mod.title}</div>
        </div>
        <button onClick={onClose} style={{ background: G2, border: "none", color: "#aaa", width: "36px", height: "36px", borderRadius: "8px", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>

      <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "13px 16px", background: m.role === "user" ? Y : G2, color: m.role === "user" ? BG : W, borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap", wordBreak: "break-word", fontWeight: m.role === "user" ? "600" : "400" }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: "6px", padding: "13px 16px", background: G2, borderRadius: "18px", width: "fit-content" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: Y, animationDelay: `${i*0.18}s`, animation: "pulse 1.2s ease-in-out infinite" }} />)}
          </div>
        )}
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", background: "#180000", border: "1px solid #500", borderRadius: "12px" }}>
            <span style={{ color: "#f88", fontSize: "14px", flex: 1 }}>{error}</span>
            <button onClick={retry} style={{ background: Y, color: BG, border: "none", borderRadius: "8px", padding: "6px 14px", fontWeight: "800", fontSize: "13px", cursor: "pointer" }}>Retry</button>
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${G2}`, padding: "12px 16px", display: "flex", gap: "10px", background: G1, flexShrink: 0 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder={mod.placeholder} rows={2}
          style={{ flex: 1, background: G2, border: `1px solid ${G3}`, borderRadius: "10px", color: W, padding: "10px 14px", fontSize: "16px", resize: "none", lineHeight: "1.5", fontFamily: "-apple-system,sans-serif", outline: "none" }} />
        <button onClick={send} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? G2 : Y, color: loading || !input.trim() ? G3 : BG, border: "none", borderRadius: "10px", padding: "0 18px", cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontWeight: "800", fontSize: "14px", flexShrink: 0, minWidth: "64px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

function SkillTool({ skill, onClose }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!input.trim() || loading) return;
    setError(""); setResult(""); setLoading(true);
    try {
      const reply = await askAI([{ role: "user", content: input }], skill.system);
      setResult(reply);
    } catch (e) { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300, background: BG, display: "flex", flexDirection: "column", height: "100dvh" }}>
      <div style={{ background: G1, borderBottom: `1px solid ${G2}`, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ color: Y, fontSize: "10px", letterSpacing: "2px", marginBottom: "3px", fontWeight: "800", fontFamily: "monospace" }}>AI SKILL TOOL</div>
          <div style={{ color: W, fontWeight: "700", fontSize: "15px" }}>{skill.title}</div>
        </div>
        <button onClick={onClose} style={{ background: G2, border: "none", color: "#aaa", width: "36px", height: "36px", borderRadius: "8px", cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
        <div style={{ background: G1, border: `1px solid ${G2}`, borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
          <div style={{ color: Y, fontSize: "9px", letterSpacing: "2px", fontFamily: "monospace", fontWeight: "800", marginBottom: "8px" }}>HOW IT WORKS</div>
          <div style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6" }}>{skill.how}</div>
        </div>
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={skill.placeholder} rows={4}
          style={{ width: "100%", background: G2, border: `1px solid ${G3}`, borderRadius: "10px", color: W, padding: "14px", fontSize: "16px", resize: "none", lineHeight: "1.55", fontFamily: "-apple-system,sans-serif", outline: "none", marginBottom: "12px" }} />
        <button onClick={run} disabled={loading || !input.trim()} style={{ width: "100%", background: loading || !input.trim() ? G2 : Y, color: loading || !input.trim() ? G3 : BG, border: "none", padding: "16px", borderRadius: "12px", fontSize: "16px", fontWeight: "800", cursor: loading || !input.trim() ? "not-allowed" : "pointer", marginBottom: "16px" }}>
          {loading ? "Working..." : "Generate →"}
        </button>
        {loading && (
          <div style={{ display: "flex", gap: "6px", padding: "16px", background: G2, borderRadius: "12px", width: "fit-content", marginBottom: "12px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: Y, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${i*0.18}s` }} />)}
          </div>
        )}
        {error && <div style={{ color: "#f88", fontSize: "14px", padding: "12px", background: "#180000", border: "1px solid #400", borderRadius: "10px", marginBottom: "12px" }}>{error}</div>}
        {result && (
          <div style={{ background: G1, border: `1px solid ${G2}`, borderRadius: "12px", padding: "20px" }}>
            <div style={{ color: Y, fontSize: "9px", letterSpacing: "2px", fontFamily: "monospace", fontWeight: "800", marginBottom: "12px" }}>YOUR RESULT — COPY AND USE THIS</div>
            <div style={{ color: W, fontSize: "14px", lineHeight: "1.75", whiteSpace: "pre-wrap" }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [active, setActive] = useState(null);
  const [done, setDone] = useState({});
  const [tutor, setTutor] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [tab, setTab] = useState("modules");
  const totalDone = Object.values(done).filter(Boolean).length;

  const goModule = (mod, idx) => {
    if (idx > 0 && !done[idx - 1]) return;
    setActive({ mod, idx }); setScreen("lesson");
  };

  const markDone = () => {
    const { idx } = active;
    setDone(p => ({ ...p, [idx]: true }));
    const next = MODULES[idx + 1];
    if (next) setActive({ mod: next, idx: idx + 1 });
    else { setScreen("list"); setTab("skills"); }
  };

  const base = { minHeight: "100dvh", background: BG, color: W, fontFamily: "-apple-system,'Helvetica Neue',sans-serif" };

  if (screen === "home") return (
    <div style={base}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0} input,textarea{font-size:16px!important} @keyframes pulse{0%,100%{opacity:.2;transform:scale(.65)}50%{opacity:1;transform:scale(1)}} @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} ::-webkit-scrollbar{width:0}`}</style>
      <div style={{ maxWidth: "440px", margin: "0 auto", padding: "52px 22px 72px", animation: "up .5s ease" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#0f0f00", border: `1px solid ${Y}`, borderRadius: "20px", padding: "5px 14px", marginBottom: "32px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: Y }} />
          <span style={{ color: Y, fontSize: "10px", letterSpacing: "2px", fontWeight: "800", fontFamily: "monospace" }}>5 MODULES · 6 AI SKILL TOOLS</span>
        </div>
        <h1 style={{ fontSize: "42px", fontWeight: "800", lineHeight: "1.05", marginBottom: "16px", letterSpacing: "-1px" }}>AI for<br /><span style={{ color: Y }}>Business Owners</span></h1>
        <p style={{ color: GM, fontSize: "16px", lineHeight: "1.7", marginBottom: "36px" }}>Automate your work and generate more leads — even if you've never used AI before.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "40px" }}>
          {["No tech experience needed — if you can type, you can do this","Walk away with real prompts you use in your business today","Every module has a live AI tutor built for your specific business","6 AI skill tools you keep forever: emails, content, scripts & more"].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#0f0f00", border: `1px solid ${Y}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                <span style={{ color: Y, fontSize: "10px" }}>✓</span>
              </div>
              <span style={{ color: "#ccc", fontSize: "15px", lineHeight: "1.55" }}>{t}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "32px" }}>
          {[["2,400+","Students"],["4.9","Rating"],["$99","One-time"]].map(([v,l]) => (
            <div key={l} style={{ background: G1, border: `1px solid ${G2}`, borderRadius: "10px", padding: "16px 10px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontWeight: "800", color: W, marginBottom: "4px" }}>{v}</div>
              <div style={{ color: GM, fontSize: "9px", letterSpacing: "1px", fontFamily: "monospace" }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setScreen("list")} style={{ width: "100%", background: Y, color: BG, border: "none", padding: "18px", borderRadius: "12px", fontSize: "16px", fontWeight: "800", cursor: "pointer" }}>Start the Course →</button>
        <div style={{ textAlign: "center", color: G3, fontSize: "11px", marginTop: "10px" }}>~2 hours · self-paced · yours forever</div>
      </div>
    </div>
  );

  if (screen === "list") return (
    <div style={base}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0} input,textarea{font-size:16px!important} @keyframes pulse{0%,100%{opacity:.2;transform:scale(.65)}50%{opacity:1;transform:scale(1)}} @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} ::-webkit-scrollbar{width:0}`}</style>
      <div style={{ background: G1, borderBottom: `1px solid ${G2}`, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <div style={{ width: "28px", height: "28px", background: Y, borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", fontSize: "11px", color: BG, fontFamily: "monospace" }}>AI</div>
          <span style={{ fontWeight: "700", fontSize: "15px" }}>AI for Business</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "72px", height: "4px", background: G2, borderRadius: "2px" }}>
            <div style={{ width: `${(totalDone / MODULES.length) * 100}%`, height: "100%", background: Y, borderRadius: "2px", transition: "width .4s" }} />
          </div>
          <span style={{ color: GM, fontSize: "12px", fontWeight: "700" }}>{totalDone}/{MODULES.length}</span>
        </div>
      </div>
      <div style={{ display: "flex", background: G1, borderBottom: `1px solid ${G2}` }}>
        {["modules","skills"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "13px 0", background: "none", border: "none", borderBottom: `2px solid ${tab === t ? Y : "transparent"}`, color: tab === t ? Y : GM, fontWeight: "700", fontSize: "12px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px", fontFamily: "monospace" }}>
            {t === "modules" ? "Modules" : "Skill Tools"}
          </button>
        ))}
      </div>
      <div style={{ maxWidth: "440px", margin: "0 auto", padding: "20px 16px 60px", animation: "up .3s ease" }}>
        {tab === "modules" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {MODULES.map((mod, idx) => {
              const locked = idx > 0 && !done[idx - 1];
              const isDone = done[idx];
              return (
                <div key={mod.id} onClick={() => goModule(mod, idx)} style={{ background: G1, border: `1px solid ${isDone ? "#2a2a00" : locked ? G1 : G2}`, borderRadius: "12px", padding: "16px", display: "flex", gap: "13px", alignItems: "center", cursor: locked ? "not-allowed" : "pointer", opacity: locked ? 0.35 : 1 }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: isDone ? "#1a1a00" : G2, border: `1px solid ${isDone ? Y : G3}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: isDone ? "16px" : "13px", fontWeight: "900", color: isDone ? Y : GM, flexShrink: 0 }}>
                    {isDone ? "✓" : mod.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: GM, fontSize: "9px", letterSpacing: "1px", marginBottom: "3px", fontFamily: "monospace" }}>MODULE {mod.id} · {mod.duration}</div>
                    <div style={{ color: isDone ? GM : W, fontWeight: "700", fontSize: "15px", marginBottom: "2px" }}>{mod.title}</div>
                    <div style={{ color: G3, fontSize: "12px" }}>{mod.tagline}</div>
                  </div>
                  <div style={{ color: G3, fontSize: "22px", flexShrink: 0 }}>{locked ? "—" : "›"}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ color: GM, fontSize: "13px", marginBottom: "6px" }}>Six AI tools built for your business. Tap any to use it now.</p>
            {SKILLS.map(skill => (
              <div key={skill.id} onClick={() => setActiveTool(skill)} style={{ background: G1, border: `1px solid ${G2}`, borderRadius: "12px", padding: "16px", display: "flex", gap: "13px", alignItems: "center", cursor: "pointer" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: G2, border: `1px solid ${G3}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "11px", fontWeight: "900", color: Y, flexShrink: 0 }}>{skill.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: W, fontWeight: "700", fontSize: "15px", marginBottom: "3px" }}>{skill.title}</div>
                  <div style={{ color: G3, fontSize: "12px", lineHeight: "1.4" }}>{skill.desc}</div>
                </div>
                <div style={{ color: G3, fontSize: "22px", flexShrink: 0 }}>›</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {activeTool && <SkillTool skill={activeTool} onClose={() => setActiveTool(null)} />}
    </div>
  );

  if (screen === "lesson" && active) {
    const { mod, idx } = active;
    return (
      <div style={base}>
        <style>{`*{box-sizing:border-box;margin:0;padding:0} input,textarea{font-size:16px!important} @keyframes pulse{0%,100%{opacity:.2;transform:scale(.65)}50%{opacity:1;transform:scale(1)}} @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} ::-webkit-scrollbar{width:0}`}</style>
        <div style={{ background: G1, borderBottom: `1px solid ${G2}`, padding: "13px 18px", display: "flex", alignItems: "center", gap: "12px", position: "sticky", top: 0, zIndex: 10 }}>
          <button onClick={() => setScreen("list")} style={{ background: G2, border: "none", color: "#aaa", width: "32px", height: "32px", borderRadius: "8px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: Y, fontSize: "9px", letterSpacing: "2px", marginBottom: "1px", fontFamily: "monospace", fontWeight: "800" }}>MODULE {mod.id}</div>
            <div style={{ color: W, fontWeight: "700", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mod.title}</div>
          </div>
          <div style={{ width: "34px", height: "34px", background: G2, border: `1px solid ${G3}`, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontSize: "11px", fontWeight: "900", color: Y, flexShrink: 0 }}>{mod.icon}</div>
        </div>
        <div style={{ maxWidth: "440px", margin: "0 auto", padding: "20px 16px 64px", animation: "up .3s ease" }}>
          <p style={{ color: GM, fontSize: "14px", fontStyle: "italic", marginBottom: "22px", lineHeight: "1.5" }}>{mod.tagline}</p>
          <div style={{ background: G1, border: `1px solid ${G2}`, borderRadius: "12px", padding: "22px", marginBottom: "18px" }}>
            <div style={{ color: Y, fontSize: "9px", letterSpacing: "2px", marginBottom: "16px", fontFamily: "monospace", fontWeight: "800" }}>THE LESSON</div>
            {mod.lesson.split('\n\n').map((para, i) => {
              const isH = para === para.toUpperCase() && para.length < 90 && !para.includes('.') && para.trim().length > 3;
              return <div key={i} style={{ color: isH ? W : "#aaa", fontSize: isH ? "10px" : "15px", fontWeight: isH ? "800" : "400", letterSpacing: isH ? "1.5px" : "normal", fontFamily: isH ? "monospace" : "inherit", lineHeight: "1.75", marginBottom: "14px" }}>{para}</div>;
            })}
          </div>
          <button onClick={() => setTutor(true)} style={{ width: "100%", background: Y, color: BG, border: "none", padding: "17px", borderRadius: "12px", fontSize: "16px", fontWeight: "800", cursor: "pointer", marginBottom: "10px" }}>Practice with AI Tutor →</button>
          <button onClick={markDone} style={{ width: "100%", background: "transparent", color: GM, border: `1px solid ${G2}`, padding: "14px", borderRadius: "12px", fontSize: "14px", cursor: "pointer" }}>
            {done[idx] ? "✓ Completed — Next Module" : "Mark Complete & Continue"}
          </button>
        </div>
        {tutor && <TutorChat mod={mod} onClose={() => setTutor(false)} />}
      </div>
    );
  }

  return null;
}
