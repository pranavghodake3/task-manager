# Task Management API

A comprehensive Node.js API for managing Tasks.

## 🚀 Features

- **Comprehensive Testing**: Unit and integration tests with Jest
- **API Documentation**: Interactive Swagger documentation
- **Security**: Built-in security headers and CORS protection
- **Docker Support**: Complete containerization with development and production builds

## 📋 Prerequisites

- Node.js (v14 or higher) **OR** Docker & Docker Compose
- npm or yarn
- OpenAI API key (optional, falls back to mock data)

## 🛠 Installation & Setup

### Option 1: Local Development (Node.js)

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranavghodake3/llm-subscriptions.git
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file and add your OpenAI API key:
   ```env
   PORT=3000
   NODE_ENV=development
   SECRET_KEY="testsecretkey"
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

### Option 2: Docker (Recommended)

#### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranavghodake3/task-manager
   cd task-manager
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   NODE_ENV=development
   SECRET_KEY="testsecretkey"
   ```

3. **Run with Docker Compose**

   **Production:**
   ```bash
   # Build and start production container
   docker-compose up -d
   
   # View logs
   docker-compose logs -f task-manager
   
   # Stop container
   docker-compose down
   ```

   **Development (with hot reload):**
   ```bash
   # Build and start development container
   docker-compose --profile dev up -d
   
   # View logs
   docker-compose logs -f task-manager-dev
   
   # Stop container
   docker-compose down
   ```

#### Manual Docker Commands

```bash
# Build production image
docker build -t donation-subscription-api .

# Build development image
docker build -f Dockerfile.dev -t donation-subscription-api:dev .

# Run production container
docker run -d \
  --name donation-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e OPENAI_API_KEY=your_api_key_here \
  donation-subscription-api

# Run development container with hot reload
docker run -d \
  --name donation-api-dev \
  -p 3001:3000 \
  -e NODE_ENV=development \
  -e OPENAI_API_KEY=your_api_key_here \
  -v $(pwd):/app \
  -v /app/node_modules \
  donation-subscription-api:dev
```

## 📚 API Documentation

Once the server is running, visit:
- **Local**: `http://localhost:3000/api-docs`
- **Docker Production**: `http://localhost:3000/api-docs`
- **Docker Development**: `http://localhost:3001/api-docs`

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/subscriptions` | Create a new subscription |
| `GET` | `/api/subscriptions` | Get all subscriptions |
| `DELETE` | `/api/subscriptions/:donorId` | Delete a subscription |
| `GET` | `/api/subscriptions/transactions` | Get all transactions |
| `GET` | `/health` | Health check |

## 🔧 Usage Examples

### Create a Subscription

```bash
curl -X POST http://localhost:3000/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "donorId": "abc123",
    "amount": 1500,
    "currency": "USD",
    "interval": "monthly",
    "campaignDescription": "Emergency food and clean water for earthquake victims in Nepal"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription created successfully",
  "data": {
    "id": "uuid-generated-id",
    "donorId": "abc123",
    "amount": 1500,
    "currency": "USD",
    "interval": "monthly",
    "campaignDescription": "Emergency food and clean water for earthquake victims in Nepal",
    "summary": "AI-generated summary of the campaign",
    "tags": ["emergency", "relief", "earthquake", "nepal"],
    "createdAt": "2023-12-01T10:00:00.000Z",
    "isActive": true,
    "nextTransactionDate": "2023-12-01T10:00:00.000Z"
  }
}
```

### Get All Subscriptions

```bash
curl http://localhost:3000/api/subscriptions
```

### Delete a Subscription

```bash
curl -X DELETE http://localhost:3000/api/subscriptions/abc123
```

### Get All Transactions

```bash
curl http://localhost:3000/api/subscriptions/transactions
```

## 🧪 Testing

### Local Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Docker Testing

```bash
# Run tests in Docker container
docker run --rm -it \
  -v $(pwd):/app \
  -w /app \
  node:18-alpine \
  sh -c "npm install && npm test"
```

### Test Structure
- **Unit Tests**: `tests/unit/` - Test individual functions and services
- **Integration Tests**: `tests/integration/` - Test API endpoints and workflows

## 🏗 Project Structure

```
donation-subscription-api/
├── src/
│   ├── app.js                 # Main application file
│   ├── config/
│   │   └── database.js        # In-memory database
│   ├── controllers/
│   │   └── subscriptionController.js  # Request handlers
│   ├── middleware/
│   │   └── errorHandler.js    # Error handling middleware
│   ├── routes/
│   │   └── subscriptionRoutes.js      # API routes with Swagger docs
│   └── services/
│       ├── llmService.js      # LLM integration service
│       └── subscriptionService.js     # Business logic
├── tests/
│   ├── integration/
│   │   └── subscription.test.js       # API integration tests
│   └── unit/
│       ├── database.test.js           # Database unit tests
│       ├── llmService.test.js         # LLM service tests
│       └── subscriptionService.test.js # Service unit tests
├── Dockerfile                 # Production Docker image
├── Dockerfile.dev             # Development Docker image
├── docker-compose.yml         # Docker Compose configuration
├── .dockerignore              # Docker build exclusions
├── healthcheck.js             # Docker health check script
├── package.json
├── README.md
└── .env
```

## 🔄 Subscription Intervals

The API supports the following recurring intervals:

- **daily**: 24 hours
- **weekly**: 7 days
- **monthly**: 30 days
- **yearly**: 365 days

## 🤖 LLM Integration

The API uses OpenAI's GPT models to analyze campaign descriptions and generate:

1. **Tags**: Relevant keywords for categorization
2. **Summary**: Concise description of the campaign

### LLM Configuration

- **Model**: Configurable via `LLM_MODEL` environment variable (default: `gpt-3.5-turbo`)
- **Max Tokens**: Configurable via `LLM_MAX_TOKENS` environment variable (default: 150)
- **Fallback**: If LLM service fails, the API uses mock data to ensure functionality

### Example LLM Analysis

**Input:**
```
"Emergency food and clean water for earthquake victims in Nepal"
```

**Output:**
```json
{
  "summary": "Humanitarian aid campaign providing essential food and clean water supplies to earthquake-affected communities in Nepal",
  "tags": ["emergency", "relief", "earthquake", "nepal", "humanitarian", "food", "water"]
}
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Secure error responses
- **Docker Security**: Non-root user execution

## 🐳 Docker Features

### Production vs Development

| Feature | Development | Production |
|---------|-------------|------------|
| Base Image | Node.js 18 Alpine | Node.js 18 Alpine |
| Dependencies | All (including dev) | Production only |
| Hot Reload | ✅ Yes | ❌ No |
| Volume Mounting | ✅ Yes | ❌ No |
| Health Checks | ❌ No | ✅ Yes |
| Port | 3001 | 3000 |

### Docker Commands Quick Reference

```bash
# Start production
docker-compose up -d

# Start development
docker-compose --profile dev up -d

# View logs
docker-compose logs -f donation-api

# Stop all containers
docker-compose down

# Rebuild images
docker-compose build --no-cache

# Check container status
docker ps
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
OPENAI_API_KEY=your_production_openai_api_key
LLM_MODEL=gpt-3.5-turbo
LLM_MAX_TOKENS=150
```

### Docker Deployment

```bash
# Production deployment
docker-compose up -d

# Scale if needed
docker-compose up -d --scale donation-api=3

# Monitor deployment
docker-compose logs -f donation-api
```

### Cloud Deployment

The application can be deployed to any cloud platform that supports Docker:

- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Heroku Container Registry**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api-docs`
- Review the test files for usage examples
- Check Docker documentation in `DOCKER.md`

## 🔄 Changelog

### v1.0.0
- Initial release
- Subscription management with recurring transactions
- LLM integration for campaign analysis
- Comprehensive test suite
- Swagger API documentation
- In-memory database implementation
- Complete Docker support
- Production-ready containerization 