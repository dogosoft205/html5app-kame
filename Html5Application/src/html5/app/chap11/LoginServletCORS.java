package html5.app.chap11;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@MultipartConfig
@WebServlet("/logincors")
public class LoginServletCORS extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		req.setCharacterEncoding("utf-8");
		res.setCharacterEncoding("utf-8");
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		//모든 도메인으로부터의 접속을 허용하기 위해 * 등록
		//res.setHeader("Access-Control-Allow-Origin", "*");
		
		String id = req.getParameter("id");
		String pass = req.getParameter("pass");
		String msg = "";
		if ("hong".equals(id) && "1234".equals(pass)) {
			msg="반갑습니다.";
		} else {
			msg = "id 또는 pass를 확인하세요.";
		}

		PrintWriter out = res.getWriter();
		out.println(msg);
	}
}
