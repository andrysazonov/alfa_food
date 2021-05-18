import React, { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  InjectedFormProps,
  reduxForm,
  Field,
  change,
  setSubmitFailed,
} from "redux-form";
import { register } from "../../redux/reducers/authReducer";
import { setFlagsFromString } from "v8";

interface Props {}

const RestaurantRegistrationPage = (props: Props) => {
  const [inputValues, setInputValues] = useState({
    name: "",
    address: "",
    desc: "",
    phone: "",
  });

  const changeValue = (e:any) => {
      console.log(inputValues)
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <input name="name" value={inputValues.name} placeholder="Название ресторана" onChange={(e)=>changeValue(e)} />
      <input name="address" value={inputValues.address} placeholder="Адрес" onChange={(e)=>changeValue(e)} />
      <input name="desc" value={inputValues.desc} placeholder="Описание" onChange={(e)=>changeValue(e)} />
      <input name="phone" value={inputValues.phone} placeholder="Телефон" onChange={(e)=>changeValue(e)} />

    </div>
  );
};

export default RestaurantRegistrationPage;
