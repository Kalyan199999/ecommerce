import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout()
    navigate('/login');
  };

  console.log(user);
  

  return (

    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">ShopMate</Link>
      
      <div className="space-x-4">
        {
            user ? (
                <>
                  <Link to="/" className="text-orange-500 hover:underline font-medium">Home</Link>

            
                  <Link to="/orders" className="text-blue-600 hover:underline">My Orders</Link>
            
                  <span className="text-gray-700 font-medium">Hi, {user.user.name}</span>
            
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
            ) : 
            (
                <div className="space-x-4">
                  <Link to="/" className="text-orange-500 hover:underline font-medium">Home</Link>
                  <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
                  <Link to="/register" className="text-green-600 hover:underline font-medium">Register</Link>
                </div>
            )
          }
      </div>
    </nav>

  );
};

export default Navbar;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
  // const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem('user'));

  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   navigate('/login');
  // };

//   return (
//     <nav className="bg-white shadow-md p-4 flex justify-between items-center">
//       <Link to="/" className="text-2xl font-bold text-blue-600">ShopMate</Link>
      
//       <div className="space-x-4">
//         {user ? (
//           <>
//             <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
//             <Link to="/orders" className="text-blue-600 hover:underline">My Orders</Link>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
//             <Link to="/register" className="text-green-600 hover:underline font-medium">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
