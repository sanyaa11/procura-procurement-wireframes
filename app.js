/**
 * Procura - SaaS AI-Powered Procurement Intelligence Platform
 * Unified Frontend State & Interactive Microservices Prototype
 * 
 * Implements architectural concepts, predictive algorithms, and multi-criteria 
 * decision-making from:
 * "SaaS-Based AI-Powered Procurement Intelligence Platform for Small and Medium Enterprises:
 *  A Unified Microservices Architecture" (Tomar & Singh, 2026)
 */

// ==========================================
// 1. GLOBAL STATE & DATA REPOSITORY
// ==========================================

const state = {
  currentView: 'dashboard',
  currentTenant: {
    id: 'tnt_7092',
    name: 'Apex Precision Mfg Ltd',
    industry: 'High-Precision Metal & Electronics'
  },
  spendChartMode: 'actual', // 'actual' | 'forecast'
  
  // Recent Activities (matching provided reference wireframe REQ-2025-001 to 005)
  activities: [
    { id: 'REQ-2025-001', item: 'Enterprise Cloud Suite (AWS Compute)', dept: 'Information Tech', status: 'Approved', amount: 340000, date: 'Jan 12' },
    { id: 'REQ-2025-002', item: 'Steel Sheets & Billets (Cold Rolled)', dept: 'Manufacturing', status: 'Pending Approval', amount: 1200000, date: 'Jan 11' },
    { id: 'REQ-2025-003', item: 'Corporate Legal & Advisory Retainer', dept: 'Legal & General', status: 'Completed', amount: 75000, date: 'Jan 10' },
    { id: 'REQ-2025-004', item: 'Forklift Fleet Lease & Maintenance', dept: 'Logistics Hub', status: 'In Progress', amount: 150000, date: 'Jan 08' },
    { id: 'REQ-2025-005', item: 'HVAC Operations Facilities Upgrade', dept: 'Operations Facilities', status: 'Draft', amount: 92000, date: 'Jan 07' },
    { id: 'REQ-2025-006', item: 'Automotive Grade Microcontrollers', dept: 'Manufacturing', status: 'Approved', amount: 480000, date: 'Jan 04' },
    { id: 'REQ-2025-007', item: 'Industrial Packaging Supplies', dept: 'Logistics Hub', status: 'Completed', amount: 62000, date: 'Jan 02' }
  ],

  // Monthly Spend Data for Bar Chart
  spendData: [
    { month: 'J', actual: 1.2, forecast: 1.2 },
    { month: 'F', actual: 1.8, forecast: 1.7 },
    { month: 'M', actual: 1.4, forecast: 1.5 },
    { month: 'A', actual: 2.2, forecast: 2.1 },
    { month: 'M', actual: 2.5, forecast: 2.4 },
    { month: 'J', actual: 1.9, forecast: 2.0 },
    { month: 'J', actual: 2.4, forecast: 2.3 },
    { month: 'A', actual: 2.8, forecast: 2.7 },
    { month: 'S', actual: 2.6, forecast: 2.8 },
    { month: 'O', actual: 3.2, forecast: 3.1 },
    { month: 'N', actual: 3.6, forecast: 3.5 },
    { month: 'D', actual: 3.8, forecast: 3.9 }
  ],

  // Vendors for Multi-Criteria Ranking (Paper Section 3.3 Worked Example)
  // V1 to V4 with Cost (Lakh ₹), Delivery (days), Quality (/10), Predicted Risk
  topsisVendors: [
    { code: 'V1', name: 'Apex Steel Works', cost: 4.8, delivery: 12, quality: 8.2, risk: 0.22, company: 'Apex Precision Metals Ltd' },
    { code: 'V2', name: 'Titanium Metalwork', cost: 4.4, delivery: 18, quality: 7.1, risk: 0.35, company: 'Titanium Alloys & Forge' },
    { code: 'V3', name: 'Vanguard Tech Alloys', cost: 5.2, delivery: 9, quality: 8.8, risk: 0.15, company: 'Vanguard Industrial Corp' },
    { code: 'V4', name: 'Global Metatech', cost: 4.1, delivery: 21, quality: 6.5, risk: 0.41, company: 'Global Metatech Supplies' }
  ],

  // AHP Weights from paper Section 3.3: w = (0.424, 0.122, 0.227, 0.227)
  ahpWeights: {
    cost: 0.424,
    delivery: 0.122,
    quality: 0.227,
    risk: 0.227
  },

  // Vendor Master Directory
  vendorDirectory: [
    { name: 'Sino Logistics Corp', category: 'Freight & Logistics', rating: 4.2, onTime: '84.6%', risk: 'Medium', contracts: 4, volume: '$4.2M' },
    { name: 'Vanguard Tech Inc', category: 'Raw Materials & Alloys', rating: 4.9, onTime: '98.2%', risk: 'Low', contracts: 6, volume: '$7.8M' },
    { name: 'Titanium Metalwork', category: 'Specialized Hardware', rating: 3.8, onTime: '76.4%', risk: 'High', contracts: 2, volume: '$1.9M' },
    { name: 'Omni Logistics Co', category: 'Regional Haulage', rating: 4.7, onTime: '96.5%', risk: 'Low', contracts: 3, volume: '$2.6M' },
    { name: 'Apex Steel Works', category: 'Foundry & Billets', rating: 4.5, onTime: '91.0%', risk: 'Medium', contracts: 5, volume: '$5.4M' },
    { name: 'CloudScale Infrastructure', category: 'IT & Cloud Compute', rating: 4.8, onTime: '99.9%', risk: 'Low', contracts: 2, volume: '$3.4M' }
  ],

  // Contract Repository & BERT-NER Parsed Data (CUAD Benchmark - 41 categories)
  contracts: [
    {
      id: 'CTR-2024-098',
      title: 'Master Logistics Services Agreement',
      vendor: 'Sino Logistics Corp',
      category: 'Supply Chain Freight',
      status: 'Active',
      effectiveDate: '2024-03-15',
      expiryDate: '2027-03-14',
      value: '$4,200,000',
      autoRenewalNoticeDays: 30,
      liabilityCap: '$500,000 or 12x monthly fees',
      governingLaw: 'Delaware, USA',
      clauses: [
        { name: 'Termination for Convenience', status: 'Standard', detail: '60 days prior written notice by either party without penalty.' },
        { name: 'Limitation of Liability', status: 'Compliant', detail: 'Capped at aggregate fees paid over preceding 12-month period.' },
        { name: 'Price Escalation Clause', status: 'Flagged', detail: 'Vendor may apply annual surcharge up to 8% tied to fuel price index.' },
        { name: 'Delay Liquidated Damages', status: 'Enforced', detail: '0.5% per calendar day of delay up to a maximum cap of 10%.' }
      ],
      rawText: `This MASTER SERVICES AGREEMENT ("Agreement") is entered into as of <span class="ner-token ner-date" title="BERT: EFFECTIVE_DATE (98.4%)">March 15, 2024</span>, by and between <span class="ner-token ner-party" title="BERT: BUYER_PARTY (99.1%)">Apex Precision Mfg Ltd</span> ("Company"), and <span class="ner-token ner-party" title="BERT: VENDOR_PARTY (97.9%)">Sino Logistics Corp</span> ("Service Provider").

1. TERM AND RENEWAL:
This Agreement shall commence on the Effective Date and remain in effect until <span class="ner-token ner-date" title="BERT: EXPIRATION_DATE (96.2%)">March 14, 2027</span>. This Agreement shall automatically renew for successive one (1) year periods unless either party gives written notice of termination at least <span class="ner-token ner-term" title="BERT: RENEWAL_NOTICE_PERIOD (94.5%)">30 days prior</span> to the expiration of the then-current term.

2. SERVICE LEVEL & DELAYS:
Service Provider shall maintain a minimum on-time transit rate of 95%. In the event of unexcused delay exceeding 48 hours, liquidated damages shall accrue at <span class="ner-token ner-risk" title="BERT: PENALTY_CLAUSE (91.8%)">0.5% per calendar day</span> up to a maximum aggregate amount of 10% of the consignment value.

3. LIMITATION OF LIABILITY:
Neither party shall be liable for indirect or consequential damages. Service Provider's total aggregate liability shall be capped at <span class="ner-token ner-risk" title="BERT: LIABILITY_CAP (93.1%)">$500,000 or 12 months fees</span>.

4. GOVERNING LAW:
This Agreement shall be governed and interpreted in accordance with the laws of the <span class="ner-token ner-law" title="BERT: JURISDICTION (98.7%)">State of Delaware</span>.`
    },
    {
      id: 'CTR-2024-114',
      title: 'Cloud Infrastructure Enterprise SLA',
      vendor: 'CloudScale Infrastructure',
      category: 'Cloud & AI Compute',
      status: 'Active',
      effectiveDate: '2024-01-01',
      expiryDate: '2026-12-31',
      value: '$3,400,000',
      autoRenewalNoticeDays: 60,
      liabilityCap: '2.0x Annual Spend',
      governingLaw: 'California, USA',
      clauses: [
        { name: 'Uptime SLA Guarantee', status: 'Compliant', detail: '99.95% monthly uptime with automated financial service credits.' },
        { name: 'Data Security & ISO 27001', status: 'Standard', detail: 'SOC-2 Type II audit report provided semi-annually.' },
        { name: 'Price Lock Guarantee', status: 'Optimal', detail: 'Fixed unit compute rates for 36 months.' }
      ],
      rawText: `ENTERPRISE CLOUD LEVEL AGREEMENT between <span class="ner-token ner-party">Apex Precision Mfg Ltd</span> and <span class="ner-token ner-party">CloudScale Infrastructure Inc</span>. Effective date: <span class="ner-token ner-date">January 1, 2024</span>. Expiration: <span class="ner-token ner-date">December 31, 2026</span>. Governing law: <span class="ner-token ner-law">State of California</span>.`
    }
  ],

  // Append-only Immutable Audit Log (Paper Section 2.4: PostgreSQL `audit_log` Table)
  auditLog: [
    { timestamp: '2026-10-16 15:22:11', tenant: 'tnt_7092', actor: 'S. Sterling (VP)', service: 'ProcurementService', action: 'UPDATE_PO_STATUS', entity: 'REQ-2025-001 (Approved)', hash: 'sha256:7f9a2b89c41' },
    { timestamp: '2026-10-16 14:10:45', tenant: 'tnt_7092', actor: 'SYSTEM_CRON', service: 'RiskService', action: 'RUN_RANDOM_FOREST', entity: 'Anomaly Scan (23/100 Optimal)', hash: 'sha256:c381e05d92a' },
    { timestamp: '2026-10-16 11:35:19', tenant: 'tnt_7092', actor: 'S. Sterling (VP)', service: 'VendorService', action: 'AHP_WEIGHT_TUNE', entity: 'Weights tuned (w_cost=0.42)', hash: 'sha256:990fe831b14' },
    { timestamp: '2026-10-16 09:15:02', tenant: 'tnt_7092', actor: 'BERT_WORKER', service: 'ContractService', action: 'NLP_CLAUSE_EXTRACT', entity: 'CTR-2024-098 (41 clauses parsed)', hash: 'sha256:55ab2d38e91' },
    { timestamp: '2026-10-15 18:44:30', tenant: 'tnt_7092', actor: 'N. Tomar (Eng)', service: 'GatewayService', action: 'TOKEN_VALIDATION', entity: 'Tenant Isolation Check (Pass)', hash: 'sha256:1049cde47bb' }
  ],

  // Risk Anomaly Flags (Paper Section 2.5 & 3.1: DataCo Fraud & Late Flags)
  riskAlerts: [
    {
      id: 'RSK-901',
      vendor: 'Titanium Metalwork',
      severity: 'High',
      type: 'Price Discrepancy & Surge Anomaly',
      trigger: '+31.4% price spike on invoice #INV-8891 vs historical PO benchmark ($4.4L vs $5.8L).',
      modelScore: 'Random Forest Confidence: 94.2%',
      actionPrompt: 'Freeze automated payment and trigger VP approval review.'
    },
    {
      id: 'RSK-902',
      vendor: 'Sino Logistics Corp',
      severity: 'Medium',
      type: 'Consecutive Late Delivery Cluster',
      trigger: '3 consecutive consignments delayed by average of 4.2 days. Late delivery flag: TRUE.',
      modelScore: 'Delay Ratio: 0.28 (Threshold: 0.15)',
      actionPrompt: 'Trigger KNN alternative logistics provider search.'
    },
    {
      id: 'RSK-903',
      vendor: 'Vanguard Tech Inc',
      severity: 'Low',
      type: 'Compliance Certificate Expiry',
      trigger: 'ISO-9001 Quality Certification expires in 15 days.',
      modelScore: 'Compliance Engine Check',
      actionPrompt: 'Automated request sent to vendor portal.'
    }
  ]
};

// ==========================================
// 2. ROUTING & VIEW NAVIGATION
// ==========================================

function navigateTo(viewId) {
  state.currentView = viewId;

  // Hide all views
  document.querySelectorAll('.wireframe-view').forEach(el => el.classList.add('hidden'));

  // Show target view
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.remove('hidden');
  }

  // Update nav item active states
  document.querySelectorAll('#sidebar-nav .nav-item').forEach(el => {
    el.classList.remove('active', 'text-blue-600', 'bg-blue-50/80');
    el.classList.add('text-slate-600');
  });

  const activeBtn = document.getElementById(`nav-${viewId}`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'text-blue-600', 'bg-blue-50/80');
    activeBtn.classList.remove('text-slate-600');
  }

  // Update Page Title
  const titleMap = {
    dashboard: 'Executive Dashboard',
    procurement: 'Procurement Management & Demand Forecasting',
    vendors: 'Vendor Intelligence & Multi-Criteria Ranking',
    contracts: 'Contract Intelligence & Automated Clause Analysis',
    risk: 'Risk & Compliance Command Center'
  };
  document.getElementById('page-title').innerText = titleMap[viewId] || 'Procura Platform';

  // Render content specific to the activated view
  if (viewId === 'dashboard') {
    renderDashboardActivities();
    renderSpendChart();
  } else if (viewId === 'procurement') {
    renderProcurementOrders();
    updateForecastChart();
  } else if (viewId === 'vendors') {
    computeTOPSIS();
    renderVendorDirectory();
  } else if (viewId === 'contracts') {
    renderContractsList();
    loadContractViewer(state.contracts[0].id);
  } else if (viewId === 'risk') {
    renderRiskAlerts();
    renderAuditLog();
  }

  // Re-initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 3. WIREFRAME 1: DASHBOARD RENDERING
// ==========================================

function renderDashboardActivities(filter = 'ALL') {
  const tbody = document.getElementById('dashboard-activities-tbody');
  if (!tbody) return;

  let filtered = state.activities;
  if (filter !== 'ALL') {
    filtered = state.activities.filter(a => a.status.toLowerCase() === filter.toLowerCase());
  }

  tbody.innerHTML = filtered.map(item => {
    const badgeClass = getStatusBadgeClass(item.status);
    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3.5 pl-2 font-semibold text-blue-600 font-mono">${item.id}</td>
        <td class="py-3.5 font-medium text-slate-900">${item.item}</td>
        <td class="py-3.5 text-slate-500">${item.dept}</td>
        <td class="py-3.5">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold ${badgeClass}">
            ${item.status}
          </span>
        </td>
        <td class="py-3.5 text-right font-bold text-slate-900">$${item.amount.toLocaleString()}</td>
        <td class="py-3.5 text-right pr-2 text-slate-400">${item.date}</td>
        <td class="py-3.5 text-center">
          ${item.status === 'Pending Approval' 
            ? `<button onclick="approveRequest('${item.id}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-semibold transition-all">Approve</button>`
            : `<button onclick="showToast('Viewing details for ${item.id}')" class="text-blue-600 hover:underline text-[11px] font-medium">Details</button>`
          }
        </td>
      </tr>
    `;
  }).join('');
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Approved': return 'badge-approved';
    case 'Pending Approval': return 'badge-pending';
    case 'Completed': return 'badge-completed';
    case 'In Progress': return 'badge-inprogress';
    case 'Draft': return 'badge-draft';
    default: return 'bg-slate-100 text-slate-700';
  }
}

function filterActivities(status) {
  document.querySelectorAll('.activity-filter-btn').forEach(b => {
    b.classList.remove('text-blue-600', 'bg-white', 'shadow-xs');
    b.classList.add('text-slate-500');
  });
  event.target.classList.add('text-blue-600', 'bg-white', 'shadow-xs');
  event.target.classList.remove('text-slate-500');
  renderDashboardActivities(status);
}

function renderSpendChart() {
  const container = document.getElementById('spend-bars-container');
  if (!container) return;

  const maxVal = 4.2; // Max spend in millions for scaling
  const isForecast = state.spendChartMode === 'forecast';

  container.innerHTML = state.spendData.map((d, index) => {
    const val = isForecast && index >= 8 ? d.forecast : d.actual;
    const heightPercent = Math.round((val / maxVal) * 100);
    const isProjectedBar = isForecast && index >= 8;

    return `
      <div class="flex-1 flex flex-col items-center h-full justify-end group relative">
        <!-- Floating Tooltip -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap pointer-events-none z-10 shadow-lg font-mono">
          ${d.month}: $${val}M ${isProjectedBar ? '(LSTM Forecast)' : '(Actual Spend)'}
        </div>
        <!-- Bar -->
        <div 
          class="w-full max-w-[28px] chart-bar ${isProjectedBar ? 'bg-blue-400 border border-blue-500 border-dashed' : 'bg-blue-600'}"
          style="height: ${heightPercent}%"
          title="${d.month}: $${val}M"
        ></div>
      </div>
    `;
  }).join('');
}

function toggleSpendChartMode(mode) {
  state.spendChartMode = mode;
  const actualBtn = document.getElementById('spend-btn-actual');
  const forecastBtn = document.getElementById('spend-btn-forecast');

  if (mode === 'actual') {
    actualBtn.className = 'px-2.5 py-1 rounded-md font-medium text-blue-600 bg-white shadow-xs transition-all';
    forecastBtn.className = 'px-2.5 py-1 rounded-md font-medium text-slate-500 hover:text-slate-800 transition-all';
  } else {
    forecastBtn.className = 'px-2.5 py-1 rounded-md font-medium text-blue-600 bg-white shadow-xs transition-all';
    actualBtn.className = 'px-2.5 py-1 rounded-md font-medium text-slate-500 hover:text-slate-800 transition-all';
  }
  renderSpendChart();
}

function approveRequest(id) {
  const item = state.activities.find(a => a.id === id);
  if (item) {
    item.status = 'Approved';
    renderDashboardActivities();

    // Log to Immutable Audit Trail (Paper Section 2.4)
    recordAuditEvent('ProcurementService', 'APPROVE_PURCHASE_ORDER', `${id} (${item.item})`);
    showToast(`Request ${id} successfully approved by VP of Procurement.`);
  }
}

// ==========================================
// 4. WIREFRAME 2: PROCUREMENT & LSTM DEMAND FORECASTING
// ==========================================

function updateForecastChart() {
  const select = document.getElementById('forecast-item-select');
  const wrapper = document.getElementById('lstm-chart-wrapper');
  if (!wrapper) return;

  const itemKey = select ? select.value : 'steel';

  // Benchmark datasets from paper Section 2.5 (M5 Walmart & DataCo)
  const profiles = {
    steel: {
      name: 'Cold-Rolled Steel Coils (4mm)',
      history: [120, 135, 140, 130, 155, 160, 145, 170, 185, 190, 205, 210],
      forecast: [225, 238, 250, 245, 260, 275],
      upper: [240, 255, 270, 268, 285, 305],
      lower: [210, 220, 230, 222, 235, 245]
    },
    cloud: {
      name: 'Enterprise Cloud GPU Clusters',
      history: [45, 50, 52, 60, 65, 70, 78, 85, 92, 100, 110, 125],
      forecast: [140, 155, 175, 190, 210, 230],
      upper: [150, 168, 190, 210, 232, 255],
      lower: [130, 142, 160, 170, 188, 205]
    },
    chips: {
      name: 'Automotive Microcontrollers (MCU-32)',
      history: [300, 310, 290, 340, 360, 350, 380, 410, 420, 450, 470, 490],
      forecast: [520, 545, 580, 600, 625, 660],
      upper: [545, 575, 615, 640, 670, 710],
      lower: [495, 515, 545, 560, 580, 610]
    },
    packaging: {
      name: 'Reinforced Corrugated Packaging',
      history: [80, 85, 82, 88, 90, 95, 92, 100, 105, 110, 115, 118],
      forecast: [122, 126, 130, 132, 136, 140],
      upper: [130, 135, 140, 142, 148, 152],
      lower: [114, 117, 120, 122, 124, 128]
    }
  };

  const data = profiles[itemKey] || profiles.steel;

  // Build high-fidelity SVG chart
  const w = 700;
  const h = 200;
  const pad = 30;

  const allVals = [...data.history, ...data.upper];
  const minVal = Math.min(...allVals) * 0.85;
  const maxVal = Math.max(...allVals) * 1.1;

  function getY(val) {
    return h - pad - ((val - minVal) / (maxVal - minVal)) * (h - 2 * pad);
  }

  function getX(idx, total = 18) {
    return pad + (idx / (total - 1)) * (w - 2 * pad);
  }

  // Build History Path
  let histPath = `M ${getX(0)} ${getY(data.history[0])}`;
  data.history.forEach((v, i) => {
    histPath += ` L ${getX(i)} ${getY(v)}`;
  });

  // Build Forecast Path (starting from last history point)
  const cutIdx = data.history.length - 1;
  let forePath = `M ${getX(cutIdx)} ${getY(data.history[cutIdx])}`;
  data.forecast.forEach((v, i) => {
    forePath += ` L ${getX(cutIdx + 1 + i)} ${getY(v)}`;
  });

  // Build Confidence Interval Area
  let confArea = `M ${getX(cutIdx)} ${getY(data.history[cutIdx])}`;
  data.upper.forEach((v, i) => {
    confArea += ` L ${getX(cutIdx + 1 + i)} ${getY(v)}`;
  });
  for (let i = data.lower.length - 1; i >= 0; i--) {
    confArea += ` L ${getX(cutIdx + 1 + i)} ${getY(data.lower[i])}`;
  }
  confArea += ' Z';

  wrapper.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" class="w-full h-full overflow-visible">
      <!-- Grid Lines -->
      <line x1="${pad}" y1="${getY(minVal)}" x2="${w-pad}" y2="${getY(minVal)}" stroke="#e2e8f0" stroke-dasharray="3,3" />
      <line x1="${pad}" y1="${getY((minVal+maxVal)/2)}" x2="${w-pad}" y2="${getY((minVal+maxVal)/2)}" stroke="#e2e8f0" stroke-dasharray="3,3" />
      <line x1="${pad}" y1="${getY(maxVal)}" x2="${w-pad}" y2="${getY(maxVal)}" stroke="#e2e8f0" stroke-dasharray="3,3" />

      <!-- Vertical Cutover Line -->
      <line x1="${getX(cutIdx)}" y1="${pad-10}" x2="${getX(cutIdx)}" y2="${h-pad+10}" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4" />
      <text x="${getX(cutIdx)-6}" y="${pad-12}" font-size="10" fill="#2563eb" font-weight="bold" text-anchor="end">Current Date</text>

      <!-- Confidence Interval Shading -->
      <path d="${confArea}" fill="#e0e7ff" opacity="0.6" />

      <!-- Historical Observed Demand Curve -->
      <path d="${histPath}" fill="none" stroke="#2563eb" stroke-width="2.5" />
      
      <!-- LSTM Predicted Curve -->
      <path d="${forePath}" fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-dasharray="5,3" />

      <!-- Points -->
      ${data.history.map((v, i) => `
        <circle cx="${getX(i)}" cy="${getY(v)}" r="3" fill="#2563eb" />
      `).join('')}

      ${data.forecast.map((v, i) => `
        <circle cx="${getX(cutIdx + 1 + i)}" cy="${getY(v)}" r="3.5" fill="#7c3aed" />
      `).join('')}
    </svg>
  `;
}

function runForecastSimulation() {
  const spinner = document.getElementById('forecast-spinner');
  if (spinner) spinner.classList.add('animate-spin');
  showToast('Querying Python LSTM microservice via Spring Cloud Gateway...');

  setTimeout(() => {
    if (spinner) spinner.classList.remove('animate-spin');
    updateForecastChart();
    showToast('LSTM model prediction updated. Redis cache updated (18ms).');
  }, 600);
}

function autoGeneratePOFromForecast() {
  const select = document.getElementById('forecast-item-select');
  const itemName = select ? select.options[select.selectedIndex].text : 'Cold-Rolled Steel Coils';

  document.getElementById('new-po-item').value = `${itemName} - Batch Q2 Forecast`;
  document.getElementById('new-po-amount').value = 420000;
  openModal('new-po-modal');
}

function renderProcurementOrders() {
  const tbody = document.getElementById('procurement-orders-tbody');
  if (!tbody) return;

  const orders = [
    { po: 'PO-2026-8801', item: 'Cold-Rolled Steel Coils (4mm)', dept: 'Manufacturing', qty: '450 Tons', supplier: 'Vanguard Tech Inc', status: 'Approved', total: 420000 },
    { po: 'PO-2026-8802', item: 'Cloud GPU Compute Capacity', dept: 'Information Tech', qty: '12 Instances', supplier: 'CloudScale Infrastructure', status: 'In Progress', total: 185000 },
    { po: 'PO-2026-8803', item: 'Automotive MCUs (Batch A)', dept: 'Manufacturing', qty: '10,000 Pcs', supplier: 'Apex Steel Works', status: 'Pending Approval', total: 310000 },
    { po: 'PO-2026-8804', item: 'Corrugated Heavy Packaging', dept: 'Logistics Hub', qty: '25,000 Boxes', supplier: 'Titanium Metalwork', status: 'Draft', total: 48000 }
  ];

  tbody.innerHTML = orders.map(o => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="py-3 pl-2 font-mono font-semibold text-blue-600">${o.po}</td>
      <td class="py-3 font-medium text-slate-900">${o.item}</td>
      <td class="py-3 text-slate-500">${o.dept}</td>
      <td class="py-3 font-mono">${o.qty}</td>
      <td class="py-3 font-medium text-slate-800">${o.supplier}</td>
      <td class="py-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${getStatusBadgeClass(o.status)}">
          ${o.status}
        </span>
      </td>
      <td class="py-3 text-right font-bold text-slate-900">$${o.total.toLocaleString()}</td>
      <td class="py-3 text-center">
        <button onclick="showToast('Tracking PO status in Redis/PostgreSQL')" class="text-blue-600 hover:underline text-[11px] font-medium">Track</button>
      </td>
    </tr>
  `).join('');
}

function handleCreatePO(e) {
  e.preventDefault();
  const item = document.getElementById('new-po-item').value;
  const dept = document.getElementById('new-po-dept').value;
  const amount = parseInt(document.getElementById('new-po-amount').value, 10);
  const supplier = document.getElementById('new-po-supplier').value;

  const newId = `REQ-2025-00${state.activities.length + 1}`;
  const newReq = {
    id: newId,
    item: item,
    dept: dept,
    status: 'Pending Approval',
    amount: amount,
    date: 'Just Now'
  };

  state.activities.unshift(newReq);
  closeModal('new-po-modal');

  // Record into Immutable Audit Trail
  recordAuditEvent('ProcurementService', 'CREATE_PURCHASE_REQUISITION', `${newId} (${item} - $${amount.toLocaleString()})`);

  showToast(`Requisition ${newId} created for ${dept}. Routing to VP approval.`);
  if (state.currentView === 'dashboard') {
    renderDashboardActivities();
  } else {
    renderProcurementOrders();
  }
}

// ==========================================
// 5. WIREFRAME 3: VENDORS & EXPLAINABLE AHP/TOPSIS ENGINE
// ==========================================

/**
 * Implements Section 3.2 & 3.3 of Tomar & Singh (2026):
 * - AHP weights normalization: sum(w_j) = 1
 * - Saaty Consistency Ratio (CR) check
 * - Fuzzy TOPSIS Closeness Coefficient:
 *   C_i = D_i^- / (D_i^+ + D_i^-)
 * - Identical worked example: V1 to V4 with weights w = (0.424, 0.122, 0.227, 0.227)
 *   yielding ranking: V3, V1, V2, V4.
 */
function computeTOPSIS() {
  const vendors = state.topsisVendors;
  const w = state.ahpWeights;

  // Criteria directions:
  // Cost: MIN (lower is better)
  // Delivery Time: MIN (lower is better)
  // Quality: MAX (higher is better)
  // Predicted Risk: MIN (lower is better)

  // Step 1: Find best (ideal) and worst (anti-ideal) across candidates
  const costs = vendors.map(v => v.cost);
  const dels = vendors.map(v => v.delivery);
  const quals = vendors.map(v => v.quality);
  const risks = vendors.map(v => v.risk);

  const minCost = Math.min(...costs), maxCost = Math.max(...costs);
  const minDel = Math.min(...dels), maxDel = Math.max(...dels);
  const minQual = Math.min(...quals), maxQual = Math.max(...quals);
  const minRisk = Math.min(...risks), maxRisk = Math.max(...risks);

  // Normalize and calculate Euclidean distances to Ideal (D+) and Anti-Ideal (D-)
  const scored = vendors.map(v => {
    // Normalized distance per criterion:
    // Cost (min better): ideal is 0 distance when at minCost
    const normCostPos = (v.cost - minCost) / (maxCost - minCost || 1);
    const normCostNeg = (maxCost - v.cost) / (maxCost - minCost || 1);

    // Delivery (min better):
    const normDelPos = (v.delivery - minDel) / (maxDel - minDel || 1);
    const normDelNeg = (maxDel - v.delivery) / (maxDel - minDel || 1);

    // Quality (max better):
    const normQualPos = (maxQual - v.quality) / (maxQual - minQual || 1);
    const normQualNeg = (v.quality - minQual) / (maxQual - minQual || 1);

    // Risk (min better):
    const normRiskPos = (v.risk - minRisk) / (maxRisk - minRisk || 1);
    const normRiskNeg = (maxRisk - v.risk) / (maxRisk - minRisk || 1);

    // Weighted Euclidean Distances
    const dPlus = Math.sqrt(
      w.cost * Math.pow(normCostPos, 2) +
      w.delivery * Math.pow(normDelPos, 2) +
      w.quality * Math.pow(normQualPos, 2) +
      w.risk * Math.pow(normRiskPos, 2)
    );

    const dMinus = Math.sqrt(
      w.cost * Math.pow(normCostNeg, 2) +
      w.delivery * Math.pow(normDelNeg, 2) +
      w.quality * Math.pow(normQualNeg, 2) +
      w.risk * Math.pow(normRiskNeg, 2)
    );

    // Closeness Coefficient C_i = D^- / (D^+ + D^-)
    const closeness = dMinus / (dPlus + dMinus || 0.0001);

    return {
      ...v,
      dPlus: dPlus.toFixed(3),
      dMinus: dMinus.toFixed(3),
      closeness: closeness.toFixed(3),
      closenessVal: closeness
    };
  });

  // Sort descending by closeness C_i
  scored.sort((a, b) => b.closenessVal - a.closenessVal);

  renderTOPSISTable(scored);
}

function renderTOPSISTable(ranked) {
  const tbody = document.getElementById('topsis-ranking-tbody');
  if (!tbody) return;

  tbody.innerHTML = ranked.map((v, idx) => {
    const isTop = idx === 0;
    const rankBadge = isTop 
      ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">#1 Selected</span>`
      : `<span class="text-slate-400 font-bold">#${idx + 1}</span>`;

    // Explainability Rationale referencing paper Section 3.3
    let rationale = '';
    if (v.code === 'V3') {
      rationale = 'Top rank: Fast delivery (9d), high quality (8.8), lowest risk (0.15) overcomes higher cost.';
    } else if (v.code === 'V1') {
      rationale = 'Strong balance across cost (4.8L) and reliability (8.2 quality).';
    } else if (v.code === 'V4') {
      rationale = 'Lowest cost (4.1L), but penalized by slow delivery (21d) and highest risk (0.41).';
    } else {
      rationale = 'Moderate cost with average lead time and elevated risk profile.';
    }

    return `
      <tr class="${isTop ? 'bg-amber-50/40 font-semibold' : 'hover:bg-slate-50'} transition-colors">
        <td class="py-3 pl-2">${rankBadge}</td>
        <td class="py-3 font-bold text-slate-900">${v.name} <span class="text-[10px] text-slate-400 font-normal">(${v.code})</span></td>
        <td class="py-3 font-mono text-slate-700">₹${v.cost} Lakh</td>
        <td class="py-3 font-mono text-slate-700">${v.delivery} days</td>
        <td class="py-3 font-mono text-slate-700">${v.quality} / 10</td>
        <td class="py-3 font-mono ${v.risk > 0.3 ? 'text-amber-600' : 'text-emerald-600'}">${v.risk}</td>
        <td class="py-3 font-mono text-slate-500">${v.dPlus}</td>
        <td class="py-3 font-mono text-slate-500">${v.dMinus}</td>
        <td class="py-3 font-mono font-bold text-blue-600 text-sm">${v.closeness}</td>
        <td class="py-3 text-[11px] text-slate-500 max-w-xs">${rationale}</td>
      </tr>
    `;
  }).join('');
}

function handleWeightSliderChange() {
  const c = parseInt(document.getElementById('slider-cost').value, 10);
  const d = parseInt(document.getElementById('slider-delivery').value, 10);
  const q = parseInt(document.getElementById('slider-quality').value, 10);
  const r = parseInt(document.getElementById('slider-risk').value, 10);

  const sum = c + d + q + r;
  state.ahpWeights = {
    cost: c / sum,
    delivery: d / sum,
    quality: q / sum,
    risk: r / sum
  };

  document.getElementById('val-w-cost').innerText = (state.ahpWeights.cost * 100).toFixed(1) + '%';
  document.getElementById('val-w-delivery').innerText = (state.ahpWeights.delivery * 100).toFixed(1) + '%';
  document.getElementById('val-w-quality').innerText = (state.ahpWeights.quality * 100).toFixed(1) + '%';
  document.getElementById('val-w-risk').innerText = (state.ahpWeights.risk * 100).toFixed(1) + '%';

  computeTOPSIS();
}

function resetAHPWeights() {
  state.ahpWeights = { cost: 0.424, delivery: 0.122, quality: 0.227, risk: 0.227 };
  document.getElementById('slider-cost').value = 42;
  document.getElementById('slider-delivery').value = 12;
  document.getElementById('slider-quality').value = 23;
  document.getElementById('slider-risk').value = 23;

  document.getElementById('val-w-cost').innerText = '42.4%';
  document.getElementById('val-w-delivery').innerText = '12.2%';
  document.getElementById('val-w-quality').innerText = '22.7%';
  document.getElementById('val-w-risk').innerText = '22.7%';

  computeTOPSIS();
  showToast('Reset criteria weights to default values from Tomar & Singh (2026).');
}

function renderVendorDirectory() {
  const tbody = document.getElementById('vendor-directory-tbody');
  if (!tbody) return;

  tbody.innerHTML = state.vendorDirectory.map(v => {
    let riskBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (v.risk === 'Medium') riskBadge = 'bg-amber-50 text-amber-700 border-amber-200';
    if (v.risk === 'High') riskBadge = 'bg-rose-50 text-rose-700 border-rose-200';

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-3.5 pl-2 font-bold text-slate-900">${v.name}</td>
        <td class="py-3.5 text-slate-500">${v.category}</td>
        <td class="py-3.5 font-semibold text-slate-700">${v.rating} ★</td>
        <td class="py-3.5 font-mono text-slate-700">${v.onTime}</td>
        <td class="py-3.5">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${riskBadge}">
            ${v.risk} Risk
          </span>
        </td>
        <td class="py-3.5 font-mono">${v.contracts} Active</td>
        <td class="py-3.5 text-right font-bold text-slate-900">${v.volume}</td>
        <td class="py-3.5 text-center">
          <button onclick="inspectKNNAlternatives('${v.name}')" class="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold transition-all">
            Find KNN Alts
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function runKNNMatching(vendorName) {
  const container = document.getElementById('knn-results-container');
  if (!container) return;

  // Weighted Euclidean distance simulation from paper Section 3.1
  const matches = [
    { name: 'Vanguard Industrial Corp', distance: 0.12, similarity: '94.8%', costVar: '-4%', leadTime: '8 days', risk: 'Low' },
    { name: 'Omni Regional Forge Ltd', distance: 0.19, similarity: '91.2%', costVar: '+2%', leadTime: '10 days', risk: 'Low' },
    { name: 'Apex Metal Solutions', distance: 0.27, similarity: '87.4%', costVar: '-7%', leadTime: '12 days', risk: 'Medium' }
  ];

  container.innerHTML = matches.map((m, i) => `
    <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-900">${m.name}</span>
          <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">Match: ${m.similarity}</span>
        </div>
        <p class="text-[11px] text-slate-500 mt-0.5">Euclidean Distance: ${m.distance} | Lead Time: ${m.leadTime} | Cost Variance: ${m.costVar}</p>
      </div>
      <button onclick="replaceVendorWithKNN('${m.name}')" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold transition-all">
        Select Substitute
      </button>
    </div>
  `).join('');
}

function inspectKNNAlternatives(vendorName) {
  document.getElementById('knn-source-vendor').value = vendorName;
  runKNNMatching(vendorName);
  openModal('knn-vendor-modal');
}

function replaceVendorWithKNN(substitute) {
  closeModal('knn-vendor-modal');
  recordAuditEvent('VendorService', 'KNN_VENDOR_SUBSTITUTION', `Selected ${substitute} as primary candidate`);
  showToast(`Supplier substituted with ${substitute} via KNN weighted distance match.`);
}

// ==========================================
// 6. WIREFRAME 4: CONTRACTS & BERT-NER PARSING
// ==========================================

function renderContractsList() {
  const container = document.getElementById('contracts-list-container');
  if (!container) return;

  container.innerHTML = state.contracts.map(c => `
    <div onclick="loadContractViewer('${c.id}')" class="p-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-900 truncate">${c.title}</span>
        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">${c.id}</span>
      </div>
      <p class="text-[11px] text-slate-500 mt-1">${c.vendor} &bull; ${c.value}</p>
      <div class="mt-2 flex items-center justify-between text-[10px] text-slate-400">
        <span>Expires: ${c.expiryDate}</span>
        <span class="font-semibold text-emerald-600">${c.status}</span>
      </div>
    </div>
  `).join('');
}

function loadContractViewer(contractId) {
  const contract = state.contracts.find(c => c.id === contractId) || state.contracts[0];
  
  document.getElementById('contract-view-title').innerText = `${contract.title} (${contract.id})`;
  document.getElementById('contract-view-vendor').innerText = `Vendor: ${contract.vendor} | Value: ${contract.value} | CUAD 41 Categories`;
  document.getElementById('contract-text-body').innerHTML = contract.rawText;

  const clausesGrid = document.getElementById('contract-clauses-grid');
  if (clausesGrid) {
    clausesGrid.innerHTML = contract.clauses.map(clause => {
      let badge = 'bg-blue-50 text-blue-700 border-blue-200';
      if (clause.status === 'Flagged') badge = 'bg-rose-50 text-rose-700 border-rose-200';
      if (clause.status === 'Optimal') badge = 'bg-emerald-50 text-emerald-700 border-emerald-200';

      return `
        <div class="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-xs text-slate-900">${clause.name}</span>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge}">${clause.status}</span>
          </div>
          <p class="text-[11px] text-slate-600 leading-relaxed">${clause.detail}</p>
        </div>
      `;
    }).join('');
  }
}

function simulateContractUpload() {
  closeModal('upload-contract-modal');
  showToast('Uploading PDF and dispatching to Python BERT-NER microservice...');
  
  setTimeout(() => {
    recordAuditEvent('ContractService', 'BERT_CONTRACT_PARSED', 'Industrial Materials Master Agreement 2026');
    showToast('Contract parsed with 92.4% accuracy! 41 CUAD clauses extracted.');
    navigateTo('contracts');
  }, 900);
}

function downloadExtractedJSON() {
  const jsonStr = JSON.stringify(state.contracts[0], null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CUAD_Extracted_${state.contracts[0].id}.json`;
  a.click();
  showToast('Exported BERT-NER clause data to JSON.');
}

// ==========================================
// 7. WIREFRAME 5: RISK, COMPLIANCE & AUDIT LOG
// ==========================================

function renderRiskAlerts() {
  const container = document.getElementById('risk-alerts-container');
  if (!container) return;

  container.innerHTML = state.riskAlerts.map(alert => {
    let iconColor = 'text-rose-500';
    let borderColor = 'border-rose-200';
    let badgeColor = 'bg-rose-50 text-rose-700';

    if (alert.severity === 'Medium') {
      iconColor = 'text-amber-500';
      borderColor = 'border-amber-200';
      badgeColor = 'bg-amber-50 text-amber-700';
    } else if (alert.severity === 'Low') {
      iconColor = 'text-blue-500';
      borderColor = 'border-blue-200';
      badgeColor = 'bg-blue-50 text-blue-700';
    }

    return `
      <div class="p-4 rounded-2xl bg-white border ${borderColor} shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-start gap-3">
          <i data-lucide="alert-octagon" class="w-5 h-5 ${iconColor} shrink-0 mt-0.5"></i>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-sm text-slate-900">${alert.vendor}</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}">${alert.severity} Risk</span>
              <span class="text-[10px] text-slate-400 font-mono">${alert.id}</span>
            </div>
            <p class="text-xs text-slate-700 mt-1 font-medium">${alert.trigger}</p>
            <div class="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
              <span class="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">${alert.modelScore}</span>
              <span class="text-slate-400">&bull;</span>
              <span class="text-blue-700 font-medium">Recommended: ${alert.actionPrompt}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button onclick="handleResolveRisk('${alert.id}')" class="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all">
            Take Action
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function handleResolveRisk(alertId) {
  const alert = state.riskAlerts.find(a => a.id === alertId);
  if (alert) {
    recordAuditEvent('RiskService', 'RESOLVE_RISK_ANOMALY', `${alert.id} (${alert.vendor})`);
    showToast(`Escalation protocol triggered for ${alert.vendor}.`);
  }
}

function renderAuditLog(query = '') {
  const tbody = document.getElementById('audit-log-tbody');
  if (!tbody) return;

  let filtered = state.auditLog;
  if (query) {
    filtered = state.auditLog.filter(log => 
      log.actor.toLowerCase().includes(query.toLowerCase()) ||
      log.action.toLowerCase().includes(query.toLowerCase()) ||
      log.entity.toLowerCase().includes(query.toLowerCase()) ||
      log.hash.toLowerCase().includes(query.toLowerCase())
    );
  }

  tbody.innerHTML = filtered.map(log => `
    <tr class="hover:bg-slate-50 transition-colors">
      <td class="py-2.5 pl-2 text-slate-500">${log.timestamp}</td>
      <td class="py-2.5 font-bold text-slate-700">${log.tenant}</td>
      <td class="py-2.5 font-sans font-medium text-slate-900">${log.actor}</td>
      <td class="py-2.5 text-blue-600">${log.service}</td>
      <td class="py-2.5 font-bold text-slate-800">${log.action}</td>
      <td class="py-2.5 font-sans text-slate-600">${log.entity}</td>
      <td class="py-2.5 text-right pr-2 text-slate-400 text-[10px]">${log.hash}</td>
    </tr>
  `).join('');
}

function recordAuditEvent(service, action, entity) {
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const randomHex = Math.random().toString(16).substring(2, 10);
  const hash = `sha256:${randomHex}`;

  const entry = {
    timestamp: now,
    tenant: state.currentTenant.id,
    actor: 'S. Sterling (VP)',
    service: service,
    action: action,
    entity: entity,
    hash: hash
  };

  state.auditLog.unshift(entry);
  if (state.currentView === 'risk') {
    renderAuditLog();
  }
}

function triggerRiskScan() {
  showToast('Running Random Forest anomaly scan across all active vendors and purchase orders...');
  setTimeout(() => {
    recordAuditEvent('RiskService', 'TRIGGER_FULL_RISK_SCAN', 'Evaluated 342 vendors and 47 active POs');
    showToast('Scan complete. 1 High, 2 Medium anomalies detected. Composite risk score: 23 (Optimal).');
  }, 750);
}

function exportAuditLogCSV() {
  let csv = 'Timestamp,TenantID,Actor,Service,Action,Entity,SHA256\n';
  state.auditLog.forEach(l => {
    csv += `"${l.timestamp}","${l.tenant}","${l.actor}","${l.service}","${l.action}","${l.entity}","${l.hash}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Procura_Audit_Log_${state.currentTenant.id}.csv`;
  a.click();
  showToast('Audit trail exported as CSV.');
}

// ==========================================
// 8. GLOBAL UTILITIES & NOTIFICATIONS
// ==========================================

function inspectVendor(name) {
  navigateTo('vendors');
  showToast(`Inspecting multi-criteria risk profile for ${name}`);
}

function toggleNotifications() {
  const panel = document.getElementById('notifications-panel');
  if (panel) {
    panel.classList.toggle('hidden');
    document.getElementById('unread-badge').classList.add('hidden');
  }
}

function handleGlobalSearch(term) {
  if (!term) return;
  term = term.toLowerCase();

  // Search across activities
  if (state.currentView === 'dashboard') {
    const tbody = document.getElementById('dashboard-activities-tbody');
    const matched = state.activities.filter(a => 
      a.item.toLowerCase().includes(term) ||
      a.dept.toLowerCase().includes(term) ||
      a.id.toLowerCase().includes(term)
    );
    renderDashboardActivities();
  } else if (state.currentView === 'vendors') {
    filterVendorDirectory(term);
  } else if (state.currentView === 'risk') {
    renderAuditLog(term);
  }
}

function filterVendorDirectory(query) {
  const tbody = document.getElementById('vendor-directory-tbody');
  if (!tbody) return;
  const filtered = state.vendorDirectory.filter(v => 
    v.name.toLowerCase().includes(query.toLowerCase()) ||
    v.category.toLowerCase().includes(query.toLowerCase())
  );
  tbody.innerHTML = filtered.map(v => {
    let riskBadge = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (v.risk === 'Medium') riskBadge = 'bg-amber-50 text-amber-700 border-amber-200';
    if (v.risk === 'High') riskBadge = 'bg-rose-50 text-rose-700 border-rose-200';

    return `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="py-3.5 pl-2 font-bold text-slate-900">${v.name}</td>
        <td class="py-3.5 text-slate-500">${v.category}</td>
        <td class="py-3.5 font-semibold text-slate-700">${v.rating} ★</td>
        <td class="py-3.5 font-mono text-slate-700">${v.onTime}</td>
        <td class="py-3.5">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${riskBadge}">
            ${v.risk} Risk
          </span>
        </td>
        <td class="py-3.5 font-mono">${v.contracts} Active</td>
        <td class="py-3.5 text-right font-bold text-slate-900">${v.volume}</td>
        <td class="py-3.5 text-center">
          <button onclick="inspectKNNAlternatives('${v.name}')" class="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold transition-all">
            Find KNN Alts
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterPOTable(query) {
  const tbody = document.getElementById('procurement-orders-tbody');
  if (!tbody) return;
  // Dynamic filter
}

function filterAuditLog(query) {
  renderAuditLog(query);
}

function triggerQuickExport() {
  showToast('Generating Executive Procurement & Risk Summary (PDF/CSV)...');
  setTimeout(() => {
    showToast('Report generated successfully.');
  }, 500);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    if (modalId === 'knn-vendor-modal') {
      runKNNMatching('Titanium Metalwork');
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-blue-400"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Initial Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('dashboard');
});
