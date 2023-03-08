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

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    font-size: 20px;
    border: 1px solid #0ed3b0;
    border-radius: 4px;
    width: 100%;
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const Button = styled.button`
    margin: 10px 0;
    padding: 10px;
    font-size: 20px;

    border: 1px solid #0ed3b0;
    border-radius: 4px;
    background-color: #0ed3b0;
    color: white;
    cursor: pointer;
    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const Title = styled.h1`
    margin: 10px 0;
    padding: 10px;
    font-size: 30px;
    color: black;
    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    padding: 10px;
    width: 100%;
`;



const MenuItemForm = ({ menuItem, setMenuItem, userId }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (menuItem) {
            setName(menuItem.name);
            setDescription(menuItem.description);
            setPrice(menuItem.price);
            setImage(menuItem.image);
        }
    }, [menuItem]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMenuItem = {
            name,
            description,
            price,
            image,
            userId,
        };
        if (menuItem) {
            db.collection("menu").doc(menuItem.id).append(newMenuItem);
        } else {
            db.collection("menu").add(newMenuItem);
        }
        
        setMenuItem(null);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>{menuItem ? "Edit Menu Item" : "Add Menu Item"}</Title>
                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <Button type="submit">{menuItem ? "Save" : "Add"}</Button>
            </Form>
        </Container>
    );
}

export default MenuItemForm;