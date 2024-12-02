# Backend Application
This repository contains the backend application built with Node.js, Express.js, Prisma ORM, and PostgreSQL. This guide will help you set up and run the project Car Inspection on your local machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Prisma Client](#prisma-client)
- [Running the Application](#running-application)

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Node.js (v14 or later)](https://nodejs.org/fr)
- [PostgreSQL](https://www.postgresql.org/download/)

## Installation
Clone the Repository

`git clone https://github.com/davidcm146/Car-Inspection_BE`

Install Dependencies

Using npm:

`npm install`

Environment Variables

- Create a .env file in the root directory of the project by copying the example file:
- Set Up Environment Variables
- Open the .env file and configure the following variables:

### Server Configuration
`PORT=5500`

### Database Configuration
`DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"`

- `PORT`: The port on which the server will run.  
- `DATABASE_URL`: Your PostgreSQL connection string. Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials and database name.

## Prisma Client
### Initialize Prisma and apply migrations
`npx prisma migrate dev --name init`
## Running Application
`npm run dev`
