import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import { Search, UserCircle, Heart, Home, Tv } from "lucide-react";

const Header = () => {
  const { logout, user } = useToken();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <header className={`text-white fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-red-600">
            Iclixx
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-gray-300">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/product" className="flex items-center space-x-1 hover:text-gray-300">
              <Tv size={18} />
              <span>Product</span>
            </Link>
            <Link to="/favorites" className="flex items-center space-x-1 hover:text-gray-300">
              <Heart size={18} />
              <span>Favorites</span>
            </Link>
          </nav>
        </div>

        {/* Search and Account */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 text-white px-3 py-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="bg-red-600 px-3 py-1 rounded-r-md hover:bg-red-700"
            >
              <Search size={18} />
            </button>
          </form>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1 hover:text-gray-300"
            >
              <UserCircle size={24} />
              <span className="hidden md:block">{user?.username || "Account"}</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
