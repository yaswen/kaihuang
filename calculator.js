function calculateTimeToTarget(woodStock, woodRate, woodTarget, ironStock, ironRate, ironTarget, stoneStock, stoneRate, stoneTarget) {
  // Calculate time needed for each resource to reach target
  const woodTime = Math.max(0, (woodTarget - woodStock) / woodRate);
  const ironTime = Math.max(0, (ironTarget - ironStock) / ironRate);
  const stoneTime = Math.max(0, (stoneTarget - stoneStock) / stoneRate);
  console.log("", {
    woodTime,
    ironTime,
    stoneTime
  });
  // Return the maximum time (when all resources reach target)
  return Math.max(woodTime, ironTime, stoneTime);
}

// Export the function for use in HTML
module.exports = { calculateTimeToTarget };