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
  planContent += `现有策书可以屯田${totalTimes}次。${remainingPolicy > 0 ? `并剩余${remainingPolicy}个策书` : ""}\n`;

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

  // 计算当前各资源所需时间
  const woodTime = Math.max(0, (woodTarget - woodStock - (woodBonus * allocation.woodTimes)) / woodRate);
  const ironTime = Math.max(0, (ironTarget - ironStock - (ironBonus * allocation.ironTimes)) / ironRate);
  const stoneTime = Math.max(0, (stoneTarget - stoneStock - (stoneBonus * allocation.stoneTimes)) / stoneRate);
  planContent += `当前资源所需时间：木材: ${timeFormat(woodTime)}；铁矿: ${timeFormat(ironTime)}；石料: ${timeFormat(stoneTime)}\n`;
  // 剩余可用屯田次数
  let remainingTimes = totalTimes;

  // 当还有屯田次数且资源未全部达标时继续分配
  while (remainingTimes > 0) {
    // 计算当前各资源所需时间
    const woodTime = Math.max(0, (woodTarget - woodStock - (woodBonus * allocation.woodTimes)) / woodRate);
    const ironTime = Math.max(0, (ironTarget - ironStock - (ironBonus * allocation.ironTimes)) / ironRate);
    const stoneTime = Math.max(0, (stoneTarget - stoneStock - (stoneBonus * allocation.stoneTimes)) / stoneRate);
    console.log(`当前资源所需时间:\n木材: ${woodTime.toFixed(2)}小时 ${timeFormat(woodTime)}\n铁矿: ${ironTime.toFixed(2)}小时 ${timeFormat(ironTime)}\n石料: ${stoneTime.toFixed(2)}小时 ${timeFormat(stoneTime)}`);
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

  planContent += `分配屯田次数:\n木材: ${allocation.woodTimes}次；铁矿: ${allocation.ironTimes}次；石料: ${allocation.stoneTimes}次\n`;
  // 计算现有策书屯田后的缺口及生产所需时间
  const adjustedWoodTarget = woodTarget - (woodBonus * allocation.woodTimes);
  const adjustedIronTarget = ironTarget - (ironBonus * allocation.ironTimes);
  const adjustedStoneTarget = stoneTarget - (stoneBonus * allocation.stoneTimes);
  console.log(`如此屯田后的资源缺口:\n木材: ${adjustedWoodTarget}\n铁矿: ${adjustedIronTarget}\n石料: ${adjustedStoneTarget}`);

  // 屯田后，计算当前各资源所需时间
  const woodTime1 = Math.max(0, (woodTarget - woodStock - (woodBonus * allocation.woodTimes)) / woodRate);
  const ironTime1 = Math.max(0, (ironTarget - ironStock - (ironBonus * allocation.ironTimes)) / ironRate);
  const stoneTime1 = Math.max(0, (stoneTarget - stoneStock - (stoneBonus * allocation.stoneTimes)) / stoneRate);
  planContent += `这样屯田后还需要等待：木材: ${timeFormat(woodTime1)}；铁矿: ${timeFormat(ironTime1)}；石料: ${timeFormat(stoneTime1)}\n`;
  maxTime1 = Math.max(woodTime1, ironTime1, stoneTime1);//第一次分配，现有策书屯完之后，还需要等待的时间
  // 计算最终时间
  // allocation.finalTime = calculateTimeToTarget(
  //   woodStock, woodRate, adjustedWoodTarget,
  //   ironStock, ironRate, adjustedIronTarget,
  //   stoneStock, stoneRate, adjustedStoneTarget
  // );

  //根据给定的一段时间，结合当前的时间，计算可以恢复的策书数量
  function gotPolicyByTime(time, policyRecoveryTime, remainingPolicy) {
    const timeInt = Math.floor(time);//整数部分
    const timeFraction = time - timeInt;//小数部分
    console.log(`时间分解: 整数部分=${timeInt}, 小数部分=${timeFraction.toFixed(2)}, 策书恢复时间=${policyRecoveryTime.toFixed(2)}小时=${timeFormat(policyRecoveryTime)}`);

    // 计算可恢复的策书数量
    let gotPolicy = timeInt;
    // 如果小数部分大于恢复时间，则可以额外获得一个策书
    if (timeFraction > policyRecoveryTime) {
      gotPolicy++;
      // console.log(`小数部分大于恢复时间`);
    }
    gotPolicy += remainingPolicy;
    return gotPolicy;
  }
  /*
    // 处理剩余策书和恢复时间
    const finalTimeInt = Math.floor(maxTime1);//整数部分
    const finalTimeFraction = maxTime1 - finalTimeInt;//小数部分
    console.log(`时间分解: 整数部分=${finalTimeInt}, 小数部分=${finalTimeFraction.toFixed(2)}, 策书恢复时间=${policyRecoveryTime.toFixed(2)}小时=${timeFormat(policyRecoveryTime)}`);
  
    // 计算可恢复的策书数量
    let gotPolicy = finalTimeInt;
    // 如果小数部分大于恢复时间，则可以额外获得一个策书
    if (finalTimeFraction > policyRecoveryTime) {
      gotPolicy++;
      console.log(`小数部分大于恢复时间`);
    }
    gotPolicy += remainingPolicy; */

  let gotPolicy = gotPolicyByTime(maxTime1, policyRecoveryTime, remainingPolicy);//这段时间增加的策书
  let addedTimes = Math.floor(gotPolicy / 3); //这段时间增加的可以屯田的次数。
  //console.log(`之前剩余策书: ${remainingPolicy}, 时间整数部分：${finalTimeInt}，等待的时间可获得策书: ${gotPolicy}`);
  //planContent += `在等待的时间里还可以自动恢复${gotPolicy - remainingPolicy}个策书，加上之前剩余的${remainingPolicy}个策书，总共还有${gotPolicy}个策书，可以屯田${addedTimes}次\n`;//这里有问题，因为屯田这么多次之后，时间又变了，又不足以支撑增加这么多策书了。
  //用于记录最后一次取消的屯田对象
  let lastResource = '';

  //动态分配剩余屯田次数
  i = addedTimes;
  let planB = {
    woodTimes: 0,
    ironTimes: 0,
    stoneTimes: 0
  }
  while (i > 0) {
    // 计算当前各资源所需时间
    let woodTime = Math.max(0, (adjustedWoodTarget - woodStock - (woodBonus * planB.woodTimes)) / woodRate);
    let ironTime = Math.max(0, (adjustedIronTarget - ironStock - (ironBonus * planB.ironTimes)) / ironRate);
    let stoneTime = Math.max(0, (adjustedStoneTarget - stoneStock - (stoneBonus * planB.stoneTimes)) / stoneRate);
    console.log(`当前资源所需时间:\n木材: ${woodTime.toFixed(2)}小时 ${timeFormat(woodTime)}\n铁矿: ${ironTime.toFixed(2)}小时 ${timeFormat(ironTime)}\n石料: ${stoneTime.toFixed(2)}小时 ${timeFormat(stoneTime)}`);
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
      planB.woodTimes++;
      woodTime = Math.max(0, (adjustedWoodTarget - woodStock - (woodBonus * planB.woodTimes)) / woodRate);
      console.log(`已分配木材屯田次数: ${planB.woodTimes}`);
    } else if (maxTime === ironTime) {
      planB.ironTimes++;
      ironTime = Math.max(0, (adjustedIronTarget - ironStock - (ironBonus * planB.ironTimes)) / ironRate);
      console.log(`已分配铁矿屯田次数: ${planB.ironTimes}`);
    } else {
      planB.stoneTimes++;
      stoneTime = Math.max(0, (adjustedStoneTarget - stoneStock - (stoneBonus * planB.stoneTimes)) / stoneRate);
      console.log(`已分配石料屯田次数: ${planB.stoneTimes}`);
    }
    //检验时间是否支撑策书的新增
    const maxTime2 = Math.max(woodTime, ironTime, stoneTime);
    const gotPolicy2 = gotPolicyByTime(maxTime2, policyRecoveryTime, remainingPolicy);//计算出来的这段时间实际上增加的策书数量。
    const addedTimes2 = Math.floor(gotPolicy2 / 3); //计算出来的这段时间实际上增加的可以屯田的次数。


    //如果当前已经使用的次数已经超出了这段时间实际可以增加的次数了，那么刚才这次屯田是应该取消的
    if (planB.woodTimes + planB.ironTimes + planB.stoneTimes > addedTimes2) {
      console.log(`当前已经使用的次数已经超出了这段时间实际可以增加的次数了，那么刚才这次屯田是应该取消的`);
      if (maxTime === woodTime) {
        planB.woodTimes--;
        lastResource = '木材';
      }
      else if (maxTime === ironTime) {
        planB.ironTimes--;
        lastResource = '铁矿';
      }
      else {
        planB.stoneTimes--;
        lastResource = '石料';
      }
      break;
    }


    i--;
  }
  if (addedTimes > 0) {//是否有必要播报这一段
    planContent += `在等待的时间里还可以自动恢复一些策书，加上之前剩余的${remainingPolicy}个策书，`;
    planContent += `使用这些策书屯田:\n木材: ${planB.woodTimes}次；铁矿: ${planB.ironTimes}次；石料: ${planB.stoneTimes}次\n`;
  }
  const woodTotalTimes = allocation.woodTimes + planB.woodTimes;
  const ironTotalTimes = allocation.ironTimes + planB.ironTimes;
  const stoneTotalTimes = allocation.stoneTimes + planB.stoneTimes;
  const woodTime2 = Math.max(0, (woodTarget - woodStock - (woodBonus * woodTotalTimes)) / woodRate);
  const ironTime2 = Math.max(0, (ironTarget - ironStock - (ironBonus * ironTotalTimes)) / ironRate);
  const stoneTime2 = Math.max(0, (stoneTarget - stoneStock - (stoneBonus * stoneTotalTimes)) / stoneRate);
  const maxTime2 = Math.max(woodTime2, ironTime2, stoneTime2);


  planContent += `所以，最终的屯田方案是：\n<xx>木材: ${woodTotalTimes}次；铁矿: ${ironTotalTimes}次；石料: ${stoneTotalTimes}次</xx>\n同时需要等待的时间为：<xx>${timeFormat(maxTime2)}</xx>\n`;
  const now1 = new Date();
  const futureTime = calculateFutureTime(maxTime2);
  planContent += `现在的时间是：<xx>${formatTimeToChinese(now1)}</xx>，资源达标时间是：<xx>${formatTimeToChinese(futureTime)}</xx>\n`;

  planContent += `注意：策书可能会提前，如果发现策书充足，则可以赶紧再<xx>屯田一次${lastResource}</xx>。这里程序还在优化\n`;//实在算不过来了。先这样吧。TODO: 计算策书恰好恢复充足的具体时间。
  planContent += `屯田、行军、落州等时间忽略不计，注意提前屯田防止爆仓。`;
  return {
    woodTimes: allocation.woodTimes + planB.woodTimes,
    ironTimes: allocation.ironTimes + planB.ironTimes,
    stoneTimes: allocation.stoneTimes + planB.stoneTimes,
    planContent: planContent
  };
}
function timeFormat(hours) {
  const hoursInt = Math.floor(hours);
  const minutes = (hours - hoursInt) * 60;
  const minutesInt = Math.floor(minutes);
  return `${hoursInt}小时${minutesInt}分钟`;
}

function formatTimeToChinese(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}点${minutes}分`;
}

function calculateFutureTime(hoursToAdd) {
  const now = new Date();
  const hoursInt = Math.floor(hoursToAdd);
  const minutesToAdd = Math.round((hoursToAdd - hoursInt) * 60);

  const futureTime = new Date(now);
  futureTime.setHours(now.getHours() + hoursInt);
  futureTime.setMinutes(now.getMinutes() + minutesToAdd);

  return futureTime;
}

// Make functions available globally
window.calculateTimeToTarget = calculateTimeToTarget;
window.optimizeTuntianTimes = optimizeTuntianTimes;
window.calculateFutureTime = calculateFutureTime;
