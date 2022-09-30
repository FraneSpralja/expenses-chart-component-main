const url = 'data.json';
const App = document.querySelector('#app');

eventListener()

function eventListener() {
    
    printBalance()
    getData()

}

function getData() {
    // const response = await fetch(url);
    // const result = await response.json();

    fetch(url)
        .then(response => response.json())
        .then(data => printInfo(data))
        .catch(err => console.log(err))

    // printInfo(result)
}

const newArr = []

function printInfo(arr) {

    printSpendHTML()

    const charts = document.querySelector('#charts');

    const mainSpend = document.querySelector('.main-spend')
    const before = document.querySelector('.bottom-spend');
    
    
    arr.forEach(el => {
        const chartBlock = document.createElement('div');
        const chart = document.createElement('div');
        const chartSpan = document.createElement('span')

        const { day, amount } = el;

        chart.style.height = `${amount * 3}px`;
        chart.dataset.id = amount;
        chart.dataset.day = day;
        chartSpan.textContent += day;

        chartBlock.appendChild(chart);
        chartBlock.appendChild(chartSpan)

        charts.appendChild(chartBlock);
        mainSpend.insertBefore(charts, before);
        
        newArr.push(amount)
    });

    const chartsArr = document.querySelectorAll('#charts > div > div');
    
    const total = newArr.reduce((a , b) => a + b);

    getDateOfChart(chartsArr)
    tooltipAmountOnChart(total);
    printTotalSpend(total);
}

function printBalance() {
    const balanceDiv = document.createElement('div');
    balanceDiv.classList.add('balance-block');
    
    const bodyBalance = document.createElement('div');
    bodyBalance.classList.add('body-balance');

    const balanceTitle = document.createElement('span');
    balanceTitle.textContent = 'My Balance';

    const totalAmountBalance = document.createElement('span');
    totalAmountBalance.classList.add('body-balance_total');
    totalAmountBalance.textContent = `$${prompt('What is your total?')}`;

    const logoBalanceDiv = document.createElement('div');
    logoBalanceDiv.classList.add('logo-balance');

    const imgLogoBalance = document.createElement('img');
    imgLogoBalance.src = './images/logo.svg';

    bodyBalance.appendChild(balanceTitle);
    bodyBalance.appendChild(totalAmountBalance);

    logoBalanceDiv.appendChild(imgLogoBalance);

    balanceDiv.appendChild(bodyBalance);
    balanceDiv.appendChild(logoBalanceDiv);

    App.appendChild(balanceDiv);
}

function printSpendHTML() {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('main-spend');

    const mainTitle = document.createElement('h2');
    mainTitle.classList.add('main-title');
    mainTitle.textContent = 'Spending - Last 7 days';

    const chartSpendDiv = document.createElement('div');
    chartSpendDiv.id = "charts";
    chartSpendDiv.classList.add('chart-spend');

    const bottomSpend = document.createElement('div');
    bottomSpend.classList.add('bottom-spend');

    const totalSpendDiv = document.createElement('div');
    totalSpendDiv.classList.add('total-spend-block');

    const totalSpendSpan = document.createElement('span');
    totalSpendSpan.classList.add('total-spend-text');
    totalSpendSpan.textContent = 'Total this month';

    const totalSpend = document.createElement('span');
    totalSpend.classList.add('total-spend');
    totalSpend.textContent = `$${0}`;

    const totalPercentDiv = document.createElement('div');
    totalPercentDiv.classList.add('total-percent-block');

    const totalPercentSpan = document.createElement('span');
    totalPercentSpan.classList.add('percent-spend-text');
    totalPercentSpan.textContent = `+2.4%`;

    const totalPercentText = document.createElement('span');
    totalPercentText.classList.add('total-spend-text');
    totalPercentText.textContent = 'from last month';

    totalSpendDiv.appendChild(totalSpendSpan);
    totalSpendDiv.appendChild(totalSpend);

    totalPercentDiv.appendChild(totalPercentSpan);
    totalPercentDiv.appendChild(totalPercentText);

    bottomSpend.appendChild(totalSpendDiv);
    bottomSpend.appendChild(totalPercentDiv);

    mainDiv.appendChild(mainTitle);
    mainDiv.appendChild(chartSpendDiv);
    mainDiv.appendChild(bottomSpend);

    App.appendChild(mainDiv);
}

function getDateOfChart(arr) {

    for(let i = 0; i < arr.length; i++) {
        let nameDate = arr[i].dataset.day;
        let locale = 'en-US';
        let day = new Date().toLocaleDateString(locale, {weekday: 'short'}).toLocaleLowerCase();
        
        if(nameDate == day) {
            arr[i].classList.add('active')
        }
    }
}

function tooltipAmountOnChart() {
    const chartDiv = document.querySelectorAll('#charts > div')
    
    for(let i = 0; i < chartDiv.length; i++) {
        const chartFather = chartDiv[i];
        const chart = chartFather.querySelector('[data-id]');
        
        chart.addEventListener('mouseover', () => {

            const tooltip = document.createElement('div');
            tooltip.classList.add('amount-tooltip');
            tooltip.textContent = `$${chart.dataset.id}`; 

            chart.appendChild(tooltip);
        })

        chart.addEventListener('mouseout', () => {
            document.querySelector('.amount-tooltip').remove()
        })
    }
}

function printTotalSpend(total) {
    setTimeout(() => {
        document.querySelector('span.total-spend').textContent = `$${total}`
    }, 500)
}