const express = require("express");
const router = express.Router();

const admin = require('firebase-admin');
const bucket = admin.storage().bucket();

const options = {
    action: 'read',
    expires: '03-17-2999'
};

/*
    This function is used to register staff users
*/
router.post('/test', (req, res) => {
    let file = req.files[0];
    let img = file.buffer;
    let filename = file.originalname;
    var imageBuffer = new Uint8Array(img);
    var fileBucket = bucket.file(filename);

    fileBucket.save(imageBuffer, {
            metadata: {
                contentType: 'image/jpg'
            },
        },
        ((error) => {
            if (error) {
                console.log(error);
            }
            fileBucket.getSignedUrl(options)
                .then(results => {
                    const url = results[0];
                    res.status(200).send(`The signed url for ${filename} is ${url}.`);
                    //console.log(`The signed url for ${filename} is ${url}.`);
                })
        }));

});

/*
    This function is used to return user data of the user that is logged in
*/
router.get('', (req, res) => {
    res.status(200).send("Users!");
});

//To do: get/delete/put/post method
module.exports = router;