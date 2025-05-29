May the 28th - 2025

# FinSim - Fintech Support Engineer Challenge

Welcome to the FinSim technical challenge! This environment simulates a simplified financial application to evaluate your skills in debugging, problem-solving, critical thinking, and communication in a full-stack context.

## Objective

You are a Support Engineer tasked with investigating and resolving issues reported by users of FinSim. You will be provided with 1-3 support tickets describing problems within the application.

Your goal within the **2-hour time limit** is to:

1.  **Diagnose:** Identify the root cause(s) of the issues described in your assigned tickets. Use logs, browser developer tools, database inspection (credentials below), Firebase Emulator UI, and code analysis (if applicable/possible in the scenario) to investigate.
2.  **Propose/Implement Fixes:**
    - For **at least one** complex ticket: Describe the exact code changes (provide snippets or diffs) needed in the relevant service(s) (Frontend, Backend) to fix the issue.
    - For other tickets: If time is limited, a clear, detailed description of the root cause and the proposed fix is acceptable.
3.  **Identify Improvements:** Based on your analysis, suggest **at least one** proactive improvement to the codebase or architecture to enhance stability, performance, or maintainability. Explain the potential problem it addresses and the benefits.
4.  **Communicate:** Draft brief, clear, and empathetic responses for the customers who reported the issues (consider if they are 'Retail' or 'Enterprise').
5.  **Document:** Keep notes on your diagnostic steps, findings, proposed fixes, and improvement suggestions in a text file (`notes.txt`) or markdown file (`notes.md`) in the root directory.

**Important:** You are **not** expected to modify the running Docker containers directly or commit code changes _unless_ the specific scenario instructions ask you to provide code snippets/diffs as part of your proposed solution.

## Environment Setup

**Prerequisites:**

- Docker Engine
- Docker Compose

**Steps:**

1.  **Environment Variables:**

    - Copy the `.env.example` file to a new file named `.env` in the same directory (`fintech-support-challenge`).
    - Review the variables in `.env`. You usually won't need to change them unless the default ports (e.g., 80, 3001, 5432, 4000) conflict with other services on your machine.

2.  **Start the Environment:**

    - Open a terminal in the `fintech-support-challenge` directory.
    - Run the command: `docker compose up --build -d`
    - This command will build the container images (if they don't exist) and start all the services (Frontend, Backend, Database, Firebase Emulators) in the background.
    - Wait a minute or two for all services to initialize, especially the database and backend.

3.  **Accessing Services:**

    - **Frontend Application:** Open your web browser to [http://localhost](http://localhost) (or `http://localhost:<FRONTEND_PORT>` if you changed it in `.env`).
    - **Backend API (for testing):** The backend runs on `http://localhost:3001` (or `http://localhost:<BACKEND_PORT>`). You can use tools like `curl` or Postman to test endpoints (e.g., `curl http://localhost:3001/api`).
    - **Firebase Emulator UI:** Open your web browser to [http://localhost:4000](http://localhost:4000). This UI allows you to inspect Firestore data, Auth users, and view Function logs within the emulated environment.
    - **Database (Inspect):** You can connect to the PostgreSQL database using a DB client tool (like DBeaver, pgAdmin, TablePlus, VS Code extensions).
      - **Host:** `localhost`
      - **Port:** `5432` (or `<DB_HOST_PORT>`)
      - **Database:** `finsim_db` (or `<POSTGRES_DB>`)
      - **User:** `finsim_user` (or `<POSTGRES_USER>`)
      - **Password:** `finsim_password` (or `<POSTGRES_PASSWORD>`)

4.  **Viewing Logs:**

    - To view the combined logs for all running services: `docker compose logs -f`
    - To view logs for a specific service (e.g., backend): `docker compose logs -f backend`

5.  **Executing Commands (e.g., Seeding Data):**
    - The database schema is created automatically via migrations when the backend starts.
    - To populate the database with data for a **specific scenario** (e.g., `scenario1`), run:
      ```bash
      docker compose exec backend npx sequelize-cli db:seed --seed scenario1-seed.js
      ```
      _(Replace `scenario1-seed.js` with the relevant seeder file name provided in the ticket instructions)_
    - To undo all seeds: `docker compose exec backend npx sequelize-cli db:seed:undo:all`

## Your Task

- Review the assigned ticket(s) located in the `scenarios/` directory.
- Follow the setup instructions above.
- Seed the database for the relevant scenario as instructed in the ticket.
- Begin your investigation using the available tools.
- Document your findings, proposed solutions, improvements, and client communications in `notes.md`.
- Manage your time effectively within the 2-hour window.

Good luck!

## Stopping the Environment

When you are finished, stop and remove the containers:

```bash
docker compose down -v # The -v flag removes the database volume
```
