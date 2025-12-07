require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const missionRoutes = require('./routes/mission');
const droneRoutes = require('./routes/drone');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use('/api/mission', missionRoutes);
app.use('/api/drone', droneRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
