import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import SubmitCode from '../view/User/SubmitCode';
import ProblemPieChart from '../components/ProblemPieChart';

export const waitTestInfo = (userId, title, problemId) => {
    // 创建WebSocket连接
    const socket = new WebSocket('ws://123.60.81.146:8080/websocket/' + userId);

    // 连接建立时触发
    socket.onopen = () => {
    console.log('WebSocket连接已建立');
    
    // 发送测试请求给后端
    const message = { type: 'testRequest', content: '测试请求' };
    socket.send(JSON.stringify(message));
    };

    // 接收到消息时触发
    socket.onmessage = (event) => {
    const receivedMessage = JSON.parse(event.data);
    console.log('接收到消息：', receivedMessage);
    if(receivedMessage.status === -2){
        // 重定向用户到登录页面
        // window.location = "/";
        localStorage.removeItem("user");
        // 弹窗警告
        alert("提交危险代码，该账户已被封禁，请联系管理员！");
        console.log("提交危险代码");
        // // 重定向用户到登录页面
        window.location = "/";
    }
    if (receivedMessage.status > 0 ||  window.location.pathname === '/problemDetails/' + problemId) {
        // 构造目标URL
        const targetURL = `/submitCode?problemId=${problemId}&title=${encodeURIComponent(title)}&userId=${userId}`;
        // 页面跳转
        window.location.href = targetURL;
        console.log("跳转到" + targetURL);
        
    }

    // 处理后端的通知
    if (receivedMessage.type === 'testCompletion') {
        console.log('测试完成');
    }
    };

    // 连接关闭时触发
    socket.onclose = () => {
    console.log('WebSocket连接已关闭');
    };
};

