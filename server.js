const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const menuItems = [
    {
        id: 1,
        name: "Cappuccino",
        price: 140,
        image: "/images/cappuccino.jpg",
        category: "coffee",
        description: "Rich espresso topped with steamed milk and creamy foam."
    },
    {
        id: 2,
        name: "Cafe Latte",
        price: 145,
        image: "/images/latte.jpg",
        category: "coffee",
        description: "Smooth espresso combined with warm and creamy milk."
    },
    {
        id: 3,
        name: "Americano",
        price: 120,
        image: "/images/americano.jpg",
        category: "coffee",
        description: "Bold espresso mixed with hot water for a smooth cup."
    },
    {
        id: 4,
        name: "Matcha Latte",
        price: 150,
        image: "/images/matcha.jpg",
        category: "drink",
        description: "Creamy milk blended with smooth and refreshing matcha."
    },
    {
        id: 5,
        name: "Butter Croissant",
        price: 70,
        image: "/images/croissant.jpg",
        category: "food",
        description: "A light, flaky and buttery pastry perfect with coffee."
    },
    {
        id: 6,
        name: "Breakfast Sandwich",
        price: 145,
        image: "/images/sandwich.jpg",
        category: "food",
        description: "A freshly prepared sandwich for a satisfying meal."
    }
];

app.get("/", (req, res) => {
    console.log("Rendering index.html");

    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});

app.get("/menu", (req, res) => {
    console.log("Rendering menu.html");

    res.sendFile(
        path.join(__dirname, "public", "menu.html")
    );
});

app.get("/about", (req, res) => {
    console.log("Rendering about.html");

    res.sendFile(
        path.join(__dirname, "public", "about.html")
    );
});

app.get("/contact", (req, res) => {
    console.log("Rendering contact.html");

    res.sendFile(
        path.join(__dirname, "public", "contact.html")
    );
});

app.get("/api/menu", (req, res) => {
    console.log("Sending menu JSON data");

    res.json(menuItems);
});

app.get("/api/menu/:id", (req, res) => {
    const id = Number(req.params.id);

    const item = menuItems.find(
        menuItem => menuItem.id === id
    );

    if (!item) {
        return res.status(404).json({
            message: "Menu item not found"
        });
    }

    res.json(item);
});

app.get("/api/search", (req, res) => {
    const category = req.query.category;

    if (!category) {
        return res.json(menuItems);
    }

    const results = menuItems.filter(
        item =>
            item.category.toLowerCase() ===
            category.toLowerCase()
    );

    res.json(results);
});

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
    console.log(`404 Not Found: ${req.url}`);

    res.status(404).send("404 - Page Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Open: http://localhost:${PORT}`);
});