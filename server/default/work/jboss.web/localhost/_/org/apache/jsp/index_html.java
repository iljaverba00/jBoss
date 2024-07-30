package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_html extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<!DOCTYPE html>\r\n");
      out.write("<html translate=no>\r\n");
      out.write("<head>\r\n");
      out.write("    <base href=/>\r\n");
      out.write("    <title>GSEE Web Application</title>\r\n");
      out.write("    <style scoped>.init-loading-container {\r\n");
      out.write("      display: block !important;\r\n");
      out.write("      position: fixed;\r\n");
      out.write("      margin: 0;\r\n");
      out.write("      z-index: 9000;\r\n");
      out.write("      width: 100vw;\r\n");
      out.write("      height: 100vh;\r\n");
      out.write("      background-color: rgb(255, 255, 255);\r\n");
      out.write("    }\r\n");
      out.write("\r\n");
      out.write("    .init-loading-spinner {\r\n");
      out.write("      width: 150px;\r\n");
      out.write("      height: 150px;\r\n");
      out.write("      color: #1976d2;\r\n");
      out.write("      position: absolute;\r\n");
      out.write("      margin: auto;\r\n");
      out.write("      top: 0;\r\n");
      out.write("      right: 0;\r\n");
      out.write("      bottom: 0;\r\n");
      out.write("      left: 0;\r\n");
      out.write("    }\r\n");
      out.write("\r\n");
      out.write("    .init-loading-spinner svg path {\r\n");
      out.write("      transform-origin: center center;\r\n");
      out.write("    }\r\n");
      out.write("\r\n");
      out.write("    .init-loading-spinner svg path.gear-1 {\r\n");
      out.write("      animation: 4s linear infinite rotate1;\r\n");
      out.write("    }\r\n");
      out.write("\r\n");
      out.write("    .init-loading-spinner svg path.gear-2 {\r\n");
      out.write("      animation: 4s linear infinite rotate2;\r\n");
      out.write("    }\r\n");
      out.write("\r\n");
      out.write("    @keyframes rotate1 {\r\n");
      out.write("      from {\r\n");
      out.write("        transform: rotate(0);\r\n");
      out.write("      }\r\n");
      out.write("\r\n");
      out.write("      to {\r\n");
      out.write("        transform: rotate(-360deg);\r\n");
      out.write("      }\r\n");
      out.write("    }\r\n");
      out.write("\r\n");
      out.write("    @keyframes rotate2 {\r\n");
      out.write("      from {\r\n");
      out.write("        transform: rotate(0);\r\n");
      out.write("      }\r\n");
      out.write("\r\n");
      out.write("      to {\r\n");
      out.write("        transform: rotate(360deg);\r\n");
      out.write("      }\r\n");
      out.write("    }\r\n");
      out.write("    </style>\r\n");
      out.write("    <meta charset=utf-8>\r\n");
      out.write("    <meta name=description content=\"\">\r\n");
      out.write("    <meta name=format-detection content=\"telephone=no\">\r\n");
      out.write("    <meta name=msapplication-tap-highlight content=no>\r\n");
      out.write("    <meta name=viewport content=\"user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width\">\r\n");
      out.write("    <script>if (globalThis === undefined) {\r\n");
      out.write("      var globalThis = window;\r\n");
      out.write("    }\r\n");
      out.write("    </script>\r\n");
      out.write("    <link rel=icon type=image/png sizes=128x128 href=logo/geocad_logo_128x128.png>\r\n");
      out.write("    <link rel=icon type=image/png sizes=96x96 href=logo/geocad_logo_96x96.png>\r\n");
      out.write("    <link rel=icon type=image/png sizes=32x32 href=logo/geocad_logo_32x32.png>\r\n");
      out.write("    <link rel=icon type=image/png sizes=16x16 href=logo/geocad_logo_16x16.png>\r\n");
      out.write("    <script defer src=/js/vendor.d2b99675.js></script>\r\n");
      out.write("    <script defer src=/js/app.7631baba.js></script>\r\n");
      out.write("    <link href=/css/vendor.bac6f21d.css rel=stylesheet>\r\n");
      out.write("    <link href=/css/app.35facf5d.css rel=stylesheet>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("<div class=init-loading-container style=\"display: none;\">\r\n");
      out.write("    <div class=init-loading-spinner>\r\n");
      out.write("        <svg width=100% height=100% viewBox=\"0 0 100 100\" preserveAspectRatio=xMidYMid xmlns=http://www.w3.org/2000/svg>\r\n");
      out.write("            <g transform=translate(-20,-20)>\r\n");
      out.write("                <path d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"\r\n");
      out.write("                      fill=currentColor class=gear-1></path>\r\n");
      out.write("            </g>\r\n");
      out.write("            <g transform=\"translate(20,20) rotate(15 50 50)\">\r\n");
      out.write("                <path d=\"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z\"\r\n");
      out.write("                      fill=currentColor class=gear-2></path>\r\n");
      out.write("            </g>\r\n");
      out.write("        </svg>\r\n");
      out.write("    </div>\r\n");
      out.write("</div>\r\n");
      out.write("<script>(function () {\r\n");
      out.write("      window.addEventListener('DOMContentLoaded', removeLoading, { once: true });\r\n");
      out.write("      function removeLoading() {\r\n");
      out.write("        var loadingContainer = document.querySelector('.init-loading-container');\r\n");
      out.write("        loadingContainer.parentElement.removeChild(loadingContainer);\r\n");
      out.write("      };\r\n");
      out.write("    })();\r\n");
      out.write("</script>\r\n");
      out.write("<div id=q-app></div>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
