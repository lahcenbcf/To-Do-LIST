const {MongoClient} = require('mongodb');
const connection_String="mongodb://lahcenbcf:lahcen@ac-hbdcbfz-shard-00-00.gwxwr6f.mongodb.net:27017,ac-hbdcbfz-shard-00-01.gwxwr6f.mongodb.net:27017,ac-hbdcbfz-shard-00-02.gwxwr6f.mongodb.net:27017/?ssl=true&replicaSet=atlas-qc9en4-shard-0&authSource=admin&retryWrites=true&w=majority"
const client = new MongoClient(connection_String);
async function connect(){
    try {
        await client.connect('test')
    } catch (error) {
        console.log(error)
    }
}
module.exports={connect,client}
