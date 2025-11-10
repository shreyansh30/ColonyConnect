# 🏘️ ColonyConnect

> **A modern civic issue reporting platform that empowers citizens to report and track community problems efficiently.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://shreyansh30.github.io/ColonyConnect)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## 🌐 Live Demo

**[View Live Demo →](https://shreyansh30.github.io/ColonyConnect)**

---

## ✨ Features

### 🎯 Core Functionality

#### 📝 **Issue Reporting**
- Report civic issues with detailed descriptions
- Categorize issues (Road, Water, Electricity, Garbage, Other)
- Upload images to document problems
- Geolocation integration for precise location tagging
- User authentication required for accountability

#### 🗺️ **Real-Time Location Detection**
- Automatic city detection using geolocation
- GPS coordinates capture for reported issues
- Location caching to prevent repeated prompts
- OpenStreetMap reverse geocoding integration

#### 📊 **Issue Tracking Dashboard**
- View all reported issues in real-time
- Filter by status (Pending, In Progress, Resolved)
- Track issue statistics and analytics
- Monitor community engagement metrics

### 🤖 **AI-Powered Features**

#### 💬 **Smart Chatbot Assistant**
- Powered by Google Gemini AI
- Provides instant civic guidance and support
- Answers FAQs about government processes
- Concise, professional responses under 80 words
- Context-aware conversational interface

#### 🧠 **Intelligent Issue Analysis**
- **Auto-Priority Detection**: AI analyzes issue severity (High, Medium, Low)
- **Smart Summarization**: Generates concise summaries for admin dashboard
- **Category Recognition**: Helps classify issues accurately

### 👨‍💼 **Admin Dashboard**
- Comprehensive issue management interface
- Update issue status with dropdown selection
- View AI-generated summaries and priorities
- Color-coded priority indicators
- Real-time status updates

### 🔐 **Authentication System**
- Secure user registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes for authenticated users
- Flip-card login/register UI design

### 🎨 **Modern UI/UX**
- Clean, responsive design with Tailwind CSS
- Smooth animations and transitions
- Mobile-friendly interface
- Interactive card components
- Gradient backgrounds and shadow effects

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Cloudinary** for image storage
- **JWT** for authentication
- **Google Gemini AI** API integration
- **CORS** enabled for cross-origin requests

---

## 📁 Project Structure

```
ColonyConnect/
├── frontend-app/          # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable components (Navbar, Chatbot)
│   │   ├── pages/         # Route pages (Home, Login, Report, Admin)
│   │   ├── api/           # Axios configuration
│   │   └── App.tsx        # Main app component
│   └── index.html
│
├── backEnd/               # Express backend
│   ├── controllers/       # Route logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Gemini AI integration
│   └── server.js          # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Google Gemini API key

### Environment Variables

Create a `.env` file in the `backEnd` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=8080
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/shreyansh30/ColonyConnect.git
cd ColonyConnect
```

2. **Install backend dependencies**
```bash
cd backEnd
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend-app
npm install
```

4. **Run the backend server**
```bash
cd backEnd
npm start
```

5. **Run the frontend development server**
```bash
cd frontend-app
npm run dev
```

6. **Access the application**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

---

## 📸 Screenshots

### Home Dashboard
View real-time statistics and recent issues in your community.

### Issue Reporting
Simple form with image upload and location detection.

### AI Chatbot
Get instant help with civic queries.

### Admin Panel
Manage all reported issues with AI-powered insights.

---

## 🔗 API Endpoints

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users` - Get all users (admin)

### Issue Routes
- `GET /api/issues` - Get all issues
- `POST /api/issues` - Create new issue (with image upload)
- `PUT /api/issues/:id/status` - Update issue status

### Chatbot Routes
- `POST /api/chatbot` - Send message to AI assistant

---

## 🌟 Key Highlights

- ✅ **Real-time Updates**: Issues appear instantly on the dashboard
- ✅ **AI Integration**: Smart chatbot and automated issue analysis
- ✅ **Image Upload**: Cloudinary integration for visual documentation
- ✅ **Geolocation**: Precise location tracking for reported issues
- ✅ **Responsive Design**: Works seamlessly on all devices
- ✅ **Secure Authentication**: Protected routes and encrypted passwords

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Shreyansh**
- GitHub: [@shreyansh30](https://github.com/shreyansh30)

---

## 🙏 Acknowledgments

- Google Gemini AI for intelligent chatbot functionality
- Cloudinary for image hosting
- OpenStreetMap for geocoding services
- MongoDB Atlas for database hosting

---

<div align="center">
  <p>Made with ❤️ for better communities</p>
  <p>
    <a href="https://shreyansh30.github.io/ColonyConnect">Live Demo</a> •
    <a href="https://github.com/shreyansh30/ColonyConnect/issues">Report Bug</a> •
    <a href="https://github.com/shreyansh30/ColonyConnect/issues">Request Feature</a>
  </p>
</div># ColonyConnect
