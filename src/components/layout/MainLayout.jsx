import { Outlet } from 'react-router-dom';

import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

function MainLayout() {
  return (
    <div className="site-wrapper">
      <Navbar />

      <main id="main-content" className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;