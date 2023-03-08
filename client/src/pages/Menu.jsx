// This is the page that displays the menu for the restaurant user.
// The user can add, edit, and delete menu items.
// A menu item consists of a name, description, price, and image.
//
// Path: client/src/pages/Menu.jsx
// use Firebase to get the menu items for the restaurant

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FirebaseAuth, db } from "../services/Firebase";
import {Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  //   height: 100vh;
`;

const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px 10px;

  font-size: 16px;
  border: none;

  border-radius: 4px;
  background-color: #fff;

  color: #000;

  &:hover {
    background-color: #0ed3b0;
    color: #000;
  }
`;

const Button2 = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px 10px;

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
const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  background-color: #fff;
  margin: 25px 25px;
  padding: 10px;
  aspect-ratio: 1/1;
  background-color: #ededed;
  border-radius: 10px;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin: 25px 0;
`;

const MenuItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MenuItemName = styled.h1`
  margin: 10px 0;
  padding: 10px;
  font-size: 50px;
  color: black;
  font-weight: 500;
`;

const MenuItemDescription = styled.h1`
  margin: 10px 0;
  padding: 10px;
  font-size: 10px;
  color: black;
  font-weight: 500;
  flex: 7;
`;

const MenuItemPrice = styled.h1`
  margin: 10px 0;
  padding: 10px;
  flex: 3;
  font-size: 25px;
  color: black;
  font-weight: 500;
`;

const Input = styled.input`
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 50vw;

  margin: 25px 0;
  padding: 10px;
`;

const Rower = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #000;
    padding:18px;
    border-radius: 25px;

    &:hover {
        background-color: #ededed;
    }

`;


const Menu = () => {
  // use Firebase to get the menu items for the restaurant
  // if the user's menu_created is false, then they have not created a menu yet
  // if the user's menu_created is true, then they have created a menu
  // if the user's menu_created is true, then they can add, edit, and delete menu items
  // if the user's menu_created is false, then they can only add menu items
  // in the user collection each restaurant has a menu_created field and a menu field which is an array of menu items
  // each menu item has a name, description, price, and image
  // when the user adds a menu item, add it to the menu array in the user collection
  // when the user edits a menu item, edit the menu item in the menu array in the user collection
  // when the user deletes a menu item, delete the menu item in the menu array in the user collection

  const [menuItems, setMenuItems] = useState([]);
  const [menuCreated, setMenuCreated] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (!doc.data().menu_created) {
              setMenuCreated(true);
              setMenuItems(doc.data().menu);
              setRestaurantName(doc.data().restaurant_name);
            }
          });
      }
    });
  });

  const addMenuItem = (e) => {
    e.preventDefault();

    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .update({
            menu: [
              ...menuItems,
              {
                name: name,
                description: description,
                price: price,
                image: image,
              },
            ],
          });
      }
    });
  };

  const editMenuItem = (item) => {
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .update({
            menu: menuItems.map((menuItem) => {
              if (menuItem === item) {
                return {
                  name: name,
                  description: description,
                  price: price,
                  image: image,
                };
              } else {
                return menuItem;
              }
            }),
          });
      }
    });
  };

  const deleteMenuItem = (item) => {
    FirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .update({
            menu: menuItems.filter((menuItem) => menuItem !== item),
          });
      }
    });
  };

  return (
    // <Container>
    //     <Title>Menu</Title>
    //     <MenuContainer>
    //         <MenuItemsContainer>
    //             {menuItems.map((item) => (
    //                 <MenuItemContainer>
    //                     <MenuItemImage src={item.image} />
    //                     <MenuItemName>{item.name}</MenuItemName>
    //                     <MenuItemDescription>{item.description}</MenuItemDescription>
    //                     <MenuItemPrice>{item.price}</MenuItemPrice>
    //                     <Button onClick={(e) => {
    //                         e.preventDefault();
    //                         editMenuItem(item);
    //                     }}>Edit</Button>
    //                     <Button onClick={(e)=>{
    //                         e.preventDefault();
    //                         deleteMenuItem(item);
    //                     }}>Delete</Button>
    //                 </MenuItemContainer>
    //             ))}
    //         </MenuItemsContainer>
    //         <MenuItem>
    //             <Form>
    //                 <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    //                 <Input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
    //                 <Input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
    //                 <Input type="text" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
    //                 <Button onClick={addMenuItem}>Add Menu Item</Button>
    //             </Form>
    //         </MenuItem>
    //     </MenuContainer>
    // </Container>

    // create most optimal use of screen real estate
    <Container>
      <Title>{restaurantName}'s Menu</Title>
      <StyledLink to="/profile">GO TO PROFILE</StyledLink>
      <MenuContainer>
        <MenuItemsContainer>
          {menuItems.map((item) => (
            <MenuItemContainer>
              <MenuItemImage src={item.image} />
              <MenuItemName>{item.name}</MenuItemName>
              <Rower>
                <MenuItemDescription>{item.description}</MenuItemDescription>
                <MenuItemPrice>$ {item.price}</MenuItemPrice>
              </Rower>
              <Rower>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    editMenuItem(item);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteMenuItem(item);
                  }}
                >
                  Delete
                </Button>
              </Rower>
            </MenuItemContainer>
          ))}
        </MenuItemsContainer>
        <MenuItem>
          <Form>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Button2 onClick={addMenuItem}>Add Menu Item</Button2>
          </Form>
        </MenuItem>
      </MenuContainer>
    </Container>
  );
};

export default Menu;
