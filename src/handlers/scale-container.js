const aws = require('aws-sdk');
const ecs = new aws.ECS({apiVersion: '2014-11-13'});
const CLUSTER_NAME = process.env.CLUSTER_NAME;
const SERVICE_NAME = process.env.SERVICE_NAME;
const DESIRED_COUNT = process.env.DESIRED_COUNT;

exports.addContainer = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    const response = {
        statusCode: 200
    }

    try {
        await ecs.updateService({cluster: CLUSTER_NAME, service: SERVICE_NAME, desiredCount: DESIRED_COUNT, })
            .promise()
            .then(console.info)
            .catch(console.error)
    } catch (e) {
        console.log(e)
    }


    return response;
}