# Blog Api

Blogging app that uses 2 frontends to interact with one backend api. One for reading and another for writing blogs. Built with Express, Prisma (PostgreSQL), and React.

## Live

https://write-blog-api.netlify.app
https://read-blog-api.netlify.app

Frontend's are deployed on Netlify  
Backend hosted on Koyeb

## Features

- Account creation and route authentication with jsonwebtoken for both frontends

### Write

- Create, Update, and Delete blogs
- Publish and unpublish blogs to make them public or private

### Read

- Shows all published blogs and comments
- Create, Update, and Delete comments on blogs

## Installation

1. `git clone git@github.com:GrantRoots/blog-api.git`
2. `cd blog-api/api`
3. `npm install`
4. `npm run build`
5. `npm run start`

- Open a new terminal window for the write frontend

1. `cd blog-api/write`
2. `npm install`
3. `npm run dev`

- Open a new terminal window for the read frontend

1. `cd blog-api/read`
2. `npm install`
3. `npm run dev`

## Environment Variables

```
DATABASE_URL="your db url"
JWT_SECRET="secret"
VITE_API_URL="http://localhost:3000" - Backend url for frontend API calls
```
