require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [
    1,
    {
      id: 1,
      brand: "Nike",
      model: "Air Max Tuned 1 OG",
      color: "Waterway-Fiberglass-White",
      size: [39, 40, 41, 42],
      price: 1200,
      image:
        "https://images.footlocker.com/is/image/FLEU/314216469404_01?wid=520&hei=520&fmt=png-alpha",
      quantity: 4,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    2,
    {
      id: 2,
      brand: "Adidas",
      model: "Superstar",
      color: "White/Black",
      size: [40, 41, 42, 43],
      price: 500,
      image:
        "https://images.footlocker.com/is/image/FLEU/315345054902_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 4,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    3,
    {
      id: 3,
      brand: "Puma",
      model: "RS-X",
      color: "Blue/Red",
      size: [41, 42],
      price: 1000,
      image:
        "https://images.footlocker.com/is/image/FLEU/316700377704_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 2,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],
  [
    4,
    {
      id: 4,
      brand: "Reebok",
      model: "Classic Leather",
      color: "White/Gum",
      size: [39, 40, 41, 42, 43, 44],
      price: 900,
      image:
        "https://images.footlocker.com/is/image/FLEU/316701817104_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 6,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    5,
    {
      id: 5,
      brand: "Converse",
      model: "Chuck Taylor All Star",
      color: "Black",
      size: [40, 42, 43, 44, 45],
      price: 600,
      image:
        "https://images.footlocker.com/is/image/FLEU/315346496102_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 5,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    6,
    {
      id: 6,
      brand: "Vans",
      model: "Old Skool",
      color: "Checkerboard",
      size: [38, 40, 41, 42, 43],
      price: 700,
      image:
        "https://images.footlocker.com/is/image/FLEU/314313309404_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 5,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],
  [
    7,
    {
      id: 7,
      brand: "New Balance",
      model: "990v5",
      color: "Grey",
      size: [39, 40, 43, 45],
      price: 1200,
      image:
        "https://images.footlocker.com/is/image/FLEU/314310252904_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 4,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],
  [
    8,
    {
      id: 8,
      brand: "Asics",
      model: "GEL-Kayano 27",
      color: "Blue/Pink",
      size: [39, 40, 40, 45, 46],
      price: 400,
      image:
        "https://images.footlocker.com/is/image/FLEU/314310252904_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 5,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    {
      id: 9,
      brand: "Under Armour",
      model: "Curry 8",
      color: "Black/Gold",
      size: [39],
      price: 1600,
      image:
        "https://images.footlocker.com/is/image/FLEU/316732933904_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 1,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    10,
    {
      id: 10,
      brand: "Salomon",
      model: "Speedcross 5",
      color: "Green/Black",
      size: [39, 40],
      price: 1200,
      image:
        "https://images.footlocker.com/is/image/FLEU/316732933904_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 2,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    11,
    {
      id: 11,
      brand: "Mizuno",
      model: "Wave Rider 24",
      color: "Orange/Blue",
      size: [40, 45, 46],
      price: 1100,
      image:
        "https://images.footlocker.com/is/image/FLEU/316703915104_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 3,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],

  [
    12,
    {
      id: 12,
      brand: "Brooks",
      model: "Ghost 13",
      color: "Purple",
      size: [39, 40, 40, 40],
      price: 400,
      image:
        "https://images.footlocker.com/is/image/FLEU/314313309404_01?wid=500&hei=500&fmt=png-alpha",
      quantity: 4,
      discription:
        "Rep some running legacy with every step you take while sporting the Nike Air Max Plus OG. Taking the best from Nike’s iconic sneakers in the past, these AM shoes nod to retro futurism. The upper blends synthetic leather and mesh to deliver flexible ease and proper breathability in one go.  ",
    },
  ],
]);

app.post("/create-checkout-session", (req, res) => {
  res.json({ url: "Hi" });
});

app.listen(3000);
