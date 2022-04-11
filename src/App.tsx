import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "./Container";
import CreateForm from "./CreateForm";
import SubmitForm from "./SubmitForm";
import ViewSubmissions from "./ViewSubmissions";

const App = (props: any) => {
  const [forms, setForms] = useState([
    {
      name: "Form 1",
      id: "form_1",
      formConfig: [
        {
          id: "field_0",
          name: "agasd",
          type: "text",
          description: "gesdf",
          dropdownValues: undefined,
        },
        {
          id: "field_1",
          name: "dropdown",
          type: "dropdown",
          description: "ok ok",
          dropdownValues: "1,2,3",
        },
        {
          id: "field_2",
          name: "checkbox input",
          type: "checkbox",
          description: "this is checkbbox",
          dropdownValues: undefined,
        },
      ],
      submissions: [],
      description: ''
    },
    // { name: "Form 2", id: "form_2",formConfig:{},submissions:[] },
    // { name: "Form 3", id: "form_3",formConfig:{},submissions:[] },
  ]);
  const addNewForm = (newForm: any) => {
    let newForms = [...forms, newForm];
    setForms(newForms);
  };

  return (
    <Container forms={forms}>
      {props.type === "new" ? (
        <CreateForm
          addNewForm={(newForm: any) => {
            addNewForm(newForm);
          }}
        ></CreateForm>
      ) : props.type === "enterData" ? (
        <SubmitForm forms={forms}></SubmitForm>
      ) : props.type === "viewData" ? (
        <ViewSubmissions forms={forms}></ViewSubmissions>
      ) : (
        <div>Welcome</div>
      )}
    </Container>
  );
};

export default App;
