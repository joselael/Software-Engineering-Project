const Storage = require('@google-cloud/storage');
const projectId = 'dllmz-swep';

createBucket = function () {

    const storage = Storage({
        projectId: projectId,
    });

    const bucketName = 'dllmz-swep-bucket-0';

    storage
        .createBucket(bucketName)
        .then(() => {
            console.log(`Bucket ${bucketName} created`)
        }).catch(err => {
        console.error('ERROR: ', err);
    });
};

module.exports = createBucket;