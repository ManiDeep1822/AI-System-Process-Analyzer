// AI System Process Analyzer - JavaScript Implementation

class ProcessAnalyzer {
    constructor() {
        this.isMonitoring = false;
        this.monitorInterval = null;
        this.processHistory = [];
        this.performanceData = {
            cpu: [],
            memory: [],
            timestamp: []
        };
        this.aiModel = new AIModel();
        this.charts = {};
        
        this.initializeCharts();
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('startBtn').addEventListener('click', () => this.startMonitoring());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopMonitoring());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportReport());
    }

    initializeCharts() {
        const cpuCtx = document.getElementById('cpuChart').getContext('2d');
        const memoryCtx = document.getElementById('memoryChart').getContext('2d');

        this.charts.cpu = new Chart(cpuCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'CPU Usage %',
                    data: [],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

        this.charts.memory = new Chart(memoryCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Memory Usage %',
                    data: [],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    async startMonitoring() {
        this.isMonitoring = true;
        this.updateUIStatus(true);
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;

        // Start monitoring loop
        this.monitorInterval = setInterval(async () => {
            await this.collectAndAnalyzeData();
        }, 2000); // Update every 2 seconds

        // Initial data collection
        await this.collectAndAnalyzeData();
    }

    stopMonitoring() {
        this.isMonitoring = false;
        this.updateUIStatus(false);
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;

        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
        }
    }

    updateUIStatus(isRunning) {
        const indicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        
        if (isRunning) {
            indicator.className = 'status-indicator status-online';
            statusText.textContent = 'Monitoring Live';
        } else {
            indicator.className = 'status-indicator status-offline';
            statusText.textContent = 'Offline';
        }
    }

    async collectAndAnalyzeData() {
        try {
            // Simulate process data collection (in real implementation, this would use system APIs)
            const systemData = await this.collectSystemData();
            const processData = await this.collectProcessData();
            
            // Update system overview
            this.updateSystemOverview(systemData);
            
            // Update process table
            this.updateProcessTable(processData);
            
            // Perform AI analysis
            const analysisResults = this.aiModel.analyze(processData, systemData);
            
            // Update AI analysis panels
            this.updateAnomalies(analysisResults.anomalies);
            this.updateRecommendations(analysisResults.recommendations);
            this.updateAlerts(analysisResults.alerts);
            
            // Update charts
            this.updateCharts(systemData);
            
            // Store history
            this.storeHistory(processData, systemData, analysisResults);
            
        } catch (error) {
            console.error('Error collecting data:', error);
            this.showAlert('Error collecting system data', 'high');
        }
    }

    async collectSystemData() {
        // Simulate system data collection
        // In a real implementation, this would use system APIs or a backend service
        return {
            cpuUsage: Math.random() * 100,
            memoryUsage: 30 + Math.random() * 50,
            totalProcesses: 150 + Math.floor(Math.random() * 50),
            timestamp: new Date().toLocaleTimeString()
        };
    }

    async collectProcessData() {
        // Simulate process data collection
        const processes = [];
        const processNames = [
            'chrome.exe', 'node.exe', 'code.exe', 'mysqld.exe', 'python.exe',
            'explorer.exe', 'svchost.exe', 'winlogon.exe', 'csrss.exe', 'system'
        ];

        for (let i = 0; i < 15; i++) {
            const cpuUsage = Math.random() * 100;
            const memoryUsage = Math.random() * 50;
            
            processes.push({
                pid: 1000 + i,
                name: processNames[Math.floor(Math.random() * processNames.length)],
                cpu: cpuUsage,
                memory: memoryUsage,
                memoryMB: Math.floor(memoryUsage * 50),
                status: 'Running'
            });
        }

        // Sort by CPU usage
        return processes.sort((a, b) => b.cpu - a.cpu);
    }

    updateSystemOverview(data) {
        document.getElementById('cpuUsage').textContent = data.cpuUsage.toFixed(1) + '%';
        document.getElementById('memoryUsage').textContent = data.memoryUsage.toFixed(1) + '%';
        document.getElementById('totalProcesses').textContent = data.totalProcesses;
        
        // Update progress bars
        document.getElementById('cpuProgress').style.width = data.cpuUsage + '%';
        document.getElementById('memoryProgress').style.width = data.memoryUsage + '%';
        
        // Update system health
        const health = this.calculateSystemHealth(data);
        document.getElementById('systemHealth').textContent = health.status;
        document.getElementById('systemHealth').className = `health-${health.level}`;
    }

    calculateSystemHealth(data) {
        let score = 100;
        
        if (data.cpuUsage > 80) score -= 20;
        if (data.cpuUsage > 90) score -= 20;
        if (data.memoryUsage > 80) score -= 20;
        if (data.memoryUsage > 90) score -= 20;
        
        if (score >= 80) return { status: 'Excellent', level: 'excellent' };
        if (score >= 60) return { status: 'Good', level: 'good' };
        if (score >= 40) return { status: 'Fair', level: 'fair' };
        return { status: 'Poor', level: 'poor' };
    }

    updateProcessTable(processes) {
        const tbody = document.getElementById('processTableBody');
        tbody.innerHTML = '';

        processes.forEach(process => {
            const analysis = this.aiModel.analyzeProcess(process);
            const row = document.createElement('tr');
            
            if (analysis.isAnomaly) {
                row.className = 'process-critical';
            } else if (process.cpu > 80 || process.memory > 80) {
                row.className = 'process-warning';
            }

            row.innerHTML = `
                <td>${process.pid}</td>
                <td>${process.name}</td>
                <td>${process.cpu.toFixed(1)}%</td>
                <td>${process.memory.toFixed(1)}%</td>
                <td>${process.memoryMB} MB</td>
                <td>${process.status}</td>
                <td><span class="ai-badge ${analysis.badgeClass}">${analysis.status}</span></td>
            `;
            
            tbody.appendChild(row);
        });
    }

    updateAnomalies(anomalies) {
        const container = document.getElementById('anomaliesList');
        container.innerHTML = '';

        anomalies.forEach(anomaly => {
            const div = document.createElement('div');
            div.className = 'anomaly-item';
            div.innerHTML = `
                <strong>${anomaly.processName}</strong> (PID: ${anomaly.pid})<br>
                <small>${anomaly.reason} - Score: ${anomaly.score.toFixed(2)}</small>
            `;
            container.appendChild(div);
        });

        if (anomalies.length === 0) {
            container.innerHTML = '<div class="anomaly-item">No anomalies detected</div>';
        }
    }

    updateRecommendations(recommendations) {
        const container = document.getElementById('recommendationsList');
        container.innerHTML = '';

        recommendations.forEach(rec => {
            const div = document.createElement('div');
            div.className = 'recommendation-item';
            div.innerHTML = `
                <strong>${rec.type.toUpperCase()}</strong><br>
                ${rec.message}
            `;
            container.appendChild(div);
        });
    }

    updateAlerts(alerts) {
        const container = document.getElementById('alertsList');
        container.innerHTML = '';

        alerts.forEach(alert => {
            const div = document.createElement('div');
            div.className = `alert-item alert-${alert.level}`;
            div.innerHTML = `
                <strong>${alert.title}</strong><br>
                <small>${alert.message}</small>
            `;
            container.appendChild(div);
        });

        if (alerts.length === 0) {
            container.innerHTML = '<div class="alert-item alert-low">No active alerts</div>';
        }
    }

    updateCharts(systemData) {
        const now = new Date().toLocaleTimeString();
        
        // Update CPU chart
        this.charts.cpu.data.labels.push(now);
        this.charts.cpu.data.datasets[0].data.push(systemData.cpuUsage);
        
        // Update Memory chart
        this.charts.memory.data.labels.push(now);
        this.charts.memory.data.datasets[0].data.push(systemData.memoryUsage);
        
        // Keep only last 20 data points
        if (this.charts.cpu.data.labels.length > 20) {
            this.charts.cpu.data.labels.shift();
            this.charts.cpu.data.datasets[0].data.shift();
            this.charts.memory.data.labels.shift();
            this.charts.memory.data.datasets[0].data.shift();
        }
        
        this.charts.cpu.update();
        this.charts.memory.update();
    }

    storeHistory(processData, systemData, analysisResults) {
        this.processHistory.push({
            timestamp: new Date(),
            processes: processData,
            system: systemData,
            analysis: analysisResults
        });

        // Keep only last 100 entries
        if (this.processHistory.length > 100) {
            this.processHistory.shift();
        }
    }

    showAlert(message, level = 'medium') {
        const alert = {
            title: 'System Alert',
            message: message,
            level: level,
            timestamp: new Date()
        };
        
        this.updateAlerts([alert]);
    }

    exportReport() {
        const report = {
            generatedAt: new Date().toISOString(),
            monitoringDuration: this.processHistory.length * 2 + ' seconds',
            systemHealth: this.calculateSystemHealthSummary(),
            processStatistics: this.calculateProcessStatistics(),
            anomaliesDetected: this.aiModel.getAnomalyStats(),
            recommendations: this.aiModel.getRecommendationHistory()
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `process-analysis-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    calculateSystemHealthSummary() {
        // Calculate health statistics from history
        return {
            averageCPU: 'Calculated from history',
            averageMemory: 'Calculated from history',
            peakCPU: 'Calculated from history',
            peakMemory: 'Calculated from history'
        };
    }

    calculateProcessStatistics() {
        // Calculate process statistics
        return {
            totalProcessesMonitored: this.processHistory.length,
            averageProcesses: 'Calculated',
            maxConcurrentProcesses: 'Calculated'
        };
    }
}

// AI Model for Process Analysis
class AIModel {
    constructor() {
        this.anomalyThreshold = 0.8;
        this.processPatterns = new Map();
        this.anomalyHistory = [];
        this.recommendationHistory = [];
    }

    analyze(processData, systemData) {
        const anomalies = this.detectAnomalies(processData, systemData);
        const recommendations = this.generateRecommendations(processData, systemData, anomalies);
        const alerts = this.generateAlerts(processData, systemData, anomalies);

        return { anomalies, recommendations, alerts };
    }

    detectAnomalies(processes, systemData) {
        const anomalies = [];

        processes.forEach(process => {
            const score = this.calculateAnomalyScore(process, systemData);
            
            if (score > this.anomalyThreshold) {
                anomalies.push({
                    pid: process.pid,
                    processName: process.name,
                    score: score,
                    reason: this.getAnomalyReason(process, systemData)
                });
            }
        });

        this.anomalyHistory.push(...anomalies);
        return anomalies;
    }

    calculateAnomalyScore(process, systemData) {
        let score = 0;
        
        // High CPU usage anomaly
        if (process.cpu > 90) score += 0.4;
        else if (process.cpu > 70) score += 0.2;
        
        // High memory usage anomaly
        if (process.memory > 80) score += 0.3;
        else if (process.memory > 60) score += 0.15;
        
        // Sudden spike detection (simplified)
        if (process.cpu > systemData.cpuUsage * 2) score += 0.3;
        
        return Math.min(score, 1.0);
    }

    getAnomalyReason(process, systemData) {
        const reasons = [];
        
        if (process.cpu > 90) reasons.push('Extremely high CPU usage');
        else if (process.cpu > 70) reasons.push('High CPU usage');
        
        if (process.memory > 80) reasons.push('High memory consumption');
        if (process.cpu > systemData.cpuUsage * 2) reasons.push('CPU usage spike');
        
        return reasons.join(', ');
    }

    analyzeProcess(process) {
        const score = this.calculateAnomalyScore(process, { cpuUsage: 50 });
        
        if (score > 0.8) {
            return { status: 'Critical', badgeClass: 'badge-critical', isAnomaly: true };
        } else if (score > 0.6) {
            return { status: 'Warning', badgeClass: 'badge-warning', isAnomaly: true };
        } else if (process.cpu > 80 || process.memory > 80) {
            return { status: 'Monitor', badgeClass: 'badge-warning', isAnomaly: false };
        } else {
            return { status: 'Normal', badgeClass: 'badge-normal', isAnomaly: false };
        }
    }

    generateRecommendations(processes, systemData, anomalies) {
        const recommendations = [];

        // System-level recommendations
        if (systemData.cpuUsage > 80) {
            recommendations.push({
                type: 'system',
                message: `High system CPU usage (${systemData.cpuUsage.toFixed(1)}%). Consider closing unnecessary applications.`
            });
        }

        if (systemData.memoryUsage > 85) {
            recommendations.push({
                type: 'system',
                message: `High memory usage (${systemData.memoryUsage.toFixed(1)}%). Consider adding more RAM or closing memory-intensive applications.`
            });
        }

        // Process-level recommendations
        const highCpuProcesses = processes.filter(p => p.cpu > 80);
        if (highCpuProcesses.length > 3) {
            recommendations.push({
                type: 'process',
                message: `Multiple processes (${highCpuProcesses.length}) using high CPU. Investigate potential resource conflicts.`
            });
        }

        // Anomaly-based recommendations
        if (anomalies.length > 5) {
            recommendations.push({
                type: 'security',
                message: `Multiple anomalous processes detected (${anomalies.length}). Consider security scan.`
            });
        }

        this.recommendationHistory.push(...recommendations);
        return recommendations.slice(0, 5); // Return top 5 recommendations
    }

    generateAlerts(processes, systemData, anomalies) {
        const alerts = [];

        // Critical system alerts
        if (systemData.cpuUsage > 95) {
            alerts.push({
                title: 'CRITICAL: System CPU Overload',
                message: `CPU usage at ${systemData.cpuUsage.toFixed(1)}% - System may become unresponsive`,
                level: 'high'
            });
        }

        if (systemData.memoryUsage > 95) {
            alerts.push({
                title: 'CRITICAL: Memory Exhaustion',
                message: `Memory usage at ${systemData.memoryUsage.toFixed(1)}% - System may crash`,
                level: 'high'
            });
        }

        // Anomaly alerts
        if (anomalies.length > 0) {
            alerts.push({
                title: 'ANOMALIES DETECTED',
                message: `${anomalies.length} anomalous processes identified by AI`,
                level: 'medium'
            });
        }

        // Process-specific alerts
        const criticalProcesses = processes.filter(p => p.cpu > 95 || p.memory > 95);
        criticalProcesses.forEach(process => {
            alerts.push({
                title: 'PROCESS CRITICAL',
                message: `${process.name} (PID: ${process.pid}) using excessive resources`,
                level: 'high'
            });
        });

        return alerts;
    }

    getAnomalyStats() {
        return {
            totalDetected: this.anomalyHistory.length,
            recent: this.anomalyHistory.slice(-10)
        };
    }

    getRecommendationHistory() {
        return this.recommendationHistory.slice(-20);
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.processAnalyzer = new ProcessAnalyzer();
    
    // Add some sample CSS classes for health status
    const style = document.createElement('style');
    style.textContent = `
        .health-excellent { color: #27ae60; }
        .health-good { color: #2ecc71; }
        .health-fair { color: #f39c12; }
        .health-poor { color: #e74c3c; }
    `;
    document.head.appendChild(style);
});