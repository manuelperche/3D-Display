# Southern Code Full Stack Node/React Challenge

3D Product display Web Application by: Manuel Perche

Deployed Application: 
- [FrontEnd](https://3-d-display-frontend.vercel.app/)
- [Backend](https://3-d-display-back.vercel.app/)


## To run the project in dev mode:

Run the following command:

```sh
pnpm run dev
```

To run this project you'll need to provide enviroment variables to both back and front end, in the frontend you need a api url (I used http://localhost:5001) in the backend you need a connection string to the postgresql database, you can use the conection string for my neon database if you need to:

```sh
postgresql://3DDisplay_owner:2WKe5RuDUPcy@ep-young-breeze-a5cxkaoo.us-east-2.aws.neon.tech/3DDisplay?sslmode=require
```


## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `backend`: an [Express](https://expressjs.com/) server, using tRPC
- `frontend`: a [Vite](https://vitejs.dev/) React single page app
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations
- `@repo/logger`: isomorphic logger (a small wrapper around console.log)
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).
