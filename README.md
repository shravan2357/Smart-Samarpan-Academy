# 🎓 Smart Samarpan Academy

An AI-powered full-stack mathematics learning platform for Classes 9th-12th, JEE & Board preparation.

[![Backend on Render](https://img.shields.io/badge/Render-Backend_API-informational?style=flat&logo=render)](https://smart-samarpan-academy.onrender.com)

---

## ✨ Features

- **AI Quiz Generator** — Chapter-wise adaptive quizzes powered by Google Gemini
- **AI Formula Assistant** — Generate comprehensive formula sheets on demand
- **AI Performance Analysis** — Personalized study recommendations based on quiz history
- **Course Management** — Structured video lectures, downloadable notes
- **Payments** — Razorpay payment gateway integration
- **Auth** — Email/OTP registration + Google OAuth login
- **Admin Dashboard** — Role-based access, user management, course CRUD

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS v4, KaTeX |
| Backend | Node.js, Express.js 5 (ESM), Mongoose |
| Database | MongoDB Atlas |
| AI | Google Gemini API |
| Payments | Razorpay |
| Auth | JWT, bcrypt, Google OAuth 2.0 |
| Email | Gmail SMTP / Brevo SMTP |
| Hosting | Render (backend), Render Static Site (frontend) |

---

## 📁 Project Structure

```
Smart_samarpan_Acadmey/
├── server/                   # Node.js backend
│   ├── controllers/          # Route handlers
│   │   ├── admin.js          # Admin operations (CRUD courses, users)
│   │   ├── course.js         # Course & progress logic
│   │   └── user.js           # Auth, profile, AI analysis
│   ├── database/
│   │   └── db.js             # MongoDB Atlas connection
│   ├── middlewares/
│   │   ├── isAuth.js         # JWT authentication middleware
│   │   ├── multer.js         # File upload handling
│   │   ├── sendMail.js       # Email (OTP + forgot password)
│   │   └── TryCatch.js       # Async error handler
│   ├── models/               # Mongoose schemas
│   │   ├── Courses.js
│   │   ├── Lecture.js
│   │   ├── Payment.js
│   │   ├── Progress.js
│   │   ├── QuizResult.js
│   │   └── User.js
│   ├── routes/               # Express routers
│   │   ├── admin.js
│   │   ├── course.js
│   │   └── user.js
│   ├── scripts/
│   │   └── createAdmin.js    # One-time admin seeder
│   ├── uploads/              # User-uploaded files (not committed)
│   ├── .env                  # Secrets (NOT committed)
│   ├── .env.example          # Template for .env
│   ├── index.js              # Express app entry point
│   └── package.json
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── admin/            # Admin dashboard pages
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # React Context (User, Course)
│   │   ├── pages/            # Route pages
│   │   │   ├── aitools/      # AI quiz, formula, analysis tools
│   │   │   ├── auth/         # Login, Register, Verify OTP
│   │   │   ├── courses/      # Course listing & description
│   │   │   └── home/         # Landing page
│   │   ├── App.jsx
│   │   └── main.jsx          # Entry point (server URL config)
│   ├── .env                  # Secrets (NOT committed)
│   ├── .env.example          # Template for .env
│   └── package.json
│
├── render.yaml               # Render deployment config
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Google Cloud Console project (for OAuth + Gemini API)

### 1. Clone the repository

```bash
git clone https://github.com/shravan2357/Smart-Samarpan-Academy.git
cd Smart-Samarpan-Academy
```

### 2. Backend setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your values (see Environment Variables section)
npm start
```

Backend runs at: **http://localhost:5175**

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔐 Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: `5175`) |
| `DB` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT signing secret (long random string) |
| `JWT_EXPIRE` | JWT expiry (e.g. `15d`) |
| `Activation_Secret` | OTP activation JWT secret |
| `Forgot_Secret` | Password reset JWT secret |
| `Gmail` | Gmail address for sending emails (local dev) |
| `Password` | Gmail App Password |
| `BREVO_USER` | Brevo SMTP user (for production) |
| `BREVO_PASS` | Brevo SMTP password (for production) |
| `Razorpay_Key` | Razorpay API key |
| `Razorpay_Secret` | Razorpay API secret |
| `GEMINI_API_KEY` | Google Gemini AI API key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `frontendurl` | Frontend URL for CORS & email links |
| `ADMIN_EMAIL` | Admin email (used by seed script only) |
| `ADMIN_PASSWORD` | Admin password (used by seed script only) |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID (same as backend) |
| `VITE_RAZORPAY_KEY` | Razorpay public key |
| `VITE_SERVER` | Backend URL (`http://localhost:5175` for local) |

---

## 🍃 MongoDB Atlas Setup

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free cluster
2. **Database Access** → Add User → username + password, role: `readWriteAnyDatabase`
3. **Network Access** → Add IP Address → `0.0.0.0/0` (Allow from anywhere)
4. **Connect** → Copy the connection string → paste as `DB=` in `server/.env`
   - Replace `<username>`, `<password>`, and set database name to `samarpan`
5. Example: `DB=mongodb+srv://myuser:mypass@cluster0.abc.mongodb.net/samarpan`

---

## 👑 Admin Account Setup

After setting up the backend and `.env`:

```bash
cd server
node scripts/createAdmin.js
```

This script:
- Reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `server/.env`
- Hashes the password with bcrypt
- Creates (or updates) the admin user in MongoDB with `role: admin`, `mainrole: superadmin`

> ⚠️ Never expose the admin password in code or README. Always read it from `.env`.

---

## 🚀 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/register` | Register + send OTP |
| POST | `/api/user/verify` | Verify OTP |
| POST | `/api/user/resend-otp` | Resend OTP |
| POST | `/api/user/login` | Login |
| GET | `/api/user/me` | Get profile (auth required) |
| POST | `/api/user/forgot` | Forgot password |
| POST | `/api/user/reset` | Reset password |
| POST | `/api/user/google-login` | Google OAuth login |

### Courses
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/course/all` | Get all courses |
| GET | `/api/course/:id` | Get course details |
| POST | `/api/user/progress` | Save progress |
| GET | `/api/user/progress` | Get progress |

### Admin (requires admin role)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/course/new` | Create course |
| DELETE | `/api/admin/course/:id` | Delete course |
| POST | `/api/admin/course/:id` | Add lecture |
| DELETE | `/api/admin/lecture/:id` | Delete lecture |
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/users` | All users |
| PUT | `/api/admin/user/:id` | Update user role |
| DELETE | `/api/admin/user/:id` | Delete user |

### AI Tools
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/generate-quiz` | AI quiz generation |
| POST | `/api/generate-formulas` | AI formula generation |
| GET | `/api/user/performance-analysis` | AI performance analysis |
| POST | `/api/submit-quiz-result` | Save quiz result |
| GET | `/api/get-recommendations/:userId` | Get recommendations |

---

## ☁️ Render Deployment

### Backend (Web Service)
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repository
3. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Node Version:** `20`
4. Add all environment variables from `server/.env.example`
5. Set `frontendurl` to your frontend Render URL

### Frontend (Static Site)
1. New → Static Site → same repository
2. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. Add environment variables:
   - `VITE_SERVER` = your backend Render URL (e.g. `https://smart-samarpan-academy.onrender.com`)
   - `VITE_GOOGLE_CLIENT_ID` = your Google Client ID
   - `VITE_RAZORPAY_KEY` = your Razorpay key

---

## ❗ Common Errors & Solutions

| Error | Cause | Solution |
|---|---|---|
| `MongoDB connection failed` | Wrong Atlas URI or IP not whitelisted | Check `DB` in `.env`; add `0.0.0.0/0` to Atlas Network Access |
| `Invalid or expired token` | JWT secret mismatch | Ensure `JWT_SECRET` is same across restarts |
| `OTP email not received` | SMTP blocked on Render | Set `BREVO_USER` and `BREVO_PASS` for production |
| `CORS error` | Frontend URL not in allowed origins | Set `frontendurl` in server `.env` to your frontend URL |
| `Razorpay not working` | Wrong keys | Use `rzp_test_*` keys for dev, `rzp_live_*` for prod |
| `Admin can't access dashboard` | User role not set | Run `node scripts/createAdmin.js` |
| `PORT already in use` | Another process using 5175 | Set `PORT=5176` in `.env` or kill the process |

---

## 📄 License

MIT License
