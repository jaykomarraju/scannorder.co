import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FirebaseAuth, db } from '../services/Firebase';

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

const SmallInput = styled.input`
    display: flex;
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;

    border-radius: 4px;
    width: 100%;
`;

const LongInput = styled.input`
    display: flex;
    margin: 10px 0;
    padding: 10px;

    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

const StyledTextArea = styled.textarea`
    display: flex;
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;

    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

const FileInputStyled = styled.input`
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

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;





    width: 50%;
    background-color: #fff;




    height: 100vh;
`;

const CreateProfile = () => {
    // # 'restaurant_address': profile['restaurant_address'],
    // # 'restaurant_phone': profile['restaurant_phone'],
    // # 'restaurant_website': profile['restaurant_website'],
    // # 'restaurant_description': profile['restaurant_description'],
    // # 'restaurant_image': profile['restaurant_image'],
    // # 'restaurant_opening_hours': profile['restaurant_opening_hours'],
    // # 'restaurant_closing_hours': profile['restaurant_closing_hours']
    const [profile, setProfile] = useState({
        name: '',
        phone: '',
        website: '',
        description: '',
        image: '',
        opening_hours: '',
        closing_hours: '',
        address: '',
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        FirebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { 
            name,
            phone,
            website,
            description,
            image,
            opening_hours,
            closing_hours,
            address
         } = profile;
        const user = FirebaseAuth.currentUser;
        const uid = user.uid;
        const userRef = db.collection('users').doc(uid);
        userRef.set({
            email: user.email,
            id: uid,
            restaurant_name: name,
            profile_created: true,
            profile: {
                restaurant_address: address,
                restaurant_phone: phone,
                restaurant_website: website,
                restaurant_description: description,
                restaurant_image: image,
                restaurant_opening_hours: opening_hours,
                restaurant_closing_hours: closing_hours
            },
            menu_created: false,
            menu: []

        })
        .then(() => {
            console.log('Document successfully written!');
            window.location.href = '/profile';
        }
        )
        .catch((error) => {
            console.error('Error writing document: ', error);
        });

    };

    return (
        <Container>
            <FormStyled onSubmit={handleSubmit}>
                <Title>Create Profile</Title>
                <SmallInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={profile.name}
                    onChange={handleChange}
                />
                <SmallInput
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={profile.phone}
                    onChange={handleChange}
                />
                <SmallInput
                    type="text"
                    name="website"
                    placeholder="Website"
                    value={profile.website}
                    onChange={handleChange}
                />
                <StyledTextArea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={profile.description}
                    onChange={handleChange}
                />
                <SmallInput
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={profile.address}
                    onChange={handleChange}
                />
                <FileInputStyled
                    type="file"
                    name="image"
                    placeholder="Image"
                    value={profile.image}
                    onChange={handleChange}
                />
                <SmallInput
                    type="time"
                    name="opening_hours"
                    placeholder="Opening Hours"
                    value={profile.opening_hours}
                    onChange={handleChange}
                />
                <SmallInput
                    type="time"
                    name="closing_hours"
                    placeholder="Closing Hours"
                    value={profile.closing_hours}
                    onChange={handleChange}
                />
                <Button type="submit">SAVE PROFILE</Button>
            </FormStyled>
        </Container>
    );
}

export default CreateProfile;