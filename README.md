# 🎯 Pravaah'26 Event Logger - Web Hackathon Project

## 📋 Project Overview
**Event Activity Logger** - A real-time logging system to track all activities during Pravaah'26 hackathon events at IIT Bhubaneswar.

**Problem Statement**: During hackathons, organizers need to track team activities, submissions, errors, and milestones in real-time. This system provides a centralized logging dashboard for monitoring all event activities.

---

## 🚀 STEP-BY-STEP SETUP GUIDE FOR BEGINNERS

### STEP 1: Install Required Software

1. **Install Node.js**
   - Go to: https://nodejs.org/
   - Download the LTS version (Long Term Support)
   - Run the installer and follow the prompts
   - Verify installation by opening Command Prompt/Terminal and typing:
     ```bash
     node --version
     npm --version
     ```

2. **Install VS Code**
   - Go to: https://code.visualstudio.com/
   - Download and install
   - Open VS Code

---

### STEP 2: Set Up Your Project in VS Code

1. **Create Project Folder**
   - Open VS Code
   - Click "File" → "Open Folder"
   - Create a new folder called `hackathon-logger` on your Desktop
   - Open this folder in VS Code

2. **Copy All Files**
   Copy these files into your `hackathon-logger` folder:
   ```
   hackathon-logger/
   ├── server.js          (Backend code)
   ├── package.json       (Dependencies list)
   ├── database.json      (Database file)
   └── public/
       ├── index.html     (Frontend HTML)
       ├── style.css      (Frontend CSS)
       └── app.js         (Frontend JavaScript)
   ```

3. **Create the folder structure**
   - In VS Code, create a folder called `public`
   - Put `index.html`, `style.css`, and `app.js` inside the `public` folder
   - Keep `server.js`, `package.json`, and `database.json` in the main folder

---

### STEP 3: Install Dependencies

1. **Open Terminal in VS Code**
   - Click "Terminal" → "New Terminal" (or press Ctrl + `)
   - Make sure you're in the `hackathon-logger` folder

2. **Install Node Packages**
   ```bash
   npm install
   ```
   - This will install Express.js and CORS
   - Wait for installation to complete (you'll see a progress bar)

---

### STEP 4: Run Your Project Locally

1. **Start the Backend Server**
   ```bash
   npm start
   ```
   
2. **You should see**:
   ```
   🚀 Pravaah Event Logger Backend running on http://localhost:3000
   📊 API available at http://localhost:3000/api
   ```

3. **Open Your Browser**
   - Go to: `http://localhost:3000`
   - You should see your Event Logger website!

4. **Test the Website**
   - Fill in the form with team name, event type, activity
   - Click "Log Activity"
   - You should see the activity appear in the logs below
   - Check the statistics at the top update!

---

### STEP 5: Deploy Online (Multiple Options)

#### OPTION A: Deploy on Render (FREE & RECOMMENDED)

1. **Prepare Your Code**
   - Create a file called `.gitignore` in your project folder
   - Add this line to it:
     ```
     node_modules/
     ```

2. **Create GitHub Account & Repository**
   - Go to: https://github.com/
   - Create an account (if you don't have one)
   - Click "New Repository"
   - Name it: `pravaah-event-logger`
   - Make it Public
   - Click "Create repository"

3. **Upload Code to GitHub**
   - In VS Code terminal, run these commands one by one:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/pravaah-event-logger.git
   git push -u origin main
   ```
   (Replace YOUR-USERNAME with your GitHub username)

4. **Deploy on Render**
   - Go to: https://render.com/
   - Click "Sign Up" → Sign up with GitHub
   - Click "New +" → "Web Service"
   - Connect your `pravaah-event-logger` repository
   - Fill in:
     - Name: `pravaah-logger`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - You'll get a URL like: `https://pravaah-logger.onrender.com`

5. **Update Frontend API URL**
   - In `public/app.js`, change line 3:
   ```javascript
   const API_URL = 'https://pravaah-logger.onrender.com/api';
   ```
   - Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update API URL"
   git push
   ```
   - Render will auto-deploy the update!

---

#### OPTION B: Deploy on Vercel (Alternative)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose defaults for everything
   - You'll get a URL instantly!

---

#### OPTION C: Deploy on Railway (Alternative)

1. **Go to**: https://railway.app/
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Select your GitHub repository**
5. **Railway auto-detects Node.js and deploys!**
6. **Get your public URL from the dashboard**

---

### STEP 6: Final Submission for Hackathon

1. **Create a GitHub Repository** (if not done already)
   - All code should be on GitHub
   - Add a good README.md explaining your project

2. **Prepare 5 Slides** (Max as per rulebook)
   - Slide 1: Project Title & Problem Statement
   - Slide 2: Tech Stack (Node.js, Express, HTML/CSS/JS)
   - Slide 3: Features & Functionality
   - Slide 4: Live Demo Screenshot
   - Slide 5: Team Members & Roles

3. **Prepare Demo**
   - Have your live URL ready
   - Show logging activities in real-time
   - Show filters and statistics
   - Show how data persists in database.json

4. **Submit Before Deadline**
   - GitHub Repository Link
   - Live Website URL
   - 5 Slides (PDF/PPT)
   - Team Details

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: JSON file (simple file-based storage)
- **Deployment**: Render/Vercel/Railway

---

## ✨ Features

✅ Real-time activity logging  
✅ Activity level categorization (INFO, SUCCESS, WARNING, ERROR)  
✅ Live statistics dashboard  
✅ Filter by event type and level  
✅ Delete individual or all activities  
✅ Auto-refresh every 30 seconds  
✅ Responsive design for mobile  
✅ Beautiful gradient UI  

---

## 📊 Judging Criteria Alignment

- **Innovation & Creativity (20%)**: Real-time logging dashboard with auto-refresh
- **Functionality & Execution (30%)**: Full CRUD operations, filters, statistics
- **Technical Implementation (25%)**: RESTful API, clean code structure
- **UI/UX Design (15%)**: Modern gradient design, responsive, intuitive
- **Adherence to Theme (10%)**: Perfectly suited for hackathon event management

---

## 🐛 Troubleshooting

**Problem**: "npm: command not found"
- Solution: Install Node.js properly and restart VS Code

**Problem**: "Port 3000 is already in use"
- Solution: Stop other processes or change PORT in server.js to 3001

**Problem**: "Cannot connect to server"
- Solution: Make sure backend is running (`npm start`)

**Problem**: "Activities not showing"
- Solution: Check browser console (F12) for errors, verify API_URL

---

## 📞 Support

For questions during the hackathon:
- Check console logs (F12 in browser)
- Check terminal for backend errors
- Verify all files are in correct folders

---

## 👥 Team Information

Team Name: [Your Team Name]
Members:
1. [Name] - [Role: Frontend/Backend]
2. [Name] - [Role: Frontend/Backend]
3. [Name] - [Role: Frontend/Backend]
4. [Name] - [Role: Frontend/Backend]

---

## 📄 License

MIT License - Feel free to use for educational purposes

---

**Built for Pravaah'26 Web Hackathon | IIT Bhubaneswar**

**Event Date**: Feb 7th 10:00 AM to Feb 8th 10:00 AM
**Prize Pool**: ₹20,000

Good luck with your hackathon! 🚀