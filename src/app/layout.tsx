import "./globals.css";

export const metadata = {
  title: "tenjify-web",
  description: "tenjify web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <footer className="py-4 text-center text-xs">© 2023 dqn</footer>
    </html>
  );
}
