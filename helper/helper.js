function sumTotal(balance) {
  if (balance > 0) {
    return `${balance.toLocaleString("id-ID", {
      style : 'currency',
      currency : 'IDR'
    })}`;
  }
  return `Rp. -`;
}

module.exports = { sumTotal };
