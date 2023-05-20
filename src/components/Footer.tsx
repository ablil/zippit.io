import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center flex-col py-24">
      <article className="flex items-center justify-center py-4">
        <a
          className="underline px-4 text-sm opacity-80 hover:opacity-100"
          target="_blank"
          href="https://github.com/ablil/zippit.io"
        >
          Github
        </a>
        <a
          className="underline px-4 text-sm opacity-80 hover:opacity-100"
          target="_blank"
          href="https://github.com/ablil/zippit.io/issues"
        >
          Report issue
        </a>
      </article>
      <p>&copy;All rights reserved {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
