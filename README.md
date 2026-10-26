# MERIDIAN LEARNING — CAT Readiness & Learner Identity
### Evidence-Grounded Working Prototype for *Ace the Case 2026* (Summit × AceMBA)

---

## 🌟 Executive Summary & Core Value Proposition

**Meridian Learning** is a free, mock-provider-agnostic **"mock-to-next-action"** learning system for CAT (Common Admission Test) aspirants. 

Rather than being another passive question bank, lecture library, or dubious percentile predictor, Meridian solves the single most acute pain point identified across target user interviews:
> *"After a disappointing timed mock, help me understand what prevented my performance and choose one useful corrective exercise in less than five minutes."*

---

## 🚀 Quick Start: How to Run the Prototype

The prototype is 100% self-contained with zero npm or build dependencies. You can open and run it immediately:

### Option A: Direct Browser Launch (Instant)
Simply double-click or open **`index.html`** in any modern web browser (Chrome, Edge, Firefox, Safari):
```text
C:\Users\aarry\.gemini\antigravity\scratch\meridian-learning\index.html
```

### Option B: Local Python Web Server
Open PowerShell in this folder and run:
```powershell
python serve.py
```
Then navigate to:
```text
http://localhost:8000
```

---

## 📱 Mobile vs Desktop Viewport Switcher

To address the specific requirement for a mobile phone presentation:
- **Interactive Phone Simulator Bar**: At the very top of the prototype, toggle between:
  - 💻 **Desktop View**: Full-width executive dashboard layout.
  - 📱 **iPhone 16 Frame**: A hyper-realistic mobile smartphone frame with curved titanium bezels, animated **Dynamic Island**, realistic iOS status bar, and bottom home bar indicator.
  - 📱 **Android Frame**: Pixel-style mockup frame.
  - 🔍 **Scale Controls**: Toggle between 100% and 85% scale to fit various laptop screen heights.
- **Pure Responsive Design**: If you open the prototype directly on a real phone or shrink your desktop browser window, the UI automatically adapts natively with zero overflow.

---

## 🗺️ 6-Screen Core Loop (Workbook Section 10 Alignment)

| Screen | Name | Case Grounding | Key Features |
|---|---|---|---|
| **1** | **Targeted Intake** | Sec 06 (Intake) & R-03 | 60–90 second quick-start; situational context; friction selection (Q-01 to Q-04); daily time budget (10m/20m/35m); optional deeper profile drawer (no login barrier). |
| **2** | **Timed Micro-Diagnostic** | Q-01 to Q-04 | Authentic CAT problem sets (VARC RC Distractor Diagnostic with philosophy passage; DILR 2-minute Set Scan & Triage; QA Timed Triage Sprint). Real-time countdown timer & question navigation. |
| **3** | **Error Attribution & Post-Mortem** | Sec 03 Problem Map | "What happened?" reflection; algorithmic trap breakdown; cognitive failure classification (Over-extrapolation, Modifier trap, Sunk-cost hesitation, Algebra brute force). |
| **4** | **Meridian Readiness Signals** | Sec 07 Blueprint | 4 explainable section signals (VARC, DILR, QA, Execution Discipline) with confidence indicators (Low/Med/High based on empirical task count); transparent study readiness index (68/100); explicit ethical disclaimer. |
| **5** | **Next Best Drill (Action Loop)** | Sec 05 & 09 MVP | 10–15 min targeted micro-exercise directly addressing the diagnosed flaw; concept lesson ("The 20-Second Triage Rule") + interactive reattempt with instant feedback. |
| **6** | **Learner Identity & Privacy** | Sec 08 & Charter | Digital Meridian ID (`MER-CAT-2026-8841`); 30-day attempt timeline; GDPR-style data export (JSON) and reset; Web3 / Blockchain reality check sandbox explaining why NFTs are deferred. |

---

## 👥 Dynamic Interview Personas Included

You can switch between real participant archetypes from the ideation document directly in the app header:
1. **Harshit Verma (Delhi, B.Tech)**: Linked to **Q-04 (Quant Timed Transfer Gap)**. Strong untimed coaching material accuracy, but collapses to 4 correct in timed mocks.
2. **Pulkit Sharma (Dwarka, B.Tech)**: Linked to **Q-01 (DILR Set Triage & Mock Speed)**. Solves sets independently, but loses 15+ mins on wrong sets in mocks (12-20 score).
3. **Vedtrayee Sengupta (Gurgaon, Parallel MBA)**: Linked to **Q-02 & Q-03 (VARC Distractor Traps)**. High reading volume (Aeon Essays) but traps into subtle absolute modifiers.
4. **Custom Aspirant Profile**: Build your own custom diagnostic session.

---

## 🏛️ Strategic Decisions & Case Evidence Traceability

### 1. Executive Decision on Web3 / Blockchain / NFTs
- **Decision**: Normal private learner account for MVP; NFTs and crypto wallets are **excluded from the launch-critical path**.
- **Evidence-Based Rationale**: Across 10 user interviews, participants wanted speed, diagnostic clarity, and targeted drill recommendations. Requiring a Web3 wallet introduces friction with zero CAT benefit. W3C verifiable credentials remain an opt-in post-MBA exploration.

### 2. Defensible Competitor Differentiation
- **IMS SimCAT**: Offers high-level percentile rankings; Meridian offers an immediate 5-minute causal bridge into a micro-drill.
- **Career Launcher CDC**: Provides extensive reports that often cause analysis paralysis; Meridian delivers a singular "Next Best Drill" (<15 mins).
- **Cracku Reflection Room**: Categorizes by academic topic (e.g. "Algebra"); Meridian diagnoses the **cognitive failure** (e.g. "Triage Panic vs Concept Ignorance").

---

## 📁 File Structure

```text
meridian-learning/
├── index.html        # Main prototype application shell & screen markup
├── styles.css        # Bespoke design system, phone frame mockup & responsive styling
├── data.js           # Problem sets, personas, error taxonomy & competitor data
├── app.js            # Reactive state management, timers, diagnostics & scoring logic
├── serve.py          # Python HTTP server runner
└── README.md         # Documentation & walkthrough guide
```
