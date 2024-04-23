'use strict'
const redis = require('redis');

async function main() {

    const client = redis.createClient();

    client.on('error', err => {
        console.log('Redis Client Error', err);
    });
    // client.on('error', err => console.log('Redis Client Error', err));

    // const rs = await client.connect();
    // console.log(rs);
}

main();