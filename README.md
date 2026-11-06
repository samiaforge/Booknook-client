# 📚 BookNook – Library Management System

BookNook is a modern, full-stack library management web application where users can explore books, borrow books, manage their borrowing history, and manage their profiles.

The application provides a responsive interface with a premium dark-themed design and authentication features.

## 🌐 Live Links

- **Live Website (Client):** https://booknook-client-bay.vercel.app
- **Backend Server:** https://booknook-server-tawny.vercel.app
- **Client GitHub Repository:** https://github.com/samiaforge/Booknook-client
- **Server GitHub Repository:** https://github.com/samiaforge/Booknook-server

## ✨ Features

- User registration and login with email and password.
- Google authentication.
- Browse and explore available books.
- View detailed information about individual books.
- Add new books to the library.
- Borrow books through a borrowing system.
- Prevent duplicate borrowing of the same book.
- View personal borrowing history.
- Manage user profile information.
- Protected routes for authenticated users.
- Responsive design for mobile, tablet, and desktop.
- Premium dark-themed user interface.

## 🛠️ Technologies Used

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- Swiper.js
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB

### Authentication & Deployment
- Better Auth
- JWT
- Google Authentication
- Vercel

## 📂 Project Structure

```text
BookNook/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── package.json
│
└── server/
    ├── routes/
    ├── controllers/
    ├── middleware/
    └── package.json
```

*The structure above represents the logical separation of the frontend and backend. Actual folder organization may vary.*

## ⚙️ Installation & Setup

### 1. Clone the Client Repository

```bash
git clone https://github.com/samiaforge/Booknook-client.git

cd Booknook-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file and configure the required environment variables for authentication and backend API communication.

### 4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Backend Setup

The backend is built with Node.js, Express.js, and MongoDB.

Configure the required environment variables, install dependencies, and start the server using the project's configured start script.

## 🔐 Authentication

BookNook uses Better Auth for user authentication and supports:

- Email and password authentication.
- Google social login.
- Protected routes.
- JWT-based API authorization.

## 📱 Responsive Design

The application is designed to provide a consistent user experience across:

- Desktop
- Tablet
- Mobile devices

## 👩‍💻 Developer

**Meheli Akther Samia**

- GitHub: https://github.com/samiaforge

---

⭐ If you find this project interesting, feel free to explore the repository!

**BookNook – Discover, Explore & Borrow Your Favorite Books.**
