

# Run the Project

### Backend

- you have to enter the backend folder by typing `cd backend` in the terminal
- In the project directory,Install libraries by typing `yarn`
- Open a new file named .env

```environment
    MONGO_URI=mongodb+srv://user:passworrd@seyit.jwhpjae.mongodb.net/?retryWrites=true&w=majority
    JWT_SECRET=sdgkMKEVlm3v23kl_n423vGG3b_TVnm234xnv23
    JWT_REFRESH_SECRET=rerv1jv15v1CVBnasd23jnv1j3123nvrqwr23
```

- and type your mongodb URI
- Then Run backend project with `yarn dev`

---

### Frontend

- you have to enter the frontend folder by typing `cd frontend` in the terminal
- In the project directory,Install libraries by typing `yarn`
- Then Run backend project with `yarn start`
- You can reach the project from [localhost:3000](http://localhost:3000/)

---
### BOTH 

- or you can start it from root directory just type 'yarn start'


# Libraries

### backend

- accesscontrol
- bcrypt
- boom
- cors
- dotenv
- express
- ioredis
- joi
- jsonwebtoken
- mongoose
- sucrase

### frontend

- @chakra-ui/react
- antd
- axios
- formik
- framer-motion
- moment
- react-dom
- react-image-gallery
- react-query
- react-router-dom
- react-scripts
- web-vitals
- yup

### database

- MongoDB

---

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Instruction to install library




# Project Name

## Description
A brief description of your project, what it does, and its features.

## Tech Stack

### Backend Libraries:
- **`accesscontrol`**  
  Access control for securing APIs.  
  Installation:  
  `yarn add accesscontrol`

- **`bcrypt`**  
  A library for hashing passwords.  
  Installation:  
  `yarn add bcrypt`

- **`boom`**  
  HTTP-friendly error objects.  
  Installation:  
  `yarn add boom`

- **`cors`**  
  Middleware for enabling Cross-Origin Resource Sharing.  
  Installation:  
  `yarn add cors`

- **`dotenv`**  
  Loads environment variables from a `.env` file.  
  Installation:  
  `yarn add dotenv`

- **`express`**  
  Web framework for building APIs.  
  Installation:  
  `yarn add express`

- **`ioredis`**  
  Redis client for Node.js.  
  Installation:  
  `yarn add ioredis`

- **`joi`**  
  Data validation library.  
  Installation:  
  `yarn add joi`

- **`jsonwebtoken`**  
  JSON Web Token (JWT) for secure authentication.  
  Installation:  
  `yarn add jsonwebtoken`

- **`mongoose`**  
  MongoDB object modeling tool.  
  Installation:  
  `yarn add mongoose`

- **`sucrase`**  
  A faster alternative to Babel for compiling modern JavaScript.  
  Installation:  
  `yarn add sucrase`

### Frontend Libraries:
- **`@chakra-ui/react`**  
  A simple, modular, accessible UI component library for React.  
  Installation:  
  `yarn add @chakra-ui/react`

- **`antd`**  
  Ant Design, a React UI library with a set of high-quality components.  
  Installation:  
  `yarn add antd`

- **`axios`**  
  Promise-based HTTP client for making requests.  
  Installation:  
  `yarn add axios`

- **`formik`**  
  A library for building forms in React.  
  Installation:  
  `yarn add formik`

- **`framer-motion`**  
  A library for animations in React.  
  Installation:  
  `yarn add framer-motion`

- **`moment`**  
  A library for parsing, validating, manipulating, and formatting dates.  
  Installation:  
  `yarn add moment`

- **`react-dom`**  
  React's package for DOM manipulation.  
  Installation:  
  `yarn add react-dom`

- **`react-image-gallery`**  
  A React component for displaying an image gallery.  
  Installation:  
  `yarn add react-image-gallery`

- **`react-query`**  
  Data fetching, caching, synchronization, and more.  
  Installation:  
  `yarn add react-query`

- **`react-router-dom`**  
  Declarative routing for React.  
  Installation:  
  `yarn add react-router-dom`

- **`react-scripts`**  
  Scripts and configuration used by Create React App.  
  Installation:  
  `yarn add react-scripts`

- **`web-vitals`**  
  Library for measuring key performance metrics of web applications.  
  Installation:  
  `yarn add web-vitals`

- **`yup`**  
  A schema builder for validation.  
  Installation:  
  `yarn add yup`

### Database:
- **MongoDB**  
  NoSQL database used for your backend storage.  
  Installation:  
  MongoDB is used via the `mongoose` library (already listed under backend libraries).  
  `yarn add mongoose`

### Icon Libraries:
- **`react-icons`**  
  A collection of icons for React applications.  
  Installation:  
  `yarn add react-icons`

- **`@chakra-ui/icons`**  
  Icon set specific to Chakra UI components.  
  Installation:  
  `yarn add @chakra-ui/icons`

### Utility Libraries:
- **`mysql2`**  
  MySQL client for Node.js (if used in your other backend projects).  
  Installation:  
  `yarn add mysql2`

- **`express-validator`**  
  A set of validation middlewares for Express.  
  Installation:  
  `yarn add express-validator`

- **`bcryptjs`**  
  An alternative to `bcrypt` for password hashing.  
  Installation:  
  `yarn add bcryptjs`

### Development Tools:
- **`nodemon`**  
  Utility that monitors for changes in files and automatically restarts the server.  
  Installation:  
  `yarn add nodemon --dev`

- **`eslint`**  
  Linting utility for JavaScript code to maintain code quality.  
  Installation:  
  `yarn add eslint --dev`

- **`prettier`**  
  Code formatter to enforce consistent style.  
  Installation:  
  `yarn add prettier --dev`

### Additional Libraries:
- **`font-awesome`**  
  Popular icon library used for scalable vector icons in web apps.  
  Installation:  
  `yarn add font-awesome`

- **`react-slick`**  
  React carousel/slider component (if used in your project).  
  Installation:  
  `yarn add react-slick`

## Installation

1. Clone the repository:
   `git clone <repository-url>`
   
2. Navigate to the project directory:
   `cd <project-directory>`
   
3. Install dependencies using Yarn:
   `yarn install`

## Usage

To start the development server:
`yarn start`

For production build:
`yarn build`

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License
Distributed under the MIT License. See `LICENSE` for more information.
