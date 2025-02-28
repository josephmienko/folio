import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Outlet } from "react-router-dom";
import AppAppBar from '../components/Navigation/AppAppBar';
import Footer from '../components/Footer';

export interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <div style={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <AppAppBar />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ 
            flex: 1,
            display: 'flex', 
            flexDirection: 'column',
            my: 16, 
            gap: 4 
          }}
        >
          {children || <Outlet />}
        </Container>
        <Footer />
      </div>
    </>
  );
}
