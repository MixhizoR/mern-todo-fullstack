# MERN Todo Application (Full-Stack, Dockerized)

This repository contains the complete code and infrastructure configuration for a full-stack MERN (MongoDB, Express.js, React, Node.js) Todo application, designed to be easily run using Docker Compose.

**Features:**
* Add new todo items.
* View existing todo items.
* Mark todo items as completed.
* Delete todo items.
* Simple and responsive user interface.

**Technologies Used:**
* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Containerization:** Docker
* **Orchestration:** Docker Compose

**Prerequisites:**

Make sure you have the following installed on your machine:

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/) (Usually comes bundled with Docker Desktop)

**Getting Started:**

Follow these steps to get the application up and running on your local machine using Docker Compose:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MixhizoR/mern-todo-fullstack.git](https://github.com/MixhizoR/mern-todo-fullstack.git)
    ```
2.  **Navigate into the project directory:**
    ```bash
    cd mern-todo-fullstack
    ```
3.  **Create and configure your .env file:**
    Create a file named `.env` in the root directory of the project (`./mern-todo-fullstack`). This file will contain environment variables needed by your services, particularly the backend for database connection.

    ```env
    # .env example for the MERN Todo Application

    # --- MongoDB Configuration ---
    # MONGO_HOST: This must be the EXACT service name given to the MongoDB container in docker-compose.yml.
    # In this project, the MongoDB service is named 'mongodb'.
    MONGO_HOST=mongodb 
    MONGO_PORT=27017
    MONGO_DB=mern_todo_db
    MONGO_INITDB_ROOT_USERNAME=admin          # MongoDB root user (for initialization)
    MONGO_INITDB_ROOT_PASSWORD=password       # MongoDB root password (for initialization)

    # Your backend's connection string will be constructed using these variables,
    # e.g., mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin

    # --- Backend Configuration ---
    # BACKEND_PORT=5000 # Or whatever port your backend Express app listens on internally

    # --- Frontend Configuration ---
    # REACT_APP_BACKEND_URL=http://localhost:5000 # URL frontend uses to call backend (adjust port if needed)
    # Note: When running via Docker Compose, frontend will call the backend via the exposed port on localhost.
    ```
    **Explanation for `MONGO_HOST=mongodb`:** Within the Docker network created by Docker Compose, services communicate using the **service names** defined in `docker-compose.yml` as hostnames. Since the MongoDB service in `docker-compose.yml` is named `mongodb`, your backend container must use `mongodb` as the hostname to connect to it via the internal Docker network, regardless of whether you set this directly or via a `MONGO_HOST` environment variable. Using `localhost` or `127.0.0.1` from *inside* the backend container would refer to the backend container itself, not the database container.

4.  **Build and run the Docker containers:**
    This command will build the Docker images for your frontend and backend (if they haven't been built or if Dockerfile's changed) and start all services defined in `docker-compose.yml` in detached mode (in the background).
    ```bash
    docker-compose up --build -d
    ```
    *(Optional: Remove `--build` on subsequent runs if you haven't changed the Dockerfiles or dependencies).*

5.  **Access the application:**
    Wait a moment for all services (especially the database) to start up. You can check the logs with `docker-compose logs`. Once running, access the frontend application in your web browser:
    ```
    http://localhost:3000 
    ```
    (Assuming your `docker-compose.yml` maps frontend container's internal port 3000 to host port 3000). The backend API will be accessible to the frontend via the port mapping configured in `docker-compose.yml` (e.g., host port 5000 mapped to backend container's internal port).

**Stopping the application:**

To stop and remove the running containers, networks, and volumes created by `docker-compose up`:

```bash
docker-compose down
Project Structure:

todo-mern/
├── backend/          # Node.js/Express backend source code
│   ├── Dockerfile    # Instructions to build backend image
│   ├── package.json  # Backend dependencies
│   └── ... (Your backend files, e.g., server.js, routes/, models/)
├── frontend/         # React application source code
│   ├── Dockerfile    # Instructions to build frontend image
│   ├── package.json  # Frontend dependencies
│   └── ... (Your React files, e.g., public/, src/components/)
├── docker-compose.yml  # Defines the services (backend, frontend, db) and their configuration for Docker Compose
└── .env              # Environment variables (e.g., database credentials, hostnames)
Scripts / Useful Docker Compose Commands:

docker-compose build: Builds or re-builds service images.
docker-compose up: Builds (if needed) and starts the containers, attaching to logs.
docker-compose up -d: Builds and starts containers in detached mode (background).
docker-compose down: Stops and removes containers, networks, and volumes.
docker-compose logs [service_name]: View logs for a specific service (e.g., docker-compose logs backend).
docker-compose exec [service_name] [command]: Execute a command inside a running service container (e.g., docker-compose exec backend bash to get a shell).
docker-compose restart [service_name]: Restart a specific service.

License:
[MIT License]
