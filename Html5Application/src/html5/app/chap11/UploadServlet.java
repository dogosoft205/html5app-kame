package html5.app.chap11;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

@MultipartConfig
@WebServlet("/upload")
public class UploadServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		res.setCharacterEncoding("UTF-8");

		Part file = req.getPart("file");
		String filename = req.getParameter("fileName");
		byte[] buffer = new byte[256];

		try (InputStream filecontent = file.getInputStream();
				FileOutputStream output = new FileOutputStream(new File(filename));) {

			int len;
			while ((len = filecontent.read(buffer)) > 0) {
				output.write(buffer, 0, len);
			}
		}

		res.getWriter().write(filename + " 업로드 성공");
	}

}