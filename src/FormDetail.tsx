import React, { useMemo } from "react";
import {
  NumberPicker,
  FormItem,
  Space,
  Input,
  FormLayout,
  FormButtonGroup,
  Submit,
} from "@formily/antd";
import { createForm, onFormValuesChange } from "@formily/core";
import { FormProvider, FormConsumer, Field } from "@formily/react";
import { FormGrid } from "@formily/antd";
import { Select } from "@formily/antd";
import { createSchemaField } from "@formily/react";
import "./FormDetail.css";

// const FormDetail =  () => {return ( <FormProvider form={form}>
//     <FormLayout
//     layout={["vertical"]}

//     labelCol={6} wrapperCol={10} labelAlign="left"
//     labelWidth={24} wrapperAlign="left" labelWrap={false} size="small" inset={false}>
//       <Field
//         name="name"
//         required
//         title="Name"
//         decorator={[FormItem]}
//         component={[Input]}
//       />
//       <Field
//         name="description"
//         required
//         title="description"
//         decorator={[FormItem]}
//         component={[Input]}
//       />
//       <FormButtonGroup.FormItem>
//         <Submit onSubmit={console.log}>Add Column</Submit>
//       </FormButtonGroup.FormItem>
//     </FormLayout></FormProvider>)}

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
            console.log(
              "metadata changes",
              form.values.nameInput,
              form.values.descriptionInput
            );
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
