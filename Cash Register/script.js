const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

// These will be overwritten by FCC tests
let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

document.getElementById("purchase-btn").addEventListener("click", () => {
  const cashInput = document.getElementById("cash").value;
  const changeDueEl = document.getElementById("change-due");
  const cash = parseFloat(cashInput);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueEl.innerText = "No change due - customer paid with exact cash";
    return;
  }

  let changeNeeded = parseFloat((cash - price).toFixed(2));
  const totalCid = parseFloat(cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));
  const reversedCid = [...cid].reverse();
  const changeArray = [];

  for (let [unit, amount] of reversedCid) {
    const unitVal = currencyUnit[unit];
    let used = 0;

    while (changeNeeded >= unitVal && amount >= unitVal) {
      changeNeeded = parseFloat((changeNeeded - unitVal).toFixed(2));
      amount = parseFloat((amount - unitVal).toFixed(2));
      used = parseFloat((used + unitVal).toFixed(2));
    }

    if (used > 0) {
      changeArray.push([unit, used]);
    }
  }

  if (changeNeeded > 0) {
    changeDueEl.innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  const changeSum = parseFloat(changeArray.reduce((acc, curr) => acc + curr[1], 0).toFixed(2));

  if (changeSum === totalCid) {
    let result = "Status: CLOSED";
    for (let [unit, amt] of cid) {
      const match = changeArray.find(([u]) => u === unit);
      if (match) result += ` ${unit}: $${match[1]}`;
    }
    changeDueEl.innerText = result;
  } else {
    let result = "Status: OPEN";
    for (let [unit, amt] of changeArray) {
      result += ` ${unit}: $${amt}`;
    }
    changeDueEl.innerText = result;
  }
});