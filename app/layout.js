import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "IronFuel",
  description:
    "el combustible que tu cuerpo necesita para superar cada entrenamiento.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
