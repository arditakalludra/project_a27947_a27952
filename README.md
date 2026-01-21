# Blog Application

A modern, full-featured blog platform built with React and Vite, featuring both a public front office and an admin back office for content management.

## Features

### Front Office (Public)
- **Browse Posts** - View all published blog posts with pagination
- **Search** - Real-time search across post titles and content
- **Comments** - Read and submit comments on posts (with moderation)
- **Likes** - Like posts with visual feedback
- **Responsive Design** - Mobile-friendly interface using Bootstrap

### Back Office (Admin)
- **Secure Login** - Password-protected admin panel
- **Post Management** - Create, edit, and delete blog posts
- **Comment Moderation** - Approve or reject user comments
- **Dashboard** - Centralized content management

## Tech Stack

- **Frontend**: React 19.2
- **Build Tool**: Vite 7.2
- **Routing**: React Router DOM 6.30
- **HTTP Client**: Axios 1.13
- **UI Framework**: Bootstrap 5.3
- **Icons**: React Icons 5.5
- **Backend**: Sheety API (Google Sheets-based REST API)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd work_a27952_a27947
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

## Project Structure

```
src/
├── components/
│   ├── backOffice/       # Admin panel components
│   │   ├── CommentModeration.jsx
│   │   ├── Login.jsx
│   │   └── PostForm.jsx
│   ├── frontOffice/      # Public-facing components
│   │   ├── CommentForm.jsx
│   │   ├── CommentSection.jsx
│   │   ├── LikeButton.jsx
│   │   ├── Pagination.jsx
│   │   ├── PostCard.jsx
│   │   ├── PostDetail.jsx
│   │   └── SearchBar.jsx
│   └── layout/           # Layout components
│       ├── Layout.jsx
│       └── Navbar.jsx
├── context/
│   └── AuthContext.jsx   # Authentication state management
├── pages/
│   ├── BackofficePage.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── PostPage.jsx
├── services/
│   └── api.js           # API service layer
├── App.jsx              # Main app component with routing
└── index.jsx            # App entry point
```

## Admin Access

To access the admin panel:

1. Navigate to `/login`
2. Use the following credentials:
   - **Username**: `admin`
   - **Password**: `blog2026`

## API Configuration

The application uses Sheety API as a backend. The API base URL is configured in [src/services/api.js](src/services/api.js):

```javascript
const BASE_URL = 'https://api.sheety.co/a9a3922f064f47011cd1091c07d29c94/blog';
```

### API Endpoints

- `GET /posts` - Fetch all posts
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post
- `GET /comments` - Fetch all comments
- `POST /comments` - Create a new comment
- `PUT /comments/:id` - Update a comment (for moderation)

## Key Features Implementation

### Authentication
- Uses React Context API for state management
- Persists login state in localStorage
- Protected routes redirect to login page

### Comment System
- Users can submit comments on posts
- Comments require admin approval before appearing
- Moderation panel in admin area

### Search & Filtering
- Real-time search across post titles and content
- Automatic pagination reset on search

### Pagination
- 6 posts per page
- Dynamic page navigation
- Responsive controls

## License

This project is private and proprietary.

## Author

Mariia Yakovenko aluno 27947
Ardita Kalludra aluno 27952

---

Built with React and Vite
