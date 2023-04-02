import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="relative aspect-square w-[4.5rem] overflow-hidden rounded-r-[1.25rem] bg-fem-violet-400"
    >
      <div className="h-1/2 bg-fem-violet-400"></div>
      <div className="h-1/2 rounded-tl-[1.25rem] bg-fem-violet-300"></div>
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="26"
      >
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
        />
      </svg>
    </Link>
  );
};

export default Logo;
