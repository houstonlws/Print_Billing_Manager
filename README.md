# Printer Management System

## Description

The Printer Management System is a web application designed to streamline the management of all printers within a school. This application offers a centralized platform where administrators can handle billing, track maintenance requests, and monitor the status and usage of each printer.

Key features of the system include:

- Billing Management: Keep track of printing costs and generate detailed reports for budgeting and accounting.
- Maintenance Requests: Submit, track, and resolve maintenance issues for all printers in the network.
- Printer Tracking: Monitor the status of each printer, including usage statistics, toner levels, and error reports.
- Departmental Access: Heads of each department can log in to request maintenance, view tracking information, and access billing details for printers within their respective departments.

This project aims to reduce downtime, improve resource management, and ensure that all printers are functioning optimally, while also providing department heads with the tools they need to manage their printing resources effectively.

## Installation Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.21.3) and npm (Node Package Manager).

  - Visit the [NodeJS Download page](https://nodejs.org/en/blog/release/v14.17.3)

  - Run `node -v` in your terminal to ensure Java 17 is installed.

- **TypeScript** installed globally:
  `npm install -g typescript`
- **Java 17**: Make sure you have Java 17 installed on your system.

  - Visit the [Oracle JDK Download page](https://www.oracle.com/java/technologies/downloads/#java17) or install via your package manager.

  - Run `java -version` in your terminal to ensure Java 17 is installed.

- MySQL and MySQL Workbench for managing the database.

  - Visit the [MySQL Workbench Download page](https://dev.mysql.com/downloads/workbench/)

### Cloning the Repository

1. Clone the repository from GitHub to your local machine:

   `git clone https://github.com/houstonlws/Print_Billing_Manager.git`

2. Navigate to the project directory:

   `cd print-billing-system`

## Creating a Local Database in MySQL Workbench

### Step 1: Open MySQL Workbench

- Launch **MySQL Workbench** and connect to your local MySQL server as the `root` user.

### Step 2: Create a New Database

1. **Create a Database:**

   - In the **Navigator** panel, right-click on `Schemas` and select **Create Schema**.
   - In the dialog that appears:
     - **Name:** Enter `print_billing_db`.
     - **Collation:** Leave it as the default or choose your preferred collation.
   - Click **Apply** to create the database.

2. **Apply SQL Script:**
   - MySQL Workbench will generate the necessary SQL script. Review it and click **Apply** to execute the script and create the `print_billing_db` database.

### Step 3: Verify the Database

- In the **Navigator** panel, expand `Schemas` and confirm that `print_billing_db` appears in the list of databases.

## Setting Up the Backend

### Configure Environment Variables:

- Crreate two system environment variables: `REFRESH_TOKEN_SECRET` and `DB_PASSWORD`

- For `REFRESH_TOKEN_SECRET` you can run the following command line and copy its value:
  ```bash
  openssl rand -base64 40
  ```
- For `DB_PASSWORD` this will be the password for your MySQL database.

### Start the server:

- Navigate to the backend directory: `cd backend`
- Build and run the project using the following command:
  ```bash
  ./gradlew bootRun --console=plain
  ```

## Setting Up the Frontend

### Install Frontend Dependencies:

- Navigate back to the frontend directory:

  `cd ../frontend`

- Install the required dependencies:

  `npm install`

### Start the Frontend Application:

- Run the frontend application:
  ```bash
  npm run start
  ```
