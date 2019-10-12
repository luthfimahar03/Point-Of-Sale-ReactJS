export default {
    formatCurrency: function (num) {
        return 'Rp' + Number(num.toFixed(1)).toLocaleString() + ' ';
    }
}