const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT || 3001;

const firstNames = ['Sophia', 'Neil', 'Chrisciel', 'William', 'Kim', 'Gian', 'Wednesday', 'Henry', 'Zhong', 'Ahron', 'Ilon', 'Lance'];
const lastNames = ['Vergara', 'Armstrong', 'Black', 'Johnson', 'Blanc', 'Umadhuy', 'Addams', 'Luce', 'Lin', 'Aloro', 'Bercelone', 'Delmonte'];

const sampleUser = {
  gender: "female",
  name: { title: "Miss", first: "Jennie", last: "Nichols" },
  location: {
    street: { number: 8929, name: "Valwood Pkwy" },
    city: "Billings", state: "Michigan", country: "United States", postcode: "63104",
    coordinates: { latitude: "-69.8246", longitude: "134.8719" },
    timezone: { offset: "+9:30", description: "Adelaide, Darwin" }
  },
  email: "jennie.nichols@example.com",
  login: {
    uuid: "7a0eed16-9430-4d68-901f-c0d4c1c3bf00",
    username: "yellowpeacock117", password: "addison", salt: "sld1yGtd",
    md5: "ab54ac4c0be9480ae8fa5e9e2a5196a3",
    sha1: "edcf2ce613cbdea349133c52dc2f3b83168dc51b",
    sha256: "48df5229235ada28389b91e60a935e4f9b73eb4bdb855ef9258a1751f10bdc5d"
  },
  dob: { date: "1992-03-08T15:13:16.688Z", age: 30 },
  registered: { date: "2007-07-09T05:51:59.390Z", age: 14 },
  phone: "(272) 790-0888", cell: "(489) 330-2385",
  id: { name: "SSN", value: "405-88-3636" },
  picture: {
    large: "https://via.placeholder.com/128x128?text=No+Image",
    medium: "https://via.placeholder.com/64x64?text=No+Image",
    thumbnail: "https://via.placeholder.com/48x48?text=No+Image"
  },
  nat: "US"
};

function generateUsers(count) {
  const users = [];
  const genders = ['male', 'female'];
  const titles = ['Mr', 'Ms', 'Mrs', 'Miss', 'Dr'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'Philippines', 'Japan', 'South Korea'];
  
  for (let i = 0; i < count; i++) {
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const title = gender === 'male' ? 'Mr' : titles[Math.floor(Math.random() * 3) + 1];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    
    const user = JSON.parse(JSON.stringify(sampleUser));
    user.gender = gender;
    user.name.title = title;
    user.name.first = firstName;
    user.name.last = lastName;
    user.email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    user.login.uuid = `user-${i}-${Date.now()}`;
    user.login.username = `${firstName.toLowerCase()}${lastName.toLowerCase().substring(0, 3)}${i}`;
    user.location.country = country;
    user.location.city = `${firstName}ville`;
    user.phone = `(${Math.floor(Math.random() * 900) + 100})-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    user.cell = `(${Math.floor(Math.random() * 900) + 100})-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
    user.dob.age = Math.floor(Math.random() * 50) + 18;
    
const nameForImage = `${firstName.substring(0, 1)}${lastName.substring(0, 1)}`;
user.picture.large = `https://via.placeholder.com/128x128/007bff/ffffff?text=${nameForImage}`;
user.picture.medium = `https://via.placeholder.com/64x64/007bff/ffffff?text=${nameForImage}`;
user.picture.thumbnail = `https://via.placeholder.com/48x48/007bff/ffffff?text=${nameForImage}`;
    
    users.push(user);
  }
  return users;
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api', (req, res) => {
  const results = parseInt(req.query.results) || 1;
  
  if (results > 5000) {
    return res.status(400).json({ error: "Cannot generate more than 5000 results" });
  }

  const response = {
    results: generateUsers(results),
    info: {
      seed: "custom-seed",
      results: results,
      page: 1,
      version: "1.4"
    }
  };

  res.json(response);
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assignment01.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API endpoint: http://localhost:${port}/api`);
  console.log(`Try: http://localhost:${port}/api?results=5`);
});