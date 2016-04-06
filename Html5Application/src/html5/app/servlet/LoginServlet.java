package html5.app.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;


	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		out.println(getParams(request));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		doGet(request, response);
	}
	
	private StringBuffer getParams(HttpServletRequest req){
		StringBuffer buffer = new StringBuffer();
		Enumeration<String> pnames = req.getParameterNames();
		while(pnames.hasMoreElements()){
			String key = pnames.nextElement();
			String value = req.getParameter(key);
			if(value!=null){
				buffer.append(key+" : "+value+"\n");
			}else{
				buffer.append(key+"----------------\n");
				String [] values = req.getParameterValues(key);
				for(String data : values){
					buffer.append("\t"+data+"\n");
				}
			}
		}
		return buffer;
	}

}
