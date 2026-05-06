document.getElementById('hospitalForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const responseDiv = document.getElementById('response');
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        
        if (response.ok) {
            responseDiv.innerHTML = `<p style="color: green;">${result.message}</p>`;
            document.getElementById('hospitalForm').reset();
        } else {
            responseDiv.innerHTML = `<p style="color: red;">Error sending message.</p>`;
        }
    } catch (error) {
        responseDiv.innerHTML = `<p style="color: red;">Server Error.</p>`;
    }
});
let allTests = [];

// Fetch tests on load
window.onload = async () => {
    const response = await fetch('/api/tests');
    allTests = await response.json();
    displayTests(allTests);
};

function displayTests(tests) {
    const grid = document.getElementById('test-grid');
    grid.innerHTML = tests.map(test => `
        <div class="test-card">
            <span>${test.category}</span>
            <h3>${test.name}</h3>
            <p>${test.description}</p>
            <p class="price">${test.price}</p>
            <button onclick="openBooking(${test.id})">Book Now</button>
        </div>
    `).join('');
}

function filterTests(category) {
    if(category === 'all') return displayTests(allTests);
    const filtered = allTests.filter(t => t.category === category);
    displayTests(filtered);
}

// Booking Logic
function openBooking(id) {
    document.getElementById('selectedTestId').value = id;
    document.getElementById('bookingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

document.getElementById('bookingForm').onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        test_id: document.getElementById('selectedTestId').value,
        patient_name: document.getElementById('patientName').value,
        date: document.getElementById('appointmentDate').value
    };

    const res = await fetch('/api/book', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if(res.ok) {
        alert("Success! We will contact you shortly.");
        closeModal();
    }
};