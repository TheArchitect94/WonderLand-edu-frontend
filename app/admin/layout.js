

import "@Styles/global.css";


export default function Adminlayout({ children }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
