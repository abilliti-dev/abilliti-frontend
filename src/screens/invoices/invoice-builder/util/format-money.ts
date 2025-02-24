const formatMoney = (money: number) => {
  return "$" + (Math.round(money * 100) / 100).toFixed(2);
};

export default formatMoney;
