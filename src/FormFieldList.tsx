import React from "react";
import FormFieldSelection from "./FormFieldSelection";
const FormFieldList = (props: any) => {
  return (
    <>
      {props.fieldList.map((field: any, index: any) => {
        return (
          <div key={"field_" + field.id}>
            <FormFieldSelection
              field={field}
            ></FormFieldSelection>
          </div>
        );
      })}
    </>
  );
};
export default FormFieldList;
