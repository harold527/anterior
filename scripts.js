document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();
    loadXML('menu.xml', displayDesserts);
    loadXML('branches.xml', displayBranches);
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('confirmationMessage').classList.remove('hidden');
        });
    }
});

function loadXML(file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(xmlString => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, 'application/xml');
            callback(xml);
        })
        .catch(error => console.error(`Error loading XML (${file}):`, error));
}

function displayDesserts(xml) {
    const desserts = xml.getElementsByTagName('dessert');
    const grid = document.getElementById('dessert-grid');
    if (grid) {
        Array.from(desserts).forEach(dessert => {
            const name = dessert.getElementsByTagName('name')[0]?.textContent || 'No Name';
            const description = dessert.getElementsByTagName('description')[0]?.textContent || 'No Description';
            const price = dessert.getElementsByTagName('price')[0]?.textContent || 'Price Not Available';
            const image = dessert.getElementsByTagName('image')[0]?.textContent || 'images/default.jpg';

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>
                <p>${description}</p>
                <p><strong>${price}</strong></p>
            `;
            grid.appendChild(card);
        });
    }
}

function displayBranches(xml) {
    const branches = xml.getElementsByTagName('branch');
    const list = document.getElementById('branches-list');
    if (list) {
        Array.from(branches).forEach(branch => {
            const address = branch.getElementsByTagName('address')[0]?.textContent || 'No Address';
            const phone = branch.getElementsByTagName('phone')[0]?.textContent || 'No Phone';
            const mapLink = branch.getElementsByTagName('map')[0]?.textContent || '#';

            const item = document.createElement('div');
            item.className = 'branch-item';
            item.innerHTML = `
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <a href="${mapLink}" target="_blank">View on Map</a>
            `;
            list.appendChild(item);
        });
    }
}
function inicioO(){
    window.location.href = "index.html";
}

