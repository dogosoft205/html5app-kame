package html5.app.chap11;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/getTime")
public class ServerTimeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		res.setCharacterEncoding("utf-8");

		PrintWriter out = res.getWriter();
		out.println(getReadableDate(Calendar.getInstance().getTime()));
	}
	
	private String getReadableDate(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat("MM/dd - hh:mm:ss");
		return sdf.format(date);
	}
}
