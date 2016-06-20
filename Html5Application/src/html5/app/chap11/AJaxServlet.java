package html5.app.chap11;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/ajax")
public class AJaxServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setCharacterEncoding("utf-8");

		String id = request.getParameter("id");
		String pass = request.getParameter("pass");
		System.out.println(id + " : " + pass);
		String msg = "";
		if ("hong".equals(id) && "1234".equals(pass)) {
			msg = "{\"ok\":\"" + id + "님 반갑습니다.\"}";
		} else {
			msg = "{\"err\":\"id 또는 pass를 확인하세요.\"}";
		}

		PrintWriter out = response.getWriter();
		out.println(msg);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		doGet(request, response);
	}
}
