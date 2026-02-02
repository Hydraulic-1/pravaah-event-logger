// app.js - Frontend JavaScript

const API_URL = 'http://localhost:3000/api';

// DOM Elements
const logForm = document.getElementById('logForm');
const logsContainer = document.getElementById('logsContainer');
const filterLevel = document.getElementById('filterLevel');
const filterEvent = document.getElementById('filterEvent');
const refreshBtn = document.getElementById('refreshBtn');
const clearAllBtn = document.getElementById('clearAllBtn');

// Statistics elements
const totalCount = document.getElementById('totalCount');
const infoCount = document.getElementById('infoCount');
const successCount = document.getElementById('successCount');
const warningCount = document.getElementById('warningCount');
const errorCount = document.getElementById('errorCount');

// Load activities on page load
document.addEventListener('DOMContentLoaded', () => {
    loadActivities();
    loadStats();
});

// Form submission
logForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const teamName = document.getElementById('teamName').value;
    const eventType = document.getElementById('eventType').value;
    const activity = document.getElementById('activity').value;
    const level = document.getElementById('level').value;

    try {
        const response = await fetch(`${API_URL}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teamName,
                eventType,
                activity,
                level
            })
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Activity logged successfully!', 'success');
            logForm.reset();
            loadActivities();
            loadStats();
        } else {
            showNotification('Failed to log activity', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error connecting to server', 'error');
    }
});

// Load all activities
async function loadActivities() {
    try {
        const level = filterLevel.value;
        const eventType = filterEvent.value;
        
        let url = `${API_URL}/activities?limit=100`;
        if (level) url += `&level=${level}`;
        if (eventType) url += `&eventType=${eventType}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
            displayActivities(data.activities);
        }
    } catch (error) {
        console.error('Error loading activities:', error);
        logsContainer.innerHTML = `
            <div class="empty-state">
                <h3>⚠️ Error loading activities</h3>
                <p>Make sure the server is running on port 3000</p>
            </div>
        `;
    }
}

// Display activities in the UI
function displayActivities(activities) {
    if (activities.length === 0) {
        logsContainer.innerHTML = `
            <div class="empty-state">
                <h3>📭 No activities logged yet</h3>
                <p>Start logging your hackathon activities above!</p>
            </div>
        `;
        return;
    }

    logsContainer.innerHTML = activities.map(activity => `
        <div class="log-item ${activity.level}">
            <div class="log-header">
                <div>
                    <span class="log-level ${activity.level}">${activity.level}</span>
                    <span class="log-event">${activity.eventType}</span>
                </div>
                <div>
                    <span class="log-time">${activity.date} ${activity.time}</span>
                    <button class="log-delete" onclick="deleteActivity('${activity.id}')">Delete</button>
                </div>
            </div>
            <div class="log-content">
                <span class="log-team">${activity.teamName}</span>: ${activity.activity}
            </div>
        </div>
    `).join('');
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/stats`);
        const data = await response.json();

        if (data.success) {
            const stats = data.stats;
            totalCount.textContent = stats.total;
            infoCount.textContent = stats.info;
            successCount.textContent = stats.success;
            warningCount.textContent = stats.warning;
            errorCount.textContent = stats.error;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Delete activity
async function deleteActivity(id) {
    if (!confirm('Are you sure you want to delete this activity?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/activities/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showNotification('Activity deleted', 'success');
            loadActivities();
            loadStats();
        }
    } catch (error) {
        console.error('Error deleting activity:', error);
        showNotification('Error deleting activity', 'error');
    }
}

// Clear all activities
clearAllBtn.addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete ALL activities? This cannot be undone!')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/activities`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
            showNotification('All activities cleared', 'success');
            loadActivities();
            loadStats();
        }
    } catch (error) {
        console.error('Error clearing activities:', error);
        showNotification('Error clearing activities', 'error');
    }
});

// Filter change events
filterLevel.addEventListener('change', loadActivities);
filterEvent.addEventListener('change', loadActivities);

// Refresh button
refreshBtn.addEventListener('click', () => {
    loadActivities();
    loadStats();
    showNotification('Data refreshed', 'success');
});

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Auto-refresh every 30 seconds
setInterval(() => {
    loadActivities();
    loadStats();
}, 30000);