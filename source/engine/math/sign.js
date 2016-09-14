//@flow 
//sign - denotes the additive inverse (multiplication to −1)
const sign = (n: number): number => {
  return Math.sign(n) ||  (n = +n) == 0 || n != n ? n : n < 0 ? -1 : 1;
};
module.exports = sign;
