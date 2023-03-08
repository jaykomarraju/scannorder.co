// A menu item consists of a name, description, price, and image.
// MenuItemCard is a component that displays the menu item.
// MenuItemForm is a component that displays the form for adding/editing a menu item.

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { db } from "../services/Firebase";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #0ed3b0;
    border-radius: 4px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 4px;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0 10px;
`;

const Name = styled.h1`
    margin: 10px 0;
    padding: 10px;
    font-size: 30px;
    color: black;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Description = styled.p`
    margin: 10px 0;
    padding: 10px;
    font-size: 20px;
    color: black;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const Price = styled.p`
    margin: 10px 0;
    padding: 10px;
    font-size: 20px;
    color: black;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 25px 0;
    padding: 10px;
    font-size: 20px;
    color: white;
    background-color: #0ed3b0;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0ed3b0;
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;



const MenuItemCard = ({ menuItem, setMenuItem }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (menuItem.image) {
            db.storage()
                .ref()
                .child(menuItem.image)
                .getDownloadURL()
                .then((url) => {
                    setImage(url);
                });
        }
    }, [menuItem]);

    return (
        <Container>
            {image && <Image src={image} />}
            <InfoContainer>
                <Name>{menuItem.name}</Name>
                <Description>{menuItem.description}</Description>
                <Price>${menuItem.price}</Price>
            </InfoContainer>
            <ButtonContainer>
                <Button onClick={() => setMenuItem(menuItem)}>Edit</Button>
                <Button onClick={() => setMenuItem(null)}>Cancel</Button>
            </ButtonContainer>
        </Container>
    );
}

export default MenuItemCard;