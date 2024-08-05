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
- **TypeScript** installed globally:
  ```bash
  npm install -g typescript
  ```
- MySQL and MySQL Workbench for managing the database.

### Cloning the Repository

1. Clone the repository from GitHub to your local machine:
   ```bash
   git clone https://github.com/houstonlws/Print_Billing_Manager.git
   ```
2. Navigate to the project directory:
   ```bash
   cd print-billing-system
   ```

## Setting Up the Backend

### Install Backend Dependencies:

1. Navigate to the backend directory
   ```bash
   cd backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

### Configure Environment Variables:

- In the backend folder, create a .env file with the following contents:
  ```env
  REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
  DB_PASSWORD=<your-mysql-database-password>
  ```
- For `REFRESH_TOKEN_SECRET` you can run the following command line and copy its value:
  ```bash
  openssl rand -base64 40
  ```
- For `DB_PASSWORD` this will be the password for your MySQL database.

## Database Setup:

1. Create a new MySQL database locally using MySQL Workbench.
2. Run the SQL script located in the main directory of the project to create the necessary tables and optionally insert test data.

## Start the Backend Server:

    npm run start

## Setting Up the Frontend

## Install Frontend Dependencies:

1. Navigate back to the main project directory and then to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install the required dependencies:
   ```bash
   Copy code
   npm install
   ```

### Start the Frontend Application:

- Run the frontend application:
  ```bash
  npm run start
  ```
- Run Frontend Tests:

  ```bash
  npm run test
  ```
