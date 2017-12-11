const Storage = require('@google-cloud/storage');

const storage = Storage({
    projectId: 'swep-bucket',
    keyFilename: 'file/Software Engineering Project-c1d3b68b6b12.json'
});


const bucket = storage.bucket('swep-bucket');


upload = function (req, res, name) {

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(name + req.params.kind);

    // Make sure to set the contentType metadata for the browser to be able
    // to render the image instead of downloading the file (default behavior)
    const blobStream = blob.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    blobStream.on("error", err => {
        console.log(err);
    });

    blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        // Make the image public to the web (since we'll be displaying it in browser)
        blob.makePublic().then(() => {

            res.status(201).send(publicUrl);
        });
    });

    blobStream.end(req.file.buffer);
};


module.exports = upload;
