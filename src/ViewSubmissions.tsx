import React from "react";
import { useParams } from "react-router-dom";
import { Table, Tag, Space } from "antd";
const ViewSubmissions = (props: any) => {
  let params = useParams();
  console.log("Submissions", props.forms);
  let formToView = props.forms.find((form: any) => form.id === params.id);
  console.log("Form to submit", props);
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
      // let textInput = getTextInput(field.id, field.name, field.description);
      // formProperties = { ...formProperties, ...textInput };
    } else if (field.type === "dropdown") {
      columns.push({
        title: field.name,
        dataIndex: `dropdown_${field.id}`,
        key: `dropdown_${field.id}`,
        render: (text: any) => text,
      });
      // let dropdownInput = getDropdownInput(
      //   field.id,
      //   field.name,
      //   field.description,
      //   field.dropdownValues
      // );
      // formProperties = { ...formProperties, ...dropdownInput };
    } else if (field.type === "checkbox") {
      // let checkboxInput = getCheckboxInput(
      //   field.id,
      //   field.name,
      //   field.description
      // );
      // formProperties = { ...formProperties, ...checkboxInput };
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
  //  columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text: any) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "age",
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "address",
  //     key: "address",
  //   },
  //   {
  //     title: "Tags",
  //     key: "tags",
  //     dataIndex: "tags",
  //     render: (tags: any) => (
  //       <>
  //         {tags.map((tag: any) => {
  //           let color = tag.length > 5 ? "geekblue" : "green";
  //           if (tag === "loser") {
  //             color = "volcano";
  //           }
  //           return (
  //             <Tag color={color} key={tag}>
  //               {tag.toUpperCase()}
  //             </Tag>
  //           );
  //         })}
  //       </>
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text: any, record: any) => (
  //       <Space size="middle">
  //         <a>Invite {record.name}</a>
  //         <a>Delete</a>
  //       </Space>
  //     ),
  //   },
  // ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div style={{ padding: "16px",height: '100vh' }} >
      {/* ViewSubmissions works! */}
      {/* {params.id} */}
      <div style={{padding: '16px',fontSize: '16px'}}>

      {"Name: " +( formToView.name||'')}
      </div>
      <div  style={{padding: '16px',fontSize: '16px'}}>

      {"Description: " +( formToView.description || '')}
      </div>
      <Table columns={columns} dataSource={dataa} />
    </div>
    // <FormProvider form={form}>
    //   <SchemaField schema={schema} />
    // </FormProvider>
  );
};
export default ViewSubmissions;
