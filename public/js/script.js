const menuContainer = document.getElementById("coffee-list");

fetch("/api/menu")
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load menu");
        }

        return response.json();
    })

    .then(data => {
        menuContainer.innerHTML = "";

        data.forEach(item => {
            const card = document.createElement("div");

            card.className = "menu-item";

            card.innerHTML = `
                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <h3>${item.name}</h3>

                <p class="description">
                    ${item.description}
                </p>

                <p class="price">
                    ₱${item.price}
                </p>
            `;

            menuContainer.appendChild(card);
        });
    })

    .catch(error => {
        console.error("Error loading menu:", error);

        menuContainer.innerHTML = `
            <p>Unable to load menu items.</p>
        `;
    });