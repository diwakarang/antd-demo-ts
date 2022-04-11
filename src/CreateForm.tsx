import { Button } from "antd";
import React, { useState } from "react";
import FormDetail from "./FormDetail";
import FormFieldList from "./FormFieldList";
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
    const existingFieldVals = (Ffields||[]).filter((entry:any) => entry.id !== id);
    const newFieldVals = [
      ...(existingFieldVals||[]),
      {
        id: id,
        ...vals,
      },
    ];
    setFFields([...newFieldVals]);
  }
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
      
      <div>
        <FormFieldList fieldList={fields} ></FormFieldList>
      </div>
      <div>
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
