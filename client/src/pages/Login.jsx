import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FirebaseAuth } from "../services/Firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BrandDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  background-color: #0ed3b0;
  color: black;
  font-size: 32px;
  font-weight: bold;
  height: 100vh;
`;

const Title = styled.h1`
  margin: 10px 0;
  padding: 10px;
  font-size: 50px;
  color: black;
`;

const SubTitle = styled.h2`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  color: black;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  background-color: #fff;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;
`;

const Input = styled.input`
  display: flex;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 25px 0;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #ededed;
  color: #000;

  &:hover {
    background-color: #0ed3b0;
    color: #000;
  }
`;

const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  // width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
  font-weight: bold;

  &:hover {
    background-color: #ededed;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    FirebaseAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            window.location.href = "/profile";

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };





  return (
    <Container>
      <BrandDiv>
        <Title>scannorder.co</Title>
        <SubTitle>
          The one solution for restaurants to manage orders, payments and
          rewards.
        </SubTitle>
      </BrandDiv>
      <FormDiv>
        <h1>Login</h1>
        <Form>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <LinkStyled to="/signup">Register</LinkStyled>
        </Form>
      </FormDiv>
    </Container>
  );
};

export default Login;
