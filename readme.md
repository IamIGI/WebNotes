# WebNotes App

WebNotes is a simple and efficient note-taking application that allows users to accumulate and manage their personal notes. The app is built using **Node.js**, **Express**, **MongoDB**, **Svelte**, and **TypeScript**, providing a modern and responsive experience.

## **Environment Variables**

Before running the application, make sure to set up the following environment variables:

| Variable Name              | Description                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `VITE_API_SERVER_URL_PROD` | The production API server URL (e.g., `https://api.igitest.pl`).                        |
| `VITE_PROD`                | Boolean flag to indicate if the app is running in production mode (`true` or `false`). |

## **Project Structure**

This application consists of two main parts:

- **`server/`** – Backend service built with **Node.js, Express, and MongoDB**
- **`client/`** – Frontend application built with **Svelte and TypeScript**

## **Scripts in `package.json`**

The `package.json` file includes several scripts for development, production, and API generation:

| Script      | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| `dev:app`   | Runs the backend and frontend concurrently in development mode.                      |
| `build:app` | Builds both the backend and frontend for production.                                 |
| `prod:app`  | Runs the backend in production mode and starts the frontend preview.                 |
| `gen:api`   | Generates API clients for the `client/`, `admin-client/`, and `server/` directories. |

## **Getting Started**

1. **Install dependencies**
   ```sh
   npm install
   ```
