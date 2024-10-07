import React, { useState, useEffect } from 'react';
import { FaWarehouse, FaBoxOpen, FaTruck, FaChartLine, FaUsers, FaCogs, FaBars } from 'react-icons/fa';
import './styles/Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setActiveSubmenu(null);
    document.body.dispatchEvent(new CustomEvent('sidebarToggle', { detail: { isCollapsed: !isCollapsed } }));
  };

  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }, [isCollapsed]);

  const toggleSubmenu = (index) => {
    if (!isCollapsed) {
      setActiveSubmenu(activeSubmenu === index ? null : index);
    }
  };

  const handleMenuItemClick = (index) => {
    setActiveMenuItem(index);
    console.log(`Navigating to ${menuItems[index].text}`);
  };

  const menuItems = [
    { icon: FaWarehouse, text: 'Dashboard' },
    { 
      icon: FaBoxOpen, 
      text: 'Hàng hóa & Tồn kho',
      submenu: ['Danh mục sản phẩm', 'Quản lý tồn kho', 'Quản lý vị trí kho']
    },
    { 
      icon: FaTruck, 
      text: 'Nhập & Xuất kho',
      submenu: ['Quản lý nhập kho', 'Quản lý xuất kho', 'Kiểm tra chất lượng']
    },
    { icon: FaChartLine, text: 'Báo cáo & Thống kê' },
    { 
      icon: FaUsers, 
      text: 'Quản lý đối tác',
      submenu: ['Nhà cung cấp', 'Đại lý/Khách hàng']
    },
    { 
      icon: FaCogs, 
      text: 'Quản lý hệ thống',
      submenu: ['Cài đặt', 'Quản lý nhân sự', 'Phân quyền']
    },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <FaBars className="toggle-btn" onClick={toggleSidebar} />
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li 
            key={index} 
            className={`menu-item ${activeSubmenu === index ? 'active' : ''} ${activeMenuItem === index ? 'selected' : ''}`}
            onMouseEnter={() => toggleSubmenu(index)}
            onMouseLeave={() => !isCollapsed && setActiveSubmenu(null)}
            onClick={() => handleMenuItemClick(index)}
          >
            <div className="menu-item-content">
              <item.icon className="menu-icon" />
              {!isCollapsed && <span className="menu-text">{item.text}</span>}
            </div>
            {isCollapsed && <span className="tooltip">{item.text}</span>}
            {!isCollapsed && item.submenu && (
              <ul className={`submenu ${activeSubmenu === index ? 'show' : ''}`}>
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex} className="submenu-item">{subItem}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;