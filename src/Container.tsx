import React from "react";
import { Layout, Menu } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
export const Container = (props: any) => {
  return (
    <Layout>
      <Sider>
        <Button type="primary">
          <Link to="/new">Create</Link>
        </Button>
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          {props.forms.map((form: any, index: any) => (
            <Menu.Item key={index + 1}>
              <Link to={`/enterData/${form.id}`}>{form.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>{props.children}</Layout>
    </Layout>
  );
};
