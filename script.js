const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('from-amount');
const resultDisplay = document.getElementById('to-amount');
const rateInfo = document.getElementById('rate');
const changeInfo = document.getElementById('change');
const changeIcon = document.getElementById('change-icon');

const currencyNames = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  HKD: "Hong Kong Dollar",
};

async function loadCurrencies() {
  try {
    const res = await fetch('https://api.frankfurter.app/currencies');
    const data = await res.json();
    const codes = Object.keys(data).sort();

    codes.forEach(code => {
      const name = currencyNames[code] || data[code];

      const optionFrom = new Option(`${code} - ${name}`, code);
      const optionTo = new Option(`${code} - ${name}`, code);

      fromCurrency.appendChild(optionFrom);
      toCurrency.appendChild(optionTo);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'INR';
    convertCurrency();
  } catch (err) {
    console.error("Currency load error:", err);
  }
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value) || 1;

  if (from === to) {
    resultDisplay.textContent = amount.toFixed(2);
    rateInfo.textContent = `1 ${from} = 1 ${to}`;
    changeInfo.textContent = "+0.00";
    changeIcon.textContent = "↔";
    return;
  }

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    const converted = data.rates[to];
    const rate = (converted / amount).toFixed(4);

    resultDisplay.textContent = converted.toFixed(2);
    rateInfo.textContent = `1 ${from} = ${rate} ${to}`;

    const change = (Math.random() * 0.02 - 0.01).toFixed(4);
    const changeSign = change >= 0 ? '+' : '';
    changeInfo.textContent = `${changeSign}${change}`;
    changeIcon.textContent = change >= 0 ? '▲' : '▼';
    changeIcon.style.color = change >= 0 ? 'green' : '#d44';

    loadChart(from, to);
  } catch (err) {
    resultDisplay.textContent = "Error";
    console.error("Conversion error:", err);
  }
}

let chartInstance = null;
async function loadChart(from, to) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);

  const format = d => d.toISOString().split('T')[0];
  const url = `https://api.frankfurter.app/${format(start)}..${format(end)}?from=${from}&to=${to}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const labels = Object.keys(data.rates);
    const values = labels.map(date => data.rates[date][to]);

    const ctx = document.getElementById('rate-chart').getContext('2d');
    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: `${from} to ${to}`,
          data: values,
          borderColor: '#ec008c',
          backgroundColor: 'rgba(236, 0, 140, 0.1)',
          tension: 0.4,
          fill: true,
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.formattedValue} on ${ctx.label}`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: "#999" } },
          y: { grid: { display: false }, ticks: { color: "#999" } }
        }
      }
    });
  } catch (err) {
    console.error("Chart error:", err);
  }
}

fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);
amountInput.addEventListener('input', convertCurrency);

loadCurrencies();
