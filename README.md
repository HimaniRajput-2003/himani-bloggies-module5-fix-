# Bloggies Viral Engine – Module 5: Legal Pages & Opt-Out UI

This project implements **Module 5** of the Bloggies Viral Engine, focusing on:
- Legal Documentation Pages
- Opt-Out UI Flow with 45-Day Countdown
- Admin Log System for Tracking Removed Users

## 🚀 Live Deployment

🌐 **Live URL:**  
[https://himani-bloggies-module5-git-3a744c-himanirajput-2003s-projects.vercel.app](https://himani-bloggies-module5-git-3a744c-himanirajput-2003s-projects.vercel.app)

🔗 **Test Opt-Out URL (with token):**  
[https://himani-bloggies-module5-git-3a744c-himanirajput-2003s-projects.vercel.app/opt-out?token=abc67](https://himani-bloggies-module5-git-3a744c-himanirajput-2003s-projects.vercel.app/opt-out?token=abc67)

## ✅ Features

- 📄 Legal Pages: Terms & Conditions, Raffle Rules, and FAQ
- 🔐 Token-based Opt-Out Flow with 45-Day Countdown
- ✅ Confirm Opt-Out request
- 🧾 Admin Panel with User Credits and Raffle Entries
- 📋 Opt-Out Log that persists entries in `entries.json`
- 🧩 Embedded Raffle Widget on all public pages

---

## 🛠 Tech Stack

- **Frontend:** React + Next.js + Tailwind CSS
- **Backend:** Node.js + TypeScript (API Routes)
- **Storage:** File system (`entries.json` + Markdown)

---

## 🧩 Pages Overview

| Page                | Path              | Description                                 |
|---------------------|-------------------|---------------------------------------------|
| Home                | `/`               | Landing page with widget                    |
| Terms               | `/terms`          | Legal Terms & Conditions                    |
| Raffle Rules        | `/raffle-rules`   | Raffle participation rules                  |
| FAQ                 | `/faq`            | Frequently Asked Questions                  |
| Opt-Out             | `/opt-out?token=` | 45-day countdown with confirmation          |
| Admin Panel         | `/admin`          | Static admin table of mock users            |
| Opt-Out Log         | `/admin/entries`  | File-based log of removed users             |

---

## 📦 API Routes

| Endpoint                     | Purpose                                  |
|------------------------------|------------------------------------------|
| `/api/legal/terms`          | Fetches markdown content for Terms       |
| `/api/legal/raffle-rules`   | Fetches markdown for Raffle Rules        |
| `/api/legal/faq`            | Serves FAQ data in JSON format           |
| `/api/opt-out/validate`     | Validates token and returns expiry info  |
| `/api/opt-out/process`      | Processes opt-out and saves log          |
| `/api/remove-user`          | Logs opt-out entry (with -5 credit mock) |
| `/api/get-entries`          | Returns all removed user logs            |
| `/api/award-credit`         | (Mock) Awards credits                    |

---

## 🧪 Testing Instructions

### 🔄 Opt-Out Flow

1. Go to:  
   👉 `/opt-out?token=abc67`

2. See countdown and confirmation button

3. Confirm opt-out → triggers `/api/remove-user`

4. Visit Admin Log:  
   👉 `/admin/entries` to verify log was saved

---

## 🧰 Setup Instructions

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/HimaniRajput-2003/himani-bloggies-module5-fix-.git
cd himani-bloggies-module5-fix-
npm install
npm run dev
