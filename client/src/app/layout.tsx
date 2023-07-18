"use client"
import './globals.css'
import React from 'react';
import { Button, Layout, Space, Divider } from 'antd';
import Head from '@/components/default/head';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  height: 64,
  backgroundColor: 'white',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '50px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <Layout className='h-screen'>
            <Sider style={siderStyle}>
              <h3>Auction</h3>
              <Divider />
            </Sider>
            <Layout>
              <Header style={headerStyle}>
                <Head />
              </Header>
              <Content style={contentStyle}> {children} </Content>
              <Footer style={footerStyle}>All rights reserved @2023 Tolga BAYRAK</Footer>
            </Layout>
          </Layout>
        </Space>
      </body>

    </html>
  )
}



