export const caseStudies = {
  nure: {
    name: 'Nuré',
    tagline: 'Less nagging. More sharing. An AI that makes an uneven mental load visible, then helps partners rebalance it.',
    meta: 'Product design · Mobile app',
    role: 'UI/UX designer',
    platform: 'iOS',
    tools: 'Figma',
    file: 'Nure · App Screens',
    overview:
      'Nuré is a shared task product for couples, households, coworkers, and study partners. The Figma file designs the whole loop: splash, preferences, inviting a member, an empty home, a live shared-load home, AI rebalancing, asking for help, and creating a task in plain language. The interface treats fairness as something you can see, not something you have to argue about.',
    problem:
      'Household and emotional work stays invisible until someone is already overloaded. A normal to-do list records tasks. It does not show who is carrying the day, and it turns a request for help into a nag. The product had to make imbalance obvious and the ask feel light.',
    audience: [
      { title: 'The person carrying more', body: 'Noman opens the app in the evening and needs to see, immediately, that the day is uneven — without reading a long list.' },
      { title: 'The partner who can take something', body: 'Kainat needs a specific, named ask, not a vague complaint. The design hands her one task, not the whole argument.' },
    ],
    decisions: [
      {
        title: 'Show the split before the task list',
        body: 'Home leads with Shared today: 3 tasks / 75% against 1 task / 25%, and a chip that says the target is 75/25 moving toward 50/50. The ratio is the headline. The list comes after.',
      },
      {
        title: 'Let AI name one move, not a lecture',
        body: 'The suggestion is concrete: move “Food prep” to Kainat to reach a fair 50/50 split. Balance with AI and Request Help sit side by side, so the person can rebalance automatically or ask directly.',
      },
      {
        title: 'Write the ask so it does not sound like nagging',
        body: 'Request Help drafts the message: “Hey Kainat, when you get a chance could you set up the guest room? It would really help me out today. No rush.” The tone is part of the interaction design.',
      },
      {
        title: 'Capture a messy thought, then structure it',
        body: 'New Task starts with “What’s on your mind?” and “Write everything on your mind, let AI organise it.” A brain dump becomes Clean the house, Buy groceries, Prepare food, Set up guest room — with owner, due date, and priority.',
      },
    ],
    screens: [
      { name: 'Splash & preferences', note: '“Lighten the load, together.” Category and household setup before any task exists.' },
      { name: 'Invite a member', note: 'Empty state, invite sheet, and a success state once the email is sent.' },
      { name: 'Home with shared load', note: 'Evening greeting, AI insight, shared-today bars, and the still-to-do list.' },
      { name: 'Balance with AI', note: 'One suggested move that closes the gap to 50/50.' },
      { name: 'Request help', note: 'Pick a task, pick a person, review the drafted message, then a sent confirmation.' },
      { name: 'New task & all tasks', note: 'Plain-language capture, AI suggestions, edit task, and the full list with due states.' },
    ],
    process: [
      { title: 'Map the emotional job', body: 'The job is not “add a task.” It is “feel that today is fair, and ask for help without a fight.”' },
      { title: 'Design the empty path first', body: 'Invite and empty home come before the loaded home, so the first session has a reason to exist.' },
      { title: 'Put the ratio on the home screen', body: 'Shared load, AI insight, and the two actions were composed as one decision, not three features.' },
      { title: 'Write the microcopy in the frames', body: 'Greetings, insight lines, and the help draft were designed in the screens, not added later as labels.' },
    ],
    outcomes: [
      'A complete mobile flow from first invite to a rebalanced day, documented in the Nure Figma file.',
      'A home screen that explains fairness in one glance: who owns how much, and the single next move.',
      'Help and task creation that sound like a person, because the copy is part of the UI.',
    ],
  },

  'schedule-edge': {
    name: 'Schedule Edge',
    tagline: 'From quote to installed door. One system for products, inventory, clients, and project bidding.',
    meta: 'Product design · ERP',
    role: 'UI/UX designer',
    platform: 'Web and mobile',
    tools: 'Figma',
    file: 'Schedule Edge · Approved',
    overview:
      'Schedule Edge is an ERP for door makers. The approved Figma file redesigns the operating picture: a home that sums up projects, clients, products, and doors, then charts that show whether the year is about products, inventory, or jobs still in progress. The same model is drawn for desktop and phone, in light and dark UI.',
    problem:
      'A manufacturing ERP usually mirrors the database. Quoting, products, inventory, clients, and installation live in different modules, so a person has to already know the system before they can see the business. The redesign had to make “where are we?” answerable from the first screen.',
    audience: [
      { title: 'Floor manager', body: 'Needs counts first — how many projects, clients, products, and doors — then a chart, not a settings page.' },
      { title: 'Someone checking from a phone', body: 'Needs the same story in a narrower layout: summary tiles, one chart, and status, without a new information model.' },
    ],
    decisions: [
      {
        title: 'Open on the business, not the module list',
        body: 'Home greets the user and leads with four counts: Projects, Clients, Products, Doors. The nav (Home, Projects, Products, Clients, Suppliers, Associates, Reporting, Knowledge Base, Settings) stays available, but it is not the content.',
      },
      {
        title: 'Pair a trend with a status',
        body: 'One chart compares products and inventory across the year. A second chart shows project status as Completed, Dispatched, Quoted, In progress, Won, and Lost. Volume and outcome are separate questions, so they are separate visuals.',
      },
      {
        title: 'Keep one model across web and mobile',
        body: 'The phone keeps the four tiles, the bar chart, and the status ring. Density changes. Meaning does not. Light and dark are both drawn so the system can ship on the floor and in an office.',
      },
      {
        title: 'Treat it as a system, not a set of screens',
        body: 'Tiles, charts, and nav are reusable parts. That is what lets quoting, inventory, and installation feel like one product instead of eight tools taped together.',
      },
    ],
    screens: [
      { name: 'Desktop home', note: 'Summary tiles, products-versus-inventory chart, and project-status ring for the year.' },
      { name: 'Mobile home', note: 'The same tiles and charts, stacked, with the status ring kept intact.' },
      { name: 'Module navigation', note: 'Projects, products, clients, suppliers, associates, reporting, and knowledge base.' },
      { name: 'Light and dark UI', note: 'Both themes are part of the approved file, for desktop and tablet as well as phone.' },
    ],
    process: [
      { title: 'Start from the job of the business', body: 'The spine is quote to installed door. Every module has to serve that path or stay out of the home screen.' },
      { title: 'Simplify across modules', body: 'The redesign reduces how many places a person must look before they know if a job is quoted, in progress, or done.' },
      { title: 'Design the dashboard as the contract', body: 'Tiles and charts define what “healthy” looks like, so later screens inherit the same words and statuses.' },
      { title: 'Draw responsive and both themes', body: 'Desktop, tablet, and phone, light and dark, so engineering is not inventing the second theme later.' },
    ],
    outcomes: [
      'A home screen that answers how many jobs, clients, products, and doors are in play.',
      'Status language a door-making team can scan: quoted, in progress, won, lost, dispatched, completed.',
      'A responsive, themed UI system instead of a single desktop mock.',
    ],
  },

  octofy: {
    name: 'Octofy',
    tagline: 'Time off and attendance, made simple. One HR app, two jobs: employee and manager.',
    meta: 'UI/UX design · HR mobile',
    role: 'UI/UX designer',
    platform: 'Mobile',
    tools: 'Figma',
    file: 'Octofy Digital App',
    overview:
      'Octofy is the HRSG self-service app. Employees mark attendance, request time off, open a payslip, and file an expense. Managers see who is in. The Figma file designs both roles in one product, with a home of quick actions and a self-service menu for the longer tasks.',
    problem:
      'HR tools hide a simple daily job — am I checked in, and can I take Thursday off — behind payroll language and desktop portals. People abandon the task or message HR instead. The app had to make the daily action obvious and keep the heavier tasks one tap further down.',
    audience: [
      { title: 'Employee', body: 'Arrives to check in, request leave, or grab a payslip. The home screen is a set of actions, not a dashboard of HR news.' },
      { title: 'Manager', body: 'Needs team attendance for the week: who is on a general shift, who is off, and what to approve. Same app, different home emphasis.' },
    ],
    decisions: [
      {
        title: 'Split “do it now” from “find a service”',
        body: 'Home quick actions are View payslip, Request time off, and Expense claim. Self Service is the catalog: My attendance, Absence management, Payroll analytics, Help desk, Expense claim, Benefits management.',
      },
      {
        title: 'Make check-in a confirmation, not a form',
        body: 'Mark Attendance shows the date, the time, and the place — HRSG office or location unknown — then Check in and Check out. Location is visible before the person commits.',
      },
      {
        title: 'Design the manager view as a roster',
        body: 'Team Attendance is a week strip plus people, shift times, and shift names. Approval starts from “who is here,” not from a queue of request IDs.',
      },
      {
        title: 'Keep both roles in one navigation',
        body: 'Bottom navigation stays Home, My requests, Self service, My team. An employee and a manager learn one map. Role changes what the home emphasizes, not where things live.',
      },
    ],
    screens: [
      { name: 'Self service', note: 'Six entry tiles for attendance, absence, payroll, help desk, expenses, and benefits.' },
      { name: 'Home', note: 'Welcome, quick actions, mark attendance, and the latest announcement.' },
      { name: 'Team attendance', note: 'Week view and a list of who is in, with shift and time.' },
      { name: 'Requests', note: 'My requests, so leave and expense have a place to land after they are sent.' },
    ],
    process: [
      { title: 'Research the first-week tasks', body: 'Interviews and usability testing focused on check-in, leave, and “where is my payslip,” the jobs people actually open the app for.' },
      { title: 'Separate roles without forking the app', body: 'Employee and manager flows were designed together so the navigation could stay shared.' },
      { title: 'Prototype the daily loop', body: 'Check in, request time off, and see the team were prototyped as the path a person repeats, not as settings.' },
      { title: 'Hand off states, not just screens', body: 'Checked in, checked out, location unknown, and pending requests are drawn so engineering is not guessing empty and error states.' },
    ],
    outcomes: [
      'A two-role mobile app whose home matches the job: act today, or look up a service.',
      'Attendance that shows time and place before check-in, so the action is trustworthy.',
      'A navigation model shared by employees and managers.',
    ],
  },

  caary: {
    name: 'Caary',
    tagline: 'A card and a budget for every employee. Employers issue the card. Managers can see every expense.',
    meta: 'UI/UX design · Finance',
    role: 'UI/UX designer',
    platform: 'Mobile',
    tools: 'Figma',
    file: 'Carry App',
    overview:
      'Caary is an employee-spend product. The Figma file covers the card itself — virtual and physical — and the control around it: a yearly allowance, lock and cancel, recent transactions, and which receipts are still missing. Onboarding brings someone into that system. The core UI is what they live in afterward.',
    problem:
      'Company spend is usually a spreadsheet plus a photo of a receipt in a chat thread. Employees do not know what is left on the card. Managers cannot see, in one place, what was spent and what still has no receipt. The product had to make the card, the limit, and the proof feel like one object.',
    audience: [
      { title: 'Employee with a card', body: 'Needs the balance, the limit, and a way to lock the card or attach a receipt without calling finance.' },
      { title: 'Manager', body: 'Needs top-used cards, spend over the last 60 days, and a count of receipts still unattached.' },
    ],
    decisions: [
      {
        title: 'Put the money and the missing proof on one home',
        body: 'Home shows spend in the last 60 days, top used cards, recent transactions, and receipts as attached versus unattached. The gap in paperwork is as visible as the spend.',
      },
      {
        title: 'Treat virtual and physical as one allowance',
        body: 'Manage Card shows the virtual card, the linked account, the yearly limit, and card status. Lock and cancel are on that screen, next to the object they affect.',
      },
      {
        title: 'Make a transaction explain itself',
        body: 'Each row carries the merchant, the amount, and the category, such as supplies. A person should not have to open a detail view to know what the charge was.',
      },
      {
        title: 'Onboard into a limit, not into a brand story',
        body: 'The first-run flow exists to issue a card and set an allowance. It does not front-load education. The home screen is the explanation.',
      },
    ],
    screens: [
      { name: 'Home', note: 'Spend in 60 days, top used cards, and recent transactions.' },
      { name: 'Manage card', note: 'Virtual card, yearly limit, lock, cancel, and card details.' },
      { name: 'Receipts', note: 'Attached against unattached, so missing proof is a count, not a hunt.' },
      { name: 'Allowances', note: 'Virtual and physical cards under one budget.' },
    ],
    process: [
      { title: 'Start from the control problem', body: 'Who spent, on what, and is there a receipt. Those three questions ordered the home screen.' },
      { title: 'Design the card as an object', body: 'Status, limit, lock, and cancel belong to the card, so they share a screen.' },
      { title: 'Shape onboarding around the first allowance', body: 'The flow gets a person to a funded card. It does not teach the whole finance product.' },
      { title: 'Check the scan path', body: 'Amount, merchant, and receipt state were placed where a thumb stops, then reviewed against the research notes for the flow.' },
    ],
    outcomes: [
      'A mobile finance UI where the limit, the card, and the receipt gap are visible together.',
      'Lock and cancel placed on the card, not buried in settings.',
      'An onboarding path whose job is to issue a card and a budget.',
    ],
  },

  puffy: {
    name: 'Puffy',
    tagline: 'Sleep easy. Shop easier. A luxury mattress homepage and product page, on desktop and phone.',
    meta: 'UI/UX design · E-commerce',
    role: 'UI/UX designer',
    platform: 'Web and mobile',
    tools: 'Figma',
    file: 'Puffy homepage & PDP',
    overview:
      'The Figma brief is specific. Homepage, mobile and desktop: design Puffy as the ultimate luxury brand and show the premium quality of the mattress. Product page, mobile and desktop, for the Puffy Lux mattress: people feel overwhelmed choosing a mattress, so the page has to simplify the choice. The file also holds the type styles for the storefront, from display headings down to buttons and the top bar.',
    problem:
      'A luxury mattress page can look expensive and still be hard to buy. Shoppers face sizes, a sale price, a trial, layers of foam, and a pile of awards. The pain in the file is overwhelm. The design job is to keep the luxury and make the next decision obvious: which size, what it costs with the code, and whether the trial covers the risk.',
    audience: [
      { title: 'A shopper comparing mattresses', body: 'Needs size, price with the offer, delivery window, and a reason to trust the material — without reading the whole page first.' },
      { title: 'Someone who is not ready to choose', body: 'Needs a quiz, a specialist, or a short FAQ, instead of being pushed straight into Add to cart.' },
    ],
    decisions: [
      {
        title: 'Let the homepage sell the feeling, then offer two doors',
        body: 'The hero is the award line for the Puffy Lux Hybrid, with Shop now and Find the right mattress quiz. People who know what they want can buy. People who do not can be guided.',
      },
      {
        title: 'Make the offer impossible to miss, then get out of the way',
        body: 'The early sale bar and the checkout code sit above both homepage and product page. On the product page the choice collapses to size, the price with and without the code, stock, and the delivery window.',
      },
      {
        title: 'Answer the fear next to the price',
        body: '101 nights risk-free, warranty for life, made in the USA, cooling foam, and the chiropractic endorsement sit with the product story. They are the reason a high price can still feel safe.',
      },
      {
        title: 'Build the page from a small library',
        body: 'The file defines display styles for section headings, subheads, alerts, body, buttons, and the top navigation, plus separate notes for large screens and phones. Homepage and PDP reuse those parts instead of being one-off layouts.',
      },
    ],
    screens: [
      { name: 'Homepage, desktop', note: 'Sale bar, award hero, quiz, featured mattress, trial, and reasons to buy.' },
      { name: 'Homepage, mobile', note: 'The same story stacked: hero, products, gifts, bedding, and frames.' },
      { name: 'Puffy Lux product page', note: 'Gallery, rating, stock, size, price with code, delivery date, and add to cart.' },
      { name: 'Help on the page', note: 'FAQs, call a specialist, chat, text, and email — for the questions that block a purchase.' },
      { name: 'Type styles', note: 'Display 1 through 6, with sizes for laptop, tablet, and phone.' },
    ],
    process: [
      { title: 'Write the problem before the layout', body: 'The file states it: luxury on the homepage, and a PDP that reduces the overwhelm of choosing a mattress.' },
      { title: 'Design desktop and mobile as pairs', body: 'Homepage and product page are both drawn at both sizes, so the story does not depend on a wide screen.' },
      { title: 'Order the product decision', body: 'Size, price with the code, delivery, then proof. The quiz and the specialist catch people who are not ready for that sequence.' },
      { title: 'Leave a component trail', body: 'Nav, alerts, testimonials, FAQ rows, and type styles are in the file so the next page can be built from the same parts.' },
    ],
    outcomes: [
      'A homepage that can be luxurious and still offer a quiz for people who cannot choose yet.',
      'A product page that puts size, offer price, stock, and delivery in one decision.',
      'A responsive component and type set for the storefront, documented beside the pages.',
    ],
  },

  'break-smart': {
    name: 'Break Smart',
    tagline: 'Four 10-minute breaks a day, on purpose, and never in a slot a colleague already took.',
    meta: 'Product design · Mobile',
    role: 'UI/UX designer',
    platform: 'Mobile',
    tools: 'Figma',
    file: 'Break Schedule · case study',
    overview:
      'Break Smart is a mobile app for scheduling the workday’s short breaks. The Figma file is a full case study: problem, personas, research, information architecture, low-fidelity wireframes, high-fidelity screens, and a reflection. The product lets someone plan four 10-minute breaks, see today at a glance, and pick a slot that is still free.',
    problem:
      'People forget short breaks once the day gets absorbing. Those breaks matter for energy and for the rest of the work. The file states the solution directly: schedule four 10-minute breaks, let people choose the slots, and stop two colleagues from taking the same one.',
    audience: [
      { title: 'David Walker, software engineer', body: 'Gets lost in the work and skips breaks, then feels the burnout later. He needs today to be already planned, not another decision in the middle of a task.' },
      { title: 'A colleague on the same floor', body: 'Needs the calendar to show which slots are already taken, so a break does not turn into a conflict at the coffee point.' },
    ],
    decisions: [
      {
        title: 'Make today the home screen',
        body: 'Home shows the person’s name, Schedule break, and today’s four times — morning, midday, afternoon, evening. The monthly calendar and settings are one step away, not in the way.',
      },
      {
        title: 'Offer slots that are still open',
        body: 'The scheduler groups Morning, Afternoon, and Evening and lists available times. Choosing a slot is the interaction. Hunting for a gap is not.',
      },
      {
        title: 'Confirm before it locks',
        body: 'A confirmation summarizes the day, allows a change, and says when the monthly change limit is reached. People can correct a mistake without treating the plan as permanent.',
      },
      {
        title: 'Use the calendar to prevent clashes',
        body: 'The month view is color-coded for availability. Tapping a date opens scheduling. The constraint — no overlapping colleague — is checked as the slot is chosen, not after.',
      },
    ],
    screens: [
      { name: 'Problem, personas, research', note: 'The case study frames in the file, including David, the engineer who forgets to stop.' },
      { name: 'Information architecture', note: 'Home, scheduler, month, confirmation, and settings as the map.' },
      { name: 'Low-fidelity wireframes', note: 'The flow before color: today, pick a slot, confirm.' },
      { name: 'High-fidelity app', note: 'Home with today’s four breaks, schedule break, available slots, and the month.' },
      { name: 'Style guide', note: 'Shades of blue, Montserrat and Inter, and the type ramp used on the screens.' },
    ],
    process: [
      { title: 'State the constraint in one sentence', body: 'Four breaks, ten minutes, no shared slot. Every later screen is checked against that sentence.' },
      { title: 'Write personas from the failure', body: 'The engineer who gets absorbed, and the teammate who needs the slot to stay free.' },
      { title: 'Wire the path, then raise fidelity', body: 'Lo-fi proves today → slot → confirm. Hi-fi adds the countdown, the month, and the visual system.' },
      { title: 'Reflect on the prototype', body: 'The file ends in a reflection, so the case study includes what the flow taught, not only the final UI.' },
    ],
    outcomes: [
      'A case study in the Figma file, from problem and personas through lo-fi, hi-fi, and reflection.',
      'A home screen that shows today’s four breaks without asking the person to plan them again.',
      'Slot picking that respects colleagues, with a confirmation and a limit on how often the month can change.',
    ],
  },

  'real-estate': {
    name: 'Real Estate',
    tagline: 'Two ways to build trust online for a construction company. Same business, two concepts.',
    meta: 'UI/UX design · Website',
    role: 'UI/UX designer',
    platform: 'Web',
    tools: 'Figma',
    file: 'SQ Horizon',
    overview:
      'This is a concept website for a construction company, explored as two directions. Concept 1 is an editorial page: a headline about crafting spaces, a search across services, and a request for a quote beside a photograph of the work. Concept 2 leads with search and proof — people served, awards, and the building itself. In the Figma file the working name is SQ Horizon, with Variation 1 and Variation 2, plus the pages a visitor needs after the hero: projects, services, a free consultation, the team, and testimonials.',
    problem:
      'A construction site has to do two jobs at once. It has to feel like the company can be trusted with a home, and it has to help someone act: search a service, ask for a quote, or book a consultation. A single layout forces one of those jobs to win. Two concepts keep the question open and make the difference testable.',
    audience: [
      { title: 'Someone ready to talk', body: 'Wants a quote or a consultation, and needs the company’s work and a clear way to ask.' },
      { title: 'Someone still comparing', body: 'Wants to search services, see projects, and find proof — clients, awards, years — before they give a name.' },
    ],
    decisions: [
      {
        title: 'Concept 1 leads with the promise',
        body: 'The first direction is a quiet headline, the interior of the work, and two actions: search services, or request a quote. Trust is built by showing the space, then offering the conversation.',
      },
      {
        title: 'Concept 2 leads with proof and search',
        body: 'The second direction puts the building in the hero, a search for services in the middle, and counts beside it: people served and awards. Trust is built by evidence, then by letting the visitor look something up.',
      },
      {
        title: 'Keep the business the same underneath',
        body: 'Both concepts sit on the same content from the file: construction management, design and planning, general contracting, projects, a free consultation, the team, and what clients say. The test is the arrangement, not a different company.',
      },
      {
        title: 'Design the pair so a test is fair',
        body: 'Headline, primary action, and where the proof sits are the things that change. Navigation — home, projects, services, contact — stays recognizable, so a later comparison is about the concept and not about a missing page.',
      },
    ],
    screens: [
      { name: 'Concept 1', note: 'Editorial hero, service search, request a quote, and a photograph of the interior.' },
      { name: 'Concept 2', note: 'Search-led hero, the building, people served, and awards.' },
      { name: 'Services', note: 'Construction management, design and planning, and general contracting.' },
      { name: 'Consultation', note: '“Realize your dream project” and a free consultation as the committed action.' },
      { name: 'Proof', note: 'Projects, team, testimonials, and the company story under the hero.' },
    ],
    process: [
      { title: 'Write two hypotheses', body: 'One: people convert when the craft is beautiful and the quote is close. Two: people convert when they can search and see proof first.' },
      { title: 'Design both to the same content', body: 'Variation 1 and Variation 2 in the SQ Horizon file share services, projects, and consultation.' },
      { title: 'Place the action where the concept needs it', body: 'Quote beside the photograph in one. Search and proof in the other. Neither concept hides the next step.' },
      { title: 'Leave the pair comparable', note: 'Same navigation and same offer, so the concepts can be reviewed side by side in Figma.' },
    ],
    outcomes: [
      'Two complete homepage directions for the same construction company.',
      'A shared set of inner pages — services, projects, consultation, team — so the concepts are not just heroes.',
      'A layout pair that can be compared without changing the business underneath.',
    ],
  },

  etizan: {
    name: 'Etizan',
    tagline: 'From English to Arabic. A pharmacy supply platform rebuilt so the Arabic screen is the original, not a mirror pasted on afterward.',
    meta: 'UI/UX design · Arabic RTL',
    role: 'UI/UX designer',
    platform: 'Web',
    tools: 'Figma',
    file: 'Etizan',
    overview:
      'Etizan is a pharmacy supply operations platform. The Figma file holds the English product and the Arabic conversion: command center, pharmacies, distributors, tenders, and the admin surfaces around them. The Arabic work is a full right-to-left system. Navigation, charts, and reading order are composed for Arabic. Brand, IDs, amounts, and medicine data stay in Latin where they already were.',
    problem:
      'Translating the strings and flipping a few icons leaves an English layout wearing Arabic text. Side navigation ends up on the wrong edge, charts still grow from the left, and a tender ID sits where the eye does not start. Operators who work in Arabic have to relearn a layout that was never designed for them.',
    audience: [
      { title: 'An Arabic-speaking operator', body: 'Lands on the command center and expects the sidebar, the title, and the first number to begin on the right.' },
      { title: 'Someone comparing both languages', body: 'Needs the same command center — tender insights, weekly tenders, status, and what needs attention — so the language change does not change the job.' },
    ],
    decisions: [
      {
        title: 'Start the Arabic screen from the right',
        body: 'The command center title, the insight numbers, and the page tools begin on the right. The English frame keeps its left origin. They are a pair, not one frame with a direction switch ignored.',
      },
      {
        title: 'Move the sidebar with the language',
        body: 'In Arabic the navigation sits on the right, with the icon and label ordered for that edge. The English sidebar stays on the left. The chrome is part of the conversion, not a shared leftover.',
      },
      {
        title: 'Turn the charts around',
        body: 'Weekly tender bars and the status mix grow from the right in Arabic. The English charts keep growing from the left. The same data, the opposite reading direction. A legend keeps its swatch with the label, and the label starts from the right.',
      },
      {
        title: 'Keep Latin where the data is Latin',
        body: 'Etizan, SAR, tender IDs, and the digits stay as they are. Arabic is for the interface language. Mixing them on purpose is clearer than forcing every token into one script.',
      },
    ],
    screens: [
      { name: 'English command center', note: 'Tender insights, weekly tenders, tender status, and the queue that needs attention.' },
      { name: 'Arabic command center', note: 'The same board, composed right to left, including the sidebar and the charts.' },
      { name: 'Pharmacy, distributor, admin', note: 'The surrounding operations screens in the same file, converted with the same rules.' },
      { name: 'Onboarding', note: 'First-run screens in the file, so Arabic is not only applied to the dashboard.' },
    ],
    process: [
      { title: 'Pair every English frame with an Arabic frame', body: 'The file is built as a conversion, so each major screen has a twin instead of a single layout with translated labels.' },
      { title: 'Set the rules before decorating', body: 'Origin on the right, sidebar on the right, charts from the right, Latin kept for IDs and amounts.' },
      { title: 'Check the command center first', body: 'It is the densest screen. If the insights, the bars, and the attention list read correctly, the quieter pages can follow the same rules.' },
      { title: 'Review in Arabic only', body: 'The Arabic prototype stays with Arabic frames, so a click never drops the person back into the English layout.' },
    ],
    outcomes: [
      'An Arabic command center that matches the English one in content and differs in direction on purpose.',
      'Charts and navigation that follow the reading direction, not a leftover left-to-right grid.',
      'A repeatable RTL approach for the rest of the pharmacy, distributor, and admin screens in the file.',
    ],
  },
}
