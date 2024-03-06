package com.example.testland_back.config;


import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


@Component
public class RabbitMQProducer {
    public static final String TEST_QUEUE = "testQueue";
    public static final String TEST_EXCHANGE = "testExchange";


    // Create a test queue and an empty binding between the testExchange and the testQueue.
    @Bean("bootExchange")
    public Exchange bootExchange() {
        return ExchangeBuilder.topicExchange(TEST_EXCHANGE).durable(true).build();
    }
    //创建一个名为testQueue的队列，并将其发送到交换机
    @Bean("bootQueue")
    public Queue bootQueue() {
        return QueueBuilder.durable(TEST_QUEUE).build();
    }
    @Bean
    public Binding bindQueueExchange(@Qualifier("bootQueue") Queue queue, @Qualifier("bootExchange") Exchange exchange) {
        //
        return  BindingBuilder.bind(queue).to(exchange).with("boot.#").noargs();
    }

}
