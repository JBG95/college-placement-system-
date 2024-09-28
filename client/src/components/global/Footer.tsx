import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Support", path: "/support" },
  ];

  return (
    <footer className="py-4 px-8 border-t border-slate-400 flex flex-col items-center w-full">
      <div className="text-slate-900 text-lg">
        &copy; 2024 CPS, All Rights Reserved.
      </div>

      <div className="flex gap-4 items-center my-2">
        {links.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}
      </div>

      <a
        href="https://dice-labs.vercel.app/"
        className="text-slate-600 text-sm"
      >
        Developed by DiCE Labs Innovations Ltd
      </a>
    </footer>
  );
};

export default Footer;
