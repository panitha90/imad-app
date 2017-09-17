var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'panitha90',
    database: 'panitha90',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var pages = {
    page1:   {
  title: 'Page 1 of Anitha Webapp' ,
  date: 'Aug 16 2017',
  heading: 'Into to Webapp',
  content: `    <p>
                    Examples of browser applications are simple office software (word processors, online spreadsheets, and presentation tools), but can also include more advanced applications such as project management, computer-aided design, video editing and point-of-sale.
                </p>`
    },
    page2: {
  title: 'Page 2 of Anitha Webapp' ,
  date: 'Aug 16 2017',
  heading: 'Database',
  content: `    <p>
                    A database is an organized collection of data.[1] It is a collection of schemas, tables, queries, reports, views, and other objects. Database designers typically organize the data to model aspects of reality in a way that supports processes requiring information, such as (for example) modelling the availability of rooms in hotels in a way that supports finding a hotel with vacancies.
                </p>
                <p>
                    A database-management system (DBMS) is a computer-software application that interacts with end-users, other applications, and the database itself to capture and analyze data. 
                </p>`
    },
    page3: {
  title: 'Page 3 of Anitha Webapp' ,
  date: 'Aug 16 2017',
  heading: 'Reverse Proxy',
  content: `   <p>
                    In computer networks, a reverse proxy is a type of proxy server that retrieves resources on behalf of a client from one or more servers. These resources are then returned to the client as if they originated from the Web server itself.[1] Contrary to a forward proxy, which is an intermediary for its associated clients to contact any server, a reverse proxy is an intermediary for its associated servers to be contacted by any client.
                </p>`
    },
};

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
     <html>
            <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <h1>
                    ${heading}
                </h1>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`;
    return htmlTemplate;
}

var counter = 0;
app.get('/counter',function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    
    pool.query('SELECT * from test', function(err, result) {
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.get('/pages/:pageName', function(req,res) {
    pool.query("SELECT * from article where title = $1" ,[req.params.pageName] , function(err, result) {
        if(err){
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0){
                res.status(404).send("Result not found for article");
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

function hash (input, salt) {
    var hash = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', '10000', salt, hash.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'some_random_salt_string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res) {
    //JSON request
    var username = req.body.username;
    var password = req.body.password;
    
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)',[username, dbString], function(err, result) {
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send("Successfully created user: " + username);
        }
    });
});

var names=[];
app.get('/submit-name',function(req, res){ //QUERY STRING so url is /submit-name?name=xxxx
   var nameInp = req.query.name;
   
   names.push(nameInp);
   
   res.send(JSON.stringify(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
