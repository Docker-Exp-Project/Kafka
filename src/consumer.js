const { Kafka } = require("kafkajs");

const kafkaGroupId = process.argv[2];


consumerRun();

async function consumerRun(){
    try
    {
        let kafkaInstance = new Kafka({
            clientId: "kafka-test",
            brokers: ['localhost:9092']
        });
        let groupId = "groupA";
        if(kafkaGroupId) groupId = kafkaGroupId;
        console.log(kafkaGroupId);
        let consumer = kafkaInstance.consumer({ groupId: groupId});
        console.log("Connecting With Kafka...");
        await consumer.connect();
        console.log("Connected !!");

        console.log(`Subscribing to the group ${groupId}`);
        await consumer.subscribe({
            topic: "Students",
            fromBeginning: true
        });
        console.log("Subscribed !!");

        console.log("Running the Service...");

        await consumer.run({
            "eachMessage": async result => {
                console.log(`RCD From ${groupId} ${result.message.value} on partition ${result.partition}`)
            }
        })

    }
    catch(ex)
    {
        console.log(`Exception Occurs : ${ex}`);
    }
}

