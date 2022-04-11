import React, { useMemo } from "react";
import { FormItem, Input, FormLayout } from "@formily/antd";
import { createForm, onFormMount, onFormValuesChange } from "@formily/core";
import { FormProvider } from "@formily/react";
import { Select } from "@formily/antd";
import { createSchemaField } from "@formily/react";

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
  },
});
const schema = {
  type: "object",
  properties: {
    layout: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {
        labelCol: 10,
        wrapperCol: 10,
        layout: "inline",
        colon: false,
        labelAlign: "left",
      },
      properties: {
        dataName: {
          type: "string",
          title: "",
          required: false,
          "x-decorator": "FormItem",
          "x-decorator-props": {
            style: {
              display: "flex",
              gap: "5px",
              padding: "8px",
              verticalAlign: "center",
              maxWidth: "350px",
              justifyContent: "space-between",
            },
            fullness: true,
            feedbackLayout: "none",
          },
          "x-component": "Input",
          "x-component-props": {
            placeholder: "Enter data name ...",
          },
        },
        formType: {
          type: "string",
          title: "",
          required: false,
          default: "text",
          enum: [
            { label: "Text", value: "text" },
            { label: "Dropdown", value: "dropdown" },
            { label: "CheckBox", value: "checkbox" },
          ],
          "x-decorator": "FormItem",
          "x-decorator-props": {
            style: {
              display: "flex",
              gap: "5px",
              padding: "8px",
              verticalAlign: "center",
              justifyContent: "space-between",
            },
            fullness: true,
            feedbackLayout: "none",
          },
          "x-component": "Select",
          "x-component-props": {
            placeholder: "Select field type ...",
            style: {
              width: 120,
            },
          },
        },
        description: {
          type: "string",
          title: "",
          required: false,
          "x-decorator": "FormItem",
          "x-decorator-props": {
            style: {
              display: "flex",
              gap: "5px",
              padding: "8px",
              verticalAlign: "center",
              maxWidth: "350px",
              justifyContent: "space-between",
            },
            fullness: true,
            feedbackLayout: "none",
          },
          "x-component": "Input",
          "x-component-props": {
            placeholder: "Enter description ...",
          },
        },
        dropdownValues: {
          type: "string",
          title: "",
          required: false,
          "x-decorator": "FormItem",
          "x-decorator-props": {
            style: {
              display: "flex",
              gap: "5px",
              padding: "8px",
              verticalAlign: "center",
              maxWidth: "350px",
              justifyContent: "space-between",
            },
            fullness: true,
            feedbackLayout: "none",
          },
          "x-component": "Input",
          "x-component-props": {
            placeholder: "Enter dropdown values ...",
          },
          "x-reactions": {
            dependencies: ["formType"],
            fulfill: {
              state: {
                visible: `{{$deps[0] ==='dropdown'}}`,
              },
            },
          },
        },
      },
    },
  },
};

const FormFieldSelection = (props: any) => {
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFormMount(() => {});
          onFormValuesChange((form) => {
            console.log("Form changes", form, {
              nane: form.values.dataName,
              type: form.values.type,
              description: form.values.description,
              values: form.values.dropdownValues,
            });
            if (
              form.values.dataName ||
              form.values.type ||
              form.values.description ||
              form.values.dropdownValues
            ) {
              props.field.setValues(props.field.id, {
                name: form.values.dataName,
                type: form.values.formType,
                description: form.values.description,
                dropdownValues: form.values.dropdownValues,
              });
            }
          });
        },
      }),
    []
  );

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          padding: "16px",
          margin: "16px 8px",
        }}
      >
        <FormProvider form={form}>
          <SchemaField schema={{ ...schema }} />
        </FormProvider>
      </div>
    </>
  );
};
export default FormFieldSelection;
