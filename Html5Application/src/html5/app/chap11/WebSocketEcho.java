package html5.app.chap11;

import java.io.IOException;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/echo")
public class WebSocketEcho {
	@OnOpen
	public void open(Session session) {
		System.out.println("Session 연결 : " + session.getId());
	}

	@OnMessage
	public void echoTextMessage(Session session, String msg) {
		if (session.isOpen()) {
			System.out.println("서버 메시지 수신: " + msg);
			session.getAsyncRemote().sendText("서버 에코: " + msg);
		}
	}

	@OnError
	public void error(Session session, Throwable e) {
		System.out.println("error 발생: " + e.getMessage());
	}

	@OnClose
	public void close(Session session, CloseReason reason) {
		System.out.println("session 종료: " + reason.getReasonPhrase());
	}
}
