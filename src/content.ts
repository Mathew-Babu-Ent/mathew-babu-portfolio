export const profile = {
  name: 'Mathew Babu',
  email: 'kennith2004@gmail.com',
  github: 'https://github.com/Mathew-Babu-Ent',
  linkedin: 'https://www.linkedin.com/in/mathew-babu/',
  // AI-generated conceptual hero imagery representing Mathew.
  heroImage: '/images/Contemplative Waterfront Sunset with Laptop.png',
};

export const brandEmblem = '/images/mb-emblem.png';

export const projects = [
  {
    number: '01', title: 'BusinessPulse', category: 'BUSINESS INTELLIGENCE',
    description: 'A business intelligence dashboard project.',
    technologies: ['Dashboard', 'Analytics'],
    image: '',
    repo: 'https://github.com/Mathew-Babu-Ent/BusinessPulse',
    demo: 'https://business-pulse-kappa.vercel.app/',
    tone: 'pulse', caseStudy: true, caseStudyHref: '#businesspulse-case-study',
  },
  {
    number: '02', title: 'Sales Analytics Dashboard', category: 'DATA · INTERACTIVE',
    description: 'An interactive dashboard built with Python, Streamlit, Pandas, and Plotly.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
    image: '',
    repo: 'https://github.com/Mathew-Babu-Ent/sales-performance-dashboard',
    demo: 'https://mathew-sales-dashboard.streamlit.app/',
    tone: 'sales', caseStudy: true, caseStudyHref: '#sales-analytics-case-study',
  },
];

export const businessPulseCaseStudy = {
  kicker: 'FULL-STACK SALES INTELLIGENCE · CASE STUDY 01',
  overview: 'BusinessPulse is a full-stack sales analytics dashboard for turning structured sales CSVs into an interactive view of revenue, profit, product performance, and category trends. The demo workspace uses fictional Northstar Coffee data; authenticated users can upload their own CSV for analysis.',
  objective: 'Give sales data a clear path from uploaded rows to useful summaries: validate the input, calculate the measures consistently, let people inspect the results, and make the analysis portable through reports.',
  workflow: [
    { number: '01', title: 'Explore', detail: 'Enter the demo workspace and explore the fictional Northstar Coffee sample dataset without signing in.' },
    { number: '02', title: 'Upload', detail: 'Authenticated users upload a CSV with required order, product, category, quantity, unit price, and unit cost fields.' },
    { number: '03', title: 'Analyze', detail: 'Review revenue, profit, margin, and order summaries, then inspect month, category, and product breakdowns with date and category filters.' },
    { number: '04', title: 'Report', detail: 'Export the current analysis as CSV or as a styled XLSX workbook with summary, monthly, category, and product sheets.' },
  ],
  highlights: [
    { title: 'Deliberate CSV validation', detail: 'The API enforces a 10 MiB upload limit, checks the required schema and value ranges, normalizes dates, and discards extra columns before analysis.' },
    { title: 'Consistent sales calculations', detail: 'Pandas computes revenue from quantity × unit price and profit from revenue less quantity × unit cost, with monthly, category, and product groupings.' },
    { title: 'Transparent currency handling', detail: 'INR, USD, and BHD display conversion uses dated Frankfurter reference rates. The interface exposes rate freshness and leaves values unconverted when a usable rate is unavailable.' },
    { title: 'Summary-focused history', detail: 'SQLite stores upload metadata and sanitized analysis summaries for the Reports view; original uploaded CSV rows are not persisted.' },
  ],
  stack: [
    { group: 'Frontend', tools: 'React · TypeScript · Vite · Recharts' },
    { group: 'Backend', tools: 'Python · FastAPI · Pandas' },
    { group: 'Storage & auth', tools: 'SQLite · Argon2 · JWT (HS256)' },
    { group: 'Reports & rates', tools: 'ExcelJS · CSV · Frankfurter API v2' },
    { group: 'Quality & hosting', tools: 'Vitest · Pytest · Vercel · Railway' },
  ],
  implementation: [
    'Kept CSV parsing and sales calculations in a Pandas analysis module, separate from the FastAPI request handlers.',
    'Used required column names and field-level validation so malformed dates, blank identifiers, invalid quantities, and negative prices or costs are rejected before aggregation.',
    'Kept source analysis amounts intact when switching display currencies; conversion is applied to summary amounts and carries rate date, provider, and freshness metadata.',
    'Built CSV and four-sheet XLSX exports from the analysis, including native charts referencing report worksheet data.',
  ],
  contribution: 'My development focus spans the React dashboard and FastAPI service: connecting upload, filtering, analysis, history, currency display, and export workflows. I kept CSV parsing and calculation logic in focused backend modules and carried typed analysis and currency metadata through the API to the interface.',
  challenge: 'A key challenge was making user-supplied data and converted amounts understandable as well as usable. The API validates fields before analysis, while currency metadata travels with each result so the interface can show the rate date and status or clearly leave values unconverted.',
  learning: 'A dashboard is only as dependable as the path from raw input to displayed number. This implementation makes validation, calculation rules, currency context, and export provenance part of the product workflow instead of hiding them behind the charts.',
  limitations: 'The backend is configured for a single account. Upload history is not isolated per user, and the project README identifies the current setup as a portfolio application rather than a production-ready multi-customer service. Currency values use current daily reference rates, not transaction-date accounting rates. The sample dataset is fictional.',
  demo: 'https://business-pulse-kappa.vercel.app/',
  repo: 'https://github.com/Mathew-Babu-Ent/BusinessPulse',
};

export const salesAnalyticsCaseStudy = {
  kicker: 'PYTHON · STREAMLIT · DATA VISUALIZATION · CASE STUDY 02',
  overview: 'Sales Analytics Dashboard is an interactive view of the records in a local sales CSV. Region, product, and date filters update its summary metrics, business insight, and charts together.',
  objective: 'Make a small sales dataset easier to explore by bringing key totals and product, region, salesperson, and monthly comparisons into one dashboard.',
  features: [
    { number: '01', title: 'Filter the records', detail: 'Narrow the CSV data by region, product, and a start-to-end date range. Reset Filters returns the controls to their defaults.' },
    { number: '02', title: 'Review key measures', detail: 'See total revenue, profit, quantity, and profit margin for the currently filtered rows, alongside a top-product insight.' },
    { number: '03', title: 'Compare performance', detail: 'Explore monthly revenue and revenue-versus-profit line charts, plus product sales, product profit, regional revenue, and salesperson revenue bar charts.' },
    { number: '04', title: 'Take the filtered data', detail: 'Download the rows matching the current filters as a CSV file. The dashboard also reports invalid date ranges and empty filtered results.' },
  ],
  highlights: [
    { title: 'A direct CSV workflow', detail: 'The Streamlit dashboard loads data from data/sales.csv with Pandas and converts the Date column to datetime before applying filters.' },
    { title: 'Metrics from filtered rows', detail: 'The selected rows drive the totals and charts. Profit is derived as Revenue minus Cost, and margin as total profit divided by total revenue.' },
    { title: 'Grouped comparisons', detail: 'Pandas groupby operations aggregate revenue or profit by month, product, region, and salesperson before Plotly renders the charts.' },
    { title: 'Useful interaction states', detail: 'The app checks that the start date is not after the end date, handles an empty result set, provides a reset action, and exports filtered rows.' },
  ],
  stack: [
    { group: 'Language', tools: 'Python' },
    { group: 'Dashboard & data', tools: 'Streamlit · Pandas' },
    { group: 'Visualization', tools: 'Plotly Express' },
    { group: 'Data source', tools: 'CSV · data/sales.csv' },
  ],
  implementation: [
    'Load the CSV into a Pandas DataFrame and parse dates before filtering by the selected region, product, and date range.',
    'Derive profit from revenue and cost, then calculate totals and grouped summaries from the filtered DataFrame.',
    'Build the line and bar charts with Plotly Express, including custom currency hover labels on the analysis charts.',
    'Export the filtered DataFrame as CSV through Streamlit’s download button.',
  ],
  contribution: 'I built an end-to-end dashboard flow that connects filter controls to the underlying Pandas data, calculated measures, Plotly charts, and a filtered CSV download.',
  challenge: 'A key implementation consideration is keeping every summary aligned with the user’s current filters. Applying the filters once to a working DataFrame lets the metrics, insight, visualizations, and download all use the same selected rows.',
  learning: 'This project helped me connect data preparation, aggregation, and visualization into one interactive workflow. Clear handling for invalid dates and empty results is part of making that workflow understandable, not an afterthought.',
  limitations: 'The dashboard reads its dataset from the bundled data/sales.csv file. The repository documents the project as an interactive sales analysis dashboard; the source does not establish production-scale deployment, business outcomes, or use with a larger external data service.',
  demo: 'https://mathew-sales-dashboard.streamlit.app/',
  repo: 'https://github.com/Mathew-Babu-Ent/sales-performance-dashboard',
};

export const skillGroups = [
  { name: 'Programming', items: ['Python', 'SQL'] },
  { name: 'Data & analytics', items: ['Pandas', 'Power BI', 'Plotly'] },
  { name: 'Development', items: ['React', 'HTML', 'CSS', 'Streamlit'] },
  { name: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
];

export const education = {
  degree: 'BTech in Computer Science and Engineering',
  institution: 'Institution name',
  dates: 'Dates',
  detail: 'Add qualification details',
};
