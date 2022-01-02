var connection = new require('../../Kafka-connection/Connection');

function handleTopicRequests(topic_name, fname) {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('Kafka query request');
        console.log('topic: ',topic_name);
        console.log('Request data');
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname(data.data, function (err, res) {
            console.log('Kafka query response');
            console.log(JSON.stringify(res));
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                // console.log('Kafka query response');
                console.log(JSON.stringify(data));
            });
            return;
        });
    });
}


exports.handleTopicRequests = handleTopicRequests;