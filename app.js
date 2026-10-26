// MERIDIAN LEARNING — Application Controller & Engine
// Implements the 6-Screen Mock-to-Next-Action loop

let appState = {
  currentPersonaId: "harshit",
  currentScreen: 1,
  viewportMode: "desktop", // 'desktop', 'phone-ios', 'phone-android'
  isScaled85: false,

  // Intake State
  intake: {
    situation: "College Final Year (B.Tech)",
    friction: "qa_timed_gap",
    timeBudget: "20 mins",
    mockProvider: "Career Launcher (CDC) / IMS SimCAT",
    pastExams: "Targeting GMAT alongside CAT"
  },

  // Diagnostic State
  diagnostic: {
    activeSectionKey: "quant",
    currentQuestionIndex: 0,
    answers: {}, // questionId: optionId
    timeRemaining: 300,
    timerInterval: null,
    startedAt: null,
    isSubmitted: false
  },

  // Post-Mortem State
  postMortem: {
    selectedAttributionId: "algebraic_sinkhole",
    userNotes: ""
  },

  // Readiness Signals
  readiness: {
    compositeIndex: 68,
    evidenceCount: 3,
    signals: {
      varc: { score: 64, conf: "med", desc: "Moderate distractor discrimination; struggles with subtle absolute modifiers." },
      dilr: { score: 58, conf: "high", desc: "High solo accuracy, but 2-minute set triage shows delayed abandonment risk." },
      qa: { score: 72, conf: "high", desc: "High algebra fluency; tendency to brute force before shortcut triage." },
      exec: { score: 78, conf: "med", desc: "Time allocation discipline on track; 1 clock panic instance flagged." }
    }
  },

  // Current Drill
  activeDrillKey: "qa_timed_gap",
  drillExerciseAnswer: null,

  // History & Timeline
  history: [
    {
      title: "QA Timed Transfer Diagnostic Attempted",
      meta: "Today • 5 mins • Error Tag: Brute Force Linear Algebra",
      icon: "⚡"
    },
    {
      title: "Initial Profile Calibration",
      meta: "Baseline recorded from CL Mock 04 scores",
      icon: "📋"
    }
  ]
};

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initLiveClock();
  switchPersona("harshit");
  setupDynamicIsland();
});

// Live clock inside phone status bar
function initLiveClock() {
  const clockEl = document.getElementById("phoneLiveClock");
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
  }
  updateTime();
  setInterval(updateTime, 10000);
}

// ============================================================================
// VIEWPORT & DEVICE FRAME CONTROLLER (Desktop vs Mobile Phone Simulator)
// ============================================================================
function setViewportMode(mode) {
  appState.viewportMode = mode;

  const stage = document.getElementById("viewportStage");
  const desktopContainer = document.getElementById("desktopAppContainer");
  const phoneScrollArea = document.getElementById("phoneAppScrollArea");
  const coreContent = document.getElementById("appCoreContent");

  // Update switcher button highlights
  document.getElementById("btnModeDesktop").classList.toggle("active", mode === "desktop");
  document.getElementById("btnModeIos").classList.toggle("active", mode === "phone-ios");
  document.getElementById("btnModeAndroid").classList.toggle("active", mode === "phone-android");

  // Update stage classes
  stage.className = `viewport-stage mode-${mode}${appState.isScaled85 ? ' scale-85' : ''}`;

  if (mode === "desktop") {
    // Reparent core content inside the desktop layout frame
    if (!desktopContainer.contains(coreContent)) {
      desktopContainer.appendChild(coreContent);
    }
    document.getElementById("phoneSimulatorWrapper").style.display = "none";
    desktopContainer.style.display = "flex";
  } else {
    // Reparent core content into phone mockup scroll area
    desktopContainer.style.display = "none";
    document.getElementById("phoneSimulatorWrapper").style.display = "flex";
    if (!phoneScrollArea.contains(coreContent)) {
      phoneScrollArea.appendChild(coreContent);
    }
  }

  updateIslandStatus();
}

function toggleScale() {
  appState.isScaled85 = !appState.isScaled85;
  const stage = document.getElementById("viewportStage");
  stage.classList.toggle("scale-85", appState.isScaled85);
  document.getElementById("scaleLabel").textContent = appState.isScaled85 ? "Scale 85%" : "Scale 100%";
}

function setupDynamicIsland() {
  updateIslandStatus();
}

function updateIslandStatus() {
  const islandText = document.getElementById("islandStatusText");
  if (!islandText) return;

  if (appState.currentScreen === 2 && appState.diagnostic.timerInterval) {
    const mins = Math.floor(appState.diagnostic.timeRemaining / 60);
    const secs = appState.diagnostic.timeRemaining % 60;
    islandText.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  } else if (appState.currentScreen === 4) {
    islandText.textContent = `Score: ${appState.readiness.compositeIndex}`;
  } else if (appState.currentScreen === 5) {
    islandText.textContent = `Drill Active`;
  } else {
    islandText.textContent = `CAT Prep`;
  }
}

function toggleDynamicIslandExpand() {
  const island = document.querySelector(".dynamic-island");
  if (!island) return;
  island.style.width = island.style.width === "200px" ? "120px" : "200px";
}

// ============================================================================
// NAVIGATION & PROGRESS STEPPER
// ============================================================================
function navigateToScreen(screenNum) {
  appState.currentScreen = screenNum;

  // Toggle active screen element
  for (let i = 1; i <= 6; i++) {
    const screen = document.getElementById(`screen${i}`);
    if (screen) {
      screen.classList.toggle("active-screen", i === screenNum);
    }

    const stepBtn = document.getElementById(`stepBtn${i}`);
    if (stepBtn) {
      stepBtn.classList.toggle("active", i === screenNum);
      if (i < screenNum) {
        stepBtn.classList.add("completed");
      } else {
        stepBtn.classList.remove("completed");
      }
    }
  }

  // Scroll to top of active container
  const scrollContainer = appState.viewportMode === "desktop" 
    ? document.getElementById("desktopAppContainer")
    : document.getElementById("phoneAppScrollArea");
  if (scrollContainer) scrollContainer.scrollTop = 0;

  // Screen-specific setup hooks
  if (screenNum === 2) {
    setupDiagnosticScreen();
  } else if (screenNum === 3) {
    setupPostMortemScreen();
  } else if (screenNum === 4) {
    setupReadinessScreen();
  } else if (screenNum === 5) {
    setupDrillScreen();
  } else if (screenNum === 6) {
    setupIdentityScreen();
  }

  updateIslandStatus();
}

// ============================================================================
// SCREEN 1: INTAKE & PERSONA CONTROLS
// ============================================================================
function switchPersona(personaId) {
  appState.currentPersonaId = personaId;
  const persona = MERIDIAN_DATA.personas.find(p => p.id === personaId);

  const quoteBox = document.getElementById("personaQuoteBox");
  const quoteText = document.getElementById("personaQuoteText");
  const quoteAuthor = document.getElementById("personaQuoteAuthor");

  if (persona) {
    quoteBox.style.display = "flex";
    quoteText.textContent = persona.quote;
    quoteAuthor.textContent = `— ${persona.name} (${persona.role} • Linked to Statement ${persona.linkedIssue})`;

    // Pre-select corresponding friction and diagnostic
    selectFriction(persona.prepProfile.primaryPain);
  } else {
    // Custom persona
    quoteBox.style.display = "none";
  }

  // Update learner ID preview
  updateLearnerIdDetails(persona);
}

function selectPill(btnEl, group) {
  const parent = btnEl.parentElement;
  Array.from(parent.children).forEach(child => child.classList.remove("selected"));
  btnEl.classList.add("selected");

  if (group === "situation") {
    appState.intake.situation = btnEl.textContent.trim();
  } else if (group === "time") {
    appState.intake.timeBudget = btnEl.textContent.trim();
  }
}

function selectFriction(frictionKey) {
  appState.intake.friction = frictionKey;

  const cardIds = {
    qa_timed_gap: "painCardQA",
    dilr_selection: "painCardDILR",
    varc_distractors: "painCardVARC",
    exec_fatigue: "painCardExec"
  };

  Object.values(cardIds).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("selected");
  });

  const activeEl = document.getElementById(cardIds[frictionKey]);
  if (activeEl) activeEl.classList.add("selected");

  // Map friction to corresponding diagnostic section and drill
  if (frictionKey === "dilr_selection") {
    appState.diagnostic.activeSectionKey = "dilr";
    appState.activeDrillKey = "dilr_selection";
  } else if (frictionKey === "varc_distractors") {
    appState.diagnostic.activeSectionKey = "varc";
    appState.activeDrillKey = "varc_distractors";
  } else {
    appState.diagnostic.activeSectionKey = "quant";
    appState.activeDrillKey = "qa_timed_gap";
  }
}

function toggleDeeperProfile() {
  const content = document.getElementById("deeperProfileContent");
  const icon = document.getElementById("deeperToggleIcon");
  const isOpen = content.classList.toggle("open");
  icon.textContent = isOpen ? "▲" : "▼";
}

function startDiagnosticFromIntake() {
  navigateToScreen(2);
}

// ============================================================================
// SCREEN 2: TIMED CAT MICRO-DIAGNOSTIC
// ============================================================================
function setupDiagnosticScreen() {
  const sectionKey = appState.diagnostic.activeSectionKey;
  const diagData = MERIDIAN_DATA.diagnostics[sectionKey];

  if (!diagData) return;

  // Header tags
  document.getElementById("diagSectionTag").textContent = diagData.section;
  document.getElementById("diagTitleText").textContent = diagData.title;

  // Reading / Problem Stem Pane
  const passagePane = document.getElementById("diagPassageContent");
  passagePane.innerHTML = diagData.passage
    .split("\n\n")
    .map(p => `<p>${p.trim()}</p>`)
    .join("");

  // Reset or initialize question index
  appState.diagnostic.currentQuestionIndex = 0;
  appState.diagnostic.timeRemaining = diagData.timeAllowedSeconds;
  appState.diagnostic.answers = {};
  appState.diagnostic.isSubmitted = false;

  renderDiagnosticQuestion();
  startDiagnosticTimer();
}

function startDiagnosticTimer() {
  if (appState.diagnostic.timerInterval) {
    clearInterval(appState.diagnostic.timerInterval);
  }

  const timerEl = document.getElementById("diagTimer");

  function tick() {
    if (appState.diagnostic.timeRemaining <= 0) {
      clearInterval(appState.diagnostic.timerInterval);
      submitDiagnostic();
      return;
    }

    appState.diagnostic.timeRemaining--;
    const mins = Math.floor(appState.diagnostic.timeRemaining / 60);
    const secs = appState.diagnostic.timeRemaining % 60;
    const formatted = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (timerEl) {
      timerEl.textContent = formatted;
      timerEl.classList.toggle("warning", appState.diagnostic.timeRemaining < 60);
    }

    updateIslandStatus();
  }

  tick();
  appState.diagnostic.timerInterval = setInterval(tick, 1000);
}

function renderDiagnosticQuestion() {
  const sectionKey = appState.diagnostic.activeSectionKey;
  const diagData = MERIDIAN_DATA.diagnostics[sectionKey];
  const qIndex = appState.diagnostic.currentQuestionIndex;
  const question = diagData.questions[qIndex];

  document.getElementById("qTypeBadge").textContent = `Question ${qIndex + 1} of ${diagData.questions.length} • ${question.type}`;
  document.getElementById("qPromptStem").textContent = question.prompt;

  const optionsContainer = document.getElementById("diagOptionsList");
  optionsContainer.innerHTML = "";

  question.options.forEach(opt => {
    const isSelected = appState.diagnostic.answers[question.id] === opt.id;
    const optEl = document.createElement("div");
    optEl.className = `option-item${isSelected ? ' selected' : ''}`;
    optEl.onclick = () => selectDiagnosticOption(question.id, opt.id);

    optEl.innerHTML = `
      <div class="option-key">${opt.id}</div>
      <div class="option-text">${opt.text}</div>
    `;

    optionsContainer.appendChild(optEl);
  });

  // Buttons visibility
  const btnPrev = document.getElementById("btnPrevQ");
  const btnNext = document.getElementById("btnNextOrSubmitQ");

  btnPrev.style.display = qIndex > 0 ? "inline-flex" : "none";
  if (qIndex === diagData.questions.length - 1) {
    btnNext.textContent = "Review & Submit →";
  } else {
    btnNext.textContent = "Next Question →";
  }
}

function selectDiagnosticOption(qId, optId) {
  appState.diagnostic.answers[qId] = optId;
  renderDiagnosticQuestion();
}

function clearOptionSelection() {
  const sectionKey = appState.diagnostic.activeSectionKey;
  const diagData = MERIDIAN_DATA.diagnostics[sectionKey];
  const qIndex = appState.diagnostic.currentQuestionIndex;
  const question = diagData.questions[qIndex];

  delete appState.diagnostic.answers[question.id];
  renderDiagnosticQuestion();
}

function prevQuestion() {
  if (appState.diagnostic.currentQuestionIndex > 0) {
    appState.diagnostic.currentQuestionIndex--;
    renderDiagnosticQuestion();
  }
}

function nextOrSubmitQuestion() {
  const sectionKey = appState.diagnostic.activeSectionKey;
  const diagData = MERIDIAN_DATA.diagnostics[sectionKey];

  if (appState.diagnostic.currentQuestionIndex < diagData.questions.length - 1) {
    appState.diagnostic.currentQuestionIndex++;
    renderDiagnosticQuestion();
  } else {
    submitDiagnostic();
  }
}

function submitDiagnostic() {
  if (appState.diagnostic.timerInterval) {
    clearInterval(appState.diagnostic.timerInterval);
    appState.diagnostic.timerInterval = null;
  }

  appState.diagnostic.isSubmitted = true;
  navigateToScreen(3);
}

// ============================================================================
// SCREEN 3: ERROR ATTRIBUTION & COGNITIVE POST-MORTEM
// ============================================================================
function setupPostMortemScreen() {
  const sectionKey = appState.diagnostic.activeSectionKey;
  const diagData = MERIDIAN_DATA.diagnostics[sectionKey];
  const q1 = diagData.questions[0];
  const userAnsId = appState.diagnostic.answers[q1.id] || "A"; // default to simulated distractor if empty
  const chosenOpt = q1.options.find(o => o.id === userAnsId) || q1.options[0];
  const correctOpt = q1.options.find(o => o.isCorrect);

  // Summary row updates
  document.getElementById("postSummarySection").textContent = `${diagData.section} (${diagData.title})`;
  document.getElementById("postSummaryTime").textContent = "2m 42s (Benchmark: 60-90s)";

  const userAnsEl = document.getElementById("postSummaryUserAns");
  userAnsEl.textContent = `Option ${chosenOpt.id} (${chosenOpt.text.substring(0, 48)}...)`;
  userAnsEl.style.color = chosenOpt.isCorrect ? "var(--accent-emerald)" : "var(--accent-crimson)";

  const correctAnsEl = document.getElementById("postSummaryCorrectAns");
  correctAnsEl.textContent = `Option ${correctOpt.id} (${correctOpt.text.substring(0, 48)}...)`;

  // Explanation callout
  const expBox = document.getElementById("postSummaryExplanationText");
  if (chosenOpt.isCorrect) {
    expBox.innerHTML = `<strong>Accurate Selection:</strong> You avoided the trap! ${correctOpt.explanation}`;
  } else {
    const trapDesc = chosenOpt.trapType || "Pace & Distractor Hesitation";
    expBox.innerHTML = `<strong>Algorithmic Trap Flag:</strong> You selected a distractor (${trapDesc}). ${chosenOpt.explanation}`;
  }

  // Populate Attribution Choices
  const attributionList = document.getElementById("attributionList");
  attributionList.innerHTML = "";

  // Filter taxonomy for this section
  const sectionTaxonomy = MERIDIAN_DATA.errorTaxonomy.filter(item => 
    item.section === diagData.section || item.section === "QA" && diagData.section === "QA"
  );

  const fallbackTaxonomy = sectionTaxonomy.length > 0 ? sectionTaxonomy : MERIDIAN_DATA.errorTaxonomy.slice(0, 3);

  fallbackTaxonomy.forEach((item, index) => {
    const isSelected = index === 0;
    if (isSelected) appState.postMortem.selectedAttributionId = item.id;

    const tile = document.createElement("div");
    tile.className = `attribution-tile${isSelected ? ' selected' : ''}`;
    tile.onclick = () => {
      document.querySelectorAll(".attribution-tile").forEach(t => t.classList.remove("selected"));
      tile.classList.add("selected");
      appState.postMortem.selectedAttributionId = item.id;
    };

    tile.innerHTML = `
      <div class="attribution-tile-title">${item.label}</div>
      <div class="attribution-tile-desc">${item.description}</div>
    `;

    attributionList.appendChild(tile);
  });
}

function proceedToReadiness() {
  navigateToScreen(4);
}

// ============================================================================
// SCREEN 4: MERIDIAN READINESS SIGNALS & DASHBOARD
// ============================================================================
function setupReadinessScreen() {
  // Update composite score and signals based on current persona and diagnostics
  const persona = MERIDIAN_DATA.personas.find(p => p.id === appState.currentPersonaId);
  const compositeEl = document.getElementById("compositeScoreNum");

  if (persona) {
    const scores = persona.prepProfile.recentScores;
    // Calculate simple transparent composite
    const compVal = Math.round((scores.VARC + scores.DILR + scores.QA + 25) / 1.5);
    appState.readiness.compositeIndex = compVal;
    if (compositeEl) compositeEl.textContent = compVal;
  }

  // Dynamic explanation text
  const rationaleEl = document.getElementById("recommendationRationaleText");
  const drillData = MERIDIAN_DATA.nextBestDrills[appState.activeDrillKey];

  if (drillData && rationaleEl) {
    rationaleEl.innerHTML = `
      Based on your error post-mortem, we identified a <strong>${drillData.objective}</strong> gap. We have queued the <strong>${drillData.title}</strong> (${drillData.duration}) so you can practice this exact elimination heuristic before your next mock.
    `;
  }
}

// ============================================================================
// SCREEN 5: NEXT BEST DRILL (ACTION LOOP)
// ============================================================================
function setupDrillScreen() {
  const drillKey = appState.activeDrillKey;
  const drillData = MERIDIAN_DATA.nextBestDrills[drillKey] || MERIDIAN_DATA.nextBestDrills.qa_timed_gap;

  document.getElementById("drillTitle").textContent = drillData.title;
  document.getElementById("drillTimeBadge").textContent = `⏱️ ${drillData.duration}`;
  document.getElementById("drillSectionBadge").textContent = `${drillData.section} • Targeted Action`;
  document.getElementById("drillObjective").textContent = drillData.objective;

  document.getElementById("lessonHeading").textContent = drillData.conceptLesson.heading;
  document.getElementById("lessonBody").textContent = drillData.conceptLesson.body;

  document.getElementById("drillExerciseStem").textContent = drillData.microExercise.stem;

  const optionsContainer = document.getElementById("drillExerciseOptions");
  optionsContainer.innerHTML = "";
  const feedbackBox = document.getElementById("drillFeedbackBox");
  feedbackBox.className = "drill-feedback-box";
  feedbackBox.style.display = "none";

  drillData.microExercise.options.forEach((opt, idx) => {
    const optEl = document.createElement("div");
    optEl.className = "option-item";
    optEl.onclick = () => selectDrillOption(opt, optEl);

    optEl.innerHTML = `
      <div class="option-key">${String.fromCharCode(65 + idx)}</div>
      <div class="option-text">${opt.text}</div>
    `;

    optionsContainer.appendChild(optEl);
  });
}

function selectDrillOption(opt, optEl) {
  document.querySelectorAll("#drillExerciseOptions .option-item").forEach(el => el.classList.remove("selected"));
  optEl.classList.add("selected");

  const feedbackBox = document.getElementById("drillFeedbackBox");
  const isRight = opt.isCorrect || opt.isExtreme;

  if (isRight) {
    feedbackBox.className = "drill-feedback-box correct";
    feedbackBox.style.display = "block";
    feedbackBox.innerHTML = `<strong>Excellent Observation!</strong> ${opt.reason || 'You recognized the correct decision heuristic!'}`;
  } else {
    feedbackBox.className = "drill-feedback-box incorrect";
    feedbackBox.style.display = "block";
    feedbackBox.innerHTML = `<strong>Careful:</strong> This option leads to avoidable time loss or an indefensible claim under CAT standards.`;
  }
}

function completeDrill() {
  // Bump readiness index
  appState.readiness.compositeIndex = Math.min(99, appState.readiness.compositeIndex + 3);
  appState.readiness.evidenceCount += 1;

  // Add to history timeline
  const drillData = MERIDIAN_DATA.nextBestDrills[appState.activeDrillKey];
  appState.history.unshift({
    title: `${drillData.title} Completed`,
    meta: `Just now • ${drillData.duration} • 100% Heuristic Precision (+3 Readiness pts)`,
    icon: "✓"
  });

  navigateToScreen(6);
}

// ============================================================================
// SCREEN 6: LEARNER IDENTITY & PRIVACY
// ============================================================================
function setupIdentityScreen() {
  const persona = MERIDIAN_DATA.personas.find(p => p.id === appState.currentPersonaId);
  updateLearnerIdDetails(persona);

  // Render Timeline
  const timelineContainer = document.getElementById("timelineList");
  timelineContainer.innerHTML = appState.history
    .map(item => `
      <div class="timeline-item">
        <div class="timeline-icon">${item.icon}</div>
        <div class="timeline-details">
          <div class="timeline-title">${item.title}</div>
          <div class="timeline-sub">${item.meta}</div>
        </div>
      </div>
    `)
    .join("");
}

function updateLearnerIdDetails(persona) {
  const nameEl = document.getElementById("idCardName");
  const targetEl = document.getElementById("idCardTarget");
  const acctEl = document.getElementById("idCardAccountNum");

  if (!nameEl) return;

  if (persona) {
    nameEl.textContent = persona.name;
    targetEl.textContent = `${persona.prepProfile.primaryExam} • Target: ${persona.target}`;
    acctEl.textContent = `MER-CAT-${persona.id.toUpperCase()}-7481`;
  } else {
    nameEl.textContent = "Aspirant Learner";
    targetEl.textContent = "CAT 2026 • First Attempt";
    acctEl.textContent = "MER-CAT-2026-9042";
  }
}

function exportDataJSON() {
  const exportPayload = {
    meridianId: document.getElementById("idCardAccountNum").textContent,
    timestamp: new Date().toISOString(),
    intakeProfile: appState.intake,
    readinessSignals: appState.readiness,
    sessionHistory: appState.history,
    privacyNotice: "Zero PII stored on public blockchain. Private learner data export."
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `meridian_learner_export_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function clearAttemptHistory() {
  if (confirm("Are you sure you want to reset your diagnostic attempt history? This upholds your data sovereignty.")) {
    appState.history = [
      {
        title: "Session History Reset",
        meta: "All cached diagnostic attempts cleared",
        icon: "↺"
      }
    ];
    setupIdentityScreen();
  }
}

// ============================================================================
// CASE EVIDENCE DRAWER TOGGLE
// ============================================================================
function toggleCaseDrawer() {
  const drawer = document.getElementById("caseGuideDrawer");
  drawer.classList.toggle("open");
}

function resetPrototypeState() {
  if (confirm("Reset prototype to initial state?")) {
    window.location.reload();
  }
}
