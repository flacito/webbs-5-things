# Webb's 5 Things for AI

## How to Build 50x Faster with Higher Quality

**Author:** Brian Webb, Software Consultant
**Date:** February 5, 2026

## Introduction

After building production systems with Claude at unprecedented velocity, I've distilled the approach into five core principles. These aren't theoretical—they're battle-tested practices from shipping real software to real customers.

**The Core Insight:** Most developers treat AI like a search engine or template generator. They're leaving 90% of the value on the table. These five principles show you how to tap into the full capability.

## 1. Bring Yourself to This

### Your Narrative, Your Style, Your Experience

Don't write sterile, technical prompts. Bring your whole self into the conversation.

**Why this works:**

- Claude is a **silicon-based neural network** that approximates biological learning
- Context shapes which neural pathways activate
- Your personality, experience, and communication style prime different activation patterns
- Rich context creates consistency across conversations

**Bad approach:**

```
Create a JWT licensing system with the following requirements:
- RS256 signing
- Entitlements: email_testing, advanced_features
- Expiration handling
```

**Good approach:**

```
My security software client needs frictionless licensing. The CEO wants sales
to close deals on the spot—customer says yes, we generate a license in
10 seconds, paste it in the CRM, done. No waiting, no friction.

We're starting from zero (they use old-school cookies now). I need a CLI
tool that the professional services team can run on their laptops to generate
JWTs. Simple, fast, no overthinking.

I'm thinking RS256, two entitlements to start (email_testing, advanced_features),
standard expiration. What do you think?
```

**The difference:**

- First version: Generic AI output
- Second version: Output that matches YOUR technical judgment and priorities

### The Neural Network Principle

Think about how you learned not to step on a board with nails. Your brain doesn't compute "nail detection algorithms" every time you walk. Your peripheral nervous system learned the pattern—it's burned into neural pathways.

A child steps on the nail because the pathway isn't established. An adult walks differently because the learning is complete.

**This is exactly how transformer models work.** Your context primes which pathways activate. The more context you provide that matches your technical culture, the more aligned the output becomes.

**Practical application:**

- Reference past projects
- Mention your preferences
- Include tangential thoughts that establish context
- Build conversational continuity

This isn't wasting tokens—it's **training the neural pathways** to match your judgment.

## 2. Start at High Level ALWAYS

### What is the Vision?

Before touching any code, establish the high-level picture.

**Ask these questions:**

1. What problem are we actually solving?
2. What does success look like?
3. Who benefits and how?
4. What are we NOT solving (scope boundaries)?

**Example: Security Software Licensing**

**Problem:** Sales can't deliver licenses immediately. Customer enthusiasm dies during the wait.

**Vision:** CEO wants zero-friction pipeline. Customer says yes → license generated in 10 seconds → customer is enabled before hanging up the phone.

**Success:** Professional services team generates 10+ licenses in first week. Zero license-related support tickets. Sales reports improved close rate.

**NOT solving:** Hardware binding, license revocation, usage analytics (yet). Those come later.

### Why High-Level First Matters

**It prevents:**

- Building the wrong thing efficiently
- Getting lost in implementation details
- Scope creep disguised as "best practices"
- Solutions looking for problems

**It enables:**

- Clear decision criteria ("Does this serve the vision?")
- Ruthless prioritization
- Alignment across team
- Confidence in shipping MVP

**The trap:** Junior developers (and nervous consultants) jump straight to implementation details to prove they're smart. Senior developers establish the vision first because they know **building the right thing poorly beats building the wrong thing well.**

## 3. Have a Design Session with CLAUDE Before Starting

### This is Where You Have It Teach You

Don't just tell Claude what to build. **Have a conversation where you design together.**

**The design session structure:**

1. **Share the vision** (from step 2)
2. **Ask Claude to identify the gaps**
   - "What are the key design decisions we need to make?"
   - "What don't we know yet?"
   - "What could go wrong?"
3. **Make decisions together**
   - Claude proposes options with tradeoffs
   - You bring domain expertise and constraints
   - Converge on specific choices
4. **Document the decisions**
   - Why we chose this approach
   - What we're deferring
   - What assumptions we're making

**Example: Security Software Licensing Design Session**

**Brian:** "Before we build, what are the key questions we need to answer?"

**Claude:** "Four areas to nail down:

1. Private key management - where/how stored?
2. Entitlements list - what features are we actually gating?
3. CRM integration - manual or automated?
4. API validation - does infrastructure exist?"

**Brian:** "Good. Let's go through them:

1. Single private key, env variable, stored in keychain
2. Start with email_testing and advanced_features only
3. Manual copy-paste, CRM API comes later
4. Nothing exists yet - we're building from scratch"

**Claude:** "Got it. So we're designing for greenfield. That means we can..."

### The Teaching Happens Here

When Claude asks clarifying questions and proposes alternatives, **it's teaching you** about:

- Edge cases you hadn't considered
- Industry standard practices
- Tradeoffs between approaches
- Technical debt implications

**This is the highest-leverage part of the process.** You're getting expert-level architectural review in real-time, while simultaneously making decisions that Claude will implement perfectly because it understands your reasoning.

### What Good Looks Like

After the design session, you should have:

- ✅ Clear technical decisions documented
- ✅ Rationale for each choice
- ✅ Identified risks and mitigation strategies
- ✅ Shared mental model between you and Claude

Now you're ready to implement.

## 4. Now Implement and FUGGIN GO BIG

### Speed Without Sloppiness

You've done the design work. You have a clear vision. Now **execute with velocity.**

**Go big means:**

- Don't implement 10% of a feature—ship the whole thing
- Don't mock out the hard parts—solve them
- Don't settle for toy examples—build production-ready code
- Don't ask permission—make decisions and move

**Example: Security Software CLI Tool**

**Small approach:**

```
Just get basic JWT generation working. Hard-code the key path.
Skip error handling for now. Console.log the output.
```

**GO BIG approach:**

```
Full CLI with create/decode/verify commands. Proper key management
via env vars. Rich error messages. File output. Validation before
writing. Help text. Example workflows documented.

Ship something the professional services team can actually use TODAY.
```

### The Velocity Paradox

**Conventional wisdom:** "Go slow to go fast. Build incrementally. Ship small."

**Reality:** Small increments create coordination overhead and context switching. You lose momentum. You forget why you made decisions. You ship 10 half-baked features instead of 3 complete ones.

**Better approach:**

1. Design completely (step 3)
2. Implement completely (step 4)
3. Ship completely
4. Iterate based on real usage

**This is how we build 50x faster.** Not by cutting corners, but by eliminating the stop-and-start rhythm that kills momentum.

### What Claude Enables

With a good design session, you can tell Claude:

_"Build the complete CLI tool with all three commands, proper error handling, environment variable support, and a comprehensive README. Don't hold back—ship the production version."_

Claude will do it. Completely. In one shot. Because you already did the design work together.

**This is the unlock.** Traditional development requires incremental progress because humans can't hold entire systems in working memory. Claude can. So you design together, then Claude implements completely while you focus on the next thing.

## 5. But You Have to Go Big with Rails

### Constraints that Enable Velocity

Going big doesn't mean "build everything." It means **build the right things completely, within clear constraints.**

**Rails are enabling guardrails:**

- They prevent analysis paralysis ("Which approach should we...?")
- They eliminate bikeshedding ("Should the config be JSON or YAML?")
- They enable fast decisions ("We always use RS256")
- They create consistency ("All licenses expire")

### Example: Security Software Licensing Rails

**Security rails:**

- Private key NEVER leaves professional services laptops
- Keys stored in OS keychain only
- All licenses have expiration dates
- RS256 algorithm only (no algorithm negotiation)

**Process rails:**

- Every license logged in CRM (mandatory)
- Standard naming: `{customer}-{year}-license.jwt`
- Maximum 2-year duration
- No custom entitlements (pick from standard list)

**Technical rails:**

- Single private key (no key distribution complexity)
- Public key embedded in API codebase
- Strict JWT validation (no tolerance for malformed tokens)
- Entitlements are additive only

### Monorepo Rails: My Strong Opinions

Over time, I've developed **strong opinions** about code organization through daily learning with Claude. Here's my monorepo structure that has become a rail:

```
project-root/
├── common/          # Shared models, types, Zod schemas
├── services/        # Business logic, utilities
├── builder/         # Data transformation pipelines
├── api/             # Backend API server
├── web/             # Frontend React application
├── cli/             # Command-line tools
├── mobile/          # Mobile applications
└── pnpm-workspace.yaml
```

**Why this is a rail:**

- TypeScript path aliases (`@common/model`, `@services/auth`)
- Clear separation of concerns
- Dependency management via pnpm workspaces
- Shared tooling (ESLint, Prettier, TypeScript configs)
- Build once, import everywhere

**This wasn't handed to me.** I learned this through:

- Daily experimentation with Claude
- Testing different approaches
- Building real projects
- Seeing what scales and what breaks

**These are MY opinions now.** They work for me. You need to develop YOUR opinions through the same process.

### The Daily Learning Rail

**Here's a meta-rail:** Use Claude at least once a day to either:

1. Learn a new thing, OR
2. Make an existing thing tighter

**Examples:**

- "I'm using separate repos. Should I try monorepos? Teach me."
- "My CLI error handling is messy. Show me a better pattern."
- "I hard-code API URLs. What's the right way to handle configs?"
- "My tests are slow. How do people actually test in production?"

**This compounds.** Each conversation builds your technical judgment. Each decision becomes a rail for future projects.

**The monorepo rail didn't exist for me 6 months ago.** Now it's automatic. That's how you build expertise—one conversation at a time, with a mentor who's always available.

### Why Rails Enable Speed

**Without rails:**

- "Should we support multiple signing algorithms?" → 2 hour discussion
- "Where should we store the key?" → 5 different proposals
- "Should we allow perpetual licenses?" → Vendor comparison research
- "What format for CRM storage?" → API integration spike
- "Monorepo or separate repos?" → Architecture review meeting

**With rails:**

- "RS256 only" → Done, moving on
- "Keychain via env var" → Done, moving on
- "All licenses expire, max 2 years" → Done, moving on
- "Raw JWT string in CRM custom field" → Done, moving on
- "Monorepo with pnpm, TypeScript paths" → Done, moving on

**Result:** We spent 2 hours on design session and shipped in a week instead of 2 months of discussions.

### The Rails Principle

**Good rails:**

- Eliminate low-value decisions
- Reflect actual constraints (security, compliance, technical)
- Enable rather than restrict
- Can be relaxed later if needed
- Are YOUR opinions, earned through experience

**Bad rails:**

- Arbitrary preferences masquerading as requirements
- "Best practices" cargo-culted from different contexts
- Premature optimization
- Over-engineering for scale you don't have
- Someone else's opinions you haven't tested

**Test:** If removing a rail would force you to make a decision that doesn't matter to your users, it's a good rail.

## Putting It All Together

### The Complete Workflow

**Traditional Development:**

1. Requirements doc (2 weeks)
2. Architecture review (1 week)
3. Implementation (6 weeks)
4. Code review (1 week)
5. QA (2 weeks)
6. Documentation (1 week)

**Total:** 13 weeks

**Webb's 5 Things Approach:**

**Week 1, Day 1:**

1. **Bring yourself** - 30-minute conversation establishing context
2. **Start high level** - 1 hour defining vision and success criteria
3. **Design session** - 2 hours making technical decisions with Claude
4. **Go big** - 4 hours implementing complete solution
5. **Rails** - Decisions already made, no blocking

**Week 1, Day 2-3:**

- Testing with real users
- Refinement based on feedback
- Documentation (already created during design)

**Total:** 3-5 days

### The 50x Multiplier Explained

**Where the speed comes from:**

- ✅ No requirement docs (conversation is the requirement)
- ✅ No architecture review meetings (design session with Claude)
- ✅ No back-and-forth code review (Claude ships production quality)
- ✅ No separate QA cycle (test as you build)
- ✅ No separate documentation (created during design)
- ✅ No bikeshedding (rails eliminate low-value decisions)

**What you're NOT sacrificing:**

- ❌ Code quality (Claude writes better code than most humans)
- ❌ Security (design session catches issues early)
- ❌ Maintainability (clear decisions documented)
- ❌ User needs (vision-first approach ensures alignment)

**What you ARE sacrificing:**

- ✅ Ceremony
- ✅ Process theater
- ✅ Coordination overhead
- ✅ Meeting culture

## Common Objections

### "This only works for simple projects"

**Reality:** The more complex the project, the MORE valuable this approach becomes.

Complex projects die from coordination overhead and context loss. This approach eliminates both. The design session scales to any complexity—you just invest more time designing. But implementation velocity stays constant because Claude can build complex systems as easily as simple ones.

**Example:** We're building JWT licensing (simple), but next week we're using the same approach to build the API integration with database migrations, authentication middleware, and feature gating (complex). Same 5 principles, same velocity.

### "You can't trust AI for production code"

**Reality:** You don't trust it blindly. You trust it after the design session.

The design session is where you verify Claude understands the constraints, edge cases, and requirements. Once alignment is confirmed, Claude's implementation is more consistent than most humans because it doesn't get tired, distracted, or sloppy.

**What you review:** Correctness of approach (design session handles this)
**What you don't review:** Syntax, style, boilerplate (Claude does this better than humans)

### "This requires an experienced developer"

**Partially true.** The design session requires someone who can:

- Identify good vs. bad technical decisions
- Understand tradeoffs
- Establish useful rails

But here's the thing: **this approach teaches these skills faster than traditional development.**

Why? Because you're having expert-level architectural discussions every day. Claude asks the right questions. You learn to think about edge cases, tradeoffs, and system design by doing it in real-time with an expert partner.

**Traditional development:** Junior dev gets feedback once a week in code review
**This approach:** Junior dev gets feedback continuously in design sessions

### "Our company would never allow this"

**Reality:** Your company allows 13-week projects that ship mediocre solutions.

Start small. Use this approach for internal tools or prototypes. Show the results. Let velocity speak for itself.

**Pro tip:** Don't tell them it's "AI." Tell them it's "modern development practices with rapid prototyping and continuous validation." Which is true.

## Raising Up Masters: The Mentorship Multiplier

### The Traditional Path to Mastery

Historically, becoming a master took one of two paths:

**Path 1: The Mentorship Path**

- Find an expert willing to invest in you
- Spend years apprenticing
- Learn through osmosis and direct feedback
- Rare and precious

**Path 2: The Hard Knocks Path**

- Make mistakes for years
- Learn from failures
- Read books and docs
- Slow and painful

**Both paths take 5-10 years minimum.**

### The AI-Enabled Path

**AI, used right, is like having that mentor that some of us had, or providentially had several.**

But you have to know how to use it. This is where the 5 Things come in.

### Real Example: My 18-Year-Old Son

My son is applying to NC State's mechanical engineering program. He's a homeschooled student with:

- good GPA
- great SAT / ACT
- lots of college credits from our WONDERFUL community college system

**The Traditional Approach:**
He would have taken a dual enrollment calculus course, struggled with a professor who "goes WAY TOO FAST" (actual RateMyProfessor reviews), gotten mediocre feedback once a week, and either:

1. Pushed through with incomplete understanding, or
2. Failed and retaken the course

**What We Actually Did:**
He dropped the dual enrollment course and switched to an asynchronous AP Calculus AB course. But here's the key: **he uses AI as his calculus tutor every single day.**

**How it works:**

1. Encounters a problem he doesn't understand
2. Brings himself to it: "I'm working on related rates. Here's the problem. Here's where I got stuck."
3. Claude doesn't just solve it—it teaches the underlying concept
4. He tries again with Claude's guidance
5. Repeats until mastery

**Result:** He's not just learning calculus faster—he's learning HOW to learn. He's developing the skill of asking good questions, identifying gaps in his understanding, and seeking expert guidance.

**This is the same process I use for software development.** The domain is different, but the methodology is identical.

### The Compounding Effect

**Traditional mentorship is limited by:**

- Mentor availability (they have other work)
- Mentor patience (they get tired)
- Mentor expertise (they don't know everything)
- Geographic constraints (you need to be co-located)

**AI mentorship compounds:**

- Always available (24/7)
- Infinite patience (never gets frustrated)
- Broad expertise (programming, math, writing, design)
- Zero geographic constraints

**But here's the critical insight:** The AI only works as a mentor if you know the 5 Things.

### Why This Matters for Raising Up Masters

**Those who have cracked the 5 Things need to TEACH the 5 Things to younger people.**

This is why this document exists. This is why it's on GitHub Pages.

**The traditional model:**

- Expert keeps knowledge to themselves
- Junior developers struggle for years
- Knowledge transfer is slow and painful
- Expertise is hoarded

**The new model:**

- Expert teaches the 5 Things methodology
- Junior developers get expert-level feedback daily
- Knowledge transfer is fast and effective
- Expertise is multiplied

### What This Looks Like in Practice

**Week 1:** Junior developer learns the 5 Things
**Week 2:** Builds first production feature with Claude as mentor
**Week 3:** Ships to real users
**Month 2:** Teaching other juniors the methodology
**Month 6:** Making architectural decisions with confidence

**Traditional timeline:** 2-3 years to get to the same level.

**This isn't theoretical.** I've seen it. My son is experiencing it with calculus. I'm experiencing it with every new technology I learn.

### The Responsibility

**If you've mastered the 5 Things, you have a responsibility to teach it.**

Why? Because:

1. It accelerates the entire industry
2. It raises up the next generation faster
3. It democratizes access to expert mentorship
4. It creates a culture of continuous learning

**The old model:** Hoard knowledge, maintain competitive advantage through scarcity.

**The new model:** Share methodology, create competitive advantage through velocity and quality.

### How to Teach the 5 Things

**Don't:**

- Just tell people "use Claude"
- Give them a prompt template
- Send them to ChatGPT and hope for the best

**Do:**

- Walk them through a real design session
- Show them how you bring context
- Demonstrate the daily learning habit
- Help them develop their own rails

**Pair with them on their first project using the 5 Things.**

Watch them:

- Struggle to provide context (teach Thing 1)
- Jump to implementation (enforce Thing 2)
- Accept Claude's first answer (demand Thing 3)
- Ship something incomplete (push for Thing 4)
- Get paralyzed by options (establish Thing 5)

**This is mentorship.** You're not teaching them to code. You're teaching them to think, to design, to learn continuously with an AI partner.

### The Future is Now

**We're at an inflection point.**

The developers who learn to collaborate effectively with AI will be 10-50x more productive than those who don't.

But it's not automatic. **You have to learn the 5 Things.**

And once you learn them, **you have to teach them.**

This is how we raise up the next generation of masters in 1-2 years instead of 5-10.

This is how we build the future.

## Conclusion: The Neural Network Advantage

We started with the insight that Claude is a silicon-based neural network that approximates biological learning. Your context primes which pathways activate.

**The 5 Things exploit this deliberately:**

1. **Bring yourself** → Prime the neural pathways with your context
2. **Start high level** → Align the activation patterns with your vision
3. **Design session** → Teach Claude (and yourself) the decision space
4. **Go big** → Leverage Claude's complete implementation capability
5. **Rails** → Constrain the solution space for velocity

**This isn't about using AI.** It's about understanding how attention mechanisms and context windows work, then structuring your collaboration to exploit them.

**The result:** Production-quality software at 50x velocity without sacrificing quality.

**The multiplier:** Raising up masters in 1-2 years instead of 5-10.

## Getting Started

**Your first project with Webb's 5 Things:**

1. Pick something small but real (internal tool, prototype, MVP)
2. Spend 30 minutes writing the context (bring yourself)
3. Spend 1 hour defining the vision (high level)
4. Spend 2 hours in a design session with Claude
5. Set rails before implementing
6. Go big—ship the complete solution
7. Measure time to production vs. traditional approach

**You'll be shocked.** Not just by the speed, but by the quality of the architectural decisions you make during the design session.

**Then teach someone else.**

## Case Study: Security Software JWT Licensing

**Challenge:** Build JWT licensing system from scratch. Enable sales to generate licenses on the spot.

**Timeline using Webb's 5 Things:**

- Day 1: Context, vision, design session, CLI implementation
- Day 2-3: API/UI integration via Claude Code
- Day 4-5: Testing and refinement

**Total:** 5 days to production

**Traditional timeline estimate:** 10-13 weeks

**Quality difference:** None. Actually better because design session caught edge cases early.

**Business impact:** Sales can close deals on the spot. Zero friction. CEO's vision delivered.

**Questions?** Contact Brian Webb at brian@kingslandacademy.com

**Want to teach this to your team?** Fork this methodology. Adapt it. Share it. Raise up masters.

## Work With Me: The 5 Things Seminar

### What $7,000/Day Gets You

**Skip the trial and error. Get direct mentorship to launch.**

I've compressed years of hard-won experience into a full-day intensive that takes you from context to launch in 1-3 sessions held in ONE DAY. Here's what the day looks like:

### Hour 1: The 5 Things with YOUR Prompt

We start with your actual project. Not a toy example—the real thing you need to build.

- You bring the context (Thing 1)
- We establish your high-level vision together (Thing 2)
- I watch you interact with Claude and coach in real-time
- You see exactly how I structure prompts for maximum leverage

**By the end of Hour 1:** You have a complete design session artifact and understand WHY it works.

### Hours 2-4: Design Sessions for Your Architecture

This is where it gets real. We take your project through full design sessions:

- **Architecture decisions** - I'll push back on your assumptions and help you establish rails
- **Technical deep-dives** - We solve your hardest problems together with Claude
- **Pattern recognition** - I show you the patterns I use daily across different domains
- **Live implementation** - Watch me go big with your codebase

**What you learn:**

- How to identify when you're getting generic AI output vs. leveraged output
- When to push back on Claude's suggestions
- How to structure your codebase for AI collaboration (monorepo patterns, path aliases, shared models)
- The daily learning habit that compounds your expertise

### Hours 5-8: From Design to Launch

Afternoon is execution. We take your designed system and ship it:

- **Implementation sprint** - You drive, I coach, Claude builds
- **Production hardening** - Error handling, edge cases, security review
- **Deployment pipeline** - CI/CD, environment configuration, documentation
- **Handoff preparation** - You're ready to continue solo

### What You Leave With

**After Day 1:**

- Complete design session documentation for your project
- Working prototype or MVP deployed to staging
- Your own rails documented and established
- Confidence to run design sessions independently

**After 2-3 Sessions:**

- Production-ready system launched
- Team trained in the methodology
- Established workflow for future projects
- Direct access to me for follow-up questions

### Who This Is For

**Good fit:**

- Technical founders building their first AI-assisted product
- Engineering leads who want to transform team velocity
- Experienced developers ready to 10x their output
- Anyone with a real project and a deadline

**Not a good fit:**

- "Just curious about AI" (read this document instead—it's free)
- No specific project in mind
- Looking for AI to replace thinking (it amplifies thinking, it doesn't replace it)

### Book Your Session

**$7,000/day** - Full-day intensive, remote or in-person (Raleigh-Durham area)

**What's included:**

- 8 hours of focused mentorship
- Pre-session questionnaire to maximize our time
- All design artifacts and documentation
- 30 days of async follow-up via email

**Contact:** brian@kingslandacademy.com

Subject line: "5 Things Seminar - [Your Project]"

Tell me:

1. What you're building
2. Where you're stuck
3. Your timeline

I'll respond within 24 hours with availability and next steps.

**This is the fast path.** You can learn the 5 Things yourself through months of experimentation, or you can have someone who's already made the mistakes walk you through it in a day.

The methodology is free. The mentorship is $7k. The ROI is 50x velocity on every project you touch for the rest of your career.

## One More Thing

Here's the prompt that made this web page:

```txt
Please understand CLAUDE_CODE_PROMPT.md and use webbs-5-things-for-ai-v2.md
to get a React based SPA using ../../test-and-learn/starter-monorepo/packages/web
as a starter and display the markdown as the source using a well used MD package
for react.

Please create the pipeline to deploy to GH pages.
```

Claude had me in GH pages in about 60 minutes. With a few quick follow-up requests, we refined it into what you're reading now.

### Tech Stack

- **React 19** - UI framework
- **Vite** - Lightning-fast build tool
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **react-markdown** - Markdown rendering with GitHub Flavored Markdown
- **rehype-highlight** - Syntax highlighting for code blocks
- **rehype-slug** - Auto-generates heading IDs for anchor links
- **remark-gfm** - GitHub Flavored Markdown support (tables, strikethrough, etc.)
- **Lucide React** - Beautiful, consistent icons
- **GitHub Actions** - Automatic deployment pipeline to GitHub Pages

### Session Refinements

During the design session, I asked Claude to make these adjustments:

- **Theme toggle** - Dark/Light/System mode selector with icon-only buttons
- **Collapsible ToC** - Sections collapse/expand with twist animation
- **Smart auto-expand** - Sections auto-open as you scroll, auto-close when you leave (unless pinned)
- **User pinning** - Click a section to keep it open permanently
- **Anchor links** - Hover any heading to get a clickable link icon
- **Integrated ToC toggle** - Smooth animated collapse with chevron in header (no duplicate labels)
- **Fetched content** - Markdown lives in `/public/content.md`, fetched at runtime
- **Full light/dark theme** - CSS variables with proper specificity for reliable theme switching
- **Light mode styling** - Dark brown headings, narrower content width closer to ToC
- **Clean layout** - Removed horizontal rules, top-aligned ToC chevrons

**Total time from prompt to deployed site:** ~30 minutes

**This is the 5 Things in action.** I brought context, started high-level, had a design session, went big, and used rails (React, Tailwind, GitHub Pages). The result: a production-ready site faster than most people can write a requirements doc.

**END**
