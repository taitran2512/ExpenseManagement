function formatMoney(num = 0) {
   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ';
}
export { formatMoney };
