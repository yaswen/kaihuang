function calculateTimeToTarget(woodStock, woodRate, woodTarget, ironStock, ironRate, ironTarget, stoneStock, stoneRate, stoneTarget) {
  // Calculate time needed for each resource to reach target
  const woodTime = Math.max(0, (woodTarget - woodStock) / woodRate);
  const ironTime = Math.max(0, (ironTarget - ironStock) / ironRate);
  const stoneTime = Math.max(0, (stoneTarget - stoneStock) / stoneRate);
  console.log(`底层计算结果:\n木材所需时间: ${woodTime.toFixed(2)}小时\n铁矿所需时间: ${ironTime.toFixed(2)}小时\n石料所需时间: ${stoneTime.toFixed(2)}小时`);
  // Return the maximum time (when all resources reach target)
  return Math.max(woodTime, ironTime, stoneTime);
}

function optimizeTuntianTimes(policyCount, woodBonus, ironBonus, stoneBonus, woodStock, woodRate, woodTarget, ironStock, ironRate, ironTarget, stoneStock, stoneRate, stoneTarget) {
  let planContent = '';
  // 计算总屯田次数（每3个策书可屯田1次）和剩余策书
  const totalTimes = Math.floor(policyCount / 3);
  let remainingPolicy = policyCount % 3;
  console.log(`初始策书总数: ${policyCount}, 初始可以屯田次数: ${totalTimes}, 屯光田后的剩余策书: ${remainingPolicy}`);

  // 计算策书恢复时间（当前时间到下一个整点的小时数）
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  const policyRecoveryTime = (nextHour - now) / (1000 * 60 * 60);
  console.log(`当前时间: ${now.toLocaleString()}, 
  下一个整点: ${nextHour.toLocaleString()}, 
  策书恢复时间: ${policyRecoveryTime.toFixed(2)}小时`);

  // 初始化分配方案
  let allocation = {
    woodTimes: 0,
    ironTimes: 0,
    stoneTimes: 0,
    finalTime: 0
  };

  // 剩余可用屯田次数
  let remainingTimes = totalTimes;

  // 当还有屯田次数且资源未全部达标时继续分配
  while (remainingTimes > 0) {
    // 计算当前各资源所需时间
    const woodTime = Math.max(0, (woodTarget - woodStock - (woodBonus * allocation.woodTimes)) / woodRate);
    const ironTime = Math.max(0, (ironTarget - ironStock - (ironBonus * allocation.ironTimes)) / ironRate);
    const stoneTime = Math.max(0, (stoneTarget - stoneStock - (stoneBonus * allocation.stoneTimes)) / stoneRate);
    console.log(`当前资源所需时间:\n木材: ${woodTime.toFixed(2)}小时\n铁矿: ${ironTime.toFixed(2)}小时\n石料: ${stoneTime.toFixed(2)}小时`);
    // 如果所有资源都已达标，提前结束
    if (woodTime <= 0 && ironTime <= 0 && stoneTime <= 0) {
      console.log(`所有资源已达标，提前结束`);
      break;
    }

    // 找出当前最需要屯田的资源
    const maxTime = Math.max(woodTime, ironTime, stoneTime);
    console.log(`当前最紧缺资源: ${maxTime === woodTime ? '木材' : maxTime === ironTime ? '铁矿' : '石料'}, 所需时间: ${maxTime.toFixed(2)}小时`);

    // 分配屯田次数给最需要的资源
    if (maxTime === woodTime) {
      allocation.woodTimes++;
      console.log(`已分配木材屯田次数: ${allocation.woodTimes}`);
    } else if (maxTime === ironTime) {
      allocation.ironTimes++;
      console.log(`已分配铁矿屯田次数: ${allocation.ironTimes}`);
    } else {
      allocation.stoneTimes++;
      console.log(`已分配石料屯田次数: ${allocation.stoneTimes}`);
    }

    remainingTimes--;
  }

  // 计算现有策书屯田后的缺口及生产所需时间
  const adjustedWoodTarget = woodTarget - (woodBonus * allocation.woodTimes);
  const adjustedIronTarget = ironTarget - (ironBonus * allocation.ironTimes);
  const adjustedStoneTarget = stoneTarget - (stoneBonus * allocation.stoneTimes);
  console.log(`如此屯田后的资源缺口:\n木材: ${adjustedWoodTarget}\n铁矿: ${adjustedIronTarget}\n石料: ${adjustedStoneTarget}`);

  allocation.finalTime = calculateTimeToTarget(
    woodStock, woodRate, adjustedWoodTarget,
    ironStock, ironRate, adjustedIronTarget,
    stoneStock, stoneRate, adjustedStoneTarget
  );

  // 处理剩余策书和恢复时间
  const finalTimeInt = Math.floor(allocation.finalTime);//整数部分
  const finalTimeFraction = allocation.finalTime - finalTimeInt;//小数部分
  console.log(`时间分解: 整数部分=${finalTimeInt}, 小数部分=${finalTimeFraction.toFixed(2)}, 策书恢复时间=${policyRecoveryTime.toFixed(2)}小时`);

  // 计算可恢复的策书数量
  let gotPolicy = finalTimeInt + remainingPolicy;
  // 如果小数部分大于恢复时间，则可以额外获得一个策书
  if (finalTimeFraction > policyRecoveryTime) {
    gotPolicy++;
    console.log(`小数部分大于恢复时间`);
  }
  console.log(`之前剩余策书: ${remainingPolicy}, 时间整数部分：${finalTimeInt}，等待的时间可获得策书: ${gotPolicy}`);

  // 更新剩余策书为可恢复的策书数量
  remainingPolicy = gotPolicy;

  return {
    woodTimes: allocation.woodTimes,
    ironTimes: allocation.ironTimes,
    stoneTimes: allocation.stoneTimes,
    finalTime: allocation.finalTime,
    remainingPolicy: remainingPolicy,
    policyRecoveryTime: policyRecoveryTime,
    planContent:planContent
  };
}

// Make functions available globally
window.calculateTimeToTarget = calculateTimeToTarget;
window.optimizeTuntianTimes = optimizeTuntianTimes;