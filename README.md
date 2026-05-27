# Task Manager

A task management application inspired by popular productivity tools like Jira, Trello, and Asana. This project provides a RESTful API for managing tasks with features for creating, reading, updating, and deleting tasks.

## 🌟 Features

- ✅ **Create Tasks** - Add new tasks to your task list
- ✅ **Read Tasks** - Retrieve all tasks or get a specific task by ID
- ✅ **Update Tasks** - Modify existing tasks
- ✅ **Delete Tasks** - Remove tasks from the system
- ✅ **Logging** - Comprehensive logging with Winston
- ✅ **Error Handling** - Structured error responses
- ✅ **Docker Support** - Containerized deployment ready
- ✅ **Code Quality** - ESLint and Prettier integration
- ✅ **Git Hooks** - Husky and lint-staged for pre-commit checks

## 🛠️ Tech Stack

- **Runtime**: Node.js (v25)
- **Framework**: Express.js
- **Logging**: Winston
- **Environment**: dotenv
- **Development Tools**:
  - ESLint - Code linting
  - Prettier - Code formatting
  - Nodemon - Auto-reload on file changes
  - Husky - Git hooks
  - Lint-staged - Pre-commit linting

## 🚀 Installation

### Prerequisites
- Node.js v25 or higher
- npm (comes with Node.js)
- Docker (optional, for containerized deployment)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranavghodake3/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   ```

## 📝 Running the Project

### Development Mode
Run the application with auto-reload on file changes:
```bash
npm run dev
```

### Production Mode
Start the application:
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## 🐳 Docker Support

### Build Docker Image
```bash
docker build -t task-manager .
```

### Run with Docker
```bash
docker run -p 5000:5000 task-manager
```

### Run with Docker Compose
```bash
docker-compose up --build
```

### Run Migrations
```bash
docker compose exec backend npm run migrate
```
### Run Seeders
```bash
docker compose exec backend npm run seed
```

## 📡 API Endpoints

All endpoints are prefixed with `/api/tasks`

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/` | Get all tasks |
| **GET** | `/:id` | Get a specific task by ID |
| **POST** | `/` | Create a new task |
| **PUT** | `/` | Update a task |
| **DELETE** | `/:id` | Delete a task by ID |

### Example Requests

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

**Get task by ID:**
```bash
curl http://localhost:5000/api/tasks/0
```

**Create a new task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete project", "status": "pending"}'
```

**Update a task:**
```bash
curl -X PUT http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete project", "status": "completed"}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/0
```

## 🧹 Code Quality

### Linting
Lint your code:
```bash
npm run lint
```

Fix linting issues:
```bash
npm run lint:fix
```

### Formatting
Format code with Prettier:
```bash
npm run format
```

### Pre-commit Hooks
The project uses Husky and lint-staged to automatically lint and format staged files before commit.

## 📊 Logging

The application uses Winston logger for comprehensive logging. Logs are configured in `config/logger.js` and stored in the `logs/` directory.

## 🔄 Response Format

All API responses follow a standard format using the response helper:

**Success Response:**
```json
{
  "status": true,
  "statusCode": 200,
  "message": "Success",
  "data": { /* task data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Bad Request",
  "statusCode": 400,
  "error": {
    "message": "Detailed error message",
    "data": { /* optional error data */ }
  }
}
```

Note: the `error` object is included in responses only when `NODE_ENV` is not `production` (the helper logs full error details in non-production).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes linting and formatting checks before submitting a PR.

## 📄 License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.

## 👤 Author

**Pranav Ghodake**
- GitHub: [@pranavghodake3](https://github.com/pranavghodake3)
- Project Repository: [task-manager](https://github.com/pranavghodake3/task-manager)

## 📞 Support

For issues and feature requests, please visit the [GitHub Issues](https://github.com/pranavghodake3/task-manager/issues) page.

---

**Made with ❤️ by Pranav Ghodake**
