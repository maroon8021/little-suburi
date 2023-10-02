export const getAvailableSpots = () => {
  const availableSpots = [];
  for (let i = 0; i < 9; i++) {
    availableSpots.push(i);
  }
  return availableSpots;
};
