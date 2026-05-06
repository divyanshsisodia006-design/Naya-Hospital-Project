const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

db.serialize(() => {
    // Create Tests Table
    db.run(`CREATE TABLE IF NOT EXISTS tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        price TEXT,
        description TEXT
    )`);

    // Create Bookings Table
    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_name TEXT,
        test_id INTEGER,
        appointment_date TEXT,
        status TEXT DEFAULT 'Pending'
    )`);

    // Insert Diagnostic Data
    const stmt = db.prepare("INSERT INTO tests (name, category, price, description) VALUES (?, ?, ?, ?)");
    
    // MRI
    stmt.run("MRI Brain", "MRI", "₹5000", "High-resolution imaging of the brain.");
    stmt.run("MRI Spine", "MRI", "₹4500", "Detailed view of the spinal cord.");
    
    // CT SCAN
    stmt.run("CT Chest", "CT SCAN", "3500", "Detailed scan of lungs and heart.");
    stmt.run("CT Abdomen", "CT SCAN", "4000", "Full abdominal organ imaging.");
    
    // X-RAY
    stmt.run("Chest X-Ray", "X-RAY", "₹500", "Standard chest screening.");
    stmt.run("Joint X-Ray", "X-RAY", "₹400", "Imaging for bone fractures.");
    
    // BLOOD TESTS
    stmt.run("Full Body Profile", "BLOOD TEST", "₹1500", "Complete blood count, liver, and kidney profile.");
    stmt.run("Diabetes Screening", "BLOOD TEST", "₹300", "HbA1c and Blood Sugar levels.");

    stmt.finalize();
    console.log("Database Initialized with Tests.");
});
db.close();