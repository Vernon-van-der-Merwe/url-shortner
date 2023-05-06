This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The goal of this project
The goal of this project is to create a web application that allows users to shorten URLs. 
The shortened URLs will be persisted in some way and can be accessed later. 
The application will be built using Node.js, TypeScript, and React.

## Technical Requirements

1. Backend:
    - The application should be built using Node.js.
    - TypeScript should be used to write the code.
    - You can use Express.js as the web framework or something similar.
    - Any DB or persitance solution that you like.
    - The API should allow users to shorten URLs by accepting a URL as input and returning a shortened URL.
    - The API should also allow users to retrieve the original URL by providing the shortened URL.
    - The API should handle errors gracefully and return appropriate error messages.

2. Frontend:
    - The application frontend should be built using React or React Native in combination with typescript.
    - You are allowed to use UI framework of your choosing.
    - The user interface should allow users to enter a URL to shorten and display the shortened URL that have been created in tha past.
    - The user interface should also allow users to retrieve the original URL by providing the shortened URL.
    - The user interface should handle errors gracefully and display appropriate error messages.

3. Deployment:
    - Your solution can run locally and doesn’t have to be deployed anywhere. If you want to deploy it somewhere that will be great.

4. Deliverables:
    - Source code of the application with appropriate comments.
    - Documentation on how to build, deploy and run the application.
    - Test cases to ensure the application is working as expected.
    - A demo of the application showing how to shorten and retrieve URLs.

5. Evaluation Criteria:
    - Proper usage of Node.js, TypeScript and React.
    - Proper usage of the web framework.
    - Proper error handling.
    - Proper usage of UI framework and responsive design. 5. Code quality and readability.
    - Ability to deliver and communicate effectively.
