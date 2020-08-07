const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const fileMiddleware = require('express-multipart-file-parser')

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(fileMiddleware);

admin.initializeApp({
    credential : admin.credential.cert({
        projectId : "volunteer-e1972" ,
        clientEmail : "firebase-adminsdk-isdsm@volunteer-e1972.iam.gserviceaccount.com" ,
        privateKey : "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCz9dGpXLA3a7MU\nGyCcL3o1AlUEp9tHjq7OND/KBkos7auN8VgS+f+JMNaiaXTMHERgRU45H5hcJjyn\n0ptUwKvM0/pM2hmVtVp+LHz+Gw8Rq/RuHLN7k2RJY0sC39J6J72Xi5LhWlX9Tc50\nsKD/gw2NpyrYP2QtgfuObt380jA1t/Ybi8FV8MraBZ2LyzWtazw22X3zi3PnstnO\ns+LfsSej5fzWQNQu+rAkNeJ9T0lQWZndoLj8xL/CqZmzXY5ju4Gclxy1x/5Giz++\n/f7j200sIMeIgGR5TSfxMMn2nLl9LL+bBp9nNmR0tB9YvZv4aculCXlzJusJMtez\nfQtiF2wfAgMBAAECggEAKiObjp7nnHKZolGf1zK+2P7MzaRIkn70q9BMR5AlelPE\n4h3rU7Y6gfNvruQmt0y/LhPMd0/Qq3NArMOCH9xl3jac27YOW6H1qKneMto/MxIi\n0E3kMUGYMB8SB4BFltkLahsCr8YpcIDxoR1i9bHIUK0eOTjOymEveHC5hmPpagpd\n7pPfhnVmZaUE8uEvgAmT/HonErFIU3pKlE9Jt8JI63GdQeR0y/bDMdrMpV+xZQbL\noe45omM040VKbdl81MTpfLSuyy6x0Hx8pd3FU8cjfPAj9MqWw6soT/Enicsf4ClA\nGrm2r+4zLj4SuAQG7haz/eJpjbe7bXRcGYjuff9QAQKBgQD5TKGWlq/r0e2w4gkK\n4DDyCo84yHR0nN4WDGa84Yct9iGZe3hetdk1uq9bp089hcSbvMF2HSdzlSn8Uxe1\nJuXQUS6QckbjUaX/EiR74qI4wWVZXn86z+BvPoOLemc+s+6qEO3cX5LT/WcIHot6\nQCHvcikg8MhTDdoNfgQ8IID4HwKBgQC4zBUBGoVrYB3i/UQDNj0gESm/f8LWPgJW\nrtGzvOeJahAtx9qY5gEHf0dcXGrDi/0LD7m7+UHThsbifJmdFBoVfgSy1ZzY6PrJ\nZNf9jq1ubld1J6j017wgpBsNhlcmMAR15PMA/gPvAvDbeKx19hwecwcwxVerFFb+\n5FjyX2sMAQKBgQDXBKY2KN+wqI62yi38aGMuz7a5xgLTdV0DbUzLSkV6edh+9YRb\nQ8MFWW/XwFVS/eYWYNYHlpupUBU3YT+IafU7GFnuEfJcK9bdSfuXsmAyTXOpghyA\nUD0GFcgFa9xSs4R8wD83nGMaXmwYD6hDF79tM2yP0b0mDUNt8aubZHl4BwKBgQCb\n+JQZ1FqboApZlU2cMGEy+Yl0+c5mqPusUezoeR4rGvwAx9e2iRqBS2ndiJsL5NF0\nTpeDEgP/FpgyfNvieh7x2OT6U9UINsvEw3qRpaS3uiXS2eB+lr9QBXJX3fUcZBa/\nsrdvNPX4+1ByzM0y2sAs6wU8orM1z/sFM5HnL6XYAQKBgQDaj7P1ni67pBeMbTXR\nKZgBST1fqefomusdZRXHw78sMEp7HZxAnpuV812WINVKXVMNXTnm07lB19n1J9RQ\nlBOVpUQDrxgFsClOf/YxrEkxflrrCB1FIHnpiuooNIvrGYxs6UxsXvqHKd5dWJA0\n2EF1Nq5p8+CIsdGT6b0CcRrPmQ==\n-----END PRIVATE KEY-----\n"
    }),
    storageBucket: "volunteer-e1972.appspot.com",
    databaseURL: "https://volunteer-e1972.firebaseio.com"
});

//const userApiRouter = require('./api/user/user');
const newsApiRouter = require('./api/news/news');
//const teamsApiRouter = require('./api/teams/teams');

//app.use('/api/user', userApiRouter);
app.use('/news', newsApiRouter);
//app.use('/api/teams',teamsApiRouter);

exports.api = functions.https.onRequest(app);
