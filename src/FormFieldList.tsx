import React, { useState } from "react";
import FormFieldSelection from "./FormFieldSelection";
const FormFieldList = (props: any) => {
  let fieldsValsInitial = props.fieldList.map((e:any) => {
    return { ...e };
  });
  const [fieldVals, setFieldVals] = useState([...fieldsValsInitial]);
  // @ts-ignore
  window["list"] = fieldVals;
  function handleList(id: any, vals: any) {
    const existingFieldVals = (fieldVals || []).filter(
      (entry: any) => entry.id !== id
    );
    console.log(" list component", { id, vals, existingFieldVals });
    const newFieldVals = [
      ...(existingFieldVals || []),
      {
        id: id,
        ...vals,
      },
    ];
    console.log("list component", newFieldVals);
    setFieldVals([...newFieldVals]);
  }
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
