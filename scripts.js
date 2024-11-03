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
    const mealss = xml.getElementsByTagName('meals');
    const grid = document.getElementById('meals-grid');
	const beveragess = xml.getElementsByTagName('beverages');
	const grid2 = document.getElementById('meals-grid-beverages');
	const beveragesso = xml.getElementsByTagName('beveragesO');
	const grid3 = document.getElementById('meals-grid-beverages-other');
    if (grid) {
        Array.from(mealss).forEach(meals => {
            const name = meals.getElementsByTagName('name')[0]?.textContent || 'No Name';
            const description = meals.getElementsByTagName('description')[0]?.textContent || 'No Description';
            const price = meals.getElementsByTagName('price')[0]?.textContent || 'Price Not Available';
            const image = meals.getElementsByTagName('image')[0]?.textContent || 'images/default.jpg';

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
	
	    if (grid2) {
        Array.from(beveragess).forEach(beverages => {
            const name = beverages.getElementsByTagName('name')[0]?.textContent || 'No Name';

            const price = beverages.getElementsByTagName('price')[0]?.textContent || 'Price Not Available';
            const image = beverages.getElementsByTagName('image')[0]?.textContent || 'images/default.jpg';

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>

                <p><strong>${price}</strong></p>
            `;
            grid2.appendChild(card);
        });
    }
		if (grid3) {
        Array.from(beveragesso).forEach(beveragesO => {
            const name = beveragesO.getElementsByTagName('name')[0]?.textContent || 'No Name';

            const price = beveragesO.getElementsByTagName('price')[0]?.textContent || 'Price Not Available';
            const image = beveragesO.getElementsByTagName('image')[0]?.textContent || 'images/default.jpg';

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${image}" alt="${name}">
                <h3>${name}</h3>

                <p><strong>${price}</strong></p>
            `;
            grid3.appendChild(card);
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

