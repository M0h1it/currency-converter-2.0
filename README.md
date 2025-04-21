# 💱 Currency Converter Web App

A sleek and modern currency converter web application that lets users convert between international currencies using real-time exchange rates from the [Frankfurter API](https://www.frankfurter.app/). This app features a responsive interface, currency flag icons, a clean exchange rate chart, and real-time rate updates with daily change indicators.

---

## 🌟 Features

- 🌐 **Real-Time Exchange Rates** using Frankfurter API  
- 🇺🇸 **Currency Dropdowns with Flags**, Short Names, and Full Names  
- 🔄 **Live Conversion** as you type  
- 📈 **7-Day Exchange Rate Line Chart** using Chart.js  
- ⬆️⬇️ **Daily Rate Change** Indicator with Arrows (↑ or ↓)  
- 📱 **Fully Responsive UI** with a modern and clean design  
- ❌ Removed Dark Mode and Share Button for simplicity  
- 🚫 No page reloads – all updates happen instantly  

---

### 🛠️ How to Run the Project

1. Clone or download this repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, etc.).
3. You're good to go – no server or build tools required!

---


## 📦 Dependencies

This project uses the following libraries:

- [**Chart.js**](https://www.chartjs.org/) – For interactive exchange rate charts
- [**Frankfurter API**](https://www.frankfurter.app/) – For free and reliable exchange rates
- [**Google Fonts (Inter)**](https://fonts.google.com/specimen/Inter) – For clean typography
- [**FlagsAPI**](https://flagsapi.com/) – To show country flags based on currency codes

---

## 🧠 Logic Breakdown

- Dropdowns are populated dynamically using API data with country flags.
- On user input, the script fetches conversion results and shows:
  - Converted amount
  - Current exchange rate
  - Daily change with ↑ or ↓ icon
- The exchange rate chart shows the last 7 days of data for the selected currency pair.
- Clean, minimal chart with no grid lines and interactive tooltips for each data point.

---

## ✨ Customization Ideas

- Add currency favorites or saved conversions
- Add backend to store history
- Add offline support using local storage
- Improve accessibility for screen readers

---

## 🙌 Credits

- Exchange Rates: [Frankfurter API](https://www.frankfurter.app/)
- Flags: [FlagsAPI.com](https://flagsapi.com/)
- Charts: [Chart.js](https://www.chartjs.org/)
- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

---

## 📃 License

This project is open-source and free to use under the MIT License.
