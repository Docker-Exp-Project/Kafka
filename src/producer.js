const { Kafka } = require("kafkajs");

const kafkaMessage = process.argv[2];

producerRun();

async function producerRun(){
    try
    {
        const kafkaInstance = new Kafka({
            clientId: "kafka-test",
            brokers: ['localhost:9092']
        });
        const producer = kafkaInstance.producer();
        console.log("Connecting.....");
        await producer.connect();
        console.log("Connected!");

        const isInteger = !isNaN(parseInt(kafkaMessage));

        const partition = isInteger ? 0 : 1;
        const result =  await producer.send({
            topic: "Students",
            messages: [
                {
                    "value": kafkaMessage,
                    "partition": partition
                }
            ]
        })

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();


    }
    catch(ex)
    {
        console.log(`Error Message: ${ex}`);
    }

}

