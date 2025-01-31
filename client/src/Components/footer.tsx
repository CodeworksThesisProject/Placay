import { useNavigate } from 'react-router-dom';

function Footer(): JSX.Element {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <footer className="z-[9999] fixed bottom-0 left-0 w-full bg-gray-100 text-sm text-gray-700 border-t border-gray-300 py-4 flex items-center justify-between px-10">
      {/* Name and Year */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-[#38436C]">
        © 2025 Placay
      </div>

      {/* Links */}
      <div className="ml-auto flex space-x-4">
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