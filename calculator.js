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

  // 初始化最优分配方案
  let bestAllocation = {
    woodTimes: 0,
    ironTimes: 0,
    stoneTimes: 0,
    maxTime: Infinity
  };

  // 遍历所有可能的屯田次数分配组合
  // w: 木材屯田次数, i: 铁矿屯田次数, s: 石料屯田次数
  console.log(`开始遍历所有分配方案，总屯田次数: ${totalTimes}`);
  for (let w = 0; w <= totalTimes; w++) {
    for (let i = 0; i <= totalTimes - w; i++) {
      const s = totalTimes - w - i; // 剩余次数分配给石料
      console.log(`当前分配方案: 木材=${w}次, 铁矿=${i}次, 石料=${s}次`);

      // 计算当前分配方案下各资源达到目标所需时间
      // 调整后的目标库存 = 原目标 - 屯田获得的资源
      const woodTime = Math.max(0, (woodTarget - woodStock - (woodBonus * w)) / woodRate);
      const ironTime = Math.max(0, (ironTarget - ironStock - (ironBonus * i)) / ironRate);
      const stoneTime = Math.max(0, (stoneTarget - stoneStock - (stoneBonus * s)) / stoneRate);

      // 取最长时间作为当前方案的总时间
      const currentMaxTime = Math.max(woodTime, ironTime, stoneTime);

      // 如果当前方案比已知最优方案更好，则更新最优方案
      console.log(`当前方案时间: ${currentMaxTime.toFixed(2)}小时，最优时间: ${bestAllocation.maxTime.toFixed(2)}小时`);
      if (currentMaxTime < bestAllocation.maxTime) {
        console.log(`发现更优方案: 木材=${w}次, 铁矿=${i}次, 石料=${s}次，时间=${currentMaxTime.toFixed(2)}小时`);
        bestAllocation = {
          woodTimes: w,
          ironTimes: i,
          stoneTimes: s,
          maxTime: currentMaxTime
        };
      }
    }
  }
  console.log(bestAllocation);
  return bestAllocation;
}

// Make functions available globally
window.calculateTimeToTarget = calculateTimeToTarget;
window.optimizeTuntianTimes = optimizeTuntianTimes;