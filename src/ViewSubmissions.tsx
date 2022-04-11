import React from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
const ViewSubmissions = (props: any) => {
  let params = useParams();
  let formToView = props.forms.find((form: any) => form.id === params.id);
  let columns: any[] = [];
  if (!formToView) {
    return <>error occured</>;
  }
  formToView.formConfig.forEach((field: any) => {
    if (field.type === "text") {
      columns.push({
        title: field.name,
        dataIndex: `text_${field.id}`,
        key: `text_${field.id}`,
        render: (text: any) => text,
      });
    } else if (field.type === "dropdown") {
      columns.push({
        title: field.name,
        dataIndex: `dropdown_${field.id}`,
        key: `dropdown_${field.id}`,
        render: (text: any) => text,
      });
    } else if (field.type === "checkbox") {
      columns.push({
        title: field.name,
        dataIndex: `check_${field.id}`,
        key: `check_${field.id}`,
        render: (val: boolean) => (val ? "true" : "false"),
      });
    }
  });

  const dataa = formToView.submissions.map((val: any, index: any) => ({
    key: index,
    ...val,
  }));
  return (
    <div style={{ padding: "16px", height: "100vh" }}>
      <div style={{ padding: "16px", fontSize: "16px" }}>
        {"Name: " + (formToView.name || "")}
      </div>
      <div style={{ padding: "16px", fontSize: "16px" }}>
        {"Description: " + (formToView.description || "")}
      </div>
      <Table columns={columns} dataSource={dataa} />
    </div>
  );
};
export default ViewSubmissions;
