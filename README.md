# ProcessOptima – AI System Process Analyzer

ProcessOptima is a **real-time, AI-powered system monitoring dashboard** that analyzes CPU usage, memory usage, and running processes, detects anomalies, and generates intelligent optimization recommendations.

The system uses a **Node.js backend** to collect live operating system metrics and a **browser-based frontend** to visualize and analyze the data.

Built with **HTML, CSS, JavaScript, Chart.js, and Node.js**.

---

## 📌 Overview

ProcessOptima converts **real-time operating system metrics** into actionable intelligence.

The backend collects system-level data directly from the OS, while the frontend performs AI-based analysis, visualization, alerting, and reporting in real time.

### Use Cases

- Operating Systems lab demonstrations
- Real-time system performance monitoring
- AI-assisted diagnostics and alerts
- Educational and academic projects
- Prototype system monitoring tools

---

## ✨ Features

### Real-Time Monitoring

- Live CPU usage
- Live memory usage
- Auto-sorted running process list
- Total process count
- System health evaluation

### AI Analysis Engine

- Per-process anomaly detection
- Threshold-based and heuristic analysis
- System-level optimization recommendations
- Real-time alerts (Low / Medium / High severity)
- Historical trend analysis

### Visualizations

- CPU usage trend chart
- Memory usage trend chart
- Responsive and interactive UI

### Reporting

- One-click JSON report export
- Includes:
  - Timestamped system snapshots
  - Anomalies
  - Recommendations
  - Historical data

---

## 📁 Project Structure

```

AI-System-Process-Analyzer/
│
├── backend/
│   ├── server.js        # Node.js backend (real OS data)
│   └── package.json
│
├── frontend/
│   ├── index.html       # UI layout
│   ├── style.css        # UI styles
│   └── script.js        # Monitoring logic & AI engine
│
└── README.md

````

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ManiDeep1822/AI-System-Process-Analyzer.git
cd AI-System-Process-Analyzer
````

---

### 2️⃣ Backend setup (Required for real-time data)

```bash
cd backend
npm install
node server.js
```

The backend starts at:

```
http://localhost:3000
```

---

### 3️⃣ Run the frontend

Open the following file in a browser (preferably using Live Server):

```
frontend/index.html
```

---

## 🔌 Input Method (IMPORTANT)

* The **input to the system comes from the operating system itself**
* A **Node.js backend** collects:

  * CPU usage
  * Memory usage
  * Running processes
* This data is sent to the frontend through a REST API
* The frontend consumes this data every few seconds and uses it as input for:

  * AI analysis
  * Charts
  * Alerts
  * Recommendations

> Static (fake) data was used only during early UI development and testing.
> The final implementation uses **real-time OS data**.

---

## 🧠 AI Engine Overview

### Anomaly Detection

Detects:

* High CPU usage per process
* High memory consumption
* System-wide overload conditions

### Recommendation Generator

Provides:

* CPU optimization suggestions
* Memory usage optimization tips
* Process-level warnings
* Preventive system advice

### Alert Engine

Triggers alerts for:

* Critical CPU load
* Memory exhaustion
* Multiple anomalous processes
* System instability risks

---

## 📊 UI Components

### System Overview Panel

* CPU Usage
* Memory Usage
* Total Processes
* System Health Status

### Process Table

Displays:

* PID
* Process Name
* CPU %
* Memory %
* Memory Usage (MB)
* AI Analysis Status

### Charts

* CPU usage over time
* Memory usage over time

### Alerts Panel

* Live alerts
* Severity-based color coding

---

## 📦 Exported Report Format

```json
{
  "generatedAt": "timestamp",
  "system": {
    "cpuUsage": 62.4,
    "memoryUsage": 71.3
  },
  "analysis": {
    "anomalies": [],
    "recommendations": []
  }
}
```

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Chart.js
* Node.js
* systeminformation (OS-level metrics)

---

## ⚙️ Future Enhancements

* WebSocket-based live streaming
* Machine learning anomaly models
* Process inspection and termination
* Cross-machine monitoring
* Dark / Light mode toggle

---

## 📤 Deployment Notes

* Frontend can be deployed on:

  * GitHub Pages
  * Netlify
  * Vercel
* Backend must run separately to provide real-time OS data

---

## 🤝 Contributing

Contributions are welcome.

Please open an issue before making major changes.

---
