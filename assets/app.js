const url = '../data.json';

async function getData() {
    const response = await fetch(url);
    const result = await response.json();

    printInfo(result)
}

const newArr = []

function printInfo(arr) {


    arr.forEach(el => {
        const { amount } = el;
        // console.log(amount)
        newArr.push(amount)

    });
    
    const total = newArr.reduce((a,b) => a + b);

    console.log(newArr)
    console.log(total)
}

getData()