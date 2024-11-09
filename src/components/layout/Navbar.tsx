import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Home, Briefcase, MessageSquare, Users, Network, X, LogIn, Settings } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';

interface NavbarProps {
  onSearch: (value: string) => void;
}

type SearchCategory = 'all' | 'jobs' | 'forums' | 'chats' | 'people';

export function Navbar({ onSearch }: NavbarProps) {
  const { user } = useAuth();
  const { chats, messages } = useChat();
  const navigate = useNavigate();
  const [searchCategory, setSearchCategory] = useState<SearchCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const getUnreadCount = () => {
    if (!user) return 0;
    return messages.filter(m => 
      !m.readBy.includes(user.id) && 
      chats.find(c => c.id === m.chatId)?.participants.includes(user.id)
    ).length;
  };

  const unreadCount = getUnreadCount();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { icon: Users, label: 'Network', path: '/network' },
    { icon: MessageSquare, label: 'Forums', path: '/forums' },
  ];

  if (user) {
    navItems.push({ icon: Settings, label: 'Settings', path: '/settings' });
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="h-[116px]"></div>
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        {/* Global Search Bar */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center">
              <div className="flex-1 flex items-center">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value as SearchCategory)}
                  className="mr-2 rounded-md border-gray-300 py-1.5 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option value="all">All</option>
                  <option value="jobs">Jobs</option>
                  <option value="people">People</option>
                  <option value="forums">Forums</option>
                  <option value="chats">Chats</option>
                </select>
                <div className="w-full max-w-lg lg:max-w-xs relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="search"
                    placeholder={`Search ${searchCategory === 'all' ? 'everything' : searchCategory}...`}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-400 lg:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="relative">
                    <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <Bell className="h-6 w-6" />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  </div>
                  <UserMenu />
                </>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-40">
              {/* Background overlay */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-25" 
                onClick={toggleMobileMenu}
              ></div>

              {/* Menu panel */}
              <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50">
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="mt-2 px-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="flex items-center px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      onClick={toggleMobileMenu}
                    >
                      <item.icon className="h-6 w-6 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  {!user && (
                    <Link
                      to="/auth"
                      className="flex items-center px-3 py-3 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                      onClick={toggleMobileMenu}
                    >
                      <LogIn className="h-6 w-6 mr-3" />
                      <span>Sign In</span>
                    </Link>
                  )}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}