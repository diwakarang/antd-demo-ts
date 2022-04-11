import { createForm, onFormValuesChange } from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/react";
import { Button } from "antd";
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { FormItem, Input, FormLayout, Select, Checkbox } from "@formily/antd";
const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
    Checkbox,
  },
});

const getTextInput = (id: string, name: string, description: string) => {
  return {
    ["text_" + id]: {
      type: "string",
      title: name,
      required: false,
      "x-decorator": "FormItem",
      "x-decorator-props": {
        style: {
          display: "flex",
          width: "500px",
          padding: "8px",
          verticalAlign: "center",
        },
        fullness: true,
        feedbackLayout: "none",
        labelWidth: "250px",
      },
      "x-component": "Input",
      "x-component-props": {
        placeholder: description,
      },
    },
  };
};
const getDropdownInput = (
  id: string,
  name: string,
  description: string,
  dropdownValues: string
) => {
  let values = dropdownValues.split(",").map((e) => ({
    label: e,
    value: e,
  }));
  // console.log("Values", values);
  return {
    ["dropdown_" + id]: {
      type: "string",
      title: name,
      required: false,
      enum: [...values],
      "x-decorator": "FormItem",
      "x-decorator-props": {
        style: {
          display: "flex",
          width: "500px",
          padding: "8px",
          verticalAlign: "center",
        },
        fullness: true,
        feedbackLayout: "none",
        labelWidth: "250px",
      },
      "x-component": "Select",
      "x-component-props": {
        placeholder: description,
        style: {
          width: 120,
        },
      },
    },
  };
};
const getCheckboxInput = (id: string, name: string, description: string) => {
  return {
    ["check_" + id]: {
      type: "boolean",
      title: name,
      "x-decorator": "FormItem",
      "x-component": "Checkbox",
      default:true,
      required: false,
      "x-decorator-props": {
        style: {
          display: "flex",
          width: "500px",
          padding: "8px",
          verticalAlign: "center",
        },
        labelWidth: "250px",
        fullness: true,
        feedbackLayout: "none",
      },
      "x-component-props": {
        placeholder: description,
      },
    },
  };
};
const SubmitForm = (props: any) => {
    const form = useMemo(
        () =>
          createForm({
            effects() {
              onFormValuesChange((form) => {
                // console.log("values changed", props);
              });
            },
          }),
        []
      );
  let formProperties = {};
  let params = useParams();
  let formToSubmit = props.forms.find((form: any) => form.id === params.id);
  // console.log("Form to submit", props);
  if (!formToSubmit) {
      return (<>error occured</>);
  }
  formToSubmit.formConfig.forEach((field: any) => {
    if (field.type === "text") {
      let textInput = getTextInput(field.id, field.name, field.description);
      formProperties = { ...formProperties, ...textInput };
    } else if (field.type === "dropdown") {
      let dropdownInput = getDropdownInput(
        field.id,
        field.name,
        field.description,
        field.dropdownValues
      );
      formProperties = { ...formProperties, ...dropdownInput };
    } else if (field.type === "checkbox") {
      let checkboxInput = getCheckboxInput(
        field.id,
        field.name,
        field.description
      );
      formProperties = { ...formProperties, ...checkboxInput };
    }
  });
  let schema = {
    type: "object",
    properties: {
      layout: {
        type: "void",
        "x-component": "FormLayout",
        "x-component-props": {
          labelCol: 10,
          wrapperCol: 10,
          layout: "vertical",
          colon: false,
          labelAlign: "left",
        },
        properties: {
          ...formProperties,
        },
      },
    },
  };

  const submitValues = () => {
    let newSubmission: { [key: string]: any } = {};
    Object.keys(formProperties).forEach((f) => {
      newSubmission[f] = form.values[f];
    });
    formToSubmit.submissions = [...formToSubmit.submissions, newSubmission];
  };
  
  return (
    <div style={{height: '100vh'}}>
      <div style={{ display: "flex",
            marginLeft: "auto",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "16px"}}>
        <Button type="primary"> 
        <Link to={`/viewdata/${formToSubmit.id}`}>View
        </Link>
        </Button>
      </div>

      <div>
        <FormProvider form={form}>
          <SchemaField schema={{ ...schema }} />
        </FormProvider>
      </div>
      <div style={{  display: "flex",
            marginLeft: "auto",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "16px", }}>
        <Button
          type="primary"
          onClick={() => {
            submitValues();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
export default SubmitForm;
