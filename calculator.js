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

function optimizeTuntianTimes(policyCount, woodBonus, ironBonus, stoneBonus, woodStock, woodRate, woodTarget, ironStock, ironRate, ironTarget, stoneStock, stoneRate, stoneTarget) {
  // 计算总屯田次数（每3个策书可屯田1次）
  const totalTimes = Math.floor(policyCount / 3);

  // 初始化分配方案
  let allocation = {
    woodTimes: 0,
    ironTimes: 0,
    stoneTimes: 0
  };

  // 剩余可用屯田次数
  let remainingTimes = totalTimes;

  // 当还有屯田次数且资源未全部达标时继续分配
  while (remainingTimes > 0) {
    // 计算当前各资源所需时间
    const woodTime = Math.max(0, (woodTarget - woodStock - (woodBonus * allocation.woodTimes)) / woodRate);
    const ironTime = Math.max(0, (ironTarget - ironStock - (ironBonus * allocation.ironTimes)) / ironRate);
    const stoneTime = Math.max(0, (stoneTarget - stoneStock - (stoneBonus * allocation.stoneTimes)) / stoneRate);

    // 如果所有资源都已达标，提前结束
    if (woodTime <= 0 && ironTime <= 0 && stoneTime <= 0) {
      break;
    }

    // 找出当前最需要屯田的资源
    const maxTime = Math.max(woodTime, ironTime, stoneTime);

    // 分配屯田次数给最需要的资源
    if (maxTime === woodTime) {
      allocation.woodTimes++;
    } else if (maxTime === ironTime) {
      allocation.ironTimes++;
    } else {
      allocation.stoneTimes++;
    }

    remainingTimes--;
  }

  return allocation;
}

// Make functions available globally
window.calculateTimeToTarget = calculateTimeToTarget;
window.optimizeTuntianTimes = optimizeTuntianTimes;