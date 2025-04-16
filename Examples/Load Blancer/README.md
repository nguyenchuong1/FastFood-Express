# Load Balancer with Node.js and React

This project implements a simple load balancer using Node.js and React. The load balancer distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. It also monitors the health of these servers and logs all relevant activities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Endpoints](#endpoints)
- [CORS Setup](#cors-setup)
- [Running the Application](#running-the-application)
- [Logging](#logging)
- [React Frontend](#react-frontend)
- [Troubleshooting](#troubleshooting)
- [Video Overview](#video-overview)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/manishchandrakar/load-balancer.git
cd load-balancer
```

2. Install dependencies for the Node.js load balancer:

```bash
npm install
```

3. Install dependencies for the React frontend:

```bash
cd client
npm install
cd ..
```

## Usage

1. Start the load balancer server:

```bash
node server.js
```

2. Start the backend servers:

```bash
node servers/server1.js
node servers/server2.js
node servers/server3.js
node servers/server4.js
```

3. Start the React frontend:

```bash
cd client
npm start
```

## Folder Structure

```
load-balancer/
├── client/          # React frontend
│   ├── public/
│   └── src/
│       ├── App.js
│       └── ...      # Other React components and files
├── servers/         # Backend servers
│   ├── server1.js
│   ├── server2.js
│   ├── server3.js
│   └── server4.js
├── server.js        # Load balancer server
├── load-balancer.log # Log file
├── package.json
└── README.md
```

## Endpoints

- **GET /logs**: Returns the content of the log file.

## CORS Setup

The load balancer server uses the `cors` middleware to allow requests from the React frontend. This is necessary to avoid CORS (Cross-Origin Resource Sharing) issues.

In `server.js`, ensure CORS is properly set up:

```javascript
const cors = require('cors');
app.use(cors());
```

## Running the Application

1. Run the load balancer server:

```bash
node server.js
```

2. Run the backend servers:

```bash
node servers/server1.js
node servers/server2.js
node servers/server3.js
node servers/server4.js
```

3. Run the React frontend:

```bash
cd client
npm start
```

Open your browser and navigate to `http://localhost:3000` to view the logs.

## Logging

The load balancer logs all incoming requests, server health checks, and other activities to a file named `load-balancer.log`. You can view these logs by navigating to the `/logs` endpoint or by checking the file directly.

## React Frontend

The React frontend fetches and displays the logs from the load balancer. Ensure the frontend is configured to fetch from the correct endpoint:

In `src/App.js`:

```javascript
useEffect(() => {
    const fetchLogs = async () => {
        try {
            const response = await fetch('http://localhost:3000/logs');
            const data = await response.text();
            setLogs(data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    fetchLogs();
}, []);
```

## Troubleshooting

- **404 Not Found**: Ensure the load balancer server is running and the `/logs` endpoint is correctly set up.
- **CORS Issues**: Verify that the `cors` middleware is used in `server.js`.
- **Logs Not Displaying**: Check that the `load-balancer.log` file exists and is being written to.

## Video Overview

For a visual overview of the project, watch the following video:

[Project Overview Video](https://www.loom.com/share/04ff9d41603c4bbbb358453b126e9590?sid=c9acc703-22bd-404b-ab94-151bbdc6a30d)
