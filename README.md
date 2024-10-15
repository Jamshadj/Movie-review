cat <<EOL > README.md
# Movie Review Application

![Movie Review]

DOCKER FRONTEND: https://hub.docker.com/r/jamshadalij2004/movie-review-frontend
DOCKER BACKEND: https://hub.docker.com/r/jamshadalij2004/movie-review-backend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Movie Review Application allows users to search for movies, read reviews, and submit their own reviews. This application is built with a modern technology stack, providing a seamless user experience and robust functionality.

## Features

- Search for movies by title
- View movie details and reviews
- Submit your own reviews
- User authentication
- Responsive design

## Technologies Used

- **Frontend:** React.js, Redux, Material-UI
- **Backend:** Spring Boot, Java
- **Database:** MySQL
- **Containerization:** Docker
- **Version Control:** Git

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Java JDK](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/Jamshadj/Movie-review.git
   cd Movie-review
   \`\`\`

2. Navigate to the backend directory and build the application:
   \`\`\`bash
   cd backend
   mvn clean package
   \`\`\`

3. Navigate to the frontend directory and install dependencies:
   \`\`\`bash
   cd ../movie-review-frontend
   npm install
   \`\`\`

## Usage

To start the application, navigate to the root of the project and run the following command to start the services using Docker Compose:

\`\`\`bash
docker-compose up --build
\`\`\`

After the containers are up and running, you can access the application at:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:8080](http://localhost:8080)

## API Endpoints

### Movies

- **GET** \`/api/v1/movies\`: Retrieve a list of movies.
- **GET** \`/api/v1/movies/{id}\`: Retrieve details of a specific movie.
- **POST** \`/api/v1/movies\`: Submit a new movie review.

### Users

- **POST** \`/api/v1/users/signup\`: Register a new user.
- **POST** \`/api/v1/users/login\`: Authenticate an existing user.

## Docker Setup

This project comes with a \`docker-compose.yml\` file to simplify running the application with Docker. The configuration includes the frontend, backend, and a MySQL database.

To run the application with Docker, ensure you have Docker and Docker Compose installed, then use:

\`\`\`bash
docker-compose up --build
\`\`\`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

1. Fork the repository.
2. Create your feature branch: \`git checkout -b feature/YourFeature\`.
3. Commit your changes: \`git commit -m 'Add some feature'\`.
4. Push to the branch: \`git push origin feature/YourFeature\`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

EOL
