# Procura: SaaS AI-Powered Procurement Intelligence Platform

> **Interactive Wireframes & Architectural Prototype for Small and Medium Enterprises (SMEs)**  
> Based on the research paper:  
> **"SaaS-Based AI-Powered Procurement Intelligence Platform for Small and Medium Enterprises: A Unified Microservices Architecture"**  
> *Nishant Tomar, Sanyaa Singh (Sharda University, 2026)*

---

## 🚀 Quick Start: How to Run

The application is completely self-contained with modern HTML5, Tailwind CSS, Lucide icons, and Vanilla JS. No build steps or complex installations are required.

### Option 1: Open Directly in Your Browser
Double-click `index.html` in your file explorer, or run in your terminal:
```bash
open index.html
```

### Option 2: Serve Locally (Recommended)
You can launch a lightweight local server:
```bash
# Using Python 3:
python3 -m http.server 3000

# Or using Node:
npx serve .
```
Then navigate to `http://localhost:3000` in your web browser.

---

## 🖥️ Overview of the 5 Interactive Wireframes

This prototype translates the paper's 5-layer microservices architecture into an interactive frontend conforming faithfully to the **Procura Executive Dashboard** design system:

| Wireframe | Core Capability | Paper Section & ML Model |
| :--- | :--- | :--- |
| **1. Executive Dashboard** | Real-time spend metrics, monthly spend volume with drill-down, vendor risk monitoring, and recent procurement activities. | Matches reference wireframe pixel-for-pixel; integrates Spring Cloud Gateway endpoints. |
| **2. Procurement** | Autonomous demand forecasting, order batching, safety-stock optimization, and purchase order lifecycle ledger. | **Section 3.1 & Figure 3**: LSTM Neural Networks evaluated against M5 Walmart & DataCo benchmarks. |
| **3. Vendors** | Explainable multi-criteria supplier ranking, dynamic weight sliders, Saaty AHP consistency verification, and KNN alternative matching. | **Section 3.2 & 3.3**: AHP, VIKOR, Fuzzy TOPSIS ($C_i = D_i^- / (D_i^+ + D_i^-)$), and KNN Euclidean similarity. |
| **4. Contracts** | Document viewer with color-coded Named Entity Recognition (NER), CUAD 41-clause extraction, and auto-renewal alerts. | **Section 2.5 & 3.1**: BERT-NER trained on CUAD dataset (Patel & Roy, 91% accuracy). |
| **5. Risk & Compliance** | Real-time anomaly detection, price surge flags, delivery delay ratios, and immutable cryptographic audit logging. | **Section 2.4 & 3.1**: Random Forest classifier (Okafor & Lin, 94% accuracy) and PostgreSQL append-only `audit_log`. |

---

## 🔬 Mathematical & Algorithmic Implementation

### 1. Multi-Criteria Vendor Ranking (Section 3.2 & 3.3)
To eliminate black-box decision making, the platform implements an interactive **AHP + Fuzzy TOPSIS** engine:

1. **AHP Saaty Weighting Matrix**:
   $$A = \begin{pmatrix} 1 & 3 & 2 & 2 \\ 1/3 & 1 & 1/2 & 1/2 \\ 1/2 & 2 & 1 & 1 \\ 1/2 & 2 & 1 & 1 \end{pmatrix}$$
   - Principal eigenvector produces weights:  
     $$w = (w_{\text{cost}}=0.424, w_{\text{deliv}}=0.122, w_{\text{qual}}=0.227, w_{\text{risk}}=0.227)$$
   - Consistency Ratio: $\text{CR} = 0.004 < 0.10$ *(Valid Saaty consistency)*.

2. **Fuzzy TOPSIS Closeness Coefficient**:
   $$C_i = \frac{D_i^-}{D_i^+ + D_i^-}$$
   Where $D_i^+$ and $D_i^-$ represent the weighted Euclidean distance to the ideal and anti-ideal solutions:
   $$D_i^{\pm} = \sqrt{\sum_{j=1}^{n} w_j (r_{ij} - r_j^{\pm})^2}$$

3. **Worked Example Verification in the Prototype**:
   - **V1 (Apex Steel)**: Cost 4.8L, Delivery 12d, Quality 8.2, Risk 0.22 $\rightarrow C_1 \approx 0.661$
   - **V2 (Titanium Metalwork)**: Cost 4.4L, Delivery 18d, Quality 7.1, Risk 0.35 $\rightarrow C_2 \approx 0.340$
   - **V3 (Vanguard Alloys)**: Cost 5.2L, Delivery 9d, Quality 8.8, Risk 0.15 $\rightarrow C_3 \approx 0.694$ *(Rank #1)*
   - **V4 (Global Metatech)**: Cost 4.1L, Delivery 21d, Quality 6.5, Risk 0.41 $\rightarrow C_4 \approx 0.306$
   - *Interactive Feature*: Dragging the **Cost Slider** upward demonstrates how the ranking shifts to favor V4 or V2, giving users complete transparency.

---

### 2. KNN Alternative Supplier Search (Section 3.1)
When a supplier exhibits supply disruption or elevated risk, alternative suppliers are queried via weighted Euclidean distance:
$$d(a, b) = \sqrt{\sum_{k} \omega_k (x_{ak} - x_{bk})^2}$$
In the prototype, clicking **"Find KNN Alts"** finds nearest neighbors across price level, delivery speed, and reliability.

---

### 3. LSTM Neural Network Demand Forecasting (Section 3.1 & Figure 3)
- Models sequential purchase order quantities across seasonal demand curves.
- In the prototype: Users can switch between commodities (Steel Coils, Cloud Compute, Automotive MCUs, Packaging) to observe 12-week historical actuals alongside 6-month projections with upper/lower 95% confidence intervals.
- Redis cache lookup simulation with $<20\text{ms}$ latency.

---

### 4. BERT-NER Contract Intelligence (Section 2.5 & 3.1)
- Benchmark: **CUAD (Contract Understanding Atticus Dataset)** with 41 clause categories.
- Extracts key legal entities: `[PARTY]`, `[EFFECTIVE DATE]`, `[EXPIRATION DATE]`, `[GOVERNING LAW]`, `[AUTO-RENEWAL NOTICE]`, and `[LIABILITY CAP]`.
- Flags contract anomalies (e.g. unilateral price escalation clauses) for review.

---

### 5. Append-Only Audit Trail & Multi-Tenancy (Section 2.4)
- Schema matches PostgreSQL `audit_log` table:
  - `timestamp`: Event UTC timestamp
  - `tenant_id`: Isolated tenant identifier (`tnt_7092` - Apex Precision Mfg)
  - `actor`: Logged-in principal (`S. Sterling (VP)`)
  - `service`: Microservice origin (`ProcurementService`, `VendorService`, `RiskService`)
  - `action`: Cryptographically hashed state transition (`sha256:...`)

---

## 🎨 UI & Design Fidelity
- **Palette**: Soft slate backgrounds (`#f8fafc`), clean white rounded cards (`rounded-2xl`), subtle borders (`border-slate-200/80`), and custom badge styles matching the reference wireframe:
  - `Approved` (emerald)
  - `Pending Approval` (amber)
  - `Completed` (green)
  - `In Progress` (blue)
  - `Draft` (slate)
- **Top Header**: Global search, tenant badge, notification alerts drawer, and microservice status indicator.
- **Sidebar Profile**: S. Sterling, VP of Procurement.
