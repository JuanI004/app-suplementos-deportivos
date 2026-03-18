import "./globals.css";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/store/provider";
const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "IronFuel",
  description:
    "el combustible que tu cuerpo necesita para superar cada entrenamiento.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>
          <div className="layout-wrapper">
            <div className="header">
              <Header />
            </div>
            <main className="main-content">{children}</main>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
