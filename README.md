# 🎬 iMovies India — Real-Time Cinema Ticket Booking & Operations Analyst

Next-generation responsive movie ticket booking system built with **React 19, Vite, Node.js, Express, MongoDB (Mongoose), and Tailwind CSS v4**.

- **Developer & Operations Head:** Krish Arjariya (`krisharjariya861@gmail.com`)
- **Circuit:** India (Mumbai, Delhi NCR, Bengaluru, Pune, Hyderabad, etc.)
- **Currency:** Indian Rupee (₹ INR) with GST tax calculations
- **Live Seat Lock:** 5-Minute TTL (Time-To-Live) countdown preventing double-booking collisions
- **Developer Access Only:** Real-Time Analyst hub is restricted exclusively to `krisharjariya861@gmail.com`

---

## 🚀 1. Apne System (Laptop / PC) Par Kaise Run Karein

### Prerequisites
- [Node.js](https://nodejs.org) (v18 ya higher install hona chahiye)
- VS Code ya koi bhi code editor

### Step-by-Step Commands

1. **Project folder open karein:**
   Terminal / Command Prompt me project ke folder me jayein:
   ```bash
   cd imovies-india
   ```

2. **Dependencies install karein:**
   ```bash
   npm install
   ```

3. **`.env` file banayein:**
   `.env.example` file ko copy karke `.env` banayein:
   - **Windows PowerShell:**
     ```powershell
     Copy-Item .env.example .env
     ```
   - **Mac / Linux:**
     ```bash
     cp .env.example .env
     ```

4. **MongoDB Connection String Dalein (`.env` file me):**
   `.env` file open karein aur apna MongoDB Atlas URI ya local URI set karein:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/imovies?retryWrites=true&w=majority
   JWT_SECRET=super_secret_jwt_key_2026_krish
   ADMIN_EMAIL=krisharjariya861@gmail.com
   ```
   *(Note: Agar MongoDB Atlas URL abhi nahi hai, toh bhi project bina ruke automatic Local In-Memory mode me chalega!)*

5. **Project Start Karein:**
   ```bash
   npm run dev
   ```

6. **Browser me Open Karein:**
   👉 [http://localhost:3000](http://localhost:3000)

---

## 🌐 2. Kisi User / Client Ko Bhejna Ho Toh Kaise Run Karwayein

### Option A: Direct Live Hosted URL (Sabse Aasan - No Install Needed)
Aapko kisi ko code bhejne ki zarurat nahi hai! Aap direct yeh Live Cloud URL bhej sakte hain:
👉 **[https://ais-dev-iu7wvekhakgzldliv4m4in-748979500453.asia-east1.run.app](https://ais-dev-iu7wvekhakgzldliv4m4in-748979500453.asia-east1.run.app)**

- Mobile aur Laptop dono me perfectly open hota hai.
- Normal user ko **Real-Time Analyst tab nahi dikhega** (sirf ticket booking dikhegi).
- Developer (`krisharjariya861@gmail.com`) login hone par hi Analyst panel unlock hota hai.

---

### Option B: Free Cloud Hosting (Render / Railway / Vercel)
Agar aap isko apne custom domain ya lifetime free server par chalana chahte hain:
1. GitHub par code push karein:
   ```bash
   git init
   git add .
   git commit -m "iMovies India release"
   git push origin main
   ```
2. [Render.com](https://render.com) par free Web Service create karein.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Environment Variables me apna `MONGODB_URI` add kar dein.

---

## 🍃 3. MongoDB Atlas Free Database Kaise Banayein (2 Minutes)

1. [cloud.mongodb.com](https://cloud.mongodb.com) par jayein aur free account banayein.
2. **Build a Database** -> **M0 Free Cluster** select karein (AWS Mumbai region `ap-south-1`).
3. Username aur Password create karein (e.g., `krish` aur password).
4. Network Access me **Allow Access from Anywhere (0.0.0.0/0)** add karein.
5. **Connect** -> **Drivers** par click karein aur connection string copy karein:
   ```
   mongodb+srv://krish:<password>@cluster0.mongodb.net/imovies?retryWrites=true&w=majority
   ```
6. Ise apni `.env` file me paste kar dein.
