const Storage = require('@google-cloud/storage');
const projectId = 'dllmz-swep';

const storage = Storage({
    projectId: projectId,
    keyFilename: './Software Engineering Project-c1d3b68b6b12'
});


const bucket = storage.bucket('swep-bucket');


upload = function (req, res, name) {

    console.log("file is " + req.file);
    console.log("name is: " + name);
    console.log("file type is : " + req.file.mimetype);


    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(name);

    // Make sure to set the contentType metadata for the browser to be able
    // to render the image instead of downloading the file (default behavior)
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    blobStream.on("error", err => {
    });

    blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log("url is: " + publicUrl);
        // Make the image public to the web (since we'll be displaying it in browser)
        blob.makePublic().then(() => {
            // res.status(200).send(`File uploaded to ${publicUrl}`);
            res.status(201).send(`File uploaded to ${publicUrl}`);
        });
    });

    // blobStream.end(req.file.buffer);
};


module.exports = upload;
