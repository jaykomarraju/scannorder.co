import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FirebaseAuth, db } from "../services/Firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 10px 0;
  padding: 10px;
  font-size: 50px;
  color: black;
  font-weight: 500;
`;

const StyledLabel = styled.label`
  display: flex;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
`;

const ProfileElement = styled.div`
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

  &:hover {
    background-color: #0ed3b0;
    color: #000;
  }
`;

const RestaurantTitle = styled.h1`
  margin: 10px 0;
  padding: 10px;
  font-size: 50px;
  color: black;
  font-weight: 500;
`;

const RestaurantDescription = styled.p`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-weight: 500;
`;

const RestaurantWebsite = styled.p`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-weight: 500;
`;

const RestaurantOpeningHours = styled.p`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-weight: 500;
  border-radius: 24px;
  background-color: #ededed;
`;

const RestaurantClosingHours = styled.p`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-weight: 500;
  border-radius: 24px;
  background-color: #ededed;
`;

const RestaurantPhone = styled.p`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-weight: 500;
`;

const RestaurantAddress = styled.p`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-weight: 500;
`;

const RestaurantImage = styled.img`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  color: black;
  font-weight: 500;
`;

const Rower = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  background-color: #fff;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 24px;
    background-color: #ededed;
    &:hover {
        background-color: #0ed3b0;
        color: #000;
    }
`;


// profile page must display the user's email address
const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);
  const [description, setDescription] = useState(null);
  const [website, setWebsite] = useState(null);
  const [openingHours, setOpeningHours] = useState(null);
  const [closingHours, setClosingHours] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    console.log("hi");
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user: ", user);
        setUser(user);

        console.log(user.restaurant_name);
        setEmail(user.email);

        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());

              // profile is at: (doc.data().profile) but objects are not valid as a React child
              // therefore, we need to convert it to a format that is valid
              // we can do this by using JSON.stringify
              setName(doc.data().restaurant_name);
              setProfile(JSON.stringify(doc.data().profile));
              // console.log(doc.data().profile.restaurant_description);
              // console.log(doc.data().profile.restaurant_website);
              // console.log(doc.data().profile.restaurant_website);
              // console.log(doc.data().profile.restaurant_opening_hours);
              // console.log(doc.data().profile.restaurant_closing_hours);
              // console.log(doc.data().profile.restaurant_phone);
              // console.log(doc.data().profile.restaurant_address);

              setAddress(doc.data().profile.restaurant_address);
              setPhone(doc.data().profile.restaurant_phone);
              setClosingHours(doc.data().profile.restaurant_closing_hours);
              setOpeningHours(doc.data().profile.restaurant_opening_hours);
              setWebsite(doc.data().profile.restaurant_website);
              setDescription(doc.data().profile.restaurant_description);

              // console.log(doc.data().profile.restaurant_image);
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        setUser(null);
      }
    });
  }, []);

  const logout = () => {
    FirebaseAuth.signOut();

    window.location.href = "/login";
  };

  return (
    <Container>
      {/* effectively place all elements of the profile section to optimize screen real estate */}
      {/* <ProfileElement>
                <RestaurantTitle>{name}</RestaurantTitle>
                <RestaurantDescription>{description}</RestaurantDescription>
                <RestaurantWebsite>{website}</RestaurantWebsite>
                <RestaurantOpeningHours>{openingHours}</RestaurantOpeningHours>
                <RestaurantClosingHours>{closingHours}</RestaurantClosingHours>
                <RestaurantPhone>{phone}</RestaurantPhone>
                <RestaurantAddress>{address}</RestaurantAddress> */}
      {/* <RestaurantImage src={image} alt="Restaurant Image" /> */}
      {/* </ProfileElement> */}
      <ProfileElement>
        <Rower>
          <Column>
            <RestaurantTitle>{name}</RestaurantTitle>
            <RestaurantDescription>{description}</RestaurantDescription>
            <RestaurantWebsite>{website}</RestaurantWebsite>
          </Column>
          <Column>
            <RestaurantOpeningHours>{openingHours}</RestaurantOpeningHours>
            <RestaurantClosingHours>{closingHours}</RestaurantClosingHours>
            <RestaurantPhone>{phone}</RestaurantPhone>
            <RestaurantAddress>{address}</RestaurantAddress>
          </Column>
        </Rower>
        <StyledLink to="/menu">MENU</StyledLink>
        {/* <RestaurantImage src={image} alt="Restaurant Image" /> */}

        <Button onClick={logout}>Logout</Button>
      </ProfileElement>
    </Container>
  );
};

export default Profile;
