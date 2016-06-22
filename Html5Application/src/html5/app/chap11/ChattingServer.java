package html5.app.chap11;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat") // 클라이언트가 접속할 때 사용될 URI
public class ChattingServer {

	private static final String GUEST_PREFIX = "손님";
	// AtomicInteger 클래스는 getAndIncrement()를 호출할 때마다 카운터를 1씩 증가하는 기능을 가지고 있다
	private static final AtomicInteger connectionIds = new AtomicInteger(0);
	// CopyOnWriteArraySet 을 사용하면 컬렉션에 저장된 객체를 좀더 간편하게 추출할 수 있다
	// 예를 들어, toArray()메소드를 통해 쉽게 Object[] 형의 데이터를 추출할 수 있다.
	private static final Set<ChattingServer> connections = new CopyOnWriteArraySet<>();

	private final String nickname;
	// 클라이언트가 새로 접속할 때마다 한개의 Session 객체가 생성된다.
	// Session 객체를 컬렉션에 보관하여 두고 해당 클라이언트에게 데이터를 전송할 때마다 사용한다
	private Session session;

	public ChattingServer() {
		// 클라이언트가 접속할 때마다 서버측에서는 Thread 가 새로 생성되는 것을 확인할 수 있다
		// getAndIncrement()은 카운트를 1 증가하고 증가된 숫자를 리턴한다
		nickname = GUEST_PREFIX + connectionIds.getAndIncrement();
		System.out.println("생성자: " + nickname);
	}

	@OnOpen
	public void start(Session session) {
		System.out.println("클라이언트 접속됨 " + session);
		// 접속자마다 한개의 세션이 생성되어 데이터 통신수단으로 사용됨
		this.session = session;
		connections.add(this);
		String message = String.format("[공지] %s %s", nickname, " 입장");
		broadcast(message);
	}

	@OnClose
	public void end() {
		connections.remove(this);
		String message = String.format("[공지] %s %s", nickname, " 퇴장");
		broadcast(message);
		try {
			session.close();
		} catch (IOException e) {
			System.out.println("사용자 접속 종료됨");
		}
	}

	// 현재 세션과 연결된 클라이언트로부터 메시지가 도착할 때마다 새로운 쓰레드가 실행되어 incoming()을 호출함
	@OnMessage
	public void incoming(String message) {
		if (message == null || message.trim().equals(""))
			return;
		String filteredMessage = String.format("%s: %s", nickname, message);
		broadcast(filteredMessage);
	}

	@OnError
	public void onError(Throwable t) throws Throwable {
		System.err.println("채팅 오류: " + t.toString());
	}

	// 현재 세션으로부터 도착한 메시지를 모든 접속자에게 전송한다
	private void broadcast(String msg) {

		for (ChattingServer client : connections) {
			try {
				synchronized (client) {
					// 서버에 접속 중인 모든 이용자에게 메지지를 전송한다
					client.session.getBasicRemote().sendText(msg);
				}
			} catch (IOException e) {
				// 메시지 전송 중에 오류가 발생(클라이언트 퇴장을 의미함)
				client.end();
			}
		}
	}
}
