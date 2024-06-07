import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { useState, useEffect } from "react";
import { Tooltip, Input, Button, Form, Info, ImageInput } from "oolib";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/form-input");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log({ result });
        setData(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
    // Handle form submission, e.g., send data to API
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Form</h1>
      <ImageInput
        aspectRatio="5:3"
        containerShape="Rectangle"
        defaultImageSpread="Cover"
        dropzoneLabel="Add Image"
        dropzoneSublabel="Supports: <allowed formats>"
        enableCaptions
        size="Large"
      />
    </div>
  );
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
