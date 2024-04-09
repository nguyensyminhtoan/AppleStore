import './SideBar.css'

import { NavLink } from 'react-router-dom';



const Sidebar = () =>
{


  return <div className='sidebar'>
    <NavLink to='/' className="sidebar__logo">
      DashBoard
    </NavLink>
    <div className="sidebar__menu">
      <p>NAVIGATION</p>
      <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/products'>
        Products
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/new-product'>
        Create Product
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/chat'>
        Chat
      </NavLink>
    </div>
  </div>;
};

export default Sidebar;