import React from "react";
import styled from "styled-components";
import Input from "components/atoms/Input/Input";
import Icon from "components/atoms/Icon/Icon";

const Navigation = styled.nav`
  color: rgba(255, 255, 255, 0.6);
  margin: 40px 20px;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const FormCity = ({ change, submit, city }) => {
  return (
    <Navigation>
      <Form onSubmit={submit} autoComplete="off">
        <label htmlFor="input-city" />
        <Input
          value={city}
          onChange={change}
          type="text"
          id="input-city"
          placeholder="Enter city name"
          className="input-city"
        />
        <Icon magnifier />
        <label />
      </Form>
    </Navigation>
  );
};

export default FormCity;
