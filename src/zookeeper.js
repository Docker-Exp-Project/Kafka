const { Kafka } = require('kafkajs');

createTopic();

async function createTopic(){

    try
    {
        let kafkaInstance = new Kafka({
            clientId: "kafka-test",
            brokers: ['localhost:9092']
        });
    
        let kafkaAdmin = kafkaInstance.admin();
        console.log("Connecting With Kafka...");
        await kafkaAdmin.connect();
        console.log("Connected !!");
        let topicResponse = await kafkaAdmin.createTopics({
            topics: [{
                topic: "Students",
                numPartitions: 2,
                replicationFactor: 1
            }]
        });
        console.log(topicResponse);
        console.log("Done !!");
        await kafkaAdmin.disconnect();
    }
    catch(ex)
    {
        console.log(`Error Message: ${ex}`);
    }
}