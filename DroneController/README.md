# Drone Controller API

Express.js API for KML file upload and mission management using Prisma ORM.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure database:
Update the `DATABASE_URL` in `.env` file with your PostgreSQL credentials.

3. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

5. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoint

### POST /api/mission/upload-kml

Upload a KML file and extract polygon coordinates.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `kml` (file, required): KML file
  - `name` (string, optional): Mission name (default: "Imported KML Mission")

**Success Response:**
```json
{
  "mission_id": 1,
  "status": "success",
  "polygon": [
    { "lat": 28.98544, "lon": 77.09027, "alt": 0 },
    { "lat": 28.98461, "lon": 77.09031, "alt": 0 }
  ]
}
```

**Error Responses:**
- File missing: `{ "status": "error", "message": "File missing" }`
- Invalid file type: `{ "status": "error", "message": "File is not KML" }`
- Polygon not found: `{ "status": "error", "message": "Polygon not found" }`

## Project Structure

```
├── controllers/
│   └── missionController.js
├── routes/
│   └── mission.js
├── services/
│   └── kmlParser.js
├── prisma/
│   └── schema.prisma
├── uploads/
├── index.js
├── package.json
└── .env
```
