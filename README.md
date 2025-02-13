# Full Stack Node/React

3D Product display Web App by: Manuel Perche

Deployed Application: 
- [FrontEnd](https://3-d-display-frontend.vercel.app/)
- [Backend](https://3-d-display-back.vercel.app/)

![image](https://github.com/manuelperche/3D-Display/assets/37191519/c0440a11-1e34-462c-80ba-88843ef25e88)

## To run the project in dev mode:

Run the following command:

```sh
pnpm run dev
```

To run this project you'll need to provide enviroment variables to both back and front end, in the frontend you need a api url (I used http://localhost:5001) in the backend you need a connection string to the postgresql database.

## What's inside?

### Apps and Packages

- `backend`: an [Express](https://expressjs.com/) server, using tRPC with Drizzle-orm consuming from a PostgreSQL database
- `frontend`: a [Vite](https://vitejs.dev/) React single page app using React-three-fiber
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations
- `@repo/logger`: isomorphic logger (a small wrapper around console.log)
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

## Documentation:

### Tradeoffs: 

I am not a UI/UX designer so sorry for the ugly template and styling, I focused on the functionality of the site and clean code.

Due to the lack of user management, I decided to let any user like and dislike products as many times as they want, this could obviously be prevented by allowing a logged in user to like or dislike the product one time only.
Also every user can comment as many times as they want and can edit any comment (but only content, the name is fixed)

Handled everything inside a turborepo monorepo.

I just set up in the backend a simple jest test that tested the main getProducts endpoint, in the future more test should be added to test the other endpoints and also implement testing on the frontend using react-testing-library.

### API:

```sh

## Products Router:

# products.getProduct:

Query that takes a UUID as an input and returns an object with the shape:

{
  id: string;
  name: string;
  modelFileName: string;
  likes: number;
  dislikes: number;
  comments: {
      id: string;
      name: string;
      text: string;
      createdAt: Date;
      updatedAt: Date;
      productId: string;
  }[];
}

# products.getProducts:

Query that returns an an array of objects with the same shape as getProduct.

# products.like:

Mutation that takes a product ID (UUID) and returns:

likes: {
    likes: number;
}[]

# products.dislike:

Mutation that takes a product ID (UUID) and returns:

dislikes: {
    dislikes: number;
}[]

## Comments Router:

# comments.addComment:

Mutation that takes an input of this shape:

{
  name: string;
  text: string;
  productId: string;
}

And returns:

{
  id: string;
  name: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
}[]

# comments.editComment:

Mutation that takes an input of this shape:

{
  id: string;
  text: string;
}

And returns the same array as addComment.

# comment.deleteComment:

Mutation that takes a comment id (UUID) as an input and returns the same array as addComment.


```
