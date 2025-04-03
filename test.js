const { calculateTimeToTarget } = require('./calculator.js');

// 测试用例
const testCases = [
  {
    name: "所有资源充足",
    input: [100, 10, 50, 200, 20, 100, 300, 30, 150],
    expected: 0
  },
  {
    name: "木材不足",
    input: [50, 10, 100, 200, 20, 100, 300, 30, 150],
    expected: 5
  },
  {
    name: "铁矿不足",
    input: [100, 10, 50, 50, 20, 100, 300, 30, 150],
    expected: 2.5
  },
  {
    name: "石料不足",
    input: [100, 10, 50, 200, 20, 100, 100, 30, 150],
    expected: 1.67
  },
  {
    name: "所有资源不足",
    input: [50, 10, 100, 50, 20, 100, 100, 30, 150],
    expected: 5
  },
  {
    name: "真实案例",
    input: [25168, 30581, 100000, 79111, 30541, 100000, 136731, 30350, 300000],
    expected: 5.379
  }
];

// 运行测试
console.log("开始测试calculateTimeToTarget函数:");
testCases.forEach((testCase, index) => {
  const result = calculateTimeToTarget(...testCase.input);
  const passed = Math.abs(result - testCase.expected) < 0.01;
  
  console.log(`\n测试用例 ${index + 1}: ${testCase.name}`);
  console.log(`输入: ${testCase.input.join(', ')}`);
  console.log(`预期结果: ${testCase.expected}`);
  console.log(`实际结果: ${result}`);
  console.log(`测试结果: ${passed ? '通过' : '失败'}`);
});