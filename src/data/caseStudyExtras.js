export const caseStudyExtras = {
  nure: {
    heading: 'Fairness you can see before the argument starts.',
    people: [
      { name: 'Noman', role: 'Carrying the day', image: '/images/people/nure-noman.jpg', points: ['The list never shows that three of the four jobs are already his.', 'Fairness only appears once he is already overloaded.', 'Asking for help turns into a nag.'] },
      { name: 'Kainat', role: 'The partner', image: '/images/people/nure-kainat.jpg', points: ['A vague “can you help” sounds like a complaint.', 'She cannot see the one task that would balance the day.', 'She waits, because the ask is not named.'] },
    ],
    target:
      'Couples, households, coworkers, and study partners who share work but not the mental load. The primary user is the person already carrying more of the day. The secondary user is the partner who can take one named task.',
    colors: [
      { name: 'Night violet', hex: '#2A1458', use: 'App background and splash' },
      { name: 'Insight purple', hex: '#6C4DFF', use: 'AI insight card' },
      { name: 'Share yellow', hex: '#F5C542', use: 'Headline accent and 50/50 chip' },
      { name: 'Paper', hex: '#F7F4FF', use: 'Task list surface' },
      { name: 'Ink', hex: '#1B1330', use: 'Names, tasks, and body' },
    ],
    components: [
      { name: 'Shared-load bar', note: 'Two owners, two percentages, one track. The fairness story before any task row.' },
      { name: 'AI insight card', note: 'One sentence about the day, plus Balance with AI and Request Help.' },
      { name: 'Suggestion chip', note: 'Names the task and the person, such as moving Food prep to Kainat.' },
      { name: 'Task row', note: 'Title, owner, due state. Used on home, all tasks, and request help.' },
      { name: 'Invite sheet', note: 'Empty home, email invite, and the success confirmation.' },
      { name: 'Help draft', note: 'A written ask the user can send, so the tone is designed, not improvised.' },
    ],
    sketch: '/images/wireframes/nure.jpg',
    wireframes: [
      { name: 'Empty home', kind: 'phone', rows: ['title', 'card', 'button'] },
      { name: 'Shared load', kind: 'phone', rows: ['title', 'card', 'bars', 'row', 'row', 'button'] },
      { name: 'Request help', kind: 'phone', rows: ['nav', 'title', 'row', 'card', 'button'] },
    ],
  },
  'schedule-edge': {
    heading: 'The whole door business, before anyone opens a module.',
    people: [
      { name: 'Amir', role: 'Floor manager', image: '/images/people/schedule-amir.jpg', points: ['Quotes, inventory, and installs live in different modules.', 'He has to know the system before he can see the business.', '“Where are we?” is not answered on the first screen.'] },
      { name: 'Hina', role: 'Checking from site', image: '/images/people/schedule-hina.jpg', points: ['The phone does not tell the same story as the desktop.', 'Status on site means hunting through modules.', 'A second layout should not mean a second product.'] },
    ],
    target:
      'People running a door-making business, from quote to installed door. The primary user checks projects, clients, products, and doors. A second user opens the same picture on a phone.',
    colors: [
      { name: 'Navy', hex: '#102033', use: 'App shell and sidebar' },
      { name: 'Teal', hex: '#1F8A80', use: 'Clients tile' },
      { name: 'Green', hex: '#3CB371', use: 'Products tile' },
      { name: 'Amber', hex: '#E2B33C', use: 'Doors tile' },
      { name: 'Surface', hex: '#F4F7FB', use: 'Dashboard canvas' },
    ],
    components: [
      { name: 'Summary tile', note: 'One count, one label: Projects, Clients, Products, or Doors.' },
      { name: 'Side navigation', note: 'Home through Settings, including suppliers, reporting, and knowledge base.' },
      { name: 'Trend chart', note: 'Products against inventory across the year.' },
      { name: 'Status ring', note: 'Completed, dispatched, quoted, in progress, won, and lost.' },
      { name: 'Top bar', note: 'Greeting, search, and the signed-in person.' },
      { name: 'Theme pair', note: 'The same components drawn for light and dark.' },
    ],
    sketch: '/images/wireframes/schedule-edge.jpg',
    wireframes: [
      { name: 'Desktop home', kind: 'browser', rows: ['nav', 'tiles', 'chart', 'card'] },
      { name: 'Mobile home', kind: 'phone', rows: ['nav', 'tiles', 'chart', 'card'] },
    ],
  },
  octofy: {
    heading: 'Check in. Ask for Thursday. Leave the portal behind.',
    people: [
      { name: 'Ayesha', role: 'Employee', image: '/images/people/octofy-ayesha.jpg', points: ['A simple check-in is buried in a desktop HR portal.', 'Leave and a payslip sit behind payroll language.', 'She messages HR instead of finishing the task.'] },
      { name: 'Omar', role: 'Manager', image: '/images/people/octofy-omar.jpg', points: ['He cannot see who is in without asking HR.', 'Approvals start from request IDs, not from the roster.', 'Employee and manager feel like two different apps.'] },
    ],
    target:
      'HRSG employees and their managers. Employees come to check in, request time off, or open a payslip. Managers come to see who is in and what needs approval. Both use one app.',
    colors: [
      { name: 'Deep navy', hex: '#0C2340', use: 'Header and home background' },
      { name: 'Teal', hex: '#14919B', use: 'Primary actions and logo' },
      { name: 'Peach', hex: '#F2A48A', use: 'Absence and announcement accents' },
      { name: 'Tile blue', hex: '#1E4B7A', use: 'Self-service tiles' },
      { name: 'Surface', hex: '#F7F9FC', use: 'Page and cards' },
    ],
    components: [
      { name: 'Quick action', note: 'Payslip, time off, and expense claim as equal tiles on home.' },
      { name: 'Check-in pair', note: 'Date, time, location, then Check in and Check out.' },
      { name: 'Service tile', note: 'Attendance, absence, payroll, help desk, expenses, benefits.' },
      { name: 'Week strip', note: 'Manager view of the days before the roster.' },
      { name: 'Roster row', note: 'Person, shift name, and hours.' },
      { name: 'Bottom navigation', note: 'Home, My requests, Self service, My team.' },
    ],
    sketch: '/images/wireframes/octofy.jpg',
    wireframes: [
      { name: 'Self service', kind: 'phone', rows: ['nav', 'tiles', 'nav'] },
      { name: 'Home', kind: 'phone', rows: ['title', 'tiles', 'card', 'button', 'nav'] },
      { name: 'Team attendance', kind: 'phone', rows: ['title', 'bars', 'row', 'row', 'nav'] },
    ],
  },
  caary: {
    heading: 'The card, the limit, and the missing receipt.',
    people: [
      { name: 'Lina', role: 'Cardholder', image: '/images/people/caary-lina.jpg', points: ['She does not know what is left until finance writes.', 'The card, the limit, and the receipt live apart.', 'Locking the card means a call, not a control on the card.'] },
      { name: 'Farhan', role: 'Manager', image: '/images/people/caary-farhan.jpg', points: ['Receipts arrive as photos in a chat thread.', 'Spend and missing proof are not on one screen.', 'He cannot see which cards are carrying the spend.'] },
    ],
    target:
      'Employees who spend on a company card, and the managers who have to see the limit and the missing receipts. The employee needs the card and what is left. The manager needs spend and proof in one place.',
    colors: [
      { name: 'Purple', hex: '#24143F', use: 'Screen background' },
      { name: 'Card violet', hex: '#6E56CF', use: 'Virtual card and header' },
      { name: 'Mint', hex: '#7DDEBE', use: 'Allowance callout and positive state' },
      { name: 'Surface', hex: '#F6F4FB', use: 'Transaction list' },
      { name: 'Ink', hex: '#1A1230', use: 'Amounts and merchant names' },
    ],
    components: [
      { name: 'Spend header', note: 'Amount spent in 60 days, with a link to account details.' },
      { name: 'Card object', note: 'Virtual or physical card, yearly limit, lock, and cancel.' },
      { name: 'Transaction row', note: 'Merchant, category, and amount. Readable without opening a detail.' },
      { name: 'Receipt count', note: 'Attached against unattached, so missing proof is a number.' },
      { name: 'Top used cards', note: 'Which cards are carrying the spend.' },
      { name: 'Bottom navigation', note: 'Home, cards, activity, and settings.' },
    ],
    sketch: '/images/wireframes/caary.jpg',
    wireframes: [
      { name: 'Home', kind: 'phone', rows: ['title', 'card', 'row', 'row', 'nav'] },
      { name: 'Manage card', kind: 'phone', rows: ['nav', 'card', 'button', 'button'] },
    ],
  },
  puffy: {
    heading: 'Luxury, without the mattress maze.',
    people: [
      { name: 'Maya', role: 'Still comparing', image: '/images/people/puffy-maya.jpg', points: ['Sizes, trials, and awards all shout at the same time.', 'The page looks expensive and still hides the next decision.', 'She needs a quiz or a specialist before she can buy.'] },
      { name: 'Jules', role: 'Ready to buy', image: '/images/people/puffy-jules.jpg', points: ['He knows the mattress and still cannot find the price with the code.', 'Size, stock, and delivery are scattered down the page.', 'The trial that makes the price feel safe is easy to miss.'] },
    ],
    target:
      'Someone choosing a luxury mattress. One visitor already knows they want the Puffy Lux and needs size, price, and delivery. Another is overwhelmed and needs a quiz, a specialist, or a short answer before they can buy.',
    colors: [
      { name: 'Navy', hex: '#102033', use: 'Homepage field and sale bar' },
      { name: 'Cream', hex: '#F3E6D0', use: 'Headline accent and product page' },
      { name: 'Gold', hex: '#C4A574', use: 'Award and luxury emphasis' },
      { name: 'White', hex: '#FFFFFF', use: 'Product page canvas' },
      { name: 'Ink', hex: '#1C1C1C', use: 'Price, size, and body' },
    ],
    components: [
      { name: 'Sale bar', note: 'Offer and checkout code, shared by homepage and product page.' },
      { name: 'Store navigation', note: 'Mattresses, smart beds, frames, bedding, reviews, support.' },
      { name: 'Hero', note: 'Award line, Shop now, and Find the right mattress quiz.' },
      { name: 'Size selector', note: 'Cal king, split king, and the other sizes on the PDP.' },
      { name: 'Price block', note: 'Price without the code, price with the code, stock, and delivery window.' },
      { name: 'FAQ row', note: 'Trial, certification, dimensions, and what hybrid means.' },
    ],
    sketch: '/images/wireframes/puffy.jpg',
    wireframes: [
      { name: 'Homepage', kind: 'browser', rows: ['nav', 'title', 'image', 'button', 'tiles'] },
      { name: 'Product page', kind: 'browser', rows: ['nav', 'image', 'title', 'button', 'row'] },
      { name: 'Mobile PDP', kind: 'phone', rows: ['nav', 'image', 'title', 'button', 'row'] },
    ],
  },
  'break-smart': {
    heading: 'Four breaks. None of them stolen.',
    people: [
      { name: 'David Walker', role: 'Software engineer', image: '/images/people/break-david.jpg', points: ['He gets absorbed and skips the break until the afternoon is gone.', 'Today becomes another decision in the middle of a task.', 'The four short breaks were never planned.'] },
      { name: 'Cameron', role: 'On the same floor', image: '/images/people/break-cameron.jpg', points: ['Two people take the same ten minutes.', 'The break space clashes because the slot was not reserved.', 'She finds out only after she has already stopped work.'] },
    ],
    target:
      'Employees who forget short breaks once the work gets absorbing. David, the software engineer in the Figma personas, is the primary user. Colleagues are the constraint: two people should not take the same slot.',
    colors: [
      { name: 'Navy', hex: '#0E2A4A', use: 'Header and cover' },
      { name: 'Mint', hex: '#3DDCB0', use: 'Wordmark accent and highlights' },
      { name: 'Lemon', hex: '#E4F25A', use: 'Update and submit buttons' },
      { name: 'Surface', hex: '#F4F7FB', use: 'Home and slot list' },
      { name: 'Ink', hex: '#16324F', use: 'Times and names' },
    ],
    components: [
      { name: 'Today list', note: 'The four break times for the current day.' },
      { name: 'Schedule button', note: 'Primary action on home, above the list.' },
      { name: 'Slot group', note: 'Morning, afternoon, and evening, with only open times.' },
      { name: 'Month cell', note: 'Color shows whether a day still has room.' },
      { name: 'Confirmation', note: 'Summary, change, and the monthly change limit.' },
      { name: 'Bottom navigation', note: 'Request, settings, home, and profile.' },
    ],
    sketch: '/images/wireframes/break-smart.jpg',
    wireframes: [
      { name: 'Home, lo-fi', kind: 'phone', rows: ['title', 'button', 'row', 'row', 'nav'] },
      { name: 'Pick a slot', kind: 'phone', rows: ['nav', 'title', 'row', 'button'] },
      { name: 'Month', kind: 'phone', rows: ['title', 'tiles', 'nav'] },
    ],
  },
  'real-estate': {
    heading: 'Trust first, or proof first. Two sites, one builder.',
    people: [
      { name: 'Sana', role: 'Ready to talk', image: '/images/people/estate-sana.jpg', points: ['She wants a quote, and the site only offers a logo.', 'The work is not sitting next to the ask.', 'There is no clear way to start the conversation.'] },
      { name: 'Adeel', role: 'Still comparing', image: '/images/people/estate-adeel.jpg', points: ['He needs proof before he leaves a name.', 'Services are not searchable from the first screen.', 'People served and awards are missing while he is still comparing.'] },
    ],
    target:
      'Someone who might hire a construction company. One visitor is ready to request a quote. Another is still comparing and wants to search services and see proof — people served, awards, projects — before they leave a name.',
    colors: [
      { name: 'Navy', hex: '#10182E', use: 'Concept field and type' },
      { name: 'Orange', hex: '#F97316', use: 'Concept 1 brand and quote action' },
      { name: 'Green', hex: '#22A06B', use: 'Concept 2 brand and search action' },
      { name: 'White', hex: '#FFFFFF', use: 'Page canvas inside the browser' },
      { name: 'Mist', hex: '#E8EEF5', use: 'Concept 2 hero wash' },
    ],
    components: [
      { name: 'Site navigation', note: 'Home, projects, services, and contact, shared by both concepts.' },
      { name: 'Editorial hero', note: 'Concept 1: headline, photograph, search services, request a quote.' },
      { name: 'Proof hero', note: 'Concept 2: search, the building, people served, and awards.' },
      { name: 'Service search', note: 'The lookup both concepts offer, placed differently.' },
      { name: 'Stat pair', note: 'People and awards, used as trust rather than decoration.' },
      { name: 'Consultation band', note: 'Free consultation as the committed next step in the file.' },
    ],
    sketch: '/images/wireframes/real-estate.jpg',
    wireframes: [
      { name: 'Concept 1', kind: 'browser', rows: ['nav', 'title', 'image', 'button'] },
      { name: 'Concept 2', kind: 'browser', rows: ['nav', 'title', 'button', 'image', 'tiles'] },
    ],
  },
  etizan: {
    heading: 'Arabic that was designed, not flipped.',
    people: [
      { name: 'Noor', role: 'Arabic operator', image: '/images/people/etizan-noor.jpg', points: ['The sidebar and the first number still start on the left.', 'Charts still grow from the left under Arabic text.', 'She has to relearn a layout that was never designed for her.'] },
      { name: 'James', role: 'English teammate', image: '/images/people/etizan-james.jpg', points: ['He needs the same command center, not a different product.', 'A language switch should not change the job.', 'IDs and amounts still have to stay readable beside the Arabic UI.'] },
    ],
    target:
      'Arabic-speaking operators on a pharmacy supply platform, and the English-speaking teammates looking at the same command center. The Arabic user is the one the conversion is for. They should land on a screen that already reads from the right.',
    colors: [
      { name: 'Forest', hex: '#0E2A24', use: 'Arabic and English shell' },
      { name: 'Gold', hex: '#E2C16B', use: 'Language switch and emphasis' },
      { name: 'Cream', hex: '#F4F1E6', use: 'Command center canvas' },
      { name: 'Chart green', hex: '#1F6B4A', use: 'Tender bars and status' },
      { name: 'White', hex: '#FFFFFF', use: 'Cards and tables' },
    ],
    components: [
      { name: 'Sidebar item', note: 'Icon and label. Right edge in Arabic, left edge in English.' },
      { name: 'Insight stat', note: 'Tender counts on the command center, starting from the reading edge.' },
      { name: 'Bar chart', note: 'Weekly tenders. Grows from the right in Arabic.' },
      { name: 'Status donut', note: 'Tender status, with the legend reading from the right in Arabic.' },
      { name: 'Attention row', note: 'The queue that needs a person, mirrored with the rest of the page.' },
      { name: 'Language pair', note: 'English frame and Arabic frame kept as twins, not one flipped layout.' },
    ],
    sketch: '/images/wireframes/etizan.jpg',
    wireframes: [
      { name: 'English command', kind: 'browser', rows: ['nav', 'tiles', 'chart', 'row'] },
      { name: 'Arabic command', kind: 'browser', rows: ['nav', 'tiles', 'chart', 'row'] },
    ],
  },
}
