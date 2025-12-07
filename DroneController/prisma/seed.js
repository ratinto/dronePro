const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  const drone1 = await prisma.drone.upsert({
    where: { serialNo: 'DJI-001-XYZ' },
    update: {},
    create: {
      name: 'Drone Alpha',
      model: 'DJI Mavic 3',
      serialNo: 'DJI-001-XYZ',
      status: 'active'
    }
  });

  const drone2 = await prisma.drone.upsert({
    where: { serialNo: 'PARROT-002-ABC' },
    update: {},
    create: {
      name: 'Drone Beta',
      model: 'Parrot Anafi',
      serialNo: 'PARROT-002-ABC',
      status: 'idle'
    }
  });

  console.log('Created drones:', { drone1, drone2 });

  const telemetry1 = await prisma.droneTelemetry.create({
    data: {
      droneId: drone1.id,
      latitude: 28.98544,
      longitude: 77.09027,
      altitude: 150.5,
      speed: 12.5,
      heading: 270.0,
      batteryLevel: 85.5,
      temperature: 28.5,
      humidity: 65.0,
      pressure: 1013.25,
      satellites: 12,
      signalStrength: 95.0,
      flightMode: 'auto',
      armed: true
    }
  });

  const telemetry2 = await prisma.droneTelemetry.create({
    data: {
      droneId: drone1.id,
      latitude: 28.98550,
      longitude: 77.09035,
      altitude: 155.0,
      speed: 13.0,
      heading: 275.0,
      batteryLevel: 84.0,
      temperature: 28.8,
      humidity: 64.5,
      pressure: 1013.20,
      satellites: 13,
      signalStrength: 96.0,
      flightMode: 'auto',
      armed: true
    }
  });

  const telemetry3 = await prisma.droneTelemetry.create({
    data: {
      droneId: drone2.id,
      latitude: 28.98461,
      longitude: 77.09031,
      altitude: 0.0,
      speed: 0.0,
      heading: 0.0,
      batteryLevel: 100.0,
      temperature: 25.0,
      humidity: 60.0,
      pressure: 1013.25,
      satellites: 8,
      signalStrength: 80.0,
      flightMode: 'manual',
      armed: false
    }
  });

  console.log('Created telemetry:', { telemetry1, telemetry2, telemetry3 });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
