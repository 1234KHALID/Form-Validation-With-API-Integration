import React, { useState } from "react";
import { initialValues, validationSchema } from "./validation";
import "./app.css";
import { useFormik } from "formik";
import axios from "axios";
const App = () => {
  const [checkBox, setCheckBox] = useState(false);
  const [typeError, setTypeError] = useState("");

  const submittedd = async (values) => {
    const formData = new FormData();
    formData.append("first_name", values.firstName);
    formData.append("last_name", values.lastName);
    formData.append("email", values.email);
    formData.append("dob", values.DateOfBirth);
    formData.append("c_address_s1", values.StreetOne);
    formData.append("c_address_s2", values.StreetTwo);
    formData.append("is_permanent_current_add", Number(checkBox));
    formData.append("p_address_s1", values.StreetPermanentOne);
    formData.append("p_address_s2", values.StreetPermanentTwo);
    values?.file?.forEach((element, i) => {
      formData.append(`documents[${i}][document_name]`, element?.fileName);
      formData.append(`documents[${i}][document_type]`, element?.fileType);
      formData.append(`documents[${i}][document_file]`, element?.fileSelect);
    });

    console.log(formData.get('firstName'), "hh")

    try {
      const response = await axios.post("https://reactjsmachinetestapi.xicom.us/v1/user/document-submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      console.log(response, "response")
    } catch (error) {
      console.log(error)
    }
  };

  const {
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setErrors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: submittedd,
  });

  const handleCheckedBox = (e) => {
    setCheckBox(e.target.checked);
    if (checkBox) {
      setFieldValue("StreetPermanentOne", "");
      setFieldValue("StreetPermanentTwo", "");
    } else {
      setFieldValue("StreetPermanentOne", values.StreetOne);
      setFieldValue("StreetPermanentTwo", values.StreetTwo);
    }
  };

  const handleFileSelector = (index, event, namee) => {
    if (event?.target?.files?.[0]?.type?.includes?.(values?.file?.[index]?.fileType)) {
      setTypeError(null);
      setFieldValue(`file[${index}].${namee}`, event.target.files[0]);
    } else {
      setTypeError("file type is not match");
    }
  };

  const handleFileNameChange = (index, event, namee) => {
    setFieldValue(`file[${index}].${namee}`, event.target?.value);
  };

  const handleFileNameBlur = (index, namee) => {
    setFieldTouched(`file[${index}].${namee}`, true);
  };

  return (
    <div className="container-form">
      <form
        action=""
        className="form-box"
        onSubmit={(e) => {
          e.preventDefault();
          if (values.file?.length > 1) handleSubmit(e);
          else alert("two file is required");
        }}
      >
        <div>
          <div className="box">
            <div>
              <div>
                <label>First name</label>
                <span>*</span>
              </div>
              <input
                type="text"
                className="input-box"
                name="firstName"
                placeholder="Enter first name here..."
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.firstName && errors.firstName ? (
                <p>{errors.firstName}</p>
              ) : null}
            </div>
            <div>
              <div>
                <label>Last name</label>
                <span>*</span>
              </div>
              <input
                type="text"
                className="input-box"
                name="lastName"
                placeholder="Enter last name here..."
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.lastName && errors.lastName ? (
                <p>{errors.lastName}</p>
              ) : null}
            </div>
          </div>
          <div className="box">
            <div>
              <div>
                <label>E-mail</label>
                <span>*</span>
              </div>
              <input
                type="email"
                name="email"
                className="input-box"
                placeholder="ex: xyz@gmail.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? <p>{errors.email}</p> : null}
            </div>
            <div>
              <div>
                <label>Date of Birth</label>
                <span>*</span>
              </div>
              <input
                type="date"
                className="input-box"
                value={values.DateOfBirth}
                name="DateOfBirth"
                placeholder="Enter Date of Birth here..."
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.DateOfBirth && errors.DateOfBirth ? (
                <p>{errors.DateOfBirth}</p>
              ) : null}
            </div>
          </div>
          <h1>Residential Address</h1>
          <div className="box">
            <div>
              <div>
                <label>Street 1</label>
                <span>*</span>
              </div>
              <input
                type="text"
                className="input-box"
                name="StreetOne"
                value={values.StreetOne}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.StreetOne && errors.StreetOne ? (
                <p>{errors.StreetOne}</p>
              ) : null}
            </div>
            <div>
              <div>
                <label>Street 2</label>
                <span>*</span>
              </div>
              <input
                type="text"
                className="input-box"
                name="StreetTwo"
                value={values.StreetTwo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.StreetTwo && errors.StreetTwo ? (
                <p>{errors.StreetTwo}</p>
              ) : null}
            </div>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                className="input-checkBox"
                checked={checkBox}
                onChange={handleCheckedBox}
              />
              Same as Residential Address
            </label>
          </div>
          <div>
            <h1>Permanent Address</h1>
          </div>
          <div className="box">
            <div>
              <div>
                <label>Street 1</label>
              </div>
              <input
                type="text"
                name="StreetPermanentOne"
                value={values.StreetPermanentOne}
                disabled={checkBox}
                className="input-box"
                onChange={handleChange}
              />
            </div>
            <div>
              <div>
                <label>Street 2</label>
              </div>
              <input
                type="text"
                className="input-box"
                name="StreetPermanentTwo"
                value={values.StreetPermanentTwo}
                disabled={checkBox}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <h1>Upload Documents</h1>
          </div>
          {values?.file?.map?.((e, index) => {
            return (
              <div className="box" key={index}>
                <div>
                  <div>
                    <label>File Name</label>
                    <span>*</span>
                  </div>
                  <input
                    type="text"
                    name="fileName"
                    value={values?.file[index]?.fileName}
                    onChange={(event) =>
                      handleFileNameChange(index, event, "fileName")
                    }
                    onBlur={() => handleFileNameBlur(index, "fileName")}
                  />
                  {touched?.file?.[index]?.fileName &&
                    errors?.file?.[index]?.fileName ? (
                    <p>{errors?.file?.[index]?.fileName}</p>
                  ) : null}
                </div>
                <div>
                  <div>
                    <label>Type of file</label>
                    <span>*</span>
                  </div>
                  <select
                    name="fileType"
                    value={values?.file[index]?.fileType}
                    onChange={(event) =>
                      handleFileNameChange(index, event, "fileType")
                    }
                    onBlur={() => handleFileNameBlur(index, "fileType")}
                  >
                    <option value="">Select type of file</option>
                    <option value="pdf">pdf</option>
                    <option value="jpg">jpg</option>
                    <option value="jpeg">jpeg</option>
                    <option value="png">png</option>
                  </select>
                  {touched?.file?.[index]?.fileType &&
                    errors?.file?.[index]?.fileType ? (
                    <p>{errors?.file?.[index]?.fileType}</p>
                  ) : null}
                </div>
                <div>
                  <div>
                    <label>Upload Document</label>
                    <span>*</span>
                  </div>
                  <input
                    type="file"
                    name="fileSelect"
                    // value={values?.file[index]?.fileSelect}
                    onChange={(event) =>
                      handleFileSelector(index, event, "fileSelect")
                    }
                    onBlur={() => handleFileNameBlur(index, "fileSelect")}
                  />
                  {typeError ? (
                    <p>{typeError}</p>
                  ) : touched?.file?.[index]?.fileSelect &&
                    errors?.file?.[index]?.fileSelect ? (
                    <p>{errors?.file?.[index]?.fileSelect}</p>
                  ) : null}
                </div>
                <div>
                  {index == 0 ? (
                    <button
                      className="add-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setFieldValue("file", [...values.file, {}]);
                      }}
                    >
                      +
                    </button>
                  ) : (
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setFieldValue(
                          "file",
                          values?.file?.filter((e, i) => i !== index)
                        );
                      }}
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
