import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Shop zee</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/admin">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
