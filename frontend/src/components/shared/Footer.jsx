import { Briefcase, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const footerColumns = [
  {
    title: "For Job Seekers",
    links: [
      { label: "Browse Jobs", to: "/browse" },
      { label: "Find Jobs", to: "/jobs" },
      { label: "Saved Jobs", to: "/jobs" },
      { label: "Create Profile", to: "/signup" },
      { label: "Login", to: "/login" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Post a Job", to: "/admin/jobs/create" },
      { label: "Manage Companies", to: "/admin/companies" },
      { label: "Recruiter Dashboard", to: "/admin/jobs" },
      { label: "Pricing", to: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "#" },
      { label: "Careers", to: "#" },
      { label: "Blog", to: "#" },
      { label: "Contact", to: "#" },
    ],
  },
];

const socials = [
  { href: "https://www.hackerrank.com/profile/amangupta2534323", label: "HackerRank", viewBox: "0 0 512 512", path: "M477.5 128.9L277.3 10.3c-19.2-11.1-43.4-11.1-62.6 0L34.5 128.9C15.3 140 3.1 160.6 3.1 182.6v146.9c0 22 12.2 42.6 31.4 53.7l200.2 118.6c19.2 11.1 43.4 11.1 62.6 0l200.2-118.6c19.2-11.1 31.4-31.7 31.4-53.7V182.6c0-22-12.2-42.6-31.4-53.7zM363.5 334.7h-54.3l-79.3-111.4h-1.1v111.4h-52.6V174.3h55.2l78.3 111.4h1.1V174.3h52.6v160.4z" },
  { href: "https://www.linkedin.com/in/aman-gupta-938a14225", label: "LinkedIn", viewBox: "0 0 24 24", path: "M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" },
  { href: "https://github.com/amangupt11", label: "GitHub", viewBox: "0 0 24 24", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
];

const Footer = () => {
  const subscribeHandler = (e) => {
    e.preventDefault();
    const email = e.target.elements.newsletter?.value?.trim();
    if (!email) return;
    toast.success("Thanks for subscribing — we'll keep you posted!");
    e.target.reset();
  };

  return (
    <footer className="border-t border-border/70 bg-card/40">
      {/* Top: brand + link columns */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-5 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-primary-foreground shadow-sm">
                <Briefcase className="h-5 w-5" />
              </span>
              <h2 className="font-display text-xl font-bold tracking-tight">
                Job<span className="text-gradient">Portal</span>
              </h2>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Search, apply and land your best job. Thousands of opportunities across every
              industry — connecting talented candidates with companies that are hiring.
            </p>

            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@jobportal.com</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Bengaluru, India</p>
            </div>

            {/* Newsletter */}
            <form onSubmit={subscribeHandler} className="mt-6">
              <label htmlFor="newsletter" className="text-sm font-semibold">Stay in the loop</label>
              <p className="mb-2 text-xs text-muted-foreground">Get the latest jobs and hiring tips in your inbox.</p>
              <div className="flex max-w-sm items-center gap-2">
                <Input id="newsletter" name="newsletter" type="email" placeholder="you@example.com" className="h-10" />
                <Button type="submit" variant="gradient" className="h-10 shrink-0">Subscribe</Button>
              </div>
            </form>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="md:col-span-3 lg:col-span-2 lg:col-start-auto">
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-foreground">Cookies</a>
          </nav>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
              >
                <svg className="h-4 w-4" viewBox={s.viewBox} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
