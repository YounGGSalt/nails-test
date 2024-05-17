// Imported modules
import * as fs from 'fs';                   // fs
import express from 'express';              // express
import bodyParser from 'body-parser';       // body-parser
import cors from 'cors';                    // cors
import { spawn } from 'child_process';      // child-process

const app = express();
const bot = spawn('python3', ['././bot/main.py']);
const serverData  =  JSON.parse(fs.readFileSync('./data/server.json'));
const usersData   =  JSON.parse(fs.readFileSync('./data/users.json'));

// Server PORT
let PORT = app.listen(0).address().port;
serverData['node'] = PORT;
serverRef();

// CORS
let clientAddr  =  `http://127.0.0.1:5500`;
let botAddr;
setTimeout(() => {
  botAddr = `http://127.0.0.1:${JSON.parse(fs.readFileSync('./data/server.json'))['python']}`;
}, 1000);
app.use(cors({ origin: clientAddr, botAddr }));

// Useful
app.use(express.static("public"));
app.use(bodyParser.urlencoded( { extended: true } ));
app.set('view engine', 'ejs');
app.use(express.json());

// Functions
function serverRef() {
  fs.writeFileSync("./data/server.json", JSON.stringify(serverData), {encoding: "utf8", flag: "w"});
};
function usersRef() {
  fs.writeFileSync("./data/users.json", JSON.stringify(usersData), {encoding: "utf8", flag: "w"});
};
function user(num, login, password) {
  const user = {
    'id' : num,
    'login' : login,
    'password' : password
  }

  usersData['users'].push(user);
};
async function returnRes(res, data) {
  await res.write(toString(data));
  res.end();
}

// GET
app.get('/send', (req, res) => {
  let data = usersData;

  res.json( data );
});

// POST
app.post("/registration", (req, res) => {
  const result = req.body;

  if (Number(JSON.parse(fs.readFileSync('./data/users.json'))['users'].length) === 0) {
    user(
      JSON.parse(fs.readFileSync('./data/users.json'))['users'].length + 1,
      result["login"],
      result["password"]
    );
    usersRef();
  } else {
    for (let i = 0; i < Number(JSON.parse(fs.readFileSync('./data/users.json'))['users'].length); i++) {
      let currentUserLogin = JSON.parse(fs.readFileSync('./data/users.json'))['users'][i]['login'];
      if (currentUserLogin === result['login']) {
        console.log('Match found with login');

        break;
      } else {
        if (i == Number(JSON.parse(fs.readFileSync('./data/users.json'))['users'].length) - 1 && currentUserLogin !== result['login']) {
          user(
            JSON.parse(fs.readFileSync('./data/users.json'))['users'].length + 1,
            result["login"],
            result["password"]
          );
          usersRef();

          break;
        }
      }
    }
  }
});
app.post("/authorization", (req, res) => {
  const result = req.body;

  for (let i = 0; i < Number(JSON.parse(fs.readFileSync('./data/users.json'))['users'].length); i++) {
    let currentUserLogin = JSON.parse(fs.readFileSync('./data/users.json'))['users'][i]['login'];
    let currentUserPassword = JSON.parse(fs.readFileSync('./data/users.json'))['users'][i]['password'];
    if (currentUserLogin === result['login']) {
      if (currentUserPassword === result['password']) {
        console.log('Done!');
      } else {
        console.log('Incorrect Password');
      }

      break;
    }
    if (i == Number(JSON.parse(fs.readFileSync('./data/users.json'))['users'].length) - 1 && currentUserLogin !== result['login']) {
      console.log('This account does not exist');
    }
  }

  returnRes(res, `from server`);
});

// Main
bot.stdout.on('data', data => {
  console.log(`bot:\n${data}`);
})