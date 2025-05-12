const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Branding / Text */}
          <div>
            <h2 className="text-xl font-bold">Job Search</h2>
            <p className="text-sm">© {new Date().getFullYear()} Our Company. All rights reserved.</p>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a
              href="https://www.hackerrank.com/profile/amangupta2534323"
              className="hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 512 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M477.5 128.9L277.3 10.3c-19.2-11.1-43.4-11.1-62.6 0L34.5 128.9C15.3 140 3.1 160.6 3.1 182.6v146.9c0 22 12.2 42.6 31.4 53.7l200.2 118.6c19.2 11.1 43.4 11.1 62.6 0l200.2-118.6c19.2-11.1 31.4-31.7 31.4-53.7V182.6c0-22-12.2-42.6-31.4-53.7zM363.5 334.7h-54.3l-79.3-111.4h-1.1v111.4h-52.6V174.3h55.2l78.3 111.4h1.1V174.3h52.6v160.4z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/aman-gupta-938a14225"
              className="hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
            <a
              href=" https://github.com/amangupt11"
              className="hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
