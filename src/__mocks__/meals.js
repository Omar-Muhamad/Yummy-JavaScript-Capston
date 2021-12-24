const fetchMeals = () => Promise.resolve({ meals: [1, 2, 3] });

const displayDataLength = (len, categoryName) => {
  return `${len} ${categoryName} recipes`;
}
module.exports = { fetchMeals, displayDataLength };