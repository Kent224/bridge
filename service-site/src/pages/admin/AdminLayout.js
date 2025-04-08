import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1e0a3b;
  color: white;
  padding: var(--spacing-lg);
`;

const SidebarHeader = styled.div`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: var(--spacing-sm);
`;

const NavLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: var(--spacing-sm) 0;
  
  &:hover {
    color: white;
  }
  
  &.active {
    color: white;
    font-weight: var(--font-weight-bold);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: var(--spacing-xl);
  background: #f5f5f7;
`;

const AdminLayout = () => {
  return (
    <AdminContainer>
      <Sidebar>
        <SidebarHeader>Bridge 管理画面</SidebarHeader>
        <NavMenu>
          <NavItem>
            <NavLink to="/admin">ダッシュボード</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin/articles">記事管理</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin/users">ユーザー管理</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/admin/settings">設定</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/" target="_blank">サイトを表示</NavLink>
          </NavItem>
        </NavMenu>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </AdminContainer>
  );
};

export default AdminLayout; 