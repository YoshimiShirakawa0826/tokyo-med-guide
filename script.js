// Mock Data for Tokyo Medical Institutions
const hospitals = [
    {
        id: 1,
        name: "Tokyo General Hospital",
        lat: 35.6894,
        lng: 139.6917, // Near Shinjuku
        departments: ["Internal Medicine", "Surgery", "Pediatrics"],
        hours: "09:00 - 17:00",
        emergency: true,
        walkin: true,
        address: "1-1-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo"
    },
    {
        id: 2,
        name: "Shibuya International Clinic",
        lat: 35.6580,
        lng: 139.7016, // Near Shibuya
        departments: ["Internal Medicine", "Dermatology"],
        hours: "10:00 - 19:00",
        emergency: false,
        walkin: true,
        address: "2-2-2 Shibuya, Shibuya-ku, Tokyo"
    },
    {
        id: 3,
        name: "Minato Emergency Center",
        lat: 35.6585,
        lng: 139.7454, // Near Tokyo Tower
        departments: ["Emergency Medicine", "Surgery", "Orthopedics"],
        hours: "24 Hours",
        emergency: true,
        walkin: false, // Appointment or ambulance only except life-threatening
        address: "3-3-3 Shibakoen, Minato-ku, Tokyo"
    },
    {
        id: 4,
        name: "Ueno Family Dental & Clinic",
        lat: 35.7138,
        lng: 139.7772, // Near Ueno
        departments: ["Dentistry", "Pediatrics"],
        hours: "09:00 - 18:00 (Closed Wed)",
        emergency: false,
        walkin: true,
        address: "4-4-4 Ueno, Taito-ku, Tokyo"
    },
    {
        id: 5,
        name: "Ginza Women's Clinic",
        lat: 35.6712,
        lng: 139.7663, // Near Ginza
        departments: ["Gynecology", "Internal Medicine"],
        hours: "10:00 - 20:00",
        emergency: false,
        walkin: false,
        address: "5-5-5 Ginza, Chuo-ku, Tokyo"
    }
];

let map;
let markers = [];

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    renderList(hospitals);
    
    // Event listeners for filters
    document.getElementById('filter-emergency').addEventListener('change', filterHospitals);
    document.getElementById('filter-walkin').addEventListener('change', filterHospitals);
});

function initMap() {
    // Initialize map centered on Tokyo
    map = L.map('map').setView([35.6812, 139.7671], 12);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    addMarkers(hospitals);
}

function getIcon(emergency) {
    // Create custom icons based on emergency status
    const color = emergency ? '#ef4444' : '#0ea5e9';
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
}

function addMarkers(data) {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    data.forEach(hospital => {
        const marker = L.marker([hospital.lat, hospital.lng], { icon: getIcon(hospital.emergency) })
            .addTo(map)
            .bindPopup(`
                <div style="font-family: 'Inter', sans-serif;">
                    <h3 style="margin: 0 0 5px 0; color: ${hospital.emergency ? '#ef4444' : '#0ea5e9'};">${hospital.name}</h3>
                    <p style="margin: 0; font-size: 0.9em;">${hospital.departments.join(', ')}</p>
                    <p style="margin: 5px 0 0 0; font-size: 0.8em; color: #64748b;">${hospital.hours}</p>
                </div>
            `);
        
        markers.push(marker);
    });
}

function renderList(data) {
    const listContainer = document.getElementById('hospital-list');
    listContainer.innerHTML = '';

    if (data.length === 0) {
        listContainer.innerHTML = '<p style="color: #64748b; text-align: center; margin-top: 20px;">No medical institutions match your criteria.</p>';
        return;
    }

    data.forEach(hospital => {
        const card = document.createElement('div');
        card.className = `hospital-card ${hospital.emergency ? 'emergency' : ''}`;
        
        // When clicking a card, fly to the marker and open popup
        card.addEventListener('click', () => {
            map.flyTo([hospital.lat, hospital.lng], 14, { duration: 1.5 });
            // Find the corresponding marker and open its popup
            const marker = markers.find(m => m.getLatLng().lat === hospital.lat && m.getLatLng().lng === hospital.lng);
            if(marker) {
                setTimeout(() => marker.openPopup(), 1500);
            }
        });

        card.innerHTML = `
            <h3>${hospital.name}</h3>
            <div class="hospital-info"><strong>Departments:</strong> ${hospital.departments.join(', ')}</div>
            <div class="hospital-info"><strong>Hours:</strong> ${hospital.hours}</div>
            <div class="tag-container">
                ${hospital.emergency ? '<span class="tag tag-emergency">Emergency</span>' : ''}
                ${hospital.walkin ? '<span class="tag tag-walkin">Walk-in OK</span>' : ''}
                ${!hospital.walkin ? '<span class="tag" style="background-color: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;">Appointment Required</span>' : ''}
            </div>
        `;
        
        listContainer.appendChild(card);
    });
}

function filterHospitals() {
    const isEmergencyOnly = document.getElementById('filter-emergency').checked;
    const isWalkinOnly = document.getElementById('filter-walkin').checked;

    const filteredData = hospitals.filter(hospital => {
        let match = true;
        if (isEmergencyOnly && !hospital.emergency) match = false;
        if (isWalkinOnly && !hospital.walkin) match = false;
        return match;
    });

    renderList(filteredData);
    addMarkers(filteredData);
    
    // Adjust map bounds if there are markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}
