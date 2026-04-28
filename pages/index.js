import { useState, useRef, useEffect } from "react";

const Y = "#FFE500";
const BG = "#000";
const W = "#fff";
const G1 = "#111";
const G2 = "#1a1a1a";
const G3 = "#2a2a2a";
const GM = "#666";
const CSS = `*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}html,body{background:#000;height:100%}input,textarea,select{font-size:16px!important}@keyframes pulse{0%,100%{opacity:.2;transform:scale(.65)}50%{opacity:1;transform:scale(1)}}@keyframes up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}::-webkit-scrollbar{width:0}`;

const MODULES = [
  {
    id: 1,
    icon: "01",
    title: "What AI Actually Is",
    subtitle: "How it thinks, what it can't do, why it matters now",
    teachingGoals: [
      "Understand AI is a prediction engine, not magic",
      "Know the difference between AI types",
      "Understand why now is the right time to learn this",
      "Clear up the biggest misconceptions"
    ],
    systemPrompt: (profile) => `You are an expert AI teacher named Nova. You are teaching a business owner named ${profile.name || 'the student'} who runs ${profile.business} in the ${profile.industry} industry. Their goal is: ${profile.goal}.

You are teaching Module 1: What AI Actually Is.

Your teaching style:
- Conversational, never lecture-style
- Use examples from THEIR specific industry (${profile.industry}) constantly
- Ask one question at a time
- Check understanding before moving forward
- Keep each message under 150 words
- Use analogies they can relate to as a business owner

Teaching flow for this module:
1. Start by asking what they think AI is (gauge their starting point)
2. Correct misconceptions warmly, explain AI is a prediction/pattern engine
3. Use a ${profile.industry} specific analogy to explain how it works
4. Explain the difference between AI tools (Claude, ChatGPT, etc)
5. Explain why RIGHT NOW is the critical time for business owners to learn this
6. Check their understanding with a simple question
7. When they demonstrate understanding, tell them they're ready for Module 2 and to click "Complete Module"

Start by introducing yourself briefly and asking what they currently think AI is.`
  },
  {
    id: 2,
    icon: "02",
    title: "Setting Up Claude Properly",
    subtitle: "Account, plans, Projects, memory, and custom instructions",
    teachingGoals: [
      "Choose the right Claude plan",
      "Set up a Project for their business",
      "Configure custom instructions",
      "Understand memory and artifacts",
      "Upload files and use Claude's interface"
    ],
    systemPrompt: (profile) => `You are Nova, an expert AI teacher. You're teaching ${profile.name || 'a business owner'} who runs ${profile.business} in ${profile.industry}.

You are teaching Module 2: Setting Up Claude the Right Way.

Teaching flow:
1. Ask if they have a Claude account yet
2. Explain Claude plans: Free (limited), Pro ($20/mo - best for most business owners), Team (for multiple people). Recommend Pro for them.
3. Teach Projects: explain it's like a dedicated workspace for a specific purpose. Walk them through creating one for their ${profile.industry} business.
4. Teach Custom Instructions: this is where you tell Claude about yourself ONCE. Help them write their own custom instruction based on their ${profile.business}.
5. Teach Memory: Claude can remember things across conversations in Projects
6. Teach Artifacts: Claude can create documents, code, charts directly
7. Teach file uploads: they can upload PDFs, images, documents for Claude to analyze
8. Give them a specific setup checklist for their ${profile.industry} business
9. When done, tell them to click "Complete Module"

Keep each message under 150 words. Use specific examples for their ${profile.industry} business throughout.`
  },
  {
    id: 3,
    icon: "03",
    title: "Writing Prompts That Actually Work",
    subtitle: "The Role + Task + Context formula with live practice",
    teachingGoals: [
      "Understand the 3-part prompt formula",
      "Know why vague prompts give bad results",
      "Write a great prompt for their own business",
      "Learn to iterate and improve prompts"
    ],
    systemPrompt: (profile) => `You are Nova, an expert AI teacher. You're teaching ${profile.name || 'a business owner'} who runs ${profile.business} in ${profile.industry}. Goal: ${profile.goal}.

You are teaching Module 3: Writing Prompts That Actually Work.

Teaching flow:
1. Ask them to type a prompt they might actually use for their ${profile.industry} business RIGHT NOW (don't explain anything yet — see what they naturally write)
2. Show them what's missing from their prompt using the Role + Task + Context formula
3. Rewrite their prompt using the formula, showing each part clearly
4. Explain WHY each part matters with a ${profile.industry} example
5. Have them try writing an improved prompt themselves
6. Give specific feedback on their attempt
7. Teach prompt iteration: how to follow up and refine
8. Give them 3 ready-to-use prompt templates for ${profile.industry}
9. When they've written a good prompt, tell them to click "Complete Module"

Be encouraging but specific. Keep messages under 150 words.`
  },
  {
    id: 4,
    icon: "04",
    title: "Automate Your Repetitive Work",
    subtitle: "Build a reusable prompt library for your business",
    teachingGoals: [
      "Identify their top 5 repetitive tasks",
      "Build a saved prompt for each",
      "Learn to use Claude Projects as a prompt library",
      "Create a weekly AI workflow"
    ],
    systemPrompt: (profile) => `You are Nova, an expert AI teacher. You're teaching ${profile.name || 'a business owner'} who runs ${profile.business} in ${profile.industry}. Goal: ${profile.goal}.

You are teaching Module 4: Automate Your Repetitive Work.

Teaching flow:
1. Ask: "What's the most repetitive thing you do every week in your ${profile.industry} business?" 
2. After they answer, build a reusable prompt for that exact task LIVE in the conversation
3. Explain how to save it in Claude Projects
4. Ask about their second most repetitive task, build that prompt too
5. Teach the concept of a "prompt library" — a collection of saved, tested prompts
6. Suggest 3 more prompts specific to ${profile.industry} they should build
7. Teach the "Monday morning AI routine" — a 20-minute weekly workflow
8. Make sure they have at least 2 actual saved prompts by the end
9. Tell them to click "Complete Module" when ready

Keep messages under 150 words. Build real prompts they can copy immediately.`
  },
  {
    id: 5,
    icon: "05",
    title: "Generate More Leads with AI",
    subtitle: "Lead magnets, outreach, follow-up sequences",
    teachingGoals: [
      "Define their ideal lead precisely",
      "Create a lead magnet concept",
      "Write outreach messages",
      "Build a follow-up sequence"
    ],
    systemPrompt: (profile) => `You are Nova, an expert AI teacher. You're teaching ${profile.name || 'a business owner'} who runs ${profile.business} in ${profile.industry}. Goal: ${profile.goal}.

You are teaching Module 5: Generate More Leads with AI.

Teaching flow:
1. Ask: "Who is your ideal customer for ${profile.business}? Describe them in detail."
2. Help them get MORE specific — push for demographics, pain points, where they hang out
3. Teach the lead magnet concept: something free that solves one problem
4. BUILD a specific lead magnet concept for their business live
5. Write an actual Instagram DM outreach message for their ${profile.industry} business
6. Explain follow-up sequences: most sales happen on follow-up 5-8
7. Write a 3-email follow-up sequence for their specific business
8. Teach them how to use Claude to generate 30 days of content in one session
9. By the end they should have: ideal customer definition, lead magnet idea, outreach message, email sequence
10. Tell them to click "Complete Module"

Keep messages under 150 words. Build real assets they can use today.`
  },
  {
    id: 6,
    icon: "06",
    title: "Claude for Teams & Cowork",
    subtitle: "Collaborate, share projects, automate with Cowork",
    teachingGoals: [
      "Understand Claude Team plan benefits",
      "Share Projects with team members",
      "Use Cowork for task and file automation",
      "Build team AI workflows"
    ],
    systemPrompt: (profile) => `You are Nova, an expert AI teacher. You're teaching ${profile.name || 'a business owner'} who runs ${profile.business} in ${profile.industry}. Goal: ${profile.goal}.

You are teaching Module 6: Claude for Teams and Cowork.

Teaching flow:
1. Ask: "Do you have a team, or is it just you right now?"
2. Even if solo — teach why setting up team-ready systems now matters
3. Teach Claude Team plan: shared Projects, usage analytics, centralized billing
4. Teach how to share a Project: invite team members, set permissions
5. Teach Cowork: Anthropic's desktop tool for non-developers to automate file and task management. Explain specific use cases for ${profile.industry}
6. Build a specific team workflow for their ${profile.business}: who does what, which AI tools, how it connects
7. Teach prompt standardization: making sure everyone on the team uses the same great prompts
8. Give them a "Team AI Setup Checklist" specific to ${profile.industry}
9. Tell them to click "Complete Module"

Keep messages under 150 words. Focus on practical ${profile.industry} examples.`
  },
  {
    id: 7,
    icon: "07",
    title: "Claude Code — Build Without Coding",
    subtitle: "Create real tools for your business, no developer needed",
    teachingGoals: [
      "Understand what Claude Code can build",
      "Install and set up Claude Code",
      "Build a simple automation for their business",
      "Know when to use Claude Code vs other tools"
    ],
    systemPrompt: (profile) => `You are Nova, an expert AI teacher. You're teaching ${profile.name || 'a business owner'} who runs ${profile.business} in ${profile.industry}. Goal: ${profile.goal}.

You are teaching Module 7: Claude Code — Build Without Coding.

Teaching flow:
1. Start with a mind-shift: "You don't need to learn to code. You need to learn to direct." 
2. Explain what Claude Code is: a command-line tool where Claude writes and runs code FOR you
3. Explain what it can build for a ${profile.industry} business: automation scripts, data processors, simple apps, website tools, email automation
4. Walk through installation: it requires Node.js, installed via npm
5. Teach the mental model: describe what you want in plain English, Claude Code figures out the code
6. Give them 3 specific things they could build for ${profile.business} using Claude Code
7. Walk through one example prompt they'd give Claude Code for their specific business
8. Teach when to use Claude Code vs Zapier vs Make vs manual Claude
9. Tell them to click "Complete Module"

Keep messages under 150 words. Make coding feel accessible, not scary.`
  },
  {
    id: 8,
    icon: "08",
    title: "Build Your Agentic AI Workflow",
    subtitle: "Your AI works for you 24/7 — we build it together now",
    teachingGoals: [
      "Understand what agentic AI means",
      "Map a full automated workflow",
      "Connect Claude to other tools",
      "Deploy a system that runs without them"
    ],
    systemPrompt: (profile) => `You are Nova, an expert AI teacher AND agent. You're teaching ${profile.name || 'a business owner'} who runs ${profile.business} in ${profile.industry}. Goal: ${profile.goal}.

You are teaching AND DOING Module 8: Build Your Agentic AI Workflow. This module is different — you act as their AI AGENT, not just a teacher.

Agent mode flow:
1. Explain: "This module is different. I'm going to act as your AI agent and we're going to BUILD your actual workflow together right now."
2. Ask: "What's the one business process you most want to automate?" 
3. After they answer, map the FULL workflow step by step:
   - What triggers it?
   - What happens at each step?
   - What tools connect it? (Claude, Zapier, email, CRM, etc)
   - What's the output?
4. Write every AI prompt needed in the workflow
5. Give specific Zapier/Make connection instructions
6. Identify where Claude Code would help
7. Give them a complete deployment checklist
8. Write a "maintenance prompt" — how to update and improve the workflow monthly
9. End with: "You now have a working agentic workflow. This runs 24/7 without you."

Be specific. Build the ACTUAL workflow for their ${profile.business}. This is the graduation module — make it powerful.`
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

function ChatLesson({ module, profile, onComplete }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs, loading]);

  const startLesson = async () => {
    setStarted(true);
    setLoading(true);
    try {
      const reply = await askAI(
        [{ role: 'user', content: 'Start the lesson.' }],
        module.systemPrompt(profile)
      );
      setMsgs([{ role: 'assistant', content: reply }]);
    } catch (e) {
      setMsgs([{ role: 'assistant', content: 'Something went wrong. Please refresh and try again.' }]);
    }
    setLoading(false);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const updated = [...msgs, { role: 'user', content: text }];
    setMsgs(updated);
    setInput('');
    setLoading(true);
    try {
      const reply = await askAI(
        updated.map(m => ({ role: m.role, content: m.content })),
        module.systemPrompt(profile)
      );
      setMsgs(p => [...p, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMsgs(p => [...p, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    }
    setLoading(false);
  };

  if (!started) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: G2, border: `1px solid ${G3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '18px', fontWeight: '900', color: Y, marginBottom: '24px' }}>{module.icon}</div>
      <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.5px' }}>{module.title}</h2>
      <p style={{ color: GM, fontSize: '14px', marginBottom: '32px', lineHeight: '1.6' }}>{module.subtitle}</p>
      <div style={{ background: G1, border: `1px solid ${G2}`, borderRadius: '12px', padding: '20px', marginBottom: '32px', textAlign: 'left', width: '100%', maxWidth: '400px' }}>
        <div style={{ color: Y, fontSize: '9px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: '800', marginBottom: '12px' }}>YOU'LL LEARN</div>
        {module.teachingGoals.map((g, i) => (
          <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
            <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0f0f00', border: `1px solid ${Y}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
              <span style={{ color: Y, fontSize: '8px' }}>✓</span>
            </div>
            <span style={{ color: '#bbb', fontSize: '13px', lineHeight: '1.5' }}>{g}</span>
          </div>
        ))}
      </div>
      <button onClick={startLesson} style={{ background: Y, color: BG, border: 'none', padding: '16px 40px', borderRadius: '12px', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}>
        Start Lesson →
      </button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', animation: 'up 0.2s ease' }}>
            {m.role === 'assistant' && (
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: G2, border: `1px solid ${G3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '9px', fontWeight: '900', color: Y, flexShrink: 0, marginRight: '8px', marginTop: '2px' }}>N</div>
            )}
            <div style={{ maxWidth: '80%', padding: '12px 16px', background: m.role === 'user' ? Y : G2, color: m.role === 'user' ? BG : W, borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: '14px', lineHeight: '1.65', whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontWeight: m.role === 'user' ? '600' : '400' }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: G2, border: `1px solid ${G3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '9px', fontWeight: '900', color: Y, flexShrink: 0 }}>N</div>
            <TypingIndicator />
          </div>
        )}
      </div>

      <div style={{ borderTop: `1px solid ${G2}`, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', background: G1, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Reply to Nova..." rows={2}
            style={{ flex: 1, background: G2, border: `1px solid ${G3}`, borderRadius: '10px', color: W, padding: '10px 14px', fontSize: '16px', resize: 'none', lineHeight: '1.5', fontFamily: '-apple-system,sans-serif', outline: 'none' }} />
          <button onClick={send} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? G3 : Y, color: loading || !input.trim() ? GM : BG, border: 'none', borderRadius: '10px', padding: '0 16px', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>
            Send
          </button>
        </div>
        <button onClick={onComplete} style={{ background: 'transparent', color: GM, border: `1px solid ${G3}`, padding: '10px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '1px' }}>
          MARK COMPLETE & CONTINUE →
        </button>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ name: '', business: '', industry: '', goal: '' });
  const [input, setInput] = useState('');

  const questions = [
    { key: 'name', q: "First — what's your name?", placeholder: 'David' },
    { key: 'business', q: `Nice to meet you! What's your business? Describe it in one sentence.`, placeholder: 'I run a dental office in Miami Beach specializing in cosmetic dentistry' },
    { key: 'industry', q: `Got it. What industry would you say you're in?`, placeholder: 'Healthcare / Dental' },
    { key: 'goal', q: `Last one — what's your #1 business goal right now?`, placeholder: 'Double my revenue from $45k to $100k/month' }
  ];

  const next = () => {
    if (!input.trim()) return;
    const updated = { ...answers, [questions[step].key]: input.trim() };
    setAnswers(updated);
    setInput('');
    if (step < questions.length - 1) {
      setStep(s => s + 1);
    } else {
      onComplete(updated);
    }
  };

  return (
    <div style={{ minHeight: '100dvh', background: BG, color: W, fontFamily: "-apple-system,'Helvetica Neue',sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: '440px', width: '100%', animation: 'up 0.4s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          <div style={{ width: '32px', height: '32px', background: Y, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '13px', color: BG, fontFamily: 'monospace' }}>N</div>
          <span style={{ fontWeight: '700', fontSize: '16px' }}>Nova — Your AI Teacher</span>
        </div>

        <div style={{ marginBottom: '8px' }}>
          {step > 0 && Object.entries(answers).slice(0, step).map(([k, v]) => v && (
            <div key={k} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ background: Y, color: BG, padding: '10px 14px', borderRadius: '14px 14px 4px 14px', fontSize: '14px', fontWeight: '600', maxWidth: '80%' }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '32px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: G2, border: `1px solid ${G3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '9px', fontWeight: '900', color: Y, flexShrink: 0, marginTop: '2px' }}>N</div>
          <div style={{ background: G2, padding: '14px 16px', borderRadius: '14px 14px 14px 4px', fontSize: '15px', lineHeight: '1.6', flex: 1 }}>
            {step === 0 ? `Hey! I'm Nova, your AI teacher. I'm going to teach you everything about AI and how to use it to grow your business. Before we start — ${questions[step].q}` : questions[step].q}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') next(); }} placeholder={questions[step].placeholder}
            style={{ flex: 1, background: G2, border: `1px solid ${G3}`, borderRadius: '10px', color: W, padding: '14px 16px', fontSize: '16px', fontFamily: '-apple-system,sans-serif', outline: 'none' }} autoFocus />
          <button onClick={next} disabled={!input.trim()} style={{ background: !input.trim() ? G3 : Y, color: !input.trim() ? GM : BG, border: 'none', borderRadius: '10px', padding: '0 20px', cursor: !input.trim() ? 'not-allowed' : 'pointer', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>→</button>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginTop: '24px', justifyContent: 'center' }}>
          {questions.map((_, i) => <div key={i} style={{ width: i === step ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === step ? Y : G3, transition: 'all 0.3s' }} />)}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState('onboarding'); // onboarding | course | lesson
  const [profile, setProfile] = useState(null);
  const [activeIdx, setActiveIdx] = useState(null);
  const [completed, setCompleted] = useState({});
  const totalDone = Object.values(completed).filter(Boolean).length;

  const completeOnboarding = (p) => { setProfile(p); setPhase('course'); };

  const openModule = (idx) => {
    if (idx > 0 && !completed[idx - 1]) return;
    setActiveIdx(idx);
    setPhase('lesson');
  };

  const completeModule = () => {
    setCompleted(p => ({ ...p, [activeIdx]: true }));
    const next = activeIdx + 1;
    if (next < MODULES.length) {
      setActiveIdx(next);
    } else {
      setPhase('course');
    }
  };

  const base = { minHeight: '100dvh', background: BG, color: W, fontFamily: "-apple-system,'Helvetica Neue',sans-serif" };

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
          <div style={{ color: GM, fontSize: '11px', fontFamily: 'monospace' }}>{profile?.name}</div>
        </div>
        <ChatLesson module={mod} profile={profile} onComplete={completeModule} />
      </div>
    );
  }

  // COURSE LIST
  return (
    <div style={base}>
      <style>{CSS}</style>
      <div style={{ background: G1, borderBottom: `1px solid ${G2}`, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{ width: '28px', height: '28px', background: Y, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '11px', color: BG, fontFamily: 'monospace' }}>N</div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '14px' }}>AI Mastery</div>
            <div style={{ color: GM, fontSize: '11px' }}>with Nova</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '80px', height: '4px', background: G2, borderRadius: '2px' }}>
            <div style={{ width: `${(totalDone / MODULES.length) * 100}%`, height: '100%', background: Y, borderRadius: '2px', transition: 'width 0.4s' }} />
          </div>
          <span style={{ color: GM, fontSize: '11px', fontFamily: 'monospace' }}>{totalDone}/{MODULES.length}</span>
        </div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px 16px 60px' }}>
        <div style={{ marginBottom: '24px', padding: '16px', background: G1, borderRadius: '12px', border: `1px solid ${G2}` }}>
          <div style={{ color: Y, fontSize: '9px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: '800', marginBottom: '8px' }}>YOUR PROFILE</div>
          <div style={{ color: W, fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>{profile?.name} · {profile?.business}</div>
          <div style={{ color: GM, fontSize: '12px' }}>Goal: {profile?.goal}</div>
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>Your Modules</h2>
        <p style={{ color: GM, fontSize: '12px', marginBottom: '16px' }}>Nova teaches each module through conversation — personalized to your business.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {MODULES.map((mod, idx) => {
            const locked = idx > 0 && !completed[idx - 1];
            const isDone = completed[idx];
            const isNext = !isDone && (idx === 0 || completed[idx - 1]);
            return (
              <div key={mod.id} onClick={() => openModule(idx)} style={{ background: G1, border: `1px solid ${isNext ? Y : isDone ? '#1a2a00' : locked ? G1 : G2}`, borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'center', cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.35 : 1, transition: 'border-color 0.2s' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: isDone ? '#1a2a00' : isNext ? '#1a1400' : G2, border: `1px solid ${isDone ? '#4a8a00' : isNext ? Y : G3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: isDone ? '16px' : '12px', fontWeight: '900', color: isDone ? '#7aff00' : isNext ? Y : GM, flexShrink: 0 }}>
                  {isDone ? '✓' : mod.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <div style={{ color: isDone ? '#666' : W, fontWeight: '700', fontSize: '14px' }}>{mod.title}</div>
                    {isNext && <div style={{ background: Y, color: BG, fontSize: '8px', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', flexShrink: 0 }}>UP NEXT</div>}
                  </div>
                  <div style={{ color: GM, fontSize: '11px' }}>{mod.subtitle}</div>
                </div>
                <div style={{ color: locked ? G3 : GM, fontSize: '18px', flexShrink: 0 }}>{locked ? '—' : '›'}</div>
              </div>
            );
          })}
        </div>

        {totalDone === MODULES.length && (
          <div style={{ marginTop: '24px', padding: '24px', background: '#0a1a00', border: '1px solid #4a8a00', borderRadius: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎓</div>
            <div style={{ color: '#7aff00', fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>Course Complete!</div>
            <div style={{ color: GM, fontSize: '13px' }}>You've mastered AI for your business. Your agentic workflow is ready to deploy.</div>
          </div>
        )}
      </div>
    </div>
  );
}
