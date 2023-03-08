import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FirebaseAuth, db } from "../services/Firebase";

const Input = styled.input`
  display: flex;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
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

  &:hover {background-color: #0ed3b0;
    color: #000;
  }
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // handle Submit should sign up the user, log them in, and redirect them to the profile page
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    FirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        // Add a new document in collection "users"
        db.collection("users")
          .doc(user.uid)
          .set({
            email: user.email,
            uid: user.uid,
          })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });

          // Redirect to create profile page: /create-profile
          window.location.href = "/create-profile";


      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);
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
        <h1>Sign Up</h1>
        <Form>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </Form>
        <LinkStyled to="/login">Log In</LinkStyled>
      </FormDiv>
    </Container>
  );
};

export default SignUp;
