import React from 'react';
import SideNavbar from '@Components/SideNavbar';
import '@Styles/global.css';

export default function AdminLayout({ children }) {
return (
<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
<div style={{ flex: '0 0 auto' }}>
<SideNavbar />
</div>
<main style={{ flex: '1 0 auto', paddingLeft: '80px'}}>{children}</main>
</div>
);
}