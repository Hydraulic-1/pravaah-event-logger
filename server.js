// server.js - Backend Server for Pravaah Event Logger
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend files from 'public' folder

// Database file path
const dbFile = path.join(__dirname, 'database.json');

// Initialize database
async function initDatabase() {
    try {
        await fs.access(dbFile);
    } catch {
        const initialData = {
            events: [],
            teams: [],
            activities: []
        };
        await fs.writeFile(dbFile, JSON.stringify(initialData, null, 2));
    }
}

// Read database
async function readDB() {
    const data = await fs.readFile(dbFile, 'utf8');
    return JSON.parse(data);
}

// Write database
async function writeDB(data) {
    await fs.writeFile(dbFile, JSON.stringify(data, null, 2));
}

// ========== API ROUTES ==========

// POST: Log a new activity
app.post('/api/activities', async (req, res) => {
    try {
        const { teamName, eventType, activity, level } = req.body;
        
        if (!teamName || !eventType || !activity) {
            return res.status(400).json({ 
                success: false, 
                error: 'Team name, event type, and activity are required' 
            });
        }

        const newActivity = {
            id: Date.now().toString(),
            teamName,
            eventType,
            activity,
            level: level || 'INFO', // INFO, WARNING, ERROR, SUCCESS
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };

        const db = await readDB();
        db.activities.push(newActivity);
        await writeDB(db);

        res.status(201).json({ 
            success: true, 
            message: 'Activity logged successfully',
            activity: newActivity 
        });
    } catch (error) {
        console.error('Error logging activity:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// GET: Fetch all activities
app.get('/api/activities', async (req, res) => {
    try {
        const { level, eventType, limit = 100 } = req.query;
        const db = await readDB();
        
        let activities = db.activities;
        
        // Filter by level
        if (level) {
            activities = activities.filter(a => a.level === level.toUpperCase());
        }
        
        // Filter by event type
        if (eventType) {
            activities = activities.filter(a => a.eventType === eventType);
        }

        // Sort by newest first and limit
        activities = activities.reverse().slice(0, parseInt(limit));

        res.json({ 
            success: true, 
            activities,
            count: activities.length 
        });
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// GET: Get activity statistics
app.get('/api/stats', async (req, res) => {
    try {
        const db = await readDB();
        
        const stats = {
            total: db.activities.length,
            info: db.activities.filter(a => a.level === 'INFO').length,
            warning: db.activities.filter(a => a.level === 'WARNING').length,
            error: db.activities.filter(a => a.level === 'ERROR').length,
            success: db.activities.filter(a => a.level === 'SUCCESS').length,
            byEvent: {}
        };

        // Count by event type
        db.activities.forEach(activity => {
            if (!stats.byEvent[activity.eventType]) {
                stats.byEvent[activity.eventType] = 0;
            }
            stats.byEvent[activity.eventType]++;
        });

        res.json({ success: true, stats });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// DELETE: Clear all activities
app.delete('/api/activities', async (req, res) => {
    try {
        const db = await readDB();
        db.activities = [];
        await writeDB(db);

        res.json({ success: true, message: 'All activities cleared' });
    } catch (error) {
        console.error('Error clearing activities:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// DELETE: Delete specific activity
app.delete('/api/activities/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDB();
        
        const initialLength = db.activities.length;
        db.activities = db.activities.filter(a => a.id !== id);
        
        if (db.activities.length === initialLength) {
            return res.status(404).json({ success: false, error: 'Activity not found' });
        }

        await writeDB(db);
        res.json({ success: true, message: 'Activity deleted' });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Start server
async function startServer() {
    await initDatabase();
    app.listen(PORT, () => {
        console.log(`🚀 Pravaah Event Logger Backend running on http://localhost:${PORT}`);
        console.log(`📊 API available at http://localhost:${PORT}/api`);
    });
}

startServer();