import React from 'react'
import { Outlet, Link } from "react-router-dom";
function SidebarContent() {
  return (
    <div>
      <div className="sidebar-content">
        <div className="sidebar">
          <div className="uppericons">
            <div className="common"><Link to="/connectwallet"><i className="fa-solid fa-wallet"></i></Link></div>
            <div className="common"><Link to="/election"><i class="fas fa-home"></i></Link></div>
            <div className="common"><Link to="/dashboard"><i class="fa-solid fa-tv"></i></Link></div>
          </div>
          <div className="lowericon">
            <div className="common"><Link to="/Approvals"><i class="fas fa-user-shield"></i>
            </Link></div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default SidebarContent
