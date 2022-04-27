document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    getValues(document.querySelector("button"));
  }
});
const getValues = (btn) => {
  const n1 = btn.parentNode.querySelector("[id=n1]").value;
  const n2 = btn.parentNode.querySelector("[id=n2]").value;
  const result = sum(sumOfMultiples(+n1), sumOfMultiples(+n2));
  setTimeout(()=>{
    logInfo(result)
  }, 1000)
};



const logInfo = (sum) => {
  const result = document.getElementById("myEvent");
  result.textContent = sum;
};

const sumOfMultiples = (number) => {
  let sum = 0;
  for (let i = number; i <= 1000; i++) {
    if (i % number === 0) {
      sum += i;
    }
  }
  return sum;
};

const sum = (multiplesOfNum1, multiplesOfNum2) => {
  let sum = multiplesOfNum1 + multiplesOfNum2;
  return sum;
};

