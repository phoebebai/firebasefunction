const express = require("express");
const router = express.Router();
const DatabaseUtil = require("../../util/databaseUtil");

const admin = require('firebase-admin');
//The bucket is used to save the image by using bytes array
const bucket = admin.storage().bucket();

//Set the firebase db up
let db = admin.database();
const databaseRefs = new DatabaseUtil();
let newsRef = db.ref(databaseRefs.newsPath);

//The images' option
const options = {
    action: 'read',
    expires: '03-17-2999'
};


//Author: Yifei Bai
//This function is used to upload the news's pics to firebase storage
async function uploadFiles(pics) {
    let fileBuckets = [];
    let urls = [];
    //Upload the news pics
    for (const pic of pics) {

        console.log(pic);
        let img = pic.buffer;
        let filename = pic.originalname;
        let imageBuffer = new Uint8Array(img);
        let fileBucket = bucket.file("upload/news" + filename);
        fileBuckets.push(fileBucket);

        await fileBucket.save(imageBuffer, {
                metadata: {
                    contentType: pic.mimeType
                },
            });
    }

    for(let fileBucket of fileBuckets) {
        await fileBucket.getSignedUrl(options)
            .then(results => {
                const url = results[0];
                urls.push(url);
            });
    }
    return urls;
}


//Author: Yifei Bai
//This function is used to upload the news
router.post('/upload', async (req, res) => {

    let pics = req.files;
    let news = req.body.news;
    let paths=[];
    news = JSON.parse(news);
    //Store all pics in firebase storage and get all urls
    let urls = await uploadFiles(pics);

    //Upload the news body

    const newNewsRef = newsRef.push();
    newNewsRef.set({
        title: news.title,
        content:news.content,
        description: news.description,
        author: news.author,
        published_date:news.published_date,
        pic: urls
    }).then(() => {
        res.status(200).send("News is uploaded successfully!");
    }).catch(reason => {
        // The write failed...
        console.log(reason);
    });

});


/* Author: Yifei Bai
   This function is used to retrieve all news from firebase
*/
router.get('/news', function (req, res){
    newsRef.on("value", function(snapshot) {
        const newsList = [];
        snapshot.forEach(news =>{
            let value = news.val();
            value["id"] = news.key;
            newsList.push(value);
        })
        res.status(200).send(newsList);
    }, function (errorObject) {
        res.status(500).send("The read failed: " + errorObject.code);
    });
});
module.exports = router;