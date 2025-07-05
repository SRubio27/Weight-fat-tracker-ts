📦 Project: Weight Tracker Backend

This repository contains the backend for the Weight Tracker application, built with the following technologies and frameworks:

Node.js (v16+)

TypeScript

Express.js (or your chosen HTTP framework)

Prisma ORM for database management

ts-node and tsconfig-paths for development execution

Nodemon for automatic server restarts

📋 Project Structure

├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── src/                  # TypeScript source code
│   ├── index.ts          # Application entry point
│   ├── db.ts             # Prisma Client initialization
│   └── ...               # Routes, controllers, services
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

🚀 Installation

Clone the repository:

git clone https://github.com/SRubio27/weight-tracker.git
cd weight-tracker

Install dependencies:

npm install

Configure environment variables by creating a .env file:

DATABASE_URL="postgresql://user:password@localhost:5432/my_database"

Generate Prisma Client and run migrations:

npx prisma generate
npx prisma migrate dev --name init   # optional: create initial migration

Start the development server:

npm run dev

📦 Available Scripts

npm run dev       - Starts the server with ts-node and nodemon.

npm run build     - Compiles TypeScript to JavaScript in dist/.

npm start         - Runs the compiled code from dist/.

npx prisma generate - Generates the Prisma Client.

npx prisma migrate dev - Applies database migrations.

🛠️ Environment Variables

DATABASE_URL - The connection string for your database.

(Add any additional environment variables here)

🤝 Contributing

Feel free to open an issue or submit a pull request. All contributions are welcome!

Thank you for using Weight Tracker!