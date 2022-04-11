import React from "react";

import { Layout, Menu } from "antd";
// import App from "./App";
import { Button } from "antd";
import CreateForm from "./CreateForm";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
export const Container = (props: any) => {
  let forms = [{ name: "Form 1",id:'form_1' }, { name: "Form 2",id:"form_2" }];
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
