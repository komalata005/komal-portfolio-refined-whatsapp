/**
 * Real Figma exports for case study Interface sections.
 * Each project lists 6 screens; home (or homepage / command home) is always first.
 */
export const caseStudyMedia = {
  nure: {
    kind: 'phone',
    scope: 'End-to-end mobile product design: onboarding, shared home, AI rebalance, help ask, and task capture.',
    highlights: [
      'Shared-load bars make fairness visible before the task list.',
      'AI suggests one concrete move, not a lecture.',
      'Help draft is written so the ask does not sound like nagging.',
    ],
    deliverables: ['iOS flow in Figma', 'Component set (buttons, type, chips)', 'Empty and loaded home states', 'AI + help microcopy in-frame'],
    screens: [
      { name: 'Home', note: 'Evening greeting, AI insight, shared-today bars, and still-to-do list.', image: '/images/screens/nure/home-shared-load.png' },
      { name: 'Balance with AI', note: 'One concrete move that closes the gap to 50/50.', image: '/images/screens/nure/balance-with-ai.png' },
      { name: 'Request help', note: 'Pick a task, pick a person, review the drafted ask.', image: '/images/screens/nure/request-help.png' },
      { name: 'New task', note: 'Plain-language capture with AI suggestions.', image: '/images/screens/nure/new-task.png' },
      { name: 'Invite a member', note: 'Empty home with invite sheet and email path.', image: '/images/screens/nure/invites.png' },
      { name: 'Preferences', note: 'Category and household setup before any task exists.', image: '/images/screens/nure/preferences.png' },
    ],
    designSystem: [
      { name: 'Buttons', note: 'Primary, secondary, and quiet actions used across the flow.', image: '/images/design-system/nure/buttons.png' },
      { name: 'Type', note: 'Display, body, and label styles from the Nuré file.', image: '/images/design-system/nure/text.png' },
      { name: 'Options & chips', note: 'Preference chips and selection patterns.', image: '/images/design-system/nure/options.png' },
    ],
    typography: [
      { label: 'Display', sample: 'Shared today', detail: 'Playful headline on home and splash' },
      { label: 'Body', sample: 'Write everything on your mind', detail: 'Task capture and help draft' },
      { label: 'Label', sample: '75% · 25%', detail: 'Shared-load ratios and chips' },
    ],
  },

  'break-smart': {
    kind: 'phone',
    scope: 'Full case study for a break-scheduling app: research, IA, lo-fi, hi-fi, and style guide.',
    highlights: [
      'Today’s four breaks sit above the calendar noise.',
      'Slot picking blocks overlapping colleagues.',
      'Confirm before lock, with a monthly change limit.',
    ],
    deliverables: ['Personas & research frames', 'Lo-fi and hi-fi screens', 'Style guide', 'Month + confirm flows'],
    screens: [
      { name: 'Home', note: 'Four break times for the current day, with Schedule break up front.', image: '/images/screens/break-smart/home.png' },
      { name: 'Schedule break', note: 'Pick an open slot without overlapping a colleague.', image: '/images/screens/break-smart/schedule.png' },
      { name: 'Available slots', note: 'Morning, afternoon, and evening groups with free times only.', image: '/images/screens/break-smart/slots.png' },
      { name: 'Month view', note: 'Color-coded availability across the month.', image: '/images/screens/break-smart/month.png' },
      { name: 'Confirm', note: 'Summary before the plan locks, with change limit in view.', image: '/images/screens/break-smart/confirm.png' },
      { name: 'Product cover', note: 'Hi-fi presentation from the Break Smart Figma file.', image: '/images/screens/break-smart/cover.png', wide: true },
    ],
    designSystem: [
      { name: 'Style guide', note: 'Blues, mint accents, and the type ramp used on Break Smart.', image: '/images/design-system/break-smart/style-guide.png', wide: true },
    ],
    typography: [
      { label: 'Display', sample: 'Schedule break', detail: 'Primary action language' },
      { label: 'Body', sample: 'Morning · Midday · Afternoon', detail: 'Slot groupings' },
      { label: 'Label', sample: '10 min', detail: 'Duration chips' },
    ],
  },

  puffy: {
    kind: 'browser',
    scope: 'Luxury mattress homepage and PDP for desktop and mobile, with shared components.',
    highlights: [
      'Hero leads with shop or quiz, not a wall of awards.',
      'Size, price with code, and delivery stay together.',
      'Help sits where purchase questions block.',
    ],
    deliverables: ['Homepage + PDP', 'Mobile variants', 'Type board', 'Component trail (nav, FAQ, alerts)'],
    screens: [],
    designSystem: [
      { name: 'Fonts & type', note: 'Type board from the Puffy Figma file.', image: '/images/design-system/puffy/fonts.png', wide: true },
    ],
    typography: [
      { label: 'Display', sample: 'Sleep easy', detail: 'Homepage headline' },
      { label: 'Body', sample: '101-night trial', detail: 'Trust and offer copy' },
      { label: 'Label', sample: 'Cal King', detail: 'Size selector' },
    ],
  },

  caary: {
    kind: 'phone',
    scope: 'Employee-spend mobile UI: card object, allowance, receipts, and manager scan path.',
    highlights: [
      'Card, limit, and missing receipt read as one object.',
      'Lock and cancel live on the card, not in settings.',
      'Onboarding issues a funded card, not a brand story.',
    ],
    deliverables: ['Home + manage card', 'Receipt states', 'Popup patterns', 'Card list components'],
    screens: [],
    designSystem: [
      { name: 'Cards list', note: 'Card rows and states from the components page.', image: '/images/design-system/caary/cards-list.png' },
      { name: 'Success popups', note: 'Confirmation patterns for lock, cancel, and attach.', image: '/images/design-system/caary/success-popups.png' },
    ],
    typography: [
      { label: 'Display', sample: 'SAR spent', detail: 'Home spend header' },
      { label: 'Body', sample: 'Yearly allowance', detail: 'Card limit language' },
      { label: 'Label', sample: 'Missing receipts', detail: 'Proof count' },
    ],
  },

  'schedule-edge': {
    kind: 'browser',
    scope: 'ERP dashboard redesign for door makers: desktop and mobile, light and dark.',
    highlights: [
      'First screen answers “where are we?” with counts.',
      'Same information model on phone and desktop.',
      'Status and charts inherit one language.',
    ],
    deliverables: ['Dashboard home', 'Summary tiles + charts', 'Light/dark pair', 'Side navigation'],
    screens: [],
    designSystem: [],
    typography: [
      { label: 'Display', sample: 'Where are we?', detail: 'Dashboard greeting' },
      { label: 'Body', sample: 'Completed · Quoted · In progress', detail: 'Status language' },
      { label: 'Label', sample: 'Doors', detail: 'Summary tiles' },
    ],
  },

  octofy: {
    kind: 'phone',
    scope: 'HRSG employee and manager self-service app for attendance, leave, and payslips.',
    highlights: [
      'Daily actions sit on home, not behind payroll language.',
      'Check-in is a confirmation with location visible.',
      'Manager roster starts from who is in.',
    ],
    deliverables: ['Employee home', 'Manager attendance', 'Self-service catalog', 'Check-in states'],
    screens: [],
    designSystem: [],
    typography: [
      { label: 'Display', sample: 'Check in', detail: 'Primary daily action' },
      { label: 'Body', sample: 'Request time off', detail: 'Self-service catalog' },
      { label: 'Label', sample: 'General shift', detail: 'Manager roster' },
    ],
  },

  'real-estate': {
    kind: 'browser',
    scope: 'Two comparable homepage concepts for a construction company, plus shared inner pages.',
    highlights: [
      'Concept 1 leads with craft and quote.',
      'Concept 2 leads with search and proof.',
      'Same navigation and offer keep the test fair.',
    ],
    deliverables: ['Variation 1 + 2 heroes', 'Services / projects / consultation', 'Proof patterns', 'Shared nav'],
    screens: [],
    designSystem: [],
    typography: [
      { label: 'Display', sample: 'Crafting spaces', detail: 'Concept 1 headline' },
      { label: 'Body', sample: 'Request a quote', detail: 'Primary conversion' },
      { label: 'Label', sample: 'People served', detail: 'Concept 2 proof' },
    ],
  },

  etizan: {
    kind: 'browser',
    scope: 'English-to-Arabic RTL conversion for a pharmacy supply command center and related ops screens.',
    highlights: [
      'Arabic starts from the right: sidebar, title, first number.',
      'Charts and queues mirror reading direction.',
      'IDs and amounts stay Latin beside Arabic UI.',
    ],
    deliverables: ['EN + AR command centers', 'RTL chart rules', 'Pharmacy / dist / admin', 'Language twin frames'],
    screens: [
      { name: 'Home · Arabic', note: 'Pharmacy dashboard composed from the right.', image: '/images/screens/etizan/ar/home.png', wide: true },
      { name: 'Draft tenders · Arabic', note: 'Draft tender list in RTL.', image: '/images/screens/etizan/ar/draft-tenders.png', wide: true },
      { name: 'Tender management · Arabic', note: 'Tender detail and timeline from the Arabic frames.', image: '/images/screens/etizan/ar/tender-management.png', wide: true },
      { name: 'Tender grid · Arabic', note: 'Grid view of tenders, mirrored for Arabic reading.', image: '/images/screens/etizan/ar/tender-grid.png', wide: true },
    ],
    designSystem: [],
    typography: [
      { label: 'Display', sample: 'مركز القيادة', detail: 'Arabic command title' },
      { label: 'Body', sample: 'Weekly tenders', detail: 'Chart labeling' },
      { label: 'Label', sample: '#TND-', detail: 'Latin IDs beside Arabic UI' },
    ],
  },
}
