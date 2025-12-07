const express = require('express');
const {
  getAllDrones,
  getDroneById,
  getDroneTelemetry,
  getLatestTelemetry,
  createDrone,
  addTelemetry,
  updateDroneStatus
} = require('../controllers/droneController');

const router = express.Router();

router.get('/', getAllDrones);
router.get('/:id', getDroneById);
router.get('/:id/telemetry', getDroneTelemetry);
router.get('/:id/telemetry/latest', getLatestTelemetry);
router.post('/', createDrone);
router.post('/:id/telemetry', addTelemetry);
router.patch('/:id/status', updateDroneStatus);

module.exports = router;
