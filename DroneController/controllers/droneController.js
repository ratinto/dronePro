const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllDrones = async (req, res) => {
  try {
    const drones = await prisma.drone.findMany({
      include: {
        telemetry: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    });

    const dronesWithLatestTelemetry = drones.map(drone => ({
      id: drone.id,
      name: drone.name,
      model: drone.model,
      serialNo: drone.serialNo,
      status: drone.status,
      createdAt: drone.createdAt,
      updatedAt: drone.updatedAt,
      latestTelemetry: drone.telemetry[0] || null
    }));

    return res.status(200).json({
      status: 'ok',
      drones: dronesWithLatestTelemetry
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const getDroneById = async (req, res) => {
  try {
    const droneId = parseInt(req.params.id);

    const drone = await prisma.drone.findUnique({
      where: { id: droneId },
      include: {
        telemetry: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    });

    if (!drone) {
      return res.status(404).json({
        status: 'error',
        message: 'Drone not found'
      });
    }

    return res.status(200).json({
      status: 'ok',
      drone: {
        ...drone,
        latestTelemetry: drone.telemetry[0] || null,
        telemetry: undefined
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const getDroneTelemetry = async (req, res) => {
  try {
    const droneId = parseInt(req.params.id);
    const limit = parseInt(req.query.limit) || 100;
    const startDate = req.query.startDate ? new Date(req.query.startDate) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate) : undefined;

    const whereClause = {
      droneId: droneId
    };

    if (startDate || endDate) {
      whereClause.timestamp = {};
      if (startDate) whereClause.timestamp.gte = startDate;
      if (endDate) whereClause.timestamp.lte = endDate;
    }

    const telemetry = await prisma.droneTelemetry.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'desc'
      },
      take: limit
    });

    return res.status(200).json({
      status: 'ok',
      droneId: droneId,
      count: telemetry.length,
      telemetry: telemetry
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const getLatestTelemetry = async (req, res) => {
  try {
    const droneId = parseInt(req.params.id);

    const latestTelemetry = await prisma.droneTelemetry.findFirst({
      where: { droneId: droneId },
      orderBy: {
        timestamp: 'desc'
      }
    });

    if (!latestTelemetry) {
      return res.status(404).json({
        status: 'error',
        message: 'No telemetry data found for this drone'
      });
    }

    return res.status(200).json({
      status: 'ok',
      telemetry: latestTelemetry
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const createDrone = async (req, res) => {
  try {
    const { name, model, serialNo, status } = req.body;

    if (!name || !model || !serialNo) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, model, and serialNo are required'
      });
    }

    const drone = await prisma.drone.create({
      data: {
        name,
        model,
        serialNo,
        status: status || 'idle'
      }
    });

    return res.status(201).json({
      status: 'ok',
      drone: drone
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        status: 'error',
        message: 'Drone with this serial number already exists'
      });
    }
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const addTelemetry = async (req, res) => {
  try {
    const droneId = parseInt(req.params.id);
    const {
      latitude,
      longitude,
      altitude,
      speed,
      heading,
      batteryLevel,
      temperature,
      humidity,
      pressure,
      satellites,
      signalStrength,
      flightMode,
      armed
    } = req.body;

    if (latitude === undefined || longitude === undefined || altitude === undefined ||
        speed === undefined || heading === undefined || batteryLevel === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Required fields: latitude, longitude, altitude, speed, heading, batteryLevel'
      });
    }

    const drone = await prisma.drone.findUnique({
      where: { id: droneId }
    });

    if (!drone) {
      return res.status(404).json({
        status: 'error',
        message: 'Drone not found'
      });
    }

    const telemetry = await prisma.droneTelemetry.create({
      data: {
        droneId,
        latitude,
        longitude,
        altitude,
        speed,
        heading,
        batteryLevel,
        temperature,
        humidity,
        pressure,
        satellites,
        signalStrength,
        flightMode: flightMode || 'manual',
        armed: armed || false
      }
    });

    return res.status(201).json({
      status: 'ok',
      telemetry: telemetry
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const updateDroneStatus = async (req, res) => {
  try {
    const droneId = parseInt(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: 'error',
        message: 'Status is required'
      });
    }

    const drone = await prisma.drone.update({
      where: { id: droneId },
      data: { status }
    });

    return res.status(200).json({
      status: 'ok',
      drone: drone
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Drone not found'
      });
    }
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  getAllDrones,
  getDroneById,
  getDroneTelemetry,
  getLatestTelemetry,
  createDrone,
  addTelemetry,
  updateDroneStatus
};
