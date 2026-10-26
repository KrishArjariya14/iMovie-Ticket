# iMovies India — Real-Time Cinema Ticketing & Operations Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20%2F%20Mongoose-47A248.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A modern, high-performance cinema ticketing and theater management web application tailored for the Indian theatrical circuit (Bollywood, Tollywood, Kollywood, Sandalwood, and Mollywood). Features an interactive real-time seat selection map, automated 5-minute seat locking (TTL), GST & convenience fee calculations, digital QR ticket generation, and a secure operational analytics suite restricted to authorized developers.

---

## 🌟 Key Features

### 🎬 Customer Experience
- **Indian Cinema Circuit Curation:** Real-time listings for major Indian blockbusters with localized certifications (`U/A`, `A`, `U`), format choices (`IMAX 4DX 3D`, `2D Dolby Atmos`, `IMAX 2D`), and language audio tracks (`Hindi`, `Telugu`, `Tamil`, `Malayalam`, `Kannada`).
- **Interactive Multi-Tier Seating Grid:** Real-time seat layouts divided by luxury tiers:
  - **VIP Recliners** (₹450)
  - **Premium Prime** (₹290)
  - **Standard Classic** (₹180)
- **Live Seat Locking Engine:** 5-minute atomic reservation timer preventing double-booking race conditions across concurrent sessions.
- **Dynamic Pricing & Indian GST Computation:** Automatic calculation of base ticket price, 18% Goods & Services Tax (GST), and theater convenience fees.
- **Digital Ticketing & Verification:** Immediate generation of printable, scannable QR codes along with booking references and seat breakdown.

### 🛡️ Developer & Operations Suite
- **Role-Based Access Control (RBAC):** Advanced Real-Time Analyst hub is strictly gated and accessible exclusively to the platform developer and operations administrator (`krisharjariya861@gmail.com`).
- **Live Revenue & Occupancy Metrics:** Real-time visualization of daily gross box office collection, average screen occupancy rate, popular theater chains (PVR INOX, Cinepolis, MovieMax), and peak showtimes.
- **AI-Powered Theatrical Insights:** Demand forecasting, pricing recommendations, and dynamic screen scheduling reports.
- **Fail-Safe In-Memory Fallback:** Automated transition to an in-memory data store when an external MongoDB connection is not configured or temporarily unreachable.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, JavaScript (ES6+), Vite |
| **Styling & Design** | Tailwind CSS v4, Lucide React Icons |
| **Backend Runtime** | Node.js, Express.js |
| **Database & ODM** | MongoDB, Mongoose 8 (with automatic in-memory fallback) |
| **Utilities & Assets** | QRCode Generator, Canvas Confetti, Native Fetch API |

---

## 📁 Project Directory Structure

```text
├── public/                     # Static assets (posters, icons, avatars)
│   ├── avatars/                # Profile avatars (including admin profile)
│   ├── movies/                 # High-resolution Indian movie posters
│   └── favicon.ico             # Application favicon
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── BookingModal.jsx    # Interactive seat selection & checkout modal
│   │   ├── MovieCard.jsx       # Individual movie listing display
│   │   ├── Navbar.jsx          # Top navigation, city selector & auth controls
│   │   ├── QuickBookingBar.jsx # Rapid search and filter toolbar
│   │   └── RealTimeAnalyst.jsx # Restricted developer operational dashboard
│   ├── data/
│   │   └── initialData.js      # Seed catalog (movies, theaters, formats)
│   ├── models/                 # Mongoose data models
│   │   ├── Booking.js          # Booking records & seat references
│   │   ├── Movie.js            # Movie metadata, cast, ratings, and genre
│   │   ├── SeatLock.js         # Atomic lock schema with TTL expiry
│   │   ├── Showtime.js         # Screen schedules and tier pricing
│   │   └── Theater.js          # Theater chains and location coordinates
│   ├── App.jsx                 # Primary application controller and routing
│   ├── main.jsx                # React DOM root entry point
│   └── index.css               # Global styling and Tailwind directives
├── .env.example                # Template for environment configuration
├── package.json                # Project dependencies and script definitions
├── server.js                   # Express API server & database connection logic
├── vite.config.js              # Vite bundling and development configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
- **Package Manager:** npm (bundled with Node.js)
- **MongoDB:** (Optional) Local MongoDB instance or free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)

### Installation

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/your-username/imovies-india.git
   cd imovies-india
   ```

2. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   > **Note for Windows Users:** The `--legacy-peer-deps` flag ensures smooth resolution when installing peer dependencies across npm versions.

3. **Configure Environment Variables:**
   Create a `.env` file in the project root by copying the template:
   ```bash
   cp .env.example .env
   ```
   *(On Windows PowerShell, use `Copy-Item .env.example .env`)*

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## ⚙️ Environment Variables

The application can run out-of-the-box without manual configuration using internal defaults and in-memory mock storage. For persistence, specify your parameters in `.env`:

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | `3000` | Port on which the Express and Vite dev server runs |
| `MONGODB_URI` | String | *Empty (In-Memory)* | MongoDB Atlas or local connection string |
| `JWT_SECRET` | String | `dev_secret_key` | Secret used for authentication token signing |
| `ADMIN_EMAIL` | String | `krisharjariya861@gmail.com` | Email address permitted to view the Analyst Hub |

---

## 🔌 API Endpoints Reference

### Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/movies` | Fetch list of currently running movies with filter support |
| `GET` | `/api/theaters` | Retrieve theater chains filtered by city |
| `GET` | `/api/showtimes` | Query screen schedules, audio languages, and seat availability |
| `POST` | `/api/bookings/lock-seats` | Lock selected seats for 5 minutes (requires showtime ID & seat IDs) |
| `POST` | `/api/bookings` | Finalize ticket purchase, record payment, and generate booking ID |

### Restricted / Developer Endpoints
*(Requires authentication header matching authorized administrator)*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/metrics` | Retrieve real-time box office earnings, occupancy, and active screens |
| `GET` | `/api/analytics/ai-insights`| Generate real-time automated revenue optimization recommendations |

---

## 🔒 Security & Role-Based Access Control

The operational analytics dashboard is strictly isolated from standard ticket buyers.
- **Super Administrator:** `krisharjariya861@gmail.com`
- When standard users log in or browse as guests, the **Real-Time Analyst** tab remains completely hidden from the navigation bar.
- Direct access attempts to analytical REST endpoints without proper credentials are automatically rejected with an `HTTP 403 Forbidden` response.

---

## 🚢 Production Deployment

### Build for Production
To bundle the frontend assets for production:
```bash
npm run build
```

### Run Production Server
```bash
npm start
```

### Cloud Hosting Recommendations
- **Render / Railway:** Set Build Command to `npm install --legacy-peer-deps && npm run build` and Start Command to `npm start`. Add your `MONGODB_URI` under Environment Variables.
- **Docker:** Build using a multi-stage `node:18-alpine` base image, exposing port `3000`.

---

## 👤 Author & Maintainer

**Krish Arjariya**
- Role: Lead Full-Stack Engineer & Operations Head
- Email: [krisharjariya861@gmail.com](mailto:krisharjariya861@gmail.com)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
