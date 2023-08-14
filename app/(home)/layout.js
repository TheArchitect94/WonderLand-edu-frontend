
import Footer from "@Components/Footer";
import Navbar from "@Components/Navbar";
import "@Styles/global.css";


export default function layout({ children }) {

  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
