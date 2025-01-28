import { useNavigate } from 'react-router-dom';

function Footer(): JSX.Element {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <footer className="flex items-center justify-between px-10 py-4 bg-gray-100 text-sm text-gray-700 border-t border-gray-300">
      {/* Name and Year in the center */}
      <div className="flex-1 text-center text-[#38436C]">
        © 2025 Placay
      </div>

      {/* Links on the right */}
      <div className="flex space-x-4">
        <span onClick={() => handleNavigate('/about')} className="cursor-pointer hover:text-blue-400 text-[#38436C]">
          About
        </span>
        <span onClick={() => handleNavigate('/legal')} className="cursor-pointer hover:text-blue-400 text-[#38436C]">
          Legal Notice
        </span>
      </div>
    </footer>
  );
}

export default Footer;