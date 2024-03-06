package com.example.testland_back.config;

//import aj.org.objectweb.asm.TypeReference;
import com.example.testland_back.service.TestService;
import com.example.testland_back.socket.WebSocket;
import com.example.testland_back.util.Msg;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


@Component
public class RabbitMQConsumer {
   @Autowired
   private TestService testService;
   @Resource
   private WebSocket webSocket;

   @RabbitListener(queues = "resultQueue")
   public void handleMessage(String message) throws JsonProcessingException {

       // 处理接收到的消息
       System.out.println("Received message: " + message);
       ObjectMapper objectMapper = new ObjectMapper();

       // 将JSON字符串转换为Map<String, Object>
       Map<String, Object> map = objectMapper.readValue(message, new TypeReference<Map<String, Object>>() {});

       Msg result = testService.updateTestInfo(map);
       System.out.println("send message: " + result);
       webSocket.sendOneMessage(map.get("userId").toString(), objectMapper.writeValueAsString(result));
       System.out.println("done");
   }
}

