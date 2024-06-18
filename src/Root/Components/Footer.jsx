import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col justify-around gap-5 bg-sky-50 py-8 text-black">
        <nav className="text-lg">
          <ul className="flex h-full flex-wrap items-center justify-center gap-3">
            <li>
              <a className="cursor-pointer hover:underline">Home</a>
            </li>
            <li>
              <Link
                to={"/allproperties"}
                className="cursor-pointer hover:underline"
              >
                Properties
              </Link>
            </li>
            <li>
              <Link
                to={"/dashboard"}
                className="cursor-pointer hover:underline"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        <aside className="text-center text-sm">
          <p>&copy; 2024 HomeHub. All Rights Reserved.</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
