const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getCarById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Car ID is required' });
  }

  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: { criteria: true },
    });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    return res.json(car);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch car details' });
  }
};

const updateCarInspectionCriteria = async (req, res) => {
  const { id } = req.params;
  const { criteria } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Car ID is required' });
  }

  if (!Array.isArray(criteria) || criteria.length === 0) {
    return res.status(400).json({ error: 'Criteria array is required' });
  }

  try {
    const updatePromises = criteria.map((criterion) => {
      return prisma.criteria.update({
        where: { id: criterion.id },
        data: {
          isGood: criterion.isGood,
          note: criterion.isGood ? null : criterion.note,
        },
      });
    });

    await Promise.all(updatePromises);

    const updatedCriteria = await prisma.criteria.findMany({ where: { carId: id } });
    const goodCriteriaCount = updatedCriteria.filter((c) => c.isGood).length;

    const newStatus = goodCriteriaCount === 5 ? 2 : goodCriteriaCount > 0 ? 1 : 0;

    const updatedCar = await prisma.car.update({
      where: { id },
      data: { status: newStatus },
      include: { criteria: true },
    });

    return res.json(updatedCar);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update car inspection criteria' });
  }
};

// Get all cars
const getAllCars = async (req, res) => {
  try {
    // Fetch all cars with related criteria, sorted by name
    const cars = await prisma.car.findMany({
      include: { criteria: true },
      orderBy: { name: 'asc' },
    });

    return res.json(cars);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch cars' });
  }
};

module.exports = {
  getCarById,
  updateCarInspectionCriteria,
  getAllCars,
};
