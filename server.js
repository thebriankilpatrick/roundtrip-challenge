// const jsonServer = require('json-server');
// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const cors = require('cors');

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     // app.use("*", express.static("client/build"));
// }

// server.use(
//     cors({
//         origin: true,
//         credentials: true,
//         preflightContinue: false,
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     })
// );
// server.options('*', cors());

// server.use(middlewares);
// server.use(router);
// server.listen(PORT, () => {
//     console.log('JSON Server is running');
// });

// // const server = require('http').Server(app);

// // server.listen(PORT, () => {
// //     console.log(`🌎 ==> API server now on port ${PORT}!`);
// //   });