# Bloggies Viral Engine - Module 5 Legal Pages & Opt-Out UI

This project implements Module 5 of the Bloggies Viral Engine, focusing on Legal Pages and Opt-Out UI functionality.

## Features

- Legal documentation pages (Terms & Conditions, Raffle Rules, FAQ)
- Opt-out functionality with 45-day countdown
- Admin panel showing user credits and raffle entries
- Raffle widget embedded on all pages

## Tech Stack

- Frontend: React with Next.js and Tailwind CSS
- Backend: Node.js with TypeScript
- Storage: File-based (markdown and JSON)

## Setup Instructions

### Prerequisites

- Node.js v18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://https:/github.com/Ayushkush1/ayush-001-bloggies-module5.git
cd ayush-001-bloggies-module5
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:3000

### Environment Variables

No environment variables are required for this project.

### Directory Structure

```
bloggies-module5/
├── public/
│   └── legal/
│       ├── terms_placeholder.md       # Terms & Conditions content
│       ├── raffle_rules_placeholder.md  # Raffle Rules content
│       └── faq.json                   # FAQ content in JSON format
├── src/
│   ├── components/                    # Reusable UI components
│   ├── pages/                         # Page components and API routes
│   └── utils/                         # Utility functions
├── samples/                           # Sample API responses
```

## Pages

- **/** - Homepage
- **/terms** - Terms & Conditions page
- **/raffle-rules** - Raffle Rules page
- **/faq** - Frequently Asked Questions page
- **/opt-out** - Opt-out page (requires token parameter)
- **/admin** - Admin panel with user data

## API Routes

- **/api/legal/terms** - Returns Terms & Conditions markdown content
- **/api/legal/raffle-rules** - Returns Raffle Rules markdown content
- **/api/legal/faq** - Returns FAQ items as JSON
- **/api/opt-out/validate** - Validates an opt-out token
- **/api/opt-out/process** - Processes an opt-out request
