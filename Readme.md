# Nodejs Expressjs MongoDB Ready-to-use API Project Structure

A ready-to-use boilerplate for REST API Development with Node.js, Express, and MongoDB

## Getting Started
This is a simple basic setup of ECOmmerce rest Api wiriiten in nodejs.It is very useful to create
a restful api for your front end frameworks like react,vue,angular to interact properly with backend.

## Advertise for internship/Work Contract
I am looking for good internship or work Contract.You can connect with me directly on my email(Abhayks2808@gmail.com) or you can download my cv  from my personal portfolio [website](https://restorative-lids.000webhostapp.com/).Looking forward.Thanks :smile:

##features
-   Basic Authentication (Register/Login with hashed password)
-   JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
-   Included CORS.
-   **CRUD** operations.
-   Light-weight project.
-   MVC framework
-   Code readable

## Software Requirements

-   Node.js **10+**
-   MongoDB **4+** 

## How to install

### Using Git (recommended)

1.  Clone the project from github. Change "myproject" to your project name.

```bash
git clone https://github.com/Abhayks2808/rest-api.git
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory
### Install npm dependencies after installing (Git or manual download)

```bash
cd myproject
npm install
```
1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```bash
    cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your credentials.
4.  Change the values of the file to your environment. Helpful comments added to `.env.example` file to understand the constants.
## Project  structure
```sh
.
├── server.js
├── package.json
├── controllers
│   ├── orders.js
│   └── products.js
|   └── user.js
├── models
│   ├── orders.js
│   └── products.js
|   └── user.js
├── routes
│   ├── orders.js
│   ├── products.js
│   └── auth.js
├── middlewares
│   ├── check-auth.js

```

## How to run

### Running  API server locally

```bash
npm run dev
```

You will know server is running by checking the output of the command `npm run devstart`
```bash
npm run devstart

> restful-api@1.0.0 devstart 
> nodemon server.js

[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
server is started

Press CTRL + C to stop the process.
```
**Note:**  `YOUR DB_HOSt` will be your MongoDB connection string.

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/routes/` and add it in `/routes/api.js` it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.
## uplading image

create a folder `/uploads/` for storing images
