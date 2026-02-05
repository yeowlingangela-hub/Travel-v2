const mockData = {
    paris: {
        attractions: [
            { name: 'Eiffel Tower', description: 'Iconic wrought-iron lattice tower on the Champ de Mars.' },
            { name: 'Louvre Museum', description: 'The world\'s largest art museum and a historic monument.' },
            { name: 'Notre-Dame Cathedral', description: 'A medieval Catholic cathedral on the \u00cele de la Cit\u00e9.' },
            { name: 'Mus\u00e9e d\'Orsay', description: 'Housed in a former railway station, it holds mainly French art dating from 1848 to 1914.' },
            { name: 'Sainte-Chapelle', description: 'A royal chapel in the Gothic style, within the medieval Palais de la Cit\u00e9.' },
            { name: 'Montmartre', description: 'A large hill in Paris\'s 18th arrondissement, known for its artistic history.' },
            { name: 'Sacr\u00e9-C\u0153ur Basilica', description: 'A Roman Catholic church and minor basilica, dedicated to the Sacred Heart of Jesus.' },
        ],
        cafes: ['Caf\u00e9 de Flore', 'Les Deux Magots', 'La Maison Rose'],
        restaurants: ['Le Jules Verne', 'L\'Ambroisie', 'Arp\u00e8ge'],
        hotels: ['The Ritz Paris', 'Le Bristol Paris', 'Four Seasons Hotel George V']
    },
    tokyo: {
        attractions: [
            { name: 'Senso-ji Temple', description: 'An ancient Buddhist temple located in Asakusa.' },
            { name: 'Meiji Jingu Shrine', description: 'A Shinto shrine dedicated to the deified spirits of Emperor Meiji and his consort, Empress Shoken.' },
            { name: 'Tokyo Skytree', description: 'A broadcasting and observation tower with a restaurant and observation decks.' },
            { name: 'Shibuya Crossing', description: 'The world\'s busiest pedestrian crossing, located in front of Shibuya Station.' },
            { name: 'Tokyo Imperial Palace', description: 'The primary residence of the Emperor of Japan.' },
            { name: 'Ghibli Museum', description: 'A museum showcasing the work of the Japanese animation studio Studio Ghibli.' },
            { name: 'Ueno Park', description: 'A large public park in the Ueno district of Tait\u014d, Tokyo, Japan.' },
        ],
        cafes: ['Caf\u00e9 de l\'Ambre', 'Chatei Hatou', 'Glitch Coffee & Roasters'],
        restaurants: ['Sukiyabashi Jiro', 'Narisawa', 'Quintessence'],
        hotels: ['Park Hyatt Tokyo', 'Mandarin Oriental, Tokyo', 'The Peninsula Tokyo']
    }
};

class ItineraryCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setData(data) {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .card-header {
                    background-color: var(--primary-color, oklch(65% 0.25 260));
                    color: white;
                    padding: 1rem 1.5rem;
                }
                .card-content {
                     padding: 1.5rem;
                }
                h2 {
                    font-size: 1.5rem;
                    margin: 0;
                }
                h3 {
                    font-size: 1.2rem;
                    color: var(--primary-color, oklch(65% 0.25 260));
                    border-bottom: 2px solid var(--accent-color, oklch(70% 0.25 30));
                    padding-bottom: 0.5rem;
                    margin-top: 1.5rem;
                }
                p {
                    line-height: 1.6;
                }
                ul {
                    list-style-type: none;
                    padding-left: 0;
                }
                li {
                    margin-bottom: 0.5rem;
                }
                .icon {
                    width: 24px;
                    height: 24px;
                    vertical-align: middle;
                    margin-right: 10px;
                    filter: invert(10%) sepia(20%) saturate(5000%) hue-rotate(240deg);
                }
            </style>
            <div>
                <div class="card-header">
                    <h2>${data.date}</h2>
                </div>
                 <div class="card-content">
                    <h3><img src="https://img.icons8.com/ios-filled/50/000000/marker.png" class="icon" alt="attraction icon">Attraction</h3>
                    <p><strong>${data.attraction.name}</strong>: ${data.attraction.description}</p>
                    <h3><img src="https://img.icons8.com/ios-filled/50/000000/coffee-to-go.png" class="icon" alt="cafe icon">Nearby Cafe</h3>
                    <p>${data.cafe}</p>
                    <h3><img src="https://img.icons8.com/ios-filled/50/000000/restaurant.png" class="icon" alt="restaurant icon">Nearby Restaurant</h3>
                    <p>${data.restaurant}</p>
                </div>
            </div>
        `;
    }
}
customElements.define('itinerary-card', ItineraryCard);

document.getElementById('itinerary-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const destination = document.getElementById('destination').value.toLowerCase().trim();
    const startDateInput = document.getElementById('start-date').value;
    const endDateInput = document.getElementById('end-date').value;
    const resultsDiv = document.getElementById('itinerary-results');
    resultsDiv.innerHTML = '';

    if (!destination || !startDateInput || !endDateInput) {
        resultsDiv.innerHTML = '<p style="color: red; text-align: center;">Please fill out all fields.</p>';
        return;
    }
    
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        resultsDiv.innerHTML = '<p style="color: red; text-align: center;">Please enter valid dates.</p>';
        return;
    }

    const dataKey = Object.keys(mockData).find(key => destination.includes(key));

    if (!dataKey) {
        resultsDiv.innerHTML = '<p style="text-align: center;">Sorry, we don\'t have information for that destination yet. Try \'Paris\' or \'Tokyo\'.</p>';
        return;
    }

    const tripDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    if (tripDays <= 0) {
        resultsDiv.innerHTML = '<p style="color: red; text-align: center;">End date must be after start date.</p>';
        return;
    }

    const destinationData = mockData[dataKey];
    const usedAttractions = new Set();

    for (let i = 0; i < tripDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateString = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        let attraction;
        for (const attr of destinationData.attractions) {
            if (!usedAttractions.has(attr.name)) {
                attraction = attr;
                usedAttractions.add(attr.name);
                break;
            }
        }
        if (!attraction) {
            attraction = { name: 'No new attractions available', description: 'Consider re-visiting a favorite spot or exploring a new neighborhood!' };
        }

        const cafe = destinationData.cafes[i % destinationData.cafes.length];
        const restaurant = destinationData.restaurants[i % destinationData.restaurants.length];

        const card = document.createElement('itinerary-card');
        card.setData({ date: dateString, attraction, cafe, restaurant });
        resultsDiv.appendChild(card);
    }

    const hotelsCard = document.createElement('div');
    hotelsCard.className = 'hotels-card'; // Added class for styling
    hotelsCard.innerHTML = `
        <h2><img src="https://img.icons8.com/ios-filled/50/000000/bed.png" class="icon" alt="hotel icon" style="filter: none; width: 32px; height: 32px; margin-right: 12px; vertical-align: bottom;">Hotel Recommendations</h2>
        <ul>
            ${destinationData.hotels.map(hotel => `<li>${hotel}</li>`).join('')}
        </ul>
    `;
    resultsDiv.appendChild(hotelsCard);
});