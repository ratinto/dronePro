const { PrismaClient } = require('@prisma/client');
const { parseKML } = require('../services/kmlParser');
const fs = require('fs');

const prisma = new PrismaClient();

const uploadKML = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'File missing'
      });
    }

    if (!req.file.originalname.toLowerCase().endsWith('.kml')) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        status: 'error',
        message: 'File is not KML'
      });
    }

    const kmlContent = fs.readFileSync(req.file.path, 'utf-8');
    fs.unlinkSync(req.file.path);

    const polygon = parseKML(kmlContent);

    const missionName = req.body.name || 'Imported KML Mission';

    const mission = await prisma.mission.create({
      data: {
        name: missionName,
        polygon: polygon
      }
    });

    return res.status(200).json({
      mission_id: mission.id,
      status: 'ok',
      polygon: polygon
    });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    if (error.message === 'Polygon not found in KML file') {
      return res.status(400).json({
        status: 'error',
        message: 'Polygon not found'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

const getMission = async (req, res) => {
  try {
    const missionId = parseInt(req.params.id);

    const mission = await prisma.mission.findUnique({
      where: { id: missionId }
    });

    if (!mission) {
      return res.status(404).json({
        status: 'error',
        message: 'Mission not found'
      });
    }

    return res.status(200).json({
      mission_id: mission.id,
      polygon: mission.polygon
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = { uploadKML, getMission };
