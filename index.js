// Simplified way of doing it
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();

// const authCookieName = 'token';

// app.use(cookieParser());

// app.get('/login/:user', (req, res) => {
//  const authToken = req?.cookies.token;
//  res.send({ cmd: 'login', user: req.params.user, token: authToken });
// });

// app.get('/register/:user', (req, res) => {
//  authToken = Math.random();
//  res.cookie(authCookieName, authToken, {
//    secure: true,
//    httpOnly: true,
//    sameSite: 'strict',
//  });

//  res.send({ cmd: 'register', user: req.params.user, token: authToken });
// });
// port = 8080;

// app.listen(port, () => {
//  console.log('listening ' + port);
// });

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const uuid = require('uuid');
const bcrypt = require('bcrypt');

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);

    res.send({id: user._id});
  }
});

app.get('/user/me', async (req, res) => {
    authToken = req.cookies['token'];
    const user = await users.findOne({ token: authToken });
    if (user) {
      const role = await roles.findOne({ email: user.email });
      res.send({ email: user.email, role: role });
      return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
