# Rythu Mitra - AI-Powered Personal Farming Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

**An intelligent farming assistant web application designed specifically for Telugu farmers**

*Providing personalized crop advice, pest detection, and weather-based recommendations in their local language*

---

## 🌟 Overview

**Rythu Mitra** (రైతు మిత్ర - "Farmer's Friend") is a comprehensive web-based farming assistant that leverages artificial intelligence to help Telugu farmers make informed decisions about their crops.

### Key Features

- 🤖 **AI-Powered Chat Assistant** - Get farming advice in Telugu/English powered by Google Gemini AI
- 🎤 **Voice Input** - Ask questions using your voice in Telugu or English
- 📸 **Pest Detection** - Upload crop images for AI-powered pest/disease identification
- 🌦️ **Real-Time Weather** - Live weather data for your farming location
- 📊 **Crop Analytics** - Track crop health trends with interactive charts
- 🌾 **70+ Crops Supported** - Comprehensive crop database across 7 categories
- 📱 **Mobile-Responsive** - Optimized for smartphones used by rural farmers
- 🔄 **Bilingual Support** - Full Telugu and English language support

---

## 🚀 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local server)
- Gemini API key (free from Google)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/rythu-mitra.git
cd rythu-mitra
```

2. **Get Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in and create a free API key
   - Copy the generated key

3. **Configure API Key**
   - Open `app.js`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key on line 2

4. **Start Local Server**
```bash
python -m http.server 8080
```

5. **Open Application**
   - Navigate to `http://localhost:8080` in your browser

---

## 📖 Usage

### For Farmers

1. **Login/Signup** - Create account with email and password
2. **Setup Profile** - Enter your name, location, crop type, and language preference
3. **Ask Questions** - Use text or voice to ask farming queries
4. **Upload Images** - Take photos of pests/diseases for instant analysis
5. **View Dashboard** - Check weather, crop health, soil moisture, and recommendations

### Sample Questions to Try

- "What fertilizer should I use for rice cultivation?"
- "How do I control pests in my tomato plants?"
- "When is the best time to irrigate my crops?"
- "What are the signs of nitrogen deficiency?"

---

## 📁 Project Structure

```
rythu-mitra/
├── index.html          # Main HTML structure (12.6 KB)
├── styles.css          # Complete styling (15.2 KB)
├── app.js             # Application logic (20 KB)
├── README.md          # This file
├── DOCUMENTATION.md   # Detailed technical documentation
├── LICENSE           # MIT License
└── .gitignore        # Git ignore rules
```

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI**: Google Gemini Pro API
- **Weather**: OpenWeatherMap API (optional)
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Voice**: Web Speech API

---

## 🌾 Supported Crops

### 70+ Crops in 7 Categories

- **Cereals**: Rice, Wheat, Maize, Sorghum, Pearl Millet, Finger Millet, Barley
- **Pulses**: Red Gram, Green Gram, Black Gram, Bengal Gram, Lentil, Horse Gram
- **Cash Crops**: Cotton, Sugarcane, Tobacco, Groundnut, Sunflower, Soybean, Castor, Safflower
- **Spices**: Turmeric, Chili, Coriander, Cumin, Fenugreek, Garlic, Ginger
- **Vegetables**: Tomato, Brinjal, Okra, Onion, Potato, Cabbage, Cauliflower, and more
- **Fruits**: Mango, Banana, Papaya, Guava, Pomegranate, Grapes, Citrus, Watermelon
- **Others**: Coconut, Arecanut, Oil Palm, Mulberry, Fodder Crops

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [DOCUMENTATION.md](DOCUMENTATION.md) for detailed technical documentation.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Telugu farmers for inspiration and feedback
- Google Gemini AI for powerful language models
- Chart.js for data visualization
- Font Awesome for icon library
- Open-source community for tools and support

---

## 📞 Support

- 📧 Email: support@rythumitra.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/rythu-mitra/issues)
- 📖 Docs: [Full Documentation](DOCUMENTATION.md)

---

## 🗺️ Roadmap

- [ ] Mobile app (Android/iOS)
- [ ] Offline PWA mode
- [ ] Community forum
- [ ] Marketplace integration
- [ ] Multi-language support (10+ languages)
- [ ] IoT sensor integration
- [ ] Satellite imagery analysis

---

<div align="center">

**Made with ❤️ for Telugu Farmers**

**రైతుల కోసం ప్రేమతో రూపొందించబడింది**

⭐ Star this repo if you find it helpful!

</div>
