var Kafka = require('kafka-node'),
    HighLevelProducer = Kafka.HighLevelProducer,
    client = new Kafka.KafkaClient(),
    producer = new HighLevelProducer(client);

    


let Topics = ["getCompany","getPhoto","getJobs","getApplication","addApplication","deleteApplication"]



    producer.on("ready", function () {
  
        producer.createTopics(Topics,false,function(err,data){
            console.log(data)
            console.log("error",err)
        })
    })