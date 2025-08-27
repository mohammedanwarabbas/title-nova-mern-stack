# 🚀 Title Nova - AI-Powered Headline Generator

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-19.1.1-%2361DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-%233178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-%23339933?logo=node.js)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8.2-%23764ABC?logo=redux)
![MUI](https://img.shields.io/badge/Material_UI-7.3.1-%23007FFF?logo=mui)
![Vite](https://img.shields.io/badge/Vite-7.1.2-%23646CFF?logo=vite)
![SASS](https://img.shields.io/badge/SASS-1.91.0-%23CC6699?logo=sass)

A modern, responsive web application that generates captivating title using AI technology for long story. Built with cutting-edge web technologies for optimal performance and user experience.

## ✨ Features

- 🤖 **AI-Powered Headlines**: Generates creative titles using NLP Cloud API
- ⚡ **Lightning Fast**: Built with Vite for rapid development and hot reloading
- 🎨 **Beautiful UI**: Material-UI with custom themes and animations
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🔄 **Multi-Key Support**: Automatic API key rotation for reliability
- ⏰ **Rate Limit Handling**: Smart retry mechanism with multiple keys
- 📋 **Sample Stories**: Pre-loaded content for quick testing
- 🎭 **Smooth Animations**: Framer Motion for engaging interactions

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Material-UI** with custom theme
- **Framer Motion** for animations
- **Vite** for build tooling
- **Axios** for API calls
- **React Router** for navigation

### Backend
- **Node.js** with Express.js
- **CORS** enabled for cross-origin requests
- **NLP Cloud API** integration
- **Environment variables** with dotenv

## 📦 Project Structure
title-nova/
├── title-frontend/ # React frontend application
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── redux/ # State management
│ │ ├── assets/ # Styles and themes
│ │ └── App.tsx # Main application
│ ├── package.json
│ └── vite.config.ts
├── title-backend/ # Node.js backend API
│ ├── src/
│ │ ├── api/ # API routes
│ │ └── server.js # Express server
│ ├── package.json
│ └── .env
├── .gitignore
└── README.md


## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- NLP Cloud API account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammedanwarabbas/title-nova-mern-stack title-nova
   cd title-nova/
   ```

2. **Setup Backend**
```bash
cd title-backend
npm install
cp .env.example .env
# Add your NLP Cloud API keys to .env
npm start
```
2.1 **add .env file to backend**
```bash
PORT=5000
NLP_CLOUD_KEY_1=YourApiKey
```

3. **Setup Frontend**
```bash
cd ../title-frontend
npm install
npm run dev
```

### Access the application
Frontend: http://localhost:3000
Backend: http://localhost:5000



