import { useState, useRef, useEffect } from "react";

const Y = "#FFE500";
const BG = "#000";
const W = "#fff";
const G1 = "#111";
const G2 = "#1a1a1a";
const G3 = "#2a2a2a";
const GM = "#666";
const READY = "[[READY_TO_ADVANCE]]";

const CSS = `*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}html,body{background:#000;height:100%}input,textarea,select{font-size:16px!important}@keyframes pulse{0%,100%{opacity:.2;transform:scale(.65)}50%{opacity:1;transform:scale(1)}}@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@keyframes glow{0%,100%{box-shadow:0 0 12px #FFE50055}50%{box-shadow:0 0 28px #FFE500bb}}::-webkit-scrollbar{width:0}`;

const MODULES = [
  {
    id: 1, icon: "01", title: "What AI Actually Is",
    subtitle: "How it thinks, what it can't do, why it matters now",
    teachingGoals: ["Understand AI is a prediction engine, not magic", "Know the difference between AI types", "Understand why now is the right time", "Clear up the biggest misconceptions"],
    systemPrompt: (p) => `You are Kai, an expert AI teacher. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 1: What AI Actually Is.
Rules: Conversational. One question at a time. Use ${p.industry} examples. Under 120 words per message.

Flow:
1. Ask what they think AI is
2. Correct misconceptions — AI is a pattern/prediction engine
3. Use a ${p.industry} analogy
4. Explain difference between AI tools
5. Why NOW is critical for ${p.industry} business owners
6. Check understanding
7. When they demonstrate solid understanding of all concepts, end your message with exactly: ${READY}

Start: briefly introduce yourself and ask what they think AI is.`
  },
  {
    id: 2, icon: "02", title: "Setting Up Claude Properly",
    subtitle: "Account, plans, Projects vs regular chat, usage, and custom instructions",
    teachingGoals: ["Choose the right Claude plan", "Understand Projects vs regular chat and when to use each", "Know how usage works so you never get surprised", "Configure custom instructions", "Understand memory, artifacts, and file uploads"],
    systemPrompt: (p) => `You are Kai, an expert AI teacher. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 2: Setting Up Claude the Right Way.
Rules: Under 120 words per message. Use ${p.industry} examples.

Flow:
1. Ask if they have a Claude account
2. Explain plans: Free (limited), Pro ($20/mo best for most), Team (for teams). Recommend Pro.
3. Teach Custom Instructions: tell Claude about yourself once. Help them write their own for ${p.business}.
4. CRITICAL — Teach Projects vs Regular Chat BEFORE they create a Project:
   - Regular chat = just your prompt. Fast, lightweight, low token usage.
   - Projects = your prompt + ALL uploaded docs + custom instructions loaded into EVERY message. Uses 3-5x more tokens per message.
   - USE PROJECTS FOR: ongoing work needing business context — writing, strategy, consistent tone.
   - USE REGULAR CHAT FOR: one-off tasks, quick questions, testing prompts, anything not needing context.
   - PRO RULE: Keep Projects lean. Only upload what Claude truly needs. Every document gets read with EVERY message.
   - SMART HABIT: Test prompts in regular chat first, then bring the best ones into your Project.
5. Teach usage dashboard: Go to claude.ai, click profile icon, then Usage. Shows monthly limit used. Check it weekly. If burning through usage fast, you are probably over-using Projects for tasks that do not need them.
6. Now walk them through creating a lean Project for ${p.business}
7. Teach Memory across conversations in Projects
8. Teach Artifacts: documents, code, charts Claude creates directly
9. Teach file uploads: PDFs, images, documents
10. When they understand all of this especially Projects vs regular chat, end with: ${READY}`
  },
  {
    id: 3, icon: "03", title: "Writing Prompts That Actually Work",
    subtitle: "The Role + Task + Context formula with live practice",
    teachingGoals: ["Understand the 3-part prompt formula", "Know why vague prompts fail", "Write a great prompt for their business", "Learn to iterate and improve"],
    systemPrompt: (p) => `You are Kai, an expert AI teacher. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 3: Writing Prompts That Actually Work.
Rules: Under 120 words.

Flow:
1. Ask them to type a prompt for their ${p.industry} business right now — no explanation yet
2. Show what's missing using Role + Task + Context
3. Rewrite their prompt showing each part
4. Explain WHY each part matters with ${p.industry} example
5. Have them write an improved prompt
6. Give specific feedback
7. Teach iteration
8. Give 3 ready-to-use templates for ${p.industry}
9. When they've written a genuinely good prompt, end with: ${READY}`
  },
  {
    id: 4, icon: "04", title: "Automate Your Repetitive Work",
    subtitle: "Build a reusable prompt library for your business",
    teachingGoals: ["Identify top repetitive tasks", "Build a saved prompt for each", "Use Claude Projects as a prompt library", "Create a weekly AI workflow"],
    systemPrompt: (p) => `You are Kai, an expert AI teacher. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 4: Automate Your Repetitive Work.
Rules: Under 120 words. Build real copyable prompts.

Flow:
1. Ask: most repetitive weekly task in ${p.industry}?
2. Build a reusable prompt for that task live
3. Explain saving in Claude Projects
4. Ask about second most repetitive task, build that too
5. Teach the prompt library concept
6. Suggest 3 more prompts for ${p.industry}
7. Teach Monday morning AI routine: 20-min weekly workflow
8. When they have 2+ real saved prompts and understand the system, end with: ${READY}`
  },
  {
    id: 5, icon: "05", title: "Generate More Leads with AI",
    subtitle: "Lead magnets, outreach, and follow-up sequences",
    teachingGoals: ["Define their ideal lead precisely", "Create a lead magnet concept", "Write outreach messages", "Build a follow-up sequence"],
    systemPrompt: (p) => `You are Kai, an expert AI teacher. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 5: Generate More Leads with AI.
Rules: Under 120 words. Build real assets.

Flow:
1. Ask: who is their ideal customer for ${p.business}?
2. Push for specificity — demographics, pain points, where they hang out
3. Build a lead magnet concept for their business
4. Write an actual outreach message for ${p.industry}
5. Explain follow-up sequences: most sales at follow-up 5-8
6. Write a 3-email follow-up sequence
7. Teach 30 days of content in one session
8. When they have: ideal customer + lead magnet + outreach + email sequence, end with: ${READY}`
  },
  {
    id: 6, icon: "06", title: "Claude for Teams and Cowork",
    subtitle: "Collaborate, share projects, automate with Cowork",
    teachingGoals: ["Understand Claude Team plan", "Share Projects with teammates", "Use Cowork for automation", "Build team AI workflows"],
    systemPrompt: (p) => `You are Kai, an expert AI teacher. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 6: Claude for Teams and Cowork.
Rules: Under 120 words. Practical ${p.industry} examples.

Flow:
1. Ask: do they have a team or just them?
2. Teach Claude Team plan: shared Projects, analytics, centralized billing
3. Teach how to share a Project and set permissions
4. Teach Cowork: Anthropic desktop tool for non-developers to automate file/task management
5. Give specific Cowork use cases for ${p.industry}
6. Build a team workflow for ${p.business}
7. Teach prompt standardization across a team
8. Give Team AI Setup Checklist for ${p.industry}
9. When they understand team collaboration and Cowork, end with: ${READY}`
  },
  {
    id: 7, icon: "07", title: "Claude Code — Build Without Coding",
    subtitle: "Create real tools for your business, no developer needed",
    teachingGoals: ["Understand what Claude Code can build", "Install and set up Claude Code", "Build an automation for their business", "Know when to use Claude Code vs other tools"],
    systemPrompt: (p) => `You are Kai, an expert AI teacher. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 7: Claude Code — Build Without Coding.
Rules: Under 120 words. Make coding feel accessible.

Flow:
1. Start: "You don't need to learn to code. You need to learn to direct."
2. Explain Claude Code: command-line tool where Claude writes and runs code FOR you
3. What it can build for ${p.industry}: automations, data tools, apps, website tools
4. Installation: needs Node.js. Command: npm install -g @anthropic-ai/claude-code
5. Teach mental model: describe what you want in plain English
6. Give 3 specific things to build for ${p.business}
7. Walk through one example prompt
8. Teach when to use Claude Code vs Zapier vs Make
9. When they understand and have clear use cases, end with: ${READY}`
  },
  {
    id: 8, icon: "08", title: "Build Your Agentic AI Workflow",
    subtitle: "Your AI works for you 24/7 — we build it together now",
    teachingGoals: ["Understand agentic AI", "Map a full automated workflow", "Connect Claude to other tools", "Deploy a system that runs without them"],
    systemPrompt: (p) => `You are Kai — AI teacher AND agent. Teaching ${p.name} who runs ${p.business} in ${p.industry}. Goal: ${p.goal}.

MODULE 8: Build Your Agentic AI Workflow. YOU ARE NOW AN AGENT — not just a teacher.
Rules: Under 150 words. Build the actual workflow.

Flow:
1. Explain: "I'm now acting as your AI agent — we're BUILDING your workflow right now."
2. Ask: what's the one process they most want to automate?
3. Map the FULL workflow: trigger, each step, tools, output
4. Write every AI prompt needed
5. Give specific Zapier/Make instructions
6. Identify where Claude Code would help
7. Give complete deployment checklist
8. Write a monthly maintenance prompt
9. End: "You now have a working agentic workflow. This runs 24/7 without you."
10. When complete workflow is mapped and they understand deployment, end with: ${READY}`
  }
];

async function askAI(messages, system) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system })
  });
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  if (!data.text) throw new Error('No response');
  return data.text;
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '5px', padding: '12px 16px', background: G2, borderRadius: '16px', width: 'fit-content' }}>
      {[0,1,2].map(i => <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: Y, animation: 'pulse 1.2s ease-in-out infinite', animationDelay: `${i*0.18}s` }} />)}
    </div>
  );
}

// Modal for changing goal
function ChangeGoalModal({ currentGoal, onSave, onClose }) {
  const [val, setVal] = useState(currentGoal || '');
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: G1, border: `1px solid ${G3}`, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px' }}>
        <div style={{ color: Y, fontSize: '10px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: '800', marginBottom: '8px' }}>UPDATE YOUR GOAL</div>
        <div style={{ color: GM, fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>Your goal shapes how Kai teaches you. Update it anytime.</div>
        <textarea value={val} onChange={e => setVal(e.target.value)}
          placeholder="e.g. Double my revenue from $45k to $100k/month"
          rows={3}
          style={{ width: '100%', background: G2, border: `1px solid ${G3}`, borderRadius: '10px', color: W, padding: '12px 14px', fontSize: '16px', resize: 'none', fontFamily: '-apple-system,sans-serif', outline: 'none', marginBottom: '16px' }}
          autoFocus
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '13px', background: 'transparent', color: GM, border: `1px solid ${G3}`, borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => val.trim() && onSave(val.trim())} disabled={!val.trim()} style={{ flex: 1, padding: '13px', background: val.trim() ? Y : G3, color: val.trim() ? BG : GM, border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '800', cursor: val.trim() ? 'pointer' : 'not-allowed' }}>Save Goal</button>
        </div>
      </div>
    </div>
  );
}

// Confirm modal for destructive actions
function ConfirmModal({ message, onConfirm, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: G1, border: `1px solid ${G3}`, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '380px' }}>
        <div style={{ color: W, fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>{message}</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '13px', background: 'transparent', color: GM, border: `1px solid ${G3}`, borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '13px', background: '#ff4444', color: W, border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>Yes, do it</button>
        </div>
      </div>
    </div>
  );
}

function ChatLesson({ module, profile, onComplete, isCompleted, onBack, onChangeGoal, onResetAll }) {
  const storageKey = `kai_msgs_${module.id}`;
  const [msgs, setMsgs] = useState(() => {
    try { const s = localStorage.getItem(storageKey); if (s) return JSON.parse(s); } catch(e) {}
    return [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(() => {
    try { return !!localStorage.getItem(storageKey); } catch(e) { return false; }
  });
  const [readyToAdvance, setReadyToAdvance] = useState(isCompleted || false);
  const [showMenu, setShowMenu] = useState(false);
  const [showChangeGoal, setShowChangeGoal] = useState(false);
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs, loading]);

  useEffect(() => {
    if (started && inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
  }, [started]);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const save = (m) => { try { localStorage.setItem(storageKey, JSON.stringify(m)); } catch(e) {} };

  const sys = module.systemPrompt(profile) + `\n\nCRITICAL INSTRUCTION: Always refer to Claude specifically, never ChatGPT or other AI tools unless directly comparing them. This is a Claude course. When telling students to practice, always say "in Claude" not "in ChatGPT".\n\nWhen the student has clearly demonstrated understanding of ALL teaching goals, end your message with this exact token on its own line: ${READY}\nDo NOT include this token until they genuinely understand everything. It unlocks the Complete button.`;

  const startLesson = async () => {
    setStarted(true); setLoading(true);
    try {
      const reply = await askAI([{ role: 'user', content: 'Start the lesson.' }], sys);
      const hasSignal = reply.includes(READY);
      const cleaned = reply.replace(READY, '').trim();
      const newMsgs = [{ role: 'assistant', content: cleaned }];
      setMsgs(newMsgs); save(newMsgs);
      if (hasSignal) setReadyToAdvance(true);
    } catch(e) {
      setMsgs([{ role: 'assistant', content: 'Something went wrong. Please try again.' }]);
    }
    setLoading(false);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const updated = [...msgs, { role: 'user', content: text }];
    setMsgs(updated); save(updated); setInput(''); setLoading(true);
    try {
      const reply = await askAI(updated, sys);
      const hasSignal = reply.includes(READY);
      const cleaned = reply.replace(READY, '').trim();
      const final = [...updated, { role: 'assistant', content: cleaned }];
      setMsgs(final); save(final);
      if (hasSignal) setReadyToAdvance(true);
    } catch(e) {
      const err = [...updated, { role: 'assistant', content: 'Connection error. Please try again.' }];
      setMsgs(err); save(err);
    }
    setLoading(false);
  };

  const doRestart = () => {
    try { localStorage.removeItem(storageKey); } catch(e) {}
    setMsgs([]); setStarted(false); setReadyToAdvance(false);
    setShowConfirmRestart(false);
  };

  if (!started) return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center', overflowY: 'auto' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: G2, border: `1px solid ${G3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '20px', fontWeight: '900', color: Y, marginBottom: '20px' }}>{module.icon}</div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>{module.title}</h2>
        <p style={{ color: GM, fontSize: '14px', marginBottom: '28px', lineHeight: '1.6' }}>{module.subtitle}</p>
        <div style={{ background: G1, border: `1px solid ${G2}`, borderRadius: '12px', padding: '18px 20px', marginBottom: '28px', textAlign: 'left', width: '100%', maxWidth: '400px' }}>
          <div style={{ color: Y, fontSize: '9px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: '800', marginBottom: '12px' }}>IN THIS LESSON</div>
          {module.teachingGoals.map((g, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0f0f00', border: `1px solid ${Y}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                <span style={{ color: Y, fontSize: '8px' }}>✓</span>
              </div>
              <span style={{ color: '#bbb', fontSize: '13px', lineHeight: '1.5' }}>{g}</span>
            </div>
          ))}
        </div>
        <button onClick={startLesson} style={{ background: Y, color: BG, border: 'none', padding: '16px 48px', borderRadius: '12px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', width: '100%', maxWidth: '400px' }}>
          {isCompleted ? 'Review This Lesson →' : 'Start Lesson →'}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Messages */}
      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', animation: 'up 0.2s ease' }}>
            {m.role === 'assistant' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: G2, border: `1px solid ${Y}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '14px', fontWeight: '900', color: Y, flexShrink: 0, marginRight: '10px', marginTop: '2px' }}>K</div>
            )}
            <div style={{ maxWidth: '80%', padding: '12px 16px', background: m.role === 'user' ? Y : G2, color: m.role === 'user' ? BG : W, borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: '14px', lineHeight: '1.65', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontWeight: m.role === 'user' ? '600' : '400' }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: G2, border: `1px solid ${Y}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '14px', fontWeight: '900', color: Y, flexShrink: 0 }}>K</div>
            <TypingIndicator />
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: `1px solid ${G2}`, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px', background: G1, flexShrink: 0 }}>
        {/* Input row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type your answer here..."
            rows={2}
            style={{ flex: 1, background: G2, border: `1px solid ${G3}`, borderRadius: '10px', color: W, padding: '10px 14px', fontSize: '16px', resize: 'none', lineHeight: '1.5', fontFamily: '-apple-system,sans-serif', outline: 'none' }}
          />
          <button onClick={send} disabled={loading || !input.trim()}
            style={{ background: loading || !input.trim() ? G3 : Y, color: loading || !input.trim() ? GM : BG, border: 'none', borderRadius: '10px', padding: '0 16px', height: '52px', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>
            Send
          </button>
        </div>

        {/* Action row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Options button */}
          <div ref={menuRef} style={{ position: 'relative', flexShrink: 0 }}>
            <button onClick={() => setShowMenu(o => !o)}
              style={{ background: showMenu ? G3 : G2, border: `1px solid ${G3}`, color: W, width: '40px', height: '40px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ⋯
            </button>
            {showMenu && (
              <div style={{ position: 'absolute', bottom: '48px', left: 0, background: G1, border: `1px solid ${G3}`, borderRadius: '12px', overflow: 'hidden', minWidth: '210px', zIndex: 50, boxShadow: '0 -4px 24px rgba(0,0,0,0.7)' }}>
                <div style={{ padding: '10px 14px', color: GM, fontSize: '10px', letterSpacing: '1px', fontFamily: 'monospace', borderBottom: `1px solid ${G3}` }}>OPTIONS</div>
                <button onClick={() => { setShowMenu(false); onBack(); }}
                  style={{ width: '100%', padding: '13px 16px', background: 'none', border: 'none', borderBottom: `1px solid ${G3}`, color: W, fontSize: '14px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>←</span><span>Back to Modules</span>
                </button>
                <button onClick={() => { setShowMenu(false); setShowConfirmRestart(true); }}
                  style={{ width: '100%', padding: '13px 16px', background: 'none', border: 'none', borderBottom: `1px solid ${G3}`, color: W, fontSize: '14px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>↺</span><span>Restart This Module</span>
                </button>
                <button onClick={() => { setShowMenu(false); setShowChangeGoal(true); }}
                  style={{ width: '100%', padding: '13px 16px', background: 'none', border: 'none', borderBottom: `1px solid ${G3}`, color: W, fontSize: '14px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>✎</span><span>Change My Goal</span>
                </button>
                <button onClick={() => { setShowMenu(false); setShowConfirmReset(true); }}
                  style={{ width: '100%', padding: '13px 16px', background: 'none', border: 'none', color: '#ff6b6b', fontSize: '14px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>⚠</span><span>Start Over Completely</span>
                </button>
              </div>
            )}
          </div>

          {/* Complete button */}
          {!isCompleted ? (
            <button onClick={readyToAdvance ? onComplete : undefined} disabled={!readyToAdvance}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '0.3px', cursor: readyToAdvance ? 'pointer' : 'not-allowed', border: readyToAdvance ? 'none' : `1px solid ${G3}`, background: readyToAdvance ? Y : 'transparent', color: readyToAdvance ? BG : GM, transition: 'all 0.4s', animation: readyToAdvance ? 'glow 2s ease-in-out infinite' : 'none' }}>
              {readyToAdvance ? '✓ COMPLETE & CONTINUE →' : "Kai will unlock this when you're ready"}
            </button>
          ) : (
            <button onClick={onComplete}
              style={{ flex: 1, padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '800', fontFamily: 'monospace', cursor: 'pointer', border: 'none', background: Y, color: BG }}>
              NEXT MODULE →
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      {showChangeGoal && (
        <ChangeGoalModal
          currentGoal={profile.goal}
          onSave={(newGoal) => { onChangeGoal(newGoal); setShowChangeGoal(false); }}
          onClose={() => setShowChangeGoal(false)}
        />
      )}
      {showConfirmRestart && (
        <ConfirmModal
          message="This will clear your conversation for this module and start it fresh. Your progress on other modules is safe."
          onConfirm={doRestart}
          onClose={() => setShowConfirmRestart(false)}
        />
      )}
      {showConfirmReset && (
        <ConfirmModal
          message="This will erase ALL your progress — every module, every conversation — and take you back to the beginning. Are you sure?"
          onConfirm={() => { setShowConfirmReset(false); onResetAll(); }}
          onClose={() => setShowConfirmReset(false)}
        />
      )}
    </div>
  );
}

function Landing({ onEnter }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ minHeight: '100dvh', background: BG, color: W, fontFamily: "-apple-system,'Helvetica Neue',sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <style>{CSS + `
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>

      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,229,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,229,0,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      {/* Top bar */}
      <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', background: Y, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '22px', color: BG, fontFamily: 'monospace' }}>K</div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px', color: W }}>Powered by Kai AI</div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 24px 40px', textAlign: 'center', position: 'relative', zIndex: 1, opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease' }}>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#0f0f00', border: `1px solid ${Y}`, borderRadius: '20px', padding: '9px 22px', marginBottom: '36px', animation: 'slideUp 0.5s ease 0.1s both' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: Y, animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ color: Y, fontSize: '15px', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '2px' }}>AI MASTERY COURSE · 8 MODULES</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(72px, 14vw, 140px)', fontWeight: '900', lineHeight: '0.9', letterSpacing: '-4px', marginBottom: '6px', animation: 'slideUp 0.5s ease 0.15s both' }}>
          10x
        </h1>
        <h1 style={{ fontSize: 'clamp(72px, 14vw, 140px)', fontWeight: '900', lineHeight: '0.9', letterSpacing: '-4px', marginBottom: '6px', backgroundImage: `linear-gradient(90deg, ${Y}, #fff, ${Y})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 3s linear infinite' }}>
          THAT
        </h1>
        <h1 style={{ fontSize: 'clamp(72px, 14vw, 140px)', fontWeight: '900', lineHeight: '0.9', letterSpacing: '-4px', marginBottom: '40px', animation: 'slideUp 0.5s ease 0.25s both' }}>
          SH*T.
        </h1>

        {/* Subtitle */}
        <p style={{ color: '#aaa', fontSize: 'clamp(16px, 2.5vw, 20px)', lineHeight: '1.65', maxWidth: '520px', marginBottom: '48px', animation: 'slideUp 0.5s ease 0.3s both' }}>
          The complete AI course for business owners. Automate your work, generate more leads, and build systems that run without you — taught by Kai, your personal AI teacher.
        </p>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', animation: 'slideUp 0.5s ease 0.35s both', flexWrap: 'nowrap', justifyContent: 'center', alignItems: 'flex-end' }}>
          {[['8', 'Modules'], ['~2hrs', 'Total Time'], ['1', 'AI Teacher'], ['∞', 'Replays']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center', minWidth: '64px' }}>
              <div style={{ fontSize: '30px', fontWeight: '900', color: W, letterSpacing: '-1px', lineHeight: 1 }}>{val}</div>
              <div style={{ color: GM, fontSize: '10px', fontFamily: 'monospace', letterSpacing: '1px', marginTop: '4px' }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={onEnter}
          style={{ background: Y, color: BG, border: 'none', padding: '22px 0', borderRadius: '14px', fontSize: '20px', fontWeight: '900', cursor: 'pointer', letterSpacing: '-0.3px', animation: 'glow 2s ease-in-out infinite', marginBottom: '20px', width: '100%', maxWidth: '420px' }}>
          Buy Now — $99
        </button>
        <p style={{ color: GM, fontSize: '15px', animation: 'slideUp 0.5s ease 0.45s both', letterSpacing: '0.2px' }}>
          Self-paced · Personalized to your business · Yours forever
        </p>
      </div>

      {/* What you'll learn strip */}
      <div style={{ borderTop: `1px solid ${G2}`, padding: '28px 32px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ color: Y, fontSize: '16px', fontFamily: 'monospace', letterSpacing: '3px', marginBottom: '24px', textAlign: 'center', fontWeight: '900', borderBottom: `1px solid ${G2}`, paddingBottom: '16px' }}>— WHAT YOU'LL LEARN —</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
            {[
              'What AI actually is',
              'Set up Claude like a pro',
              'Write prompts that work',
              'Automate repetitive work',
              'Generate more leads',
              'Claude for teams',
              'Build tools without coding',
              'Deploy agentic workflows'
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: Y, flexShrink: 0 }} />
                <span style={{ color: W, fontSize: '15px' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ name: '', business: '', industry: '', goal: '' });
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const questions = [
    { key: 'name', q: "First — what's your name?", placeholder: 'David' },
    { key: 'business', q: "Nice to meet you! What's your business? One sentence.", placeholder: 'I run a dental office in Miami Beach specializing in cosmetic dentistry' },
    { key: 'industry', q: "What industry are you in?", placeholder: 'Healthcare / Dental' },
    { key: 'goal', q: "What's your #1 business goal right now?", placeholder: 'Double my revenue from $45k to $100k/month' }
  ];
  const next = () => {
    if (!input.trim()) return;
    const updated = { ...answers, [questions[step].key]: input.trim() };
    setAnswers(updated); setInput('');
    if (step < questions.length - 1) {
      setStep(s => s + 1);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      onComplete(updated);
    }
  };

  const back = () => {
    if (step === 0) return;
    const prevKey = questions[step - 1].key;
    setInput(answers[prevKey] || '');
    setStep(s => s - 1);
    setTimeout(() => inputRef.current?.focus(), 50);
  };
  return (
    <div style={{ height: '100dvh', background: BG, color: W, fontFamily: "-apple-system,'Helvetica Neue',sans-serif", display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{CSS}</style>
      {/* Scrollable content area - scrolls up when keyboard opens */}
      <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px 24px 0' }}>
        <div style={{ maxWidth: '440px', width: '100%', margin: '0 auto', animation: 'up 0.4s ease' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingTop: '40px' }}>
            <div style={{ width: '44px', height: '44px', background: Y, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '22px', color: BG, fontFamily: 'monospace', flexShrink: 0 }}>K</div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '18px' }}>Kai</div>
              <div style={{ color: GM, fontSize: '13px' }}>Your AI Teacher</div>
            </div>
          </div>
          {/* Previous answers */}
          {step > 0 && Object.entries(answers).slice(0, step).map(([k, v]) => v && (
            <div key={k} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ background: Y, color: BG, padding: '10px 14px', borderRadius: '14px 14px 4px 14px', fontSize: '14px', fontWeight: '600', maxWidth: '80%' }}>{v}</div>
            </div>
          ))}
          {/* Kai message */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: G2, border: `1px solid ${Y}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '14px', fontWeight: '900', color: Y, flexShrink: 0, marginTop: '2px' }}>K</div>
            <div style={{ background: G2, padding: '14px 16px', borderRadius: '14px 14px 14px 4px', fontSize: '15px', lineHeight: '1.6', flex: 1 }}>
              {step === 0 ? `Hey! I'm Kai, your AI teacher. I'll teach you everything about AI and how to use it to grow your business — personalized just for you. ${questions[0].q}` : questions[step].q}
            </div>
          </div>
        </div>
      </div>
      {/* Input - fixed at bottom, always above keyboard */}
      <div style={{ background: G1, borderTop: `1px solid ${G2}`, padding: '12px 16px 24px', flexShrink: 0 }}>
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            {step > 0 && (
              <button
                onMouseDown={e => e.preventDefault()}
                onTouchStart={e => e.preventDefault()}
                onClick={back}
                style={{ background: G2, border: `1px solid ${G3}`, color: W, borderRadius: '10px', padding: '0 16px', cursor: 'pointer', fontWeight: '800', fontSize: '16px', flexShrink: 0 }}>←</button>
            )}
            <input value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); next(); } }}
              placeholder={questions[step].placeholder}
              style={{ flex: 1, background: G2, border: `1px solid ${G3}`, borderRadius: '10px', color: W, padding: '14px 16px', fontSize: '16px', fontFamily: '-apple-system,sans-serif', outline: 'none' }}
              ref={inputRef}
              autoFocus
            />
            <button
              onMouseDown={e => e.preventDefault()}
              onTouchStart={e => e.preventDefault()}
              onClick={next}
              disabled={!input.trim()}
              style={{ background: !input.trim() ? G3 : Y, color: !input.trim() ? GM : BG, border: 'none', borderRadius: '10px', padding: '0 20px', cursor: !input.trim() ? 'not-allowed' : 'pointer', fontWeight: '800', fontSize: '16px', flexShrink: 0 }}>→</button>
          </div>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
            {questions.map((_, i) => <div key={i} style={{ width: i === step ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === step ? Y : G3, transition: 'all 0.3s' }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditProfileModal({ profile, onSave, onClose }) {
  const [vals, setVals] = useState({ ...profile });
  const fields = [
    { key: 'name', label: 'Your Name', placeholder: 'David' },
    { key: 'business', label: 'Your Business', placeholder: 'I run a dental office in Miami Beach' },
    { key: 'industry', label: 'Your Industry', placeholder: 'Healthcare / Dental' },
    { key: 'goal', label: 'Your #1 Goal', placeholder: 'Double my revenue from $45k to $100k/month' }
  ];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ background: G1, border: `1px solid ${G3}`, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px', maxHeight: '90dvh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ color: Y, fontSize: '11px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: '800' }}>EDIT YOUR PROFILE</div>
          <button onClick={onClose} style={{ background: G2, border: 'none', color: '#aaa', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>×</button>
        </div>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: '16px' }}>
            <div style={{ color: GM, fontSize: '12px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '6px' }}>{f.label.toUpperCase()}</div>
            <input value={vals[f.key] || ''} onChange={e => setVals(p => ({ ...p, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              style={{ width: '100%', background: G2, border: `1px solid ${G3}`, borderRadius: '10px', color: W, padding: '12px 14px', fontSize: '16px', fontFamily: '-apple-system,sans-serif', outline: 'none' }} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '13px', background: 'transparent', color: GM, border: `1px solid ${G3}`, borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave(vals)} style={{ flex: 1, padding: '13px', background: Y, color: BG, border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [profile, setProfile] = useState(null);
  const [activeIdx, setActiveIdx] = useState(null);
  const [completed, setCompleted] = useState({});
  const [showEditProfile, setShowEditProfile] = useState(false);
  const totalDone = Object.values(completed).filter(Boolean).length;

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('kai_profile');
      const savedCompleted = localStorage.getItem('kai_completed');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
        setCompleted(savedCompleted ? JSON.parse(savedCompleted) : {});
        setPhase('course');
      } else {
        setPhase('landing');
      }
    } catch(e) {}
  }, []);

  const completeOnboarding = (p) => {
    setProfile(p); setPhase('course');
    try { localStorage.setItem('kai_profile', JSON.stringify(p)); } catch(e) {}
  };

  const openModule = (idx) => {
    if (idx > 0 && !completed[idx - 1]) return;
    setActiveIdx(idx); setPhase('lesson');
  };

  const completeModule = () => {
    const updated = { ...completed, [activeIdx]: true };
    setCompleted(updated);
    try { localStorage.setItem('kai_completed', JSON.stringify(updated)); } catch(e) {}
    const next = activeIdx + 1;
    if (next < MODULES.length) { setActiveIdx(next); }
    else { setPhase('course'); }
  };

  const changeGoal = (newGoal) => {
    const updated = { ...profile, goal: newGoal };
    setProfile(updated);
    try { localStorage.setItem('kai_profile', JSON.stringify(updated)); } catch(e) {}
  };

  const saveProfile = (vals) => {
    setProfile(vals);
    try { localStorage.setItem('kai_profile', JSON.stringify(vals)); } catch(e) {}
    setShowEditProfile(false);
  };

  const resetAll = () => {
    try {
      localStorage.removeItem('kai_profile');
      localStorage.removeItem('kai_completed');
      MODULES.forEach(m => localStorage.removeItem(`kai_msgs_${m.id}`));
    } catch(e) {}
    setProfile(null); setCompleted({}); setActiveIdx(null); setPhase('onboarding');
  };

  const base = { minHeight: '100dvh', background: BG, color: W, fontFamily: "-apple-system,'Helvetica Neue',sans-serif" };

  if (phase === 'landing') return <Landing onEnter={() => setPhase('onboarding')} />;
  if (phase === 'onboarding') return <Onboarding onComplete={completeOnboarding} />;

  if (phase === 'lesson' && activeIdx !== null) {
    const mod = MODULES[activeIdx];
    return (
      <div style={{ ...base, display: 'flex', flexDirection: 'column', height: '100dvh' }}>
        <style>{CSS}</style>
        <div style={{ background: G1, borderBottom: `1px solid ${G2}`, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <button onClick={() => setPhase('course')} style={{ background: G2, border: 'none', color: '#aaa', width: '30px', height: '30px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>←</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: Y, fontSize: '9px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: '800', marginBottom: '1px' }}>MODULE {mod.id} OF {MODULES.length}</div>
            <div style={{ color: W, fontWeight: '700', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.title}</div>
          </div>
          <div style={{ color: GM, fontSize: '12px', fontWeight: '600' }}>{profile?.name}</div>
        </div>
        <ChatLesson
          module={mod}
          profile={profile}
          onComplete={completeModule}
          isCompleted={!!completed[activeIdx]}
          onBack={() => setPhase('course')}
          onChangeGoal={changeGoal}
          onResetAll={resetAll}
        />
      </div>
    );
  }

  return (
    <div style={base}>
      <style>{CSS}</style>
      <div style={{ background: G1, borderBottom: `1px solid ${G2}`, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ width: '60px' }} />
        <div style={{ fontWeight: '900', fontSize: '19px', letterSpacing: '-0.5px', textAlign: 'center', color: Y }}>10xThatSh*t</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '60px', justifyContent: 'flex-end' }}>
          <span style={{ color: GM, fontSize: '12px', fontFamily: 'monospace', fontWeight: '700' }}>{totalDone}/{MODULES.length}</span>
        </div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px 80px' }}>
        <div onClick={() => setShowEditProfile(true)} style={{ marginBottom: '20px', padding: '16px 18px', background: G1, borderRadius: '12px', border: `1px solid ${G2}`, cursor: 'pointer', transition: 'border-color 0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ color: Y, fontSize: '11px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: '800' }}>YOUR PROFILE</div>
            <div style={{ color: GM, fontSize: '12px', fontFamily: 'monospace' }}>TAP TO EDIT ✎</div>
          </div>
          <div style={{ color: W, fontSize: '18px', fontWeight: '700', marginBottom: '5px' }}>{profile?.name} · {profile?.business}</div>
          <div style={{ color: GM, fontSize: '15px' }}>Goal: {profile?.goal}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {MODULES.map((mod, idx) => {
            const locked = idx > 0 && !completed[idx - 1];
            const isDone = completed[idx];
            const isNext = !isDone && (idx === 0 || completed[idx - 1]);
            return (
              <div key={mod.id} onClick={() => openModule(idx)} style={{ background: G1, border: `1px solid ${isNext ? Y : isDone ? '#1a2a00' : locked ? G1 : G2}`, borderRadius: '14px', padding: '16px 18px', display: 'flex', gap: '14px', alignItems: 'center', cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.3 : 1, transition: 'border-color 0.2s' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: isDone ? '#1a2a00' : isNext ? '#1a1400' : G2, border: `1px solid ${isDone ? '#4a8a00' : isNext ? Y : G3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: isDone ? '18px' : '14px', fontWeight: '900', color: isDone ? '#7aff00' : isNext ? Y : GM, flexShrink: 0 }}>
                  {isDone ? '✓' : mod.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: locked ? 0 : '4px' }}>
                    <div style={{ color: isDone ? GM : W, fontWeight: '700', fontSize: '17px' }}>{mod.title}</div>
                    {isNext && <div style={{ background: Y, color: BG, fontSize: '9px', fontWeight: '900', padding: '3px 7px', borderRadius: '4px', fontFamily: 'monospace', flexShrink: 0 }}>UP NEXT</div>}
                  </div>
                  {!locked && <div style={{ color: GM, fontSize: '13px', lineHeight: '1.4' }}>{mod.subtitle}</div>}
                </div>
                <div style={{ color: locked ? G3 : GM, fontSize: '20px', flexShrink: 0 }}>{locked ? '' : '›'}</div>
              </div>
            );
          })}
        </div>

        {totalDone === MODULES.length && (
          <div style={{ padding: '24px', background: '#0a1a00', border: '1px solid #4a8a00', borderRadius: '12px', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎓</div>
            <div style={{ color: '#7aff00', fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>Course Complete!</div>
            <div style={{ color: GM, fontSize: '13px' }}>You've mastered AI for your business.</div>
          </div>
        )}

        <button onClick={resetAll} style={{ width: '100%', background: 'transparent', color: G3, border: `1px solid ${G2}`, padding: '12px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '1px' }}>
          RESET ALL PROGRESS
        </button>
      </div>
      {showEditProfile && <EditProfileModal profile={profile} onSave={saveProfile} onClose={() => setShowEditProfile(false)} />}
    </div>
  );
}

