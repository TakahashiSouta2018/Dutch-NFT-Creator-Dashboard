import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* TODO: we should implemet dark/light functionality via state management system or LocalStorage */}
      <body className="dark:bg-dark-surface antialiased js-focus-visible">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
