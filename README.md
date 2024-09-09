<img src="./front/app/assets/hivee-white.png" alt="Hivee logo" width="200"/>

This repository was created to a tecnical test for Jack Experts.

## Description

Hivee is a task manager application designed tp enhance productivity. It allows users to create, edit and delete tasks, as well as mark them as completed.

## Technologies

This project was developed using a range of modern technologies.

### Backend

- Express: Utilized for creating a RESTful API, enabling seamless communication between the client and server.
- Sequelize: Used as an ORM to facilitate database operations.
- MySQL: Database management system used to store application data.
- Joi: Used for schema validation to ensure data integrity.

### Frontend

- React: JavaScript library used for building the user interface.
- Next.js: Framework used to create server-side rendered React applications.
- Shadcn: A collection of customizable, modern and responsive React components.

### Development Tools:

- ESLint: Used to enforce code quality and consistency.
- Jest: JavaScript testing framework used to write unit tests.
- Supertest: HTTP assertions library used to test the API endpoints.

## Prerequisites

- Docker (27.2.0 or higher)
- Docker Compose (2.27.0 or higher)
- Node.js (20.13.0 or higher)
- NPM (10.5.2 or higher)
- GNU Make (4.3 or higher)

## Installation

To install the application, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/artrsousa1/task-manager.git
```

2. Install the backend dependencies:

```bash
cd api
npm install
```

3. Install the frontend dependencies:

```bash
cd ../front
npm install
```

## Execution

To run the application, follow the steps below:

1. Start the database container:

```bash
make start
```

2. Start the backend server:

```bash
cd api
npm run dev
```

3. Start the frontend server:

```bash
cd ../front
npm run dev
```





