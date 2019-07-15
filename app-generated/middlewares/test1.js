
const genFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('result')
    }, 2000)
  })
}
exports.testFunc = async function (ctx, next) {
  const result = await genFunc();
  console.log(result);
  await next();
}
