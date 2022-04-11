import { Button } from "antd";
// import { randomUUID } from "crypto";
import React, { useState } from "react";
import FormDetail from "./FormDetail";
import FormFieldList from "./FormFieldList";
import FormFieldSelection from "./FormFieldSelection";
import { uniqueId } from "lodash-es";
var Ffields= [{
  id: "field_0",
  name: "",
  type: "text",
  description: "",
 
}];
const setFFields = (vals:any)=>{
  Ffields = [...vals];
}
export const CreateForm = (props: any) => {
  
 
  const [fields, setFields] = useState([
    {
      id: "field_0",
      name: "",
      type: "text",
      description: "",
      setValues: (id: any, vals: any) => {
        updateControlsFunction(id,vals);
      },
    },
  ]);
  const updateControlsFunction = (id:any,vals:any)=>{
    // const existingFields = fields.filter((entry) => entry.id !== id);
    // console.log('before update',{id,vals,existingFields});
    // const newFields = [
    //   ...existingFields,
    //   {
    //     id: id,
    //     ...vals,
    //   },
    // ];
    // console.log("New Fields", newFields);
    // setFields([...newFields]);
    const existingFieldVals = (Ffields||[]).filter((entry:any) => entry.id !== id);
    console.log('before update',{id,vals,existingFieldVals,fields});
    const newFieldVals = [
      ...(existingFieldVals||[]),
      {
        id: id,
        ...vals,
      },
    ];
    console.log("New Fields in setVals separate call not object",fields, newFieldVals);
    setFFields([...newFieldVals]);
  }
  const [fieldVals, setFieldVals] = useState([{ id: "field_0",
  name: "",
  type: "text",
  description: ""}]);
  const [formMetadata, setFormMetadata] = useState({
    name: "",
    description: "",
  });
  
  return (
    <div style={{ height: " 100%", paddingTop: "2rem" }}>
      <FormDetail
        setMetadata={(formM: any) => {
          setFormMetadata({ ...formM });
        }}
      />
      {/* Add New Column */}
      <>
        <Button
          type="primary"
          style={{ marginLeft: "8px" }}
          onClick={() => {
            console.log("New column existing fields",fields);
            let id= uniqueId("field_");
            // props.addField(form);
            let existingFields = fields;
            let vals = {
              name: "",
              type:
                fields.length > 0
                  ? fields.slice(-1)[0].type || "text"
                  : "text",
              description: "",
              dropdownValues:""
            }
            // const existingFieldVals = (fieldVals||[]).filter((entry) => entry.id !== id);
            // console.log('while adding column before',{id,vals,existingFieldVals,fields});
            // const newFieldVals = [
            //   ...(existingFieldVals),
            //   {
            //     id: id,
            //     ...vals,
            //   },
            // ];
            // console.log("New while adding column",fields, newFieldVals);
            // setFieldVals([...newFieldVals]);

            setFields([
              ...existingFields,
              {
                id: id,
                ...vals,
                setValues: (id: any, vals: any) => {
                  updateControlsFunction(id,vals);
                },
              },
            ]);

            
          
          }}
        >
          Add column
        </Button>
      </>
      {/* <div> */}
      {/* <FormFieldSelection
        addField={(val: any) => {
          console.log("Add new field to create form", {
            name: val.values.dataName,
            type: val.values.formType,
            description: val.values.description,
          });
          setFields([
            ...(fields || []),
            {
              name: val.values.dataName,
              type: val.values.formType,
              description: val.values.description,
            },
          ]);
        }}
      /> */}
      {/* </div> */}
      <div>
        <FormFieldList fieldList={fields} ></FormFieldList>
      </div>
      <div>
      {/* {fields.map((field: any, index: any) => {
        return (
            <FormFieldSelection 
             key={"field_" + field.id}
              field={field}
              fields={fields}
              setVals={(id:any,vals:any)=>{
                let existingFieldVals = (Ffields).filter(
                (entry: any) => entry.id !== id
              );
              console.log(" list call explicity", { id, vals, existingFieldVals });
              let newFieldVals = [
                ...existingFieldVals ,
                {
                  id: id,
                  ...vals,
                },
              ];
              console.log("list call explicity", {newFieldVals,fields,fieldVals});
              setFFields([...newFieldVals]);}}
            ></FormFieldSelection>
        );
      })} */}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "16px",
          }}
        >
          <Button type="default"> Cancel</Button>
          <Button
            type="primary"
            onClick={() => {
              console.log('FFields',Ffields);
              console.log("Field configuration", {
                name: formMetadata.name,
                description: formMetadata.description,
                formConfig: [...Ffields],
                id: uniqueId("form_"),
                submissions: [],
              });
              props.addNewForm({
                name: formMetadata.name,
                description: formMetadata.description,
                formConfig: [...Ffields],
                id: uniqueId("form_"),
                submissions: [],
              });
            }}
          >
            {" "}
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateForm;
