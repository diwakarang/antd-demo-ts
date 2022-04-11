import React, { useMemo } from "react";
import {
  FormItem,
  Input,
  FormLayout,
} from "@formily/antd";
import { createForm, onFormValuesChange } from "@formily/core";
import { FormProvider} from "@formily/react";
import { Select } from "@formily/antd";
import { createSchemaField } from "@formily/react";
import "./FormDetail.css";

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
        layout: "vertical",
        colon: false,
        labelAlign: "left",
      },
      properties: {
        nameInput: {
          type: "string",
          title: "Name",
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
            placeholder: "Enter form name ...",
          },
        },
        descriptionInput: {
          type: "string",
          title: "Description",
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
            placeholder: "Enter form description ...",
          },
        },
      },
    },
  },
};

const FormDetail = (props: any) => {
  const form = useMemo(
    () =>
      createForm({
        effects() {
          onFormValuesChange((form) => {
            props.setMetadata({
              name: form.values.nameInput,
              description: form.values.descriptionInput,
            });
          });
        },
      }),
    []
  );

  return (
    <FormProvider form={form}>
      <SchemaField schema={schema} />
    </FormProvider>
  );
};
export default FormDetail;
