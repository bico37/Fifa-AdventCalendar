# Advent Calendar

This is an Advent Calendar created with **PHP**. To run the application locally, you need **Docker** since the PHP server is running inside a Docker container.

## Prerequisites

Before you can run the project, make sure you have the following programs installed:

- **Docker**: You can download and install Docker from the official website: [Install Docker](https://www.docker.com/get-started)

## Setup and Run

Follow these steps to get the application running locally:

### 1. Build the Docker Container

To run the PHP server inside a Docker container, navigate to the project directory and build the Docker container with the following command:

```bash
docker build -t advent-calendar .
```

This command will create a Docker image named `advent-calendar`.

### 2. Start the Container

Once the image is built, you can start the container with the following command:

```bash
docker run -p 8080:80 advent-calendar
```

This command starts the container and maps the internal PHP server (which runs on port 80) to your local port 8080. You can then access the application via [http://localhost:8080](http://localhost:8080) in your browser.

### 3. Access the Application

Open your browser and navigate to [http://localhost:8080](http://localhost:8080) to view the Advent Calendar.

## Additional Notes

- The Advent Calendar displays a new door each day with content. The contents are dynamically loaded using PHP.
- Ensure that Docker is properly installed and running before attempting to start the container.

### Key Points:

- The setup guide and instructions are clearly formatted in Markdown.
- The command line instructions for building the Docker image, starting the container, and accessing the application are provided.
