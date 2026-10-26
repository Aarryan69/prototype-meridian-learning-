// MERIDIAN CAT Readiness & Learner Identity
// Evidence-grounded dataset matching Ace the Case 2026 Workbook

const MERIDIAN_DATA = {
  // 1. Participant Personas from Workbook (Section 1 & 2)
  personas: [
    {
      id: "harshit",
      name: "Harshit Verma",
      role: "B.Tech Final Year (Delhi)",
      target: "CAT 2026 & MBA Abroad",
      background: "Engineering student with high untimed quantitative accuracy but suffers from clock panic in mocks.",
      quote: "Whenever I solve coaching material I solve most questions on my own without solutions, but in mocks I get only 4 correct (6-10 marks).",
      linkedIssue: "Q-04 / Quant Timed Transfer Gap",
      prepProfile: {
        primaryExam: "CAT 2026",
        secondaryExam: "GRE (planned for MBA Abroad)",
        prepMode: "Self-study + CL Mock Test Series",
        dailyBudget: "30 mins",
        recentScores: { VARC: 24, DILR: 18, QA: 8, total: 50 },
        primaryPain: "qa_timed_gap"
      }
    },
    {
      id: "pulkit",
      name: "Pulkit Sharma",
      role: "B.Tech Graduate / Aspirant (Dwarka)",
      target: "CAT 2026 (IIM A/B/C)",
      background: "Strong logical thinking when solving standalone sets, but in 40-minute sectional mocks loses 15+ minutes on the wrong set.",
      quote: "When I'm practicing I am able to solve most LRDI sets on my own, but in mocks I score 12-20. How to improve speed and selection?",
      linkedIssue: "Q-01 / DILR Mock Speed & Set Selection",
      prepProfile: {
        primaryExam: "CAT 2026",
        secondaryExam: "None (CAT First)",
        prepMode: "IMS SimCAT + Coaching",
        dailyBudget: "20 mins",
        recentScores: { VARC: 28, DILR: 14, QA: 26, total: 68 },
        primaryPain: "dilr_selection"
      }
    },
    {
      id: "vedtrayee",
      name: "Vedtrayee Sengupta",
      role: "Parallel MBA Student (Gurgaon)",
      target: "CAT 2026 (Targeting 99+ %ile)",
      background: "Pursuing MBA while re-attempting CAT. High reading volume (Aeon, The Hindu) but consistently traps into close distractor options.",
      quote: "I feel like I understood the passage, but when I look at the options I am always marking the wrong one. Stuck at 9-16 in VARC.",
      linkedIssue: "Q-02 & Q-03 / VARC Distractor Trap & Reading Transfer",
      prepProfile: {
        primaryExam: "CAT 2026",
        secondaryExam: "GMAT (completed earlier)",
        prepMode: "Cracku + Self-curated RC tests",
        dailyBudget: "15 mins",
        recentScores: { VARC: 11, DILR: 28, QA: 31, total: 70 },
        primaryPain: "varc_distractors"
      }
    }
  ],

  // 2. Authentic Diagnostic Question Sets (Realistic CAT micro-tests)
  diagnostics: {
    varc: {
      id: "diag_varc_01",
      section: "VARC",
      title: "RC Distractor & Inference Diagnostic",
      targetPain: "Q-03 & Q-02: Understands passage but falls into trap options",
      timeAllowedSeconds: 360, // 6 minutes
      passage: `Historian Lorraine Daston observes that the quest for scientific objectivity has never been a monolithic ideal; rather, it has mutated in response to the specific epistemic anxieties of each epoch. In the eighteenth century, naturalists practiced "truth-to-nature," idealizing specimens by stripping away idiosyncratic imperfections to reveal an archetypal form. By the mid-nineteenth century, however, the invention of photography and mechanical recording spawned "mechanical objectivity"—a resolute ethos of self-restraint where the observer sought to suppress all human judgment lest personal bias contaminate the data.

Yet, this ascetic self-effacement proved unsustainable. By the early twentieth century, scientists recognized that mechanical records were frequently uninterpretable without expert discernment. This gave rise to "trained judgment"—the acknowledgment that seeing requires practice, and that an experienced researcher's intuitive synthesis is often more reliable than unmediated raw output.

The contemporary rush toward algorithmic automated evaluation replicates the nineteenth-century illusion of mechanical objectivity in digital garb. Machine-learning models are celebrated precisely because they seem devoid of human caprice. Yet in expunging the human observer, we risk discarding the very "trained judgment" required to detect contextual anomalies. The danger is not that algorithms make mistakes, but that their apparent lack of subjective intentionality leads practitioners to confuse structural indifference with neutrality.`,
      questions: [
        {
          id: "v_q1",
          questionNumber: 1,
          type: "Critical Inference",
          prompt: "Based on the passage, the transition from 'truth-to-nature' to 'mechanical objectivity' primarily reflected:",
          options: [
            {
              id: "A",
              text: "A growing technological capability that rendered all forms of human subjective illustration obsolete.",
              isCorrect: false,
              trapType: "Extreme Wording & Unsupported Scope ('rendered all forms obsolete')",
              explanation: "Incorrect. The passage notes mechanical recording spawned a new ethos, but does not claim it rendered all subjective illustration obsolete universally."
            },
            {
              id: "B",
              text: "A shift in epistemic anxiety from fear of individual specimen anomalies to fear of the observer's own subjective bias.",
              isCorrect: true,
              trapType: null,
              explanation: "Correct! In 'truth-to-nature' observers feared idiosyncratic specimen imperfections; in 'mechanical objectivity' the fear shifted to the observer's own human judgment contaminating data."
            },
            {
              id: "C",
              text: "The definitive realization that expert discernment was actively corrupting scientific findings.",
              isCorrect: false,
              trapType: "Distorter Trap (Over-characterization)",
              explanation: "Incorrect. 'Trained judgment' later embraced expert discernment; early scientists did not 'definitively realize' it was corrupting findings."
            },
            {
              id: "D",
              text: "A pragmatic response to commercial pressures demanding standardized photographs for mass publishing.",
              isCorrect: false,
              trapType: "Out of Scope / Fabricated Cause",
              explanation: "Incorrect. Commercial publishing pressures are never mentioned or implied in the text."
            }
          ]
        },
        {
          id: "v_q2",
          questionNumber: 2,
          type: "Application & Analogical Reasoning",
          prompt: "According to the author, modern reliance on machine-learning algorithms is most problematic because:",
          options: [
            {
              id: "A",
              text: "Algorithmic decision systems produce higher error rates than mid-twentieth-century trained human judgment.",
              isCorrect: false,
              trapType: "Contradiction of Text ('The danger is not that algorithms make mistakes...')",
              explanation: "Incorrect. The author explicitly states: 'The danger is not that algorithms make mistakes...'"
            },
            {
              id: "B",
              text: "Practitioners conflate the absence of human intentionality with genuine epistemic impartiality.",
              isCorrect: true,
              trapType: null,
              explanation: "Correct! The passage explicitly warns that practitioners 'confuse structural indifference with neutrality' because algorithms seem devoid of human caprice."
            },
            {
              id: "C",
              text: "Machine-learning architectures are fundamentally incapable of modeling any form of trained human intuition.",
              isCorrect: false,
              trapType: "Extreme Extrapolation ('fundamentally incapable')",
              explanation: "Incorrect. The passage argues we risk discarding trained judgment, not that architectures can never model heuristics."
            },
            {
              id: "D",
              text: "It revives the eighteenth-century practice of stripping away idiosyncratic imperfections from data points.",
              isCorrect: false,
              trapType: "Epoch Confusion (Text says it replicates 19th-century mechanical objectivity, not 18th)",
              explanation: "Incorrect. The author links algorithms to 19th-century mechanical objectivity, not 18th-century truth-to-nature."
            }
          ]
        },
        {
          id: "v_q3",
          questionNumber: 3,
          type: "Author's Epistemic Stance",
          prompt: "Which of the following phrases best captures the author's attitude toward 'trained judgment' in scientific inquiry?",
          options: [
            {
              id: "A",
              text: "A necessary interpretive synthesis that balances raw data against situated context.",
              isCorrect: true,
              trapType: null,
              explanation: "Correct! The passage characterizes trained judgment as seeing requiring practice, where intuitive synthesis provides indispensable contextual discernment."
            },
            {
              id: "B",
              text: "A regrettable compromise between pure objective detachment and human cognitive limitations.",
              isCorrect: false,
              trapType: "Negative Valence Distractor ('regrettable compromise')",
              explanation: "Incorrect. The author treats trained judgment as a sophisticated, necessary recognition, not a regrettable compromise."
            },
            {
              id: "C",
              text: "An idiosyncratic relic of early twentieth-century academic hierarchy.",
              isCorrect: false,
              trapType: "Pessimistic Misrepresentation",
              explanation: "Incorrect. The author portrays trained judgment favorably as an antidote to unmediated raw output."
            },
            {
              id: "D",
              text: "A temporary phase destined to be superseded by error-free algorithmic synthesis.",
              isCorrect: false,
              trapType: "Authorial Contradiction",
              explanation: "Incorrect. The author argues algorithmic synthesis lacks the very contextual awareness that trained judgment offers."
            }
          ]
        }
      ]
    },

    dilr: {
      id: "diag_dilr_01",
      section: "DILR",
      title: "Set-Selection & Clue-Density Diagnostic",
      targetPain: "Q-01: Standalone practice succeeds, but mock speed drops due to poor triage & abandonment",
      timeAllowedSeconds: 300, // 5 minutes
      passage: `[DILR Set Triage Scenario]
Four venture capital firms (Alpha, Beacon, Crest, Delta) invested in four AI startups (Neural, Omnia, Prone, Quantum) across four distinct quarters of 2025 (Q1, Q2, Q3, Q4). Each startup received funding from exactly one firm, and no two deals closed in the same quarter.

You are given 5 clues:
1. Crest did not invest in Q1 or Q4, and did not fund Neural.
2. The firm that funded Prone invested exactly two quarters before Delta's investment.
3. Quantum received funding in an odd-numbered quarter, but not from Alpha.
4. Beacon closed its deal in Q2, but its investment was not in Omnia.
5. Neural's funding quarter was immediately after the quarter in which Beacon made its investment.`,
      questions: [
        {
          id: "d_q1",
          questionNumber: 1,
          type: "Triage & Keystone Identification",
          prompt: "In your first 90 seconds of reviewing this set, what is the critical keystone link that completely anchors the timeline?",
          options: [
            {
              id: "A",
              text: "Combining Clue 4 (Beacon in Q2) with Clue 5 (Neural in quarter immediately after Beacon -> Q3).",
              isCorrect: true,
              trapType: null,
              explanation: "Correct! Beacon = Q2 directly fixes Neural = Q3. With Clue 1 (Crest not in Q1, Q4, or Neural), Crest must be Q2... but Beacon is Q2, revealing an immediate deduction chain!"
            },
            {
              id: "B",
              text: "Attempting all possible 4-quarter permutations of Prone and Delta from Clue 2.",
              isCorrect: false,
              trapType: "Brute Force Sunk Time Trap (Consumes 4-6 minutes)",
              explanation: "Incorrect! Branching on Clue 2 creates multi-case splitting before anchoring the definite quarters."
            },
            {
              id: "C",
              text: "Starting with Quantum's odd quarter possibility (Q1 vs Q3) without fixing the firms first.",
              isCorrect: false,
              trapType: "Unanchored Branching Trap",
              explanation: "Incorrect! Starting with an open branch (Q1 or Q3) wastes time when Q2 and Q3 are already deterministically locked."
            },
            {
              id: "D",
              text: "Abandoning this set immediately because five clues with two variables require too many sub-grids.",
              isCorrect: false,
              trapType: "Premature Abandonment Trap",
              explanation: "Incorrect. This is a classic 4x4 direct deduction grid with 2 deterministic anchors—it should be solved in 5-6 mins, not abandoned."
            }
          ]
        },
        {
          id: "d_q2",
          questionNumber: 2,
          type: "Direct Deduction",
          prompt: "Which venture firm funded Neural, and in which quarter?",
          options: [
            {
              id: "A",
              text: "Alpha in Q3",
              isCorrect: false,
              trapType: "Partial Deduction Error",
              explanation: "Incorrect. If Alpha is Q3, Delta (from Clue 2: Delta must be Q3 or Q4) cannot be satisfied properly."
            },
            {
              id: "B",
              text: "Delta in Q3",
              isCorrect: true,
              trapType: null,
              explanation: "Correct! Beacon is Q2. Neural is Q3. From Clue 2, Prone is 2 quarters before Delta, so Delta must be Q3 or Q4; with Crest not in Q4/Q1, Delta is Q3 and funded Neural!"
            },
            {
              id: "C",
              text: "Crest in Q2",
              isCorrect: false,
              trapType: "Violates Clue 1 ('did not fund Neural')",
              explanation: "Incorrect. Clue 1 explicitly states Crest did not fund Neural."
            },
            {
              id: "D",
              text: "Beacon in Q3",
              isCorrect: false,
              trapType: "Violates Clue 4 ('Beacon in Q2')",
              explanation: "Incorrect. Beacon invested in Q2."
            }
          ]
        }
      ]
    },

    quant: {
      id: "diag_quant_01",
      section: "QA",
      title: "Time-Triage & Trap-Identification Sprint",
      targetPain: "Q-04: Strong untimed algebra/arithmetic, but collapses to 4 correct in timed mocks",
      timeAllowedSeconds: 300, // 5 minutes
      passage: `[QA 3-Question Triage Challenge]
In CAT Quant, high percentiles come from question triage—identifying the 40-second shortcut vs the 3.5-minute algebraic sinkhole. Attempt these 2 targeted items under strict time.`,
      questions: [
        {
          id: "q_q1",
          questionNumber: 1,
          type: "Triage: The Algebraic Sinkhole vs Shortcut",
          prompt: "If 2^(x+1) + 4^x = 80, find the value of (x^2 + 2x + 7) for real x.",
          options: [
            {
              id: "A",
              text: "19",
              isCorrect: false,
              trapType: "Off-by-one arithmetic error (assuming x=2)",
              explanation: "Incorrect. If x=2, 2^3 + 4^2 = 8 + 16 = 24 != 80."
            },
            {
              id: "B",
              text: "22",
              isCorrect: true,
              trapType: null,
              explanation: "Correct! Notice 4^x = (2^x)^2. Let y = 2^x. Then y^2 + 2y - 80 = 0 -> (y + 10)(y - 8) = 0. Since 2^x > 0, y = 8 -> 2^x = 8 -> x = 3. Value: 3^2 + 2(3) + 7 = 9 + 6 + 7 = 22. (Target time: 45s)."
            },
            {
              id: "C",
              text: "31",
              isCorrect: false,
              trapType: "Assuming x=4 without checking 4^x",
              explanation: "Incorrect. If x=4, 4^4 = 256 which far exceeds 80."
            },
            {
              id: "D",
              text: "15",
              isCorrect: false,
              trapType: "Calculation Slip",
              explanation: "Incorrect."
            }
          ]
        },
        {
          id: "q_q2",
          questionNumber: 2,
          type: "Triage: Arithmetic Ratio Time-Trap",
          prompt: "Two vessels contain milk and water in ratios 7:3 and 5:1. In what ratio must mixtures from both be blended so the resulting mixture has milk and water in the ratio 3:1?",
          options: [
            {
              id: "A",
              text: "1 : 2",
              isCorrect: false,
              trapType: "Inverted Allegation Ratio",
              explanation: "Incorrect. Inverted order of vessels."
            },
            {
              id: "B",
              text: "5 : 3",
              isCorrect: true,
              trapType: null,
              explanation: "Correct! Use Alligation on Milk fraction: Vessel 1 = 7/10 = 0.70. Vessel 2 = 5/6 ≈ 0.833. Target = 3/4 = 0.75. Ratio = (5/6 - 3/4) / (3/4 - 7/10) = (1/12) / (1/20) = 20/12 = 5:3. (Target time: 60s via Alligation vs 2.5 min via linear variables)."
            },
            {
              id: "C",
              text: "3 : 5",
              isCorrect: false,
              trapType: "Distractor Slip",
              explanation: "Incorrect."
            },
            {
              id: "D",
              text: "2 : 3",
              isCorrect: false,
              trapType: "Common Fraction Rounding Error",
              explanation: "Incorrect."
            }
          ]
        }
      ]
    }
  },

  // 3. Cognitive Error Reflection Taxonomy (Screen 3)
  errorTaxonomy: [
    {
      id: "extrapolation",
      section: "VARC",
      label: "Over-Extrapolation beyond text",
      description: "You chose an option that sounded philosophically plausible or 'smart', but the author never actually committed to it.",
      remedy: "2-Distractor Verification drill: demand explicit paragraph line support."
    },
    {
      id: "extreme_words",
      section: "VARC",
      label: "Extreme Modifiers Trap",
      description: "Fell for categorical words like 'all', 'completely', 'fundamentally incapable', or 'rendered obsolete'.",
      remedy: "Modifier Scan: circle absolutes in answer options before evaluating."
    },
    {
      id: "sunk_cost",
      section: "DILR",
      label: "Sunk-Cost Trap & Delayed Abandonment",
      description: "Spent over 4 minutes trying to crack a complex clue branch without finding a deterministic anchor, refusing to leave.",
      remedy: "The 2-Minute Gate: If no 2 cells are fixed by minute 2, switch to the next set immediately."
    },
    {
      id: "keystone_miss",
      section: "DILR",
      label: "Missed Keystone Constraint",
      description: "Started multi-case branching before combining clues that directly lock a single variable.",
      remedy: "Direct Clue Overlap: Scan for the entity repeated in 2+ clues first."
    },
    {
      id: "algebraic_sinkhole",
      section: "QA",
      label: "Linear Algebra Brute Force instead of Triage",
      description: "Constructed simultaneous linear equations with fractions instead of checking for substitution or alligation.",
      remedy: "Triage Protocol: 15-second inspection before pen hits paper."
    },
    {
      id: "panic_rush",
      section: "QA",
      label: "Clock Panic / Careless Arithmetic Slip",
      description: "Rushed the final step due to ticking clock and picked the inverted or off-by-one option.",
      remedy: "Last-Mile Verification: Check what the question actually asks for (e.g. x^2+2x+7 vs x)."
    }
  ],

  // 4. Targeted Next Best Drills (Screen 5)
  nextBestDrills: {
    varc_distractors: {
      id: "drill_v01",
      title: "Option Trap Elimination Sprint",
      duration: "10 mins",
      section: "VARC",
      objective: "Train elimination of 2 near-distractors by identifying unsubstantiated modifiers.",
      conceptLesson: {
        heading: "The 'High-Register Distortion' Trap in CAT RC",
        body: "Test setters design incorrect options by using sophisticated vocabulary from the passage while quietly swapping a nuanced claim for an absolute one (e.g., 'rendered completely obsolete' vs 'fostered a new ethos'). When down to 2 options, don't ask 'Which sounds more convincing?' Ask: 'Which word forces me to defend a claim the author never made?'"
      },
      microExercise: {
        stem: "Which of the following statements represents an UNFOUNDED absolute claim according to academic RC conventions?",
        options: [
          { text: "A. The adoption of mechanical tools constrained individual researcher subjectivity.", isExtreme: false },
          { text: "B. Mechanical recording definitively eliminated all subjective biases across early natural sciences.", isExtreme: true, reason: "The words 'definitively eliminated all' make this indefensible." },
          { text: "C. Modern algorithmic methods often obscure structural indifference behind technical opacity.", isExtreme: false }
        ]
      }
    },
    dilr_selection: {
      id: "drill_d01",
      title: "The 90-Second Set Viability Triage",
      duration: "12 mins",
      section: "DILR",
      objective: "Evaluate whether a set should be solved immediately, banked for round 2, or dropped.",
      conceptLesson: {
        heading: "The 3-Point Clue Density Rule",
        body: "A high-yielding CAT DILR set has at least ONE absolute anchor (e.g. 'X is on Tuesday') and at least ONE linkage clue mentioning the same entity. If a set has 4 clues and all 4 contain conditionals ('if... then...'), it is a Round 2 or Skip set. Never start brute-force branching in the first 3 minutes."
      },
      microExercise: {
        stem: "You have 38 minutes left in a CAT mock. Set A has 4 entities with 1 fixed anchor. Set B has 6 entities with 5 conditional clues and no fixed position. Your immediate action:",
        options: [
          { text: "A. Start Set B because 5 clues sound like more information.", isCorrect: false },
          { text: "B. Anchor and solve Set A first; leave Set B for Round 2 only if time permits.", isCorrect: true, reason: "Anchor clues yield reliable early points without combinatorial explosions." }
        ]
      }
    },
    qa_timed_gap: {
      id: "drill_q01",
      title: "Question Triage & Time-Sink Identification",
      duration: "10 mins",
      section: "QA",
      objective: "Differentiate between 45-second high-yield questions and 3-minute algebra traps.",
      conceptLesson: {
        heading: "The 20-Second Triage Rule",
        body: "If your solving path requires more than 3 lines of fraction arithmetic, pause. Ask: Can this be solved via Alligation, Option Back-Substitution, or Unit Digit properties? If not, and you are under clock pressure, mark for Round 2."
      },
      microExercise: {
        stem: "A question asks for the integer solution to an exponential equation with options: A) 22, B) 19, C) 15, D) 31. Your first step should be:",
        options: [
          { text: "A. Substitute variable y = 2^x to check for quadratic factoring before writing lengthy logarithm steps.", isCorrect: true, reason: "Transforms exponential to simple quadratic in 15 seconds." },
          { text: "B. Immediately apply natural logarithms to both sides.", isCorrect: false }
        ]
      }
    }
  },

  // 5. Competitor Audit Data from Ideation Doc (Section 4)
  competitors: [
    {
      name: "IMS SimCAT (2026)",
      claim: "AI performance insights & adaptive practice",
      limitation: "High-level percentile analytics; doesn't provide the rapid 5-minute causal post-mortem bridge into a targeted drill.",
      meridianEdge: "Targeted error-to-drill feedback loop in <5 mins without platform lock-in."
    },
    {
      name: "Career Launcher CDC (2026)",
      claim: "Timing productivity, booster analysis & AI mock analysis",
      limitation: "Extensive reports can create analysis paralysis; students still report not knowing what micro-task to do next.",
      meridianEdge: "Singular 'Next Best Drill' (10-15 mins) that directly attacks the diagnosed cognitive trap."
    },
    {
      name: "Cracku Reflection Room",
      claim: "Error log & reattempt by topic",
      limitation: "Categorizes errors by topic (e.g. 'Algebra'), but misses the cognitive cause (e.g. 'Triage hesitation vs Concept gap').",
      meridianEdge: "Cognitive failure taxonomy: distinguishes time panic and distractor traps from conceptual ignorance."
    },
    {
      name: "2IIM Free Bank",
      claim: "Free previous-year paper bank with video solutions",
      limitation: "Static question repository without personalized decision-making diagnostics under time constraints.",
      meridianEdge: "Active diagnostic on decision-making under time pressure, not just static content."
    }
  ]
};
