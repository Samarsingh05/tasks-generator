# Tasks Generator

A modern, responsive web application that transforms project ideas into actionable user stories and engineering tasks.

## 🚀 Features

- **Modern Dark Theme**: Beautiful UI with glass morphism effects
- **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- **Smart Task Generation**: Creates comprehensive user stories and engineering tasks
- **History Tracking**: View and manage previous generations
- **Real-time Validation**: Form validation with helpful error messages
- **Smooth Animations**: Built with Framer Motion for delightful UX

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with hooks
- **Vite 7.3.1** - Fast development and building
- **TailwindCSS 3.4.19** - Utility-first CSS framework
- **Framer Motion** - Production-ready animations
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **File-based Storage** - Simple JSON data persistence
- **CORS Enabled** - Cross-origin requests supported

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tasks-generator
```

### 2. Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 3. Start the Application

**Start Server (Terminal 1):**
```bash
cd server
npm start
# Server runs on http://localhost:5001
```

**Start Client (Terminal 2):**
```bash
cd client
npm run dev
# Client runs on http://localhost:5173
```

### 4. Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
tasks-generator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/
│   ├── utils/
│   ├── data/
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=5001
```

### API Endpoints

- `POST /api/specs/generate` - Generate new tasks
- `GET /api/specs/history` - Get recent generations

## 🎨 Features in Detail

### Task Generation
- **User Stories**: Context-aware stories based on project type
- **Engineering Tasks**: Comprehensive task lists for development
- **Template Support**: Web, Mobile, and Internal tools
- **Risk & Constraints**: Optional parameters for enhanced planning

### User Interface
- **Dark Theme**: Modern gray-950 background with blue accents
- **Responsive Design**: Mobile-first approach with breakpoints
- **Animations**: Smooth transitions and micro-interactions
- **Glass Morphism**: Beautiful backdrop blur effects

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Deploy with your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS
- Framer Motion for the smooth animations
- Lucide for the beautiful icon set