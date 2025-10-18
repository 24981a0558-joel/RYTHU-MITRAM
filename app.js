// Configuration
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyAxKhauqdSxZQTB69nEsQxyVp1ZDxXq4HI', // Gemini API key
    OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY', // Replace with your API key
    WEATHER_API_KEY: 'YOUR_WEATHER_API_KEY', // Replace with OpenWeatherMap API key
    FIREBASE_CONFIG: {
        // Replace with your Firebase config
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "your-app.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-app.appspot.com",
        messagingSenderId: "123456789",
        appId: "your-app-id"
    }
};

// State Management
const state = {
    currentUser: null,
    userProfile: null,
    isAuthenticated: false,
    chatHistory: [],
    weatherData: null,
    isListening: false
};

// DOM Elements
const elements = {
    loginScreen: document.getElementById('loginScreen'),
    onboardingScreen: document.getElementById('onboardingScreen'),
    dashboardScreen: document.getElementById('dashboardScreen'),
    authForm: document.getElementById('authForm'),
    onboardingForm: document.getElementById('onboardingForm'),
    toggleAuth: document.getElementById('toggleAuth'),
    chatContainer: document.getElementById('chatContainer'),
    chatInput: document.getElementById('chatInput'),
    sendBtn: document.getElementById('sendBtn'),
    voiceBtn: document.getElementById('voiceBtn'),
    imageUploadBtn: document.getElementById('imageUploadBtn'),
    imageInput: document.getElementById('imageInput'),
    clearChatBtn: document.getElementById('clearChatBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    toast: document.getElementById('toast')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    checkAuthStatus();
});

function initializeApp() {
    // Check if user is already logged in (using localStorage for demo)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        state.isAuthenticated = true;
    }
    
    // Initialize chart
    initializeChart();
    
    // Load sample data
    loadSampleData();
}

function setupEventListeners() {
    // Auth form
    elements.authForm.addEventListener('submit', handleAuth);
    elements.toggleAuth.addEventListener('click', toggleAuthMode);
    
    // Onboarding form
    elements.onboardingForm.addEventListener('submit', handleOnboarding);
    
    // Chat
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Quick action buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            elements.chatInput.value = btn.dataset.query;
            sendMessage();
        });
    });
    
    // Voice input
    elements.voiceBtn.addEventListener('click', toggleVoiceInput);
    
    // Image upload
    elements.imageUploadBtn.addEventListener('click', () => elements.imageInput.click());
    elements.imageInput.addEventListener('change', handleImageUpload);
    
    // Clear chat
    elements.clearChatBtn.addEventListener('click', clearChat);
    
    // Logout
    elements.logoutBtn.addEventListener('click', handleLogout);
}

// Authentication
function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isSignup = elements.toggleAuth.textContent === 'Login';
    
    showLoading(true);
    
    // Simulate authentication (replace with actual Firebase auth)
    setTimeout(() => {
        state.currentUser = {
            email: email,
            uid: 'demo_' + Date.now()
        };
        state.isAuthenticated = true;
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        
        showLoading(false);
        
        if (isSignup || !localStorage.getItem('userProfile')) {
            showScreen('onboardingScreen');
        } else {
            state.userProfile = JSON.parse(localStorage.getItem('userProfile'));
            showDashboard();
        }
        
        showToast(isSignup ? 'Account created successfully!' : 'Welcome back!', 'success');
    }, 1500);
}

function toggleAuthMode(e) {
    e.preventDefault();
    const isLogin = elements.toggleAuth.textContent === 'Sign Up';
    
    document.getElementById('authTitle').textContent = isLogin ? 'Login' : 'Sign Up';
    document.getElementById('authBtnText').textContent = isLogin ? 'Login' : 'Sign Up';
    document.getElementById('toggleText').textContent = isLogin ? "Don't have an account?" : "Already have an account?";
    elements.toggleAuth.textContent = isLogin ? 'Sign Up' : 'Login';
}

function checkAuthStatus() {
    try {
        if (state.isAuthenticated && state.currentUser) {
            const profile = localStorage.getItem('userProfile');
            if (profile) {
                state.userProfile = JSON.parse(profile);
                showDashboard();
            } else {
                showScreen('onboardingScreen');
            }
        } else {
            showScreen('loginScreen');
        }
    } catch (error) {
        console.error('Auth check error:', error);
        // Clear corrupted data and restart
        localStorage.clear();
        showScreen('loginScreen');
    }
}

// Onboarding
function handleOnboarding(e) {
    e.preventDefault();
    
    const profile = {
        name: document.getElementById('farmerName').value,
        location: document.getElementById('location').value,
        cropType: document.getElementById('cropType').value,
        language: document.getElementById('language').value
    };
    
    showLoading(true);
    
    setTimeout(() => {
        state.userProfile = profile;
        localStorage.setItem('userProfile', JSON.stringify(profile));
        
        showLoading(false);
        showDashboard();
        showToast('Profile setup complete! / ప్రొఫైల్ సెటప్ పూర్తయింది!', 'success');
    }, 1500);
}

// Dashboard
function showDashboard() {
    showScreen('dashboardScreen');
    document.getElementById('userName').textContent = state.userProfile.name;
    loadWeatherData();
    updateRecommendations();
}

// Weather API Integration
async function loadWeatherData() {
    const location = state.userProfile.location || 'Hyderabad';
    
    // Demo data (replace with actual API call)
    const demoWeather = {
        temp: 28,
        humidity: 65,
        windSpeed: 12,
        location: location
    };
    
    updateWeatherUI(demoWeather);
    
    // Uncomment for real API call
    /*
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${CONFIG.WEATHER_API_KEY}`
        );
        const data = await response.json();
        
        const weatherData = {
            temp: Math.round(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
            location: data.name
        };
        
        updateWeatherUI(weatherData);
    } catch (error) {
        console.error('Weather API error:', error);
        showToast('Could not load weather data', 'error');
    }
    */
}

function updateWeatherUI(data) {
    document.getElementById('temperature').textContent = `${data.temp}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('weatherLocation').textContent = data.location;
}

// Chat Functionality
async function sendMessage() {
    const message = elements.chatInput.value.trim();
    if (!message) return;
    
    // Disable send button to prevent double-sending
    elements.sendBtn.disabled = true;
    elements.chatInput.disabled = true;
    
    // Add user message
    addMessageToChat('user', message);
    elements.chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get AI response
        const response = await getAIResponse(message);
        
        // Remove typing indicator and add AI response
        removeTypingIndicator();
        addMessageToChat('ai', response);
        
        // Save to history
        state.chatHistory.push({ user: message, ai: response, timestamp: Date.now() });
    } catch (error) {
        removeTypingIndicator();
        addMessageToChat('ai', 'Sorry, I encountered an error. Please try again. | క్షమించండి, నాకు లోపం ఎదురైంది. దయచేసి మళ్లీ ప్రయత్నించండి.');
        console.error('Message send error:', error);
    } finally {
        // Re-enable send button
        elements.sendBtn.disabled = false;
        elements.chatInput.disabled = false;
        elements.chatInput.focus();
    }
}

function addMessageToChat(type, message, imageUrl = null) {
    // Remove welcome message if exists
    const welcomeMsg = elements.chatContainer.querySelector('.welcome-message');
    if (welcomeMsg) welcomeMsg.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    // Format message with line breaks and preserve formatting
    const formattedMessage = message.replace(/\n/g, '<br>');
    bubble.innerHTML = formattedMessage;
    
    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.className = 'message-image';
        bubble.appendChild(img);
    }
    
    messageDiv.appendChild(bubble);
    elements.chatContainer.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    setTimeout(() => {
        elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
    }, 100);
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    elements.chatContainer.appendChild(indicator);
    elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// AI Response Generation
async function getAIResponse(query) {
    try {
        // Prepare context-aware prompt
        const cropType = state.userProfile?.cropType || 'general farming';
        const location = state.userProfile?.location || 'India';
        const language = state.userProfile?.language || 'both';
        
        let languageInstruction = '';
        if (language === 'telugu') {
            languageInstruction = 'Respond only in Telugu language.';
        } else if (language === 'english') {
            languageInstruction = 'Respond only in English language.';
        } else {
            languageInstruction = 'Provide your response in both English and Telugu. Format: English text | Telugu text';
        }
        
        const systemPrompt = `You are Rythu Mitra, an expert farming assistant helping Telugu farmers with deep agricultural knowledge.
        
Context:
- Farmer's main crop: ${cropType}
- Location: ${location}
- ${languageInstruction}

Guidelines:
- Provide detailed, comprehensive explanations with scientific reasoning
- Include step-by-step instructions when relevant
- Provide specific measurements, timings, and dosages
- Explain the WHY behind recommendations (soil chemistry, plant biology, pest behavior)
- Include practical tips, warnings, and best practices
- Mention both modern and traditional methods when applicable
- Reference local farming practices suitable for Indian conditions (especially Telangana/Andhra Pradesh)
- If discussing problems, explain symptoms, causes, and multiple solutions
- For chemicals/fertilizers, mention safety precautions
- Include expected results and timeframes
- If bilingual, separate English and Telugu with " | " and ensure both versions are equally detailed
- Structure longer responses with clear sections or bullet points
- Use simple language that rural farmers can understand despite the depth
- Aim for 150-300 words for comprehensive coverage`;

        // Add API key to URL
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
        
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nFarmer's Question: ${query}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800,
                    topP: 0.8,
                    topK: 40
                }
            })
        });

        if (!apiResponse.ok) {
            throw new Error(`API Error: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format');
        }
        
    } catch (error) {
        console.error('Gemini API error:', error);
        
        // Fallback to demo responses
        const demoResponses = {
            'fertilizer': 'For rice cultivation, I recommend using DAP (Diammonium Phosphate) at 50 kg per acre during sowing, followed by Urea 25 kg per acre after 25 days. | వరి సాగు కోసం, విత్తనం సమయంలో ఎకరాకు 50 కిలోల DAP, 25 రోజుల తర్వాత ఎకరాకు 25 కిలోల యూరియా వాడాలని సిఫార్సు చేస్తున్నాను.',
            'pest': 'To identify pest damage: Look for holes in leaves (caterpillars), yellow spots (aphids), or wilting (stem borers). Send me a photo for accurate diagnosis! | చీడపురుగుల నష్టాన్ని గుర్తించడానికి: ఆకులలో రంధ్రాలు (గొంగళి పురుగులు), పసుపు మచ్చలు (తేనెసీసలు), లేదా వాడిపోవడం (కాండం బోరర్లు) కోసం చూడండి.',
            'irrigation': 'Best irrigation schedule for rice: Water the field 2-3 days after transplanting, then maintain 2-5 cm water level. Drain 10 days before harvest. | వరికి ఉత్తమ నీటిపారుదల షెడ్యూల్: నాటిన 2-3 రోజుల తర్వాత పొలానికి నీరు పెట్టండి, తర్వాత 2-5 సెం.మీ నీటి స్థాయిని నిర్వహించండి.',
            'default': 'I understand your question. Based on your crop and location, here are my recommendations: Ensure proper drainage, monitor for pests weekly, and apply organic manure for better soil health. | మీ ప్రశ్న అర్థమైంది. మీ పంట మరియు ప్రాంతం ఆధారంగా, ఇవే నా సిఫార్సులు: సరైన డ్రైనేజీని నిర్ధారించండి, వారానికి చీడపురుగుల కోసం పర్యవేక్షించండి.'
        };
        
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('fertilizer') || lowerQuery.includes('పేచు')) {
            return demoResponses.fertilizer;
        } else if (lowerQuery.includes('pest') || lowerQuery.includes('చీడ')) {
            return demoResponses.pest;
        } else if (lowerQuery.includes('irrigation') || lowerQuery.includes('నీరు')) {
            return demoResponses.irrigation;
        }
        return demoResponses.default + '\n\n(Using offline mode - check internet connection)';
    }
}

// Voice Input
function toggleVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showToast('Voice input not supported in this browser / ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు', 'error');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Set language based on user preference
    const lang = state.userProfile?.language;
    if (lang === 'telugu') {
        recognition.lang = 'te-IN';
    } else if (lang === 'both') {
        recognition.lang = 'en-IN'; // Default to English for bilingual
    } else {
        recognition.lang = 'en-IN';
    }
    
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    if (!state.isListening) {
        try {
            recognition.start();
            state.isListening = true;
            elements.voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            elements.voiceBtn.style.color = '#f44336';
            showToast('Listening... Speak now / వినుతోంది... ఇప్పుడు మాట్లాడండి', 'info');
        } catch (error) {
            console.error('Voice recognition start error:', error);
            showToast('Could not start voice input / వాయిస్ ఇన్‌పుట్ ప్రారంభించలేకపోయింది', 'error');
            state.isListening = false;
        }
    }
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        elements.chatInput.value = transcript;
        state.isListening = false;
        elements.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        elements.voiceBtn.style.color = '';
        showToast('Voice captured! / వాయిస్ సంగ్రహించబడింది!', 'success');
    };
    
    recognition.onerror = (event) => {
        state.isListening = false;
        elements.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        elements.voiceBtn.style.color = '';
        
        let errorMsg = 'Could not recognize speech / ప్రసంగం గుర్తించలేకపోయింది';
        if (event.error === 'no-speech') {
            errorMsg = 'No speech detected. Please try again / ప్రసంగం కనుగొనబడలేదు';
        } else if (event.error === 'network') {
            errorMsg = 'Network error. Check internet connection / నెట్‌వర్క్ లోపం';
        }
        
        showToast(errorMsg, 'error');
    };
    
    recognition.onend = () => {
        state.isListening = false;
        elements.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        elements.voiceBtn.style.color = '';
    };
}

// Image Upload & Pest Detection
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
        const imageUrl = event.target.result;
        
        showLoading(true);
        
        // Add user message with image
        addMessageToChat('user', 'Please analyze this image for pests or diseases', imageUrl);
        
        // Simulate pest detection (replace with actual Vision AI API)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const detectionResult = `Image Analysis Complete! 🔍

Detected: Brown Plant Hopper (తవుడు పురుగు)
Severity: Moderate
Confidence: 87%

Recommendations:
✓ Spray Imidacloprid 17.8% SL @ 100ml/acre
✓ Apply in evening hours
✓ Repeat after 10 days if needed
✓ Maintain field sanitation

Next Steps: Monitor crop daily for 7 days`;
        
        showLoading(false);
        addMessageToChat('ai', detectionResult);
        
        showToast('Image analysis complete!', 'success');
    };
    
    reader.readAsDataURL(file);
}

// Clear Chat
function clearChat() {
    elements.chatContainer.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-hand-wave"></i>
            <h4>Hello! How can I help you today?</h4>
            <p>నమస్కారం! నేను మీకు ఎలా సహాయం చేయగలను?</p>
        </div>
    `;
    state.chatHistory = [];
    showToast('Chat cleared', 'success');
}

// Recommendations
function updateRecommendations() {
    const recommendations = [
        'Good weather for spraying pesticides today',
        'Monitor for brown plant hopper in paddy fields',
        'Soil moisture optimal - reduce irrigation',
        'Apply potash fertilizer in 5 days'
    ];
    
    const listContainer = document.getElementById('recommendationsList');
    listContainer.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <i class="fas fa-check-circle"></i>
            <p>${rec}</p>
        </div>
    `).join('');
}

// Chart Initialization
function initializeChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;
    
    // Destroy existing chart if it exists
    if (window.cropHealthChart) {
        window.cropHealthChart.destroy();
    }
    
    window.cropHealthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                label: 'Crop Health Score',
                data: [65, 70, 75, 80, 85, 87],
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Health: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Sample Data Loading
function loadSampleData() {
    // Preload some sample data for offline demo
    const sampleData = {
        weather: { temp: 28, humidity: 65, windSpeed: 12 },
        cropHealth: 85,
        soilMoisture: 65
    };
    
    state.weatherData = sampleData.weather;
}

// Logout
function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProfile');
    state.currentUser = null;
    state.userProfile = null;
    state.isAuthenticated = false;
    state.chatHistory = [];
    
    showScreen('loginScreen');
    showToast('Logged out successfully', 'success');
}

// Utility Functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showLoading(show) {
    if (show) {
        elements.loadingOverlay.classList.add('active');
    } else {
        elements.loadingOverlay.classList.remove('active');
    }
}

function showToast(message, type = 'info') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 3000);
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    showToast('An error occurred. Please try again.', 'error');
});

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
        console.log('Service worker registration failed');
    });
}

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
    // Implement analytics tracking here
    console.log('Event tracked:', category, action, label);
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state, sendMessage, showToast };
}
