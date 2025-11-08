"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AlertsConfigurator } from "@/components/AlertsConfigurator";
import { MultibaggerGauge } from "@/components/MultibaggerGauge";
import { HelpCenter } from "@/components/HelpCenter";
import { MetricsTable } from "@/components/MetricsTable";
import { MobileHeader, Sidebar, useDefaultSections } from "@/components/Navigation";
import { NewsFeed } from "@/components/NewsFeed";
import { RiskAssessment } from "@/components/RiskAssessment";
import { SearchBar, type Company } from "@/components/SearchBar";
import { UserAccountSections } from "@/components/UserAccountSections";
import type { CandleDatum } from "@/components/charts";
import type { NewsItem } from "@/components/NewsFeed";
import type { Risk } from "@/components/RiskAssessment";
import type { MetricRow } from "@/components/MetricsTable";
import type { FaqItem } from "@/components/HelpCenter";

const CandlestickChart = dynamic(
  () =>
    import("@/components/charts/CandlestickChart").then(
      (mod) => mod.CandlestickChart,
    ),
  { ssr: false },
);

const LineChart = dynamic(
  () => import("@/components/charts/LineChart").then((mod) => mod.LineChart),
  { ssr: false },
);

const BarChart = dynamic(
  () => import("@/components/charts/BarChart").then((mod) => mod.BarChart),
  { ssr: false },
);

const companies: Company[] = [
  {
    name: "Reliance Industries",
    ticker: "RELIANCE",
    sector: "Conglomerate",
    marketCap: "₹19.2T",
  },
  {
    name: "Tata Consultancy Services",
    ticker: "TCS",
    sector: "IT Services",
    marketCap: "₹14.5T",
  },
  {
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    sector: "Banking",
    marketCap: "₹11.2T",
  },
  {
    name: "Avenue Supermarts",
    ticker: "DMART",
    sector: "Retail",
    marketCap: "₹3.2T",
  },
  {
    name: "Divi's Laboratories",
    ticker: "DIVISLAB",
    sector: "Pharmaceuticals",
    marketCap: "₹1.2T",
  },
];

type CompanyProfile = {
  seed: number;
  drift: number;
  overview: {
    summary: string;
    headquarters: string;
    marketSize: string;
    growth: string;
    advantages: string[];
  };
  revenueLabels: string[];
  revenue: number[];
  metrics: {
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    debtEquity: number;
    roe: number;
  };
  gaugeScore: number;
  factors: {
    name: string;
    weight: number;
    description: string;
    score: number;
  }[];
  news: NewsItem[];
  risks: Risk[];
  metricsTable: MetricRow[];
  faqs: FaqItem[];
};

const companyProfiles: Record<string, CompanyProfile> = {
  RELIANCE: {
    seed: 11,
    drift: 0.015,
    overview: {
      summary:
        "Reliance is reaccelerating in digital services and new energy platforms, reinvesting cash flows from energy and retail flywheel.",
      headquarters: "Mumbai, India",
      marketSize:
        "Addressable market > ₹25T across telecom, retail, and energy transition verticals.",
      growth: "YoY revenue CAGR 13.4% | EBITDA CAGR 16.1% (FY19-FY24).",
      advantages: [
        "Integrated ecosystem spanning connectivity, commerce, and energy.",
        "Scale-driven cost advantages and preferred supplier status.",
        "Management execution pedigree with disciplined capital allocation.",
      ],
    },
    revenueLabels: ["FY17", "FY18", "FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
    revenue: [330000, 360000, 410000, 450000, 482000, 615000, 696000, 742000],
    metrics: {
      grossMargin: 49,
      operatingMargin: 22,
      netMargin: 14,
      debtEquity: 0.58,
      roe: 15.8,
    },
    gaugeScore: 82,
    factors: [
      {
        name: "Market Size",
        weight: 40,
        description:
          "India's retail and digital economy expansion plus renewable energy adjacency offers multi-decade runway.",
        score: 9,
      },
      {
        name: "Competitive Advantage",
        weight: 35,
        description:
          "Supply chain leverage, proprietary distribution, and cross-selling reinforce structural moat advantages.",
        score: 8,
      },
      {
        name: "Management Quality",
        weight: 25,
        description:
          "Capital discipline post deleveraging and technology partnerships underline resilient governance.",
        score: 8,
      },
    ],
    news: [
      {
        id: "RELIANCE-1",
        title: "Jio Platforms reports record subscriber additions in tier-2 cities",
        summary:
          "Digital segment revenue surges 18% YoY supported by 5G monetisation and premium ARPU expansion.",
        sentiment: "positive",
        source: "The Economic Times",
        time: "2024-09-12T07:30",
        category: "news",
      },
      {
        id: "RELIANCE-2",
        title: "Market sentiment tilts positive on energy transition thrust",
        summary:
          "Analysts flag hydrogen electrolyser commissioning as a catalyst for multiple expansion over the next 12 months.",
        sentiment: "positive",
        source: "Bloomberg Quint",
        time: "2024-09-11T13:15",
        category: "sentiment",
      },
      {
        id: "RELIANCE-3",
        title: "Reliance Retail files DRHP for logistics subsidiary",
        summary:
          "Proposed demerger to unlock omni-channel fulfilment platform with estimated valuation of ₹65,000 crore.",
        sentiment: "neutral",
        source: "SEBI Filings",
        time: "2024-09-10T19:45",
        category: "filing",
      },
      {
        id: "RELIANCE-4",
        title: "OPEC+ production cuts prompt refining margin vigilance",
        summary:
          "Short-term volatility expected in energy cash flows; hedging policy keeps earnings guidance unchanged.",
        sentiment: "negative",
        source: "Mint",
        time: "2024-09-09T08:10",
        category: "news",
      },
    ],
    risks: [
      {
        id: "reliance-risk-1",
        title: "Refining margin compression",
        severity: "medium",
        description:
          "Geopolitical supply shifts or windfall taxes may suppress near-term downstream profitability.",
        mitigation:
          "Diversified cash flow mix and hedging discipline cushion near-term shocks.",
      },
      {
        id: "reliance-risk-2",
        title: "Regulatory oversight of data dominance",
        severity: "high",
        description:
          "Expansion of digital platforms could attract antitrust scrutiny impacting bundling economics.",
        mitigation:
          "Adjust product packaging to align with Digital India framework and maintain compliance dialogue.",
      },
      {
        id: "reliance-risk-3",
        title: "Execution bandwidth across verticals",
        severity: "medium",
        description:
          "Simultaneous scale-up in energy, telecom, and retail increases complexity for leadership bandwidth.",
        mitigation:
          "Segment-specific CEOs and partner-led build-operate models provide operational depth.",
      },
    ],
    metricsTable: [
      { year: "FY19", revenue: 410000, profitMargin: 9.8, roe: 13.5, debtEquity: 0.82, marketShare: 24.2 },
      { year: "FY20", revenue: 450000, profitMargin: 9.6, roe: 13.8, debtEquity: 0.74, marketShare: 25.8 },
      { year: "FY21", revenue: 482000, profitMargin: 10.2, roe: 14.1, debtEquity: 0.66, marketShare: 27.4 },
      { year: "FY22", revenue: 615000, profitMargin: 11.5, roe: 15.2, debtEquity: 0.62, marketShare: 28.1 },
      { year: "FY23", revenue: 696000, profitMargin: 12.8, roe: 15.6, debtEquity: 0.59, marketShare: 29.6 },
      { year: "FY24", revenue: 742000, profitMargin: 13.4, roe: 15.8, debtEquity: 0.58, marketShare: 30.4 },
    ],
    faqs: [
      {
        id: "reliance-faq-1",
        question: "How is the multibagger score computed for Reliance?",
        answer:
          "Score blends 40% quantitative growth momentum, 35% moat durability, and 25% governance signals derived from AI-based transcript analytics.",
      },
      {
        id: "reliance-faq-2",
        question: "Which data sources underpin cash flow projections?",
        answer:
          "Consensus data from Bloomberg, SEBI filings, and alternative data feeds (footfall, digital subscriptions) feed the forecasting engine daily.",
      },
      {
        id: "reliance-faq-3",
        question: "How frequently are energy spreads updated?",
        answer:
          "Refining spreads ingest ICE data intraday, normalised every 30 minutes for scenario stress-testing.",
      },
    ],
  },
  TCS: {
    seed: 21,
    drift: 0.012,
    overview: {
      summary:
        "TCS sustains best-in-class digital transformation pipeline, anchored by BFSI and cloud modernisation spend.",
      headquarters: "Mumbai, India",
      marketSize:
        "Global IT services TAM estimated at $1.2T with double-digit India offshore expansion.",
      growth: "YoY revenue CAGR 9.7% | EPS CAGR 12.3% (FY18-FY24).",
      advantages: [
        "Deep client wallet share across mission critical workloads.",
        "Scaled talent supply chain with industry-leading utilisation.",
        "High free cash conversion enabling attractive shareholder payouts.",
      ],
    },
    revenueLabels: ["FY17", "FY18", "FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
    revenue: [118000, 123000, 146000, 156000, 164000, 191000, 220000, 241000],
    metrics: {
      grossMargin: 53,
      operatingMargin: 26,
      netMargin: 21,
      debtEquity: 0.18,
      roe: 24.5,
    },
    gaugeScore: 88,
    factors: [
      {
        name: "Market Size",
        weight: 35,
        description:
          "Secular cloud migration and AI integration sustain multi-year digitisation budgets in core markets.",
        score: 8,
      },
      {
        name: "Competitive Advantage",
        weight: 40,
        description:
          "Sticky client relationships and high switching costs deliver superior wallet share retention.",
        score: 9,
      },
      {
        name: "Management Quality",
        weight: 25,
        description:
          "Stable leadership succession and disciplined margin management underpin governance alpha.",
        score: 9,
      },
    ],
    news: [
      {
        id: "TCS-1",
        title: "TCS wins ₹8,200 crore AI transformation mandate from global bank",
        summary:
          "Deal spans risk analytics, compliance automation, and hyperscaler migration over five-year horizon.",
        sentiment: "positive",
        source: "CNBC-TV18",
        time: "2024-09-12T09:05",
        category: "news",
      },
      {
        id: "TCS-2",
        title: "Employee retention improves with reskilling incentives",
        summary:
          "Quarterly attrition drops to 14%, easing wage pressure and supporting margin recovery.",
        sentiment: "positive",
        source: "Business Standard",
        time: "2024-09-11T18:22",
        category: "sentiment",
      },
      {
        id: "TCS-3",
        title: "SEBI filing: Shareholders approve share buyback worth ₹18,000 crore",
        summary:
          "Buyback to be executed via tender route, reflecting management conviction in cash flow visibility.",
        sentiment: "neutral",
        source: "SEBI Filings",
        time: "2024-09-09T20:30",
        category: "filing",
      },
      {
        id: "TCS-4",
        title: "US tech spending guidance turns cautious for H1 FY25",
        summary:
          "Short-term demand moderation expected in discretionary verticals; pipeline conversion intact.",
        sentiment: "negative",
        source: "Wall Street Journal",
        time: "2024-09-08T06:55",
        category: "news",
      },
    ],
    risks: [
      {
        id: "tcs-risk-1",
        title: "Global tech spending slowdown",
        severity: "medium",
        description:
          "Macro uncertainty may defer decision cycles for large transformational deals, compressing near-term revenue growth.",
        mitigation:
          "Large annuity base and vendor consolidation tailwinds maintain long-term growth resilience.",
      },
      {
        id: "tcs-risk-2",
        title: "Talent cost inflation",
        severity: "medium",
        description:
          "Sustained wage inflation or visa regime changes could pressure operating margins.",
        mitigation:
          "Automation-driven productivity and offshore mix shifts offset wage escalation.",
      },
      {
        id: "tcs-risk-3",
        title: "Regulatory changes in key geographies",
        severity: "high",
        description:
          "Data localisation mandates or visa quota revisions can elevate compliance costs.",
        mitigation:
          "Distributed delivery network and compliance-first architecture minimise disruption.",
      },
    ],
    metricsTable: [
      { year: "FY19", revenue: 146000, profitMargin: 20.6, roe: 29.4, debtEquity: 0.23, marketShare: 8.4 },
      { year: "FY20", revenue: 156000, profitMargin: 20.2, roe: 27.3, debtEquity: 0.21, marketShare: 8.7 },
      { year: "FY21", revenue: 164000, profitMargin: 20.6, roe: 26.2, debtEquity: 0.20, marketShare: 9.1 },
      { year: "FY22", revenue: 191000, profitMargin: 21.5, roe: 24.6, debtEquity: 0.18, marketShare: 9.6 },
      { year: "FY23", revenue: 220000, profitMargin: 22.2, roe: 24.1, debtEquity: 0.18, marketShare: 10.1 },
      { year: "FY24", revenue: 241000, profitMargin: 22.8, roe: 24.5, debtEquity: 0.17, marketShare: 10.5 },
    ],
    faqs: [
      {
        id: "tcs-faq-1",
        question: "How does the platform treat large-deal announcements?",
        answer:
          "Natural language pipelines parse client commentary, flag deal certainty, and attribute to 12-month backlog uplift.",
      },
      {
        id: "tcs-faq-2",
        question: "What assumptions drive TCS margin forecasts?",
        answer:
          "Margin models incorporate utilisation buffers, onsite-offshore mix, and wage hikes benchmarked to NASSCOM datasets.",
      },
      {
        id: "tcs-faq-3",
        question: "Does the score factor in GenAI adoption?",
        answer:
          "Yes, platform adoption speed and cross-selling ratios feed into competitive moat scoring.",
      },
    ],
  },
  HDFCBANK: {
    seed: 31,
    drift: 0.01,
    overview: {
      summary:
        "HDFC Bank leverages post-merger scale to deepen retail credit penetration while maintaining pristine asset quality.",
      headquarters: "Mumbai, India",
      marketSize:
        "Indian credit market expected to double by FY30 with rising financialisation and infra lending.",
      growth: "Loan book CAGR 17% | Deposit CAGR 18% (FY19-FY24).",
      advantages: [
        "Best-in-class CASA franchise lowers cost of funds.",
        "Advanced risk analytics ensures industry-leading asset quality.",
        "Cross-sell synergies from housing finance merger.",
      ],
    },
    revenueLabels: ["FY17", "FY18", "FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
    revenue: [77500, 89500, 112000, 125000, 135000, 157000, 181000, 212000],
    metrics: {
      grossMargin: 37,
      operatingMargin: 24,
      netMargin: 19,
      debtEquity: 0.12,
      roe: 17.8,
    },
    gaugeScore: 79,
    factors: [
      {
        name: "Market Size",
        weight: 35,
        description:
          "India's credit penetration remains under 60% of GDP unlocking multi-year loan growth opportunity.",
        score: 8,
      },
      {
        name: "Competitive Advantage",
        weight: 35,
        description:
          "Industry-leading underwriting and digital origination reduce credit costs and boost cross-sell.",
        score: 8,
      },
      {
        name: "Management Quality",
        weight: 30,
        description:
          "Seasoned leadership team with conservative provisioning and stable succession bench.",
        score: 7,
      },
    ],
    news: [
      {
        id: "HDFC-1",
        title: "HDFC Bank posts record retail disbursements post merger integration",
        summary:
          "Consumer finance and SME segments grew 26% YoY aided by unified data lake and co-lending alliances.",
        sentiment: "positive",
        source: "Financial Express",
        time: "2024-09-10T10:30",
        category: "news",
      },
      {
        id: "HDFC-2",
        title: "Market sentiment cautious on LCR tightening commentary",
        summary:
          "RBI draft norms may require incremental liquidity buffers; bank indicates adequate capital cushions.",
        sentiment: "neutral",
        source: "Bloomberg",
        time: "2024-09-09T15:20",
        category: "sentiment",
      },
      {
        id: "HDFC-3",
        title: "SEBI filing: Board approves ₹12,000 crore infrastructure bond issuance",
        summary:
          "Long-tenor issuance to fund project finance opportunities under India infrastructure pipeline.",
        sentiment: "neutral",
        source: "SEBI Filings",
        time: "2024-09-08T21:40",
        category: "filing",
      },
      {
        id: "HDFC-4",
        title: "Management warns on elevated slippages in unsecured book",
        summary:
          "Credit card and microfinance segments witness uptick in stress; provisions raised proactively.",
        sentiment: "negative",
        source: "Livemint",
        time: "2024-09-07T07:05",
        category: "news",
      },
    ],
    risks: [
      {
        id: "hdfc-risk-1",
        title: "Regulatory tightening",
        severity: "high",
        description:
          "RBI may tighten capital or liquidity norms post-merger, impacting return ratios.",
        mitigation:
          "Bank operates with buffers above regulatory minima and engages proactively with regulators.",
      },
      {
        id: "hdfc-risk-2",
        title: "Integration complexity",
        severity: "medium",
        description:
          "Large-scale systems integration could elevate operating costs or cause customer friction.",
        mitigation:
          "Phased rollout and digital migration roadmap reduces disruption risk.",
      },
      {
        id: "hdfc-risk-3",
        title: "Unsecured credit cycle turn",
        severity: "medium",
        description:
          "Rapid growth in unsecured lending might drive higher credit costs if macros deteriorate.",
        mitigation:
          "Dynamic provisioning models and data-driven underwriting monitor credit quality in real time.",
      },
    ],
    metricsTable: [
      { year: "FY19", revenue: 112000, profitMargin: 18.2, roe: 16.4, debtEquity: 0.14, marketShare: 6.8 },
      { year: "FY20", revenue: 125000, profitMargin: 18.5, roe: 16.9, debtEquity: 0.13, marketShare: 7.2 },
      { year: "FY21", revenue: 135000, profitMargin: 18.8, roe: 16.3, debtEquity: 0.13, marketShare: 7.6 },
      { year: "FY22", revenue: 157000, profitMargin: 19.4, roe: 17.2, debtEquity: 0.12, marketShare: 8.1 },
      { year: "FY23", revenue: 181000, profitMargin: 19.8, roe: 17.6, debtEquity: 0.12, marketShare: 8.7 },
      { year: "FY24", revenue: 212000, profitMargin: 20.4, roe: 17.8, debtEquity: 0.11, marketShare: 9.4 },
    ],
    faqs: [
      {
        id: "hdfc-faq-1",
        question: "How does the model treat Net Interest Margin guidance?",
        answer:
          "Forward NIM curves incorporate RBI policy path scenarios and re-pricing lags across retail and wholesale portfolios.",
      },
      {
        id: "hdfc-faq-2",
        question: "Can I customise risk triggers specific to banking KPIs?",
        answer:
          "Yes, create alert rules on GNPA, slippage ratio, CASA mix, and capital ratios and receive automated nudges.",
      },
      {
        id: "hdfc-faq-3",
        question: "What alternative data feeds are analysed?",
        answer:
          "Credit bureau momentum, card spend indices, and digital adoption signals feed sentiment layers.",
      },
    ],
  },
  DMART: {
    seed: 41,
    drift: 0.018,
    overview: {
      summary:
        "Avenue Supermarts continues to scale its efficiency-led modern retail format, achieving best-in-class inventory turns.",
      headquarters: "Mumbai, India",
      marketSize:
        "Organised retail penetration to double this decade with urbanisation and rising disposable incomes.",
      growth: "Revenue CAGR 24% | EBITDA CAGR 20% (FY19-FY24).",
      advantages: [
        "Tight cost control and private label penetration support superior margins.",
        "Cluster-based expansion ensures supply chain efficiency.",
        "Working capital flywheel funds store rollouts without leverage.",
      ],
    },
    revenueLabels: ["FY17", "FY18", "FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
    revenue: [12400, 15030, 19000, 24000, 30000, 42900, 52500, 61000],
    metrics: {
      grossMargin: 39,
      operatingMargin: 18,
      netMargin: 10.5,
      debtEquity: 0.08,
      roe: 18.4,
    },
    gaugeScore: 91,
    factors: [
      {
        name: "Market Size",
        weight: 30,
        description:
          "Tier-2 and tier-3 penetration combined with omni-channel adjacency expands revenue runway.",
        score: 8,
      },
      {
        name: "Competitive Advantage",
        weight: 45,
        description:
          "Superior supply chain efficiency and everyday low price positioning create sticky customer loyalty.",
        score: 9,
      },
      {
        name: "Management Quality",
        weight: 25,
        description:
          "Prudent expansion cadence and disciplined cost culture entrenched by founding team leadership.",
        score: 9,
      },
    ],
    news: [
      {
        id: "DMART-1",
        title: "DMart launches dark stores to supercharge online fulfilment",
        summary:
          "Pilot in Bengaluru reduces delivery times to under 3 hours, boosting digital revenue mix to 11%.",
        sentiment: "positive",
        source: "ET Retail",
        time: "2024-09-12T11:00",
        category: "news",
      },
      {
        id: "DMART-2",
        title: "Sentiment neutral after gross margin commentary",
        summary:
          "Management guides for modest margin compression due to promotional intensity in new markets.",
        sentiment: "neutral",
        source: "CNBC Awaaz",
        time: "2024-09-11T14:45",
        category: "sentiment",
      },
      {
        id: "DMART-3",
        title: "Regulatory filing: New distribution centre commissioned in Gujarat",
        summary:
          "Facility to optimise logistics for western cluster; capex of ₹480 crore funded via internal accruals.",
        sentiment: "positive",
        source: "SEBI Filings",
        time: "2024-09-10T16:10",
        category: "filing",
      },
      {
        id: "DMART-4",
        title: "Competition heats up in premium groceries",
        summary:
          "Global players expanding footprint; may require incremental marketing spends to defend share.",
        sentiment: "negative",
        source: "Reuters",
        time: "2024-09-09T09:35",
        category: "news",
      },
    ],
    risks: [
      {
        id: "dmart-risk-1",
        title: "Competitive price pressure",
        severity: "medium",
        description:
          "Aggressive discounts from e-commerce players could narrow pricing edge and pressures margins.",
        mitigation:
          "Maintain private label mix and deepen supplier relationships to sustain unit economics.",
      },
      {
        id: "dmart-risk-2",
        title: "Regulatory scrutiny on grocery sourcing",
        severity: "medium",
        description:
          "Changes to food sourcing norms may require supply chain reconfiguration.",
        mitigation:
          "Proactive compliance monitoring and diversified sourcing relationships.",
      },
      {
        id: "dmart-risk-3",
        title: "Execution risk in dark-store rollout",
        severity: "high",
        description:
          "Rapid online fulfilment expansion might strain logistics and service levels.",
        mitigation:
          "Phased city-level rollout with robust analytics on delivery economics.",
      },
    ],
    metricsTable: [
      { year: "FY19", revenue: 19000, profitMargin: 5.5, roe: 15.9, debtEquity: 0.12, marketShare: 1.9 },
      { year: "FY20", revenue: 24000, profitMargin: 6.1, roe: 16.4, debtEquity: 0.10, marketShare: 2.2 },
      { year: "FY21", revenue: 30000, profitMargin: 7.2, roe: 16.8, debtEquity: 0.09, marketShare: 2.4 },
      { year: "FY22", revenue: 42900, profitMargin: 8.3, roe: 17.6, debtEquity: 0.09, marketShare: 2.8 },
      { year: "FY23", revenue: 52500, profitMargin: 8.9, roe: 18.1, debtEquity: 0.08, marketShare: 3.2 },
      { year: "FY24", revenue: 61000, profitMargin: 9.4, roe: 18.4, debtEquity: 0.08, marketShare: 3.6 },
    ],
    faqs: [
      {
        id: "dmart-faq-1",
        question: "Does the platform track store productivity metrics?",
        answer:
          "Yes, store throughput, same store sales, rental efficiencies, and e-commerce penetration feed into growth scoring.",
      },
      {
        id: "dmart-faq-2",
        question: "How are inventory turns benchmarked?",
        answer:
          "Inventory analytics ingest MCA disclosures and vendor data to benchmark turns versus FMCG peers quarterly.",
      },
      {
        id: "dmart-faq-3",
        question: "Can alerts be set for competitor store launches?",
        answer:
          "Enable competitive intelligence alerts to receive bulletins on store openings within targeted catchments.",
      },
    ],
  },
  DIVISLAB: {
    seed: 51,
    drift: 0.013,
    overview: {
      summary:
        "Divi's Labs scales specialised APIs and custom synthesis leadership, riding on China+1 outsourcing tailwinds.",
      headquarters: "Hyderabad, India",
      marketSize:
        "Global specialty pharma outsourcing is projected to grow at >11% CAGR through 2030.",
      growth: "Revenue CAGR 17% | PAT CAGR 19% (FY19-FY24).",
      advantages: [
        "High entry barriers in complex chemistry and regulatory compliance.",
        "Sticky client relationships with top global innovators.",
        "Healthy balance sheet and consistent double-digit ROCE.",
      ],
    },
    revenueLabels: ["FY17", "FY18", "FY19", "FY20", "FY21", "FY22", "FY23", "FY24"],
    revenue: [4100, 4500, 5300, 5500, 6900, 8800, 9100, 9700],
    metrics: {
      grossMargin: 57,
      operatingMargin: 31,
      netMargin: 24,
      debtEquity: 0.02,
      roe: 20.7,
    },
    gaugeScore: 86,
    factors: [
      {
        name: "Market Size",
        weight: 30,
        description:
          "Global pharma outsourcing spend accelerates as innovators rebalance supply chains.",
        score: 7,
      },
      {
        name: "Competitive Advantage",
        weight: 40,
        description:
          "Regulatory track record, molecule complexity expertise, and cost optimised manufacturing underpin moat.",
        score: 9,
      },
      {
        name: "Management Quality",
        weight: 30,
        description:
          "Founder-led leadership with conservative leverage profile and high R&D reinvestment.",
        score: 9,
      },
    ],
    news: [
      {
        id: "DIVIS-1",
        title: "Divi's secures multi-year supply contract for blockbuster oncology API",
        summary:
          "Contract adds $120 million annualised revenue with margin accretive chemistry portfolio.",
        sentiment: "positive",
        source: "PharmaWire",
        time: "2024-09-12T08:40",
        category: "news",
      },
      {
        id: "DIVIS-2",
        title: "Sentiment positive on sodium API export approvals",
        summary:
          "USFDA approval lifts utilisation outlook; brokerage upgrades FY25 EPS estimates by 7%.",
        sentiment: "positive",
        source: "Moneycontrol",
        time: "2024-09-11T17:30",
        category: "sentiment",
      },
      {
        id: "DIVIS-3",
        title: "Regulatory filing: Capex of ₹1,200 crore for greenfield facility",
        summary:
          "Plant to expand peptide synthesis capabilities; operations expected by FY27.",
        sentiment: "neutral",
        source: "SEBI Filings",
        time: "2024-09-10T19:10",
        category: "filing",
      },
      {
        id: "DIVIS-4",
        title: "Regulators tighten environmental compliance standards",
        summary:
          "State board seeks additional disclosures; potential near-term capex for effluent treatment.",
        sentiment: "negative",
        source: "The Hindu BusinessLine",
        time: "2024-09-08T06:45",
        category: "news",
      },
    ],
    risks: [
      {
        id: "divis-risk-1",
        title: "Regulatory compliance risk",
        severity: "high",
        description:
          "USFDA observations or environmental audits could delay shipments and increase remediation costs.",
        mitigation:
          "Dedicated compliance teams and continuous process monitoring keep deviation rates minimal.",
      },
      {
        id: "divis-risk-2",
        title: "Client concentration",
        severity: "medium",
        description:
          "High revenue contribution from top 10 clients could amplify impact if orders are deferred.",
        mitigation:
          "Active diversification across nutraceuticals and speciality generics underway.",
      },
      {
        id: "divis-risk-3",
        title: "Raw material price swings",
        severity: "medium",
        description:
          "Volatility in key solvents and intermediates can affect gross margins.",
        mitigation:
          "Long-term contracts and backward integration projects hedge supply risks.",
      },
    ],
    metricsTable: [
      { year: "FY19", revenue: 5300, profitMargin: 21.5, roe: 19.2, debtEquity: 0.05, marketShare: 0.9 },
      { year: "FY20", revenue: 5500, profitMargin: 22.3, roe: 19.6, debtEquity: 0.04, marketShare: 1.0 },
      { year: "FY21", revenue: 6900, profitMargin: 23.4, roe: 20.4, debtEquity: 0.03, marketShare: 1.1 },
      { year: "FY22", revenue: 8800, profitMargin: 24.6, roe: 20.5, debtEquity: 0.02, marketShare: 1.3 },
      { year: "FY23", revenue: 9100, profitMargin: 23.8, roe: 20.6, debtEquity: 0.02, marketShare: 1.4 },
      { year: "FY24", revenue: 9700, profitMargin: 24.2, roe: 20.7, debtEquity: 0.02, marketShare: 1.5 },
    ],
    faqs: [
      {
        id: "divis-faq-1",
        question: "How are custom synthesis order books modelled?",
        answer:
          "Historic win ratios, molecule lifecycle analysis, and innovator pipeline probabilities inform forward revenue.",
      },
      {
        id: "divis-faq-2",
        question: "Are ESG metrics factored into risk scoring?",
        answer:
          "Environmental compliance history and emission footprints adjust the risk premium within the score.",
      },
      {
        id: "divis-faq-3",
        question: "What is the assumed capex intensity?",
        answer:
          "Model assumes 14-16% of revenue in capex for capacity expansion and compliance upgrades through FY27.",
      },
    ],
  },
};

const timeframeConfig: Record<
  string,
  { points: number; stepDays: number; zoomUnit: "day" | "week" | "month" }
> = {
  "1M": { points: 22, stepDays: 1, zoomUnit: "day" },
  "3M": { points: 66, stepDays: 1, zoomUnit: "week" },
  "1Y": { points: 220, stepDays: 1, zoomUnit: "week" },
  "5Y": { points: 360, stepDays: 5, zoomUnit: "month" },
  Max: { points: 420, stepDays: 7, zoomUnit: "month" },
};

function pseudoRandom(seed: number, index: number) {
  const x = Math.sin(seed * 999 + index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function generateCandles(
  seed: number,
  drift: number,
  timeframe: string,
): CandleDatum[] {
  const config = timeframeConfig[timeframe];
  if (!config) return [];
  const now = new Date();
  const candles: CandleDatum[] = [];
  let lastClose = 150 + (seed % 25) * 2;
  for (let i = config.points - 1; i >= 0; i -= 1) {
    const offsetDays = config.stepDays * (config.points - 1 - i);
    const date = new Date(now);
    date.setDate(now.getDate() - offsetDays);
    const noise = pseudoRandom(seed, i) - 0.5;
    const trend = drift + noise * 0.045;
    const open = lastClose;
    const close = Math.max(5, open * (1 + trend));
    const high = Math.max(open, close) * (1 + Math.abs(noise) * 0.1);
    const low = Math.min(open, close) * (1 - Math.abs(noise) * 0.08);
    candles.push({
      x: date.toISOString(),
      o: Number(open.toFixed(2)),
      h: Number(high.toFixed(2)),
      l: Number(low.toFixed(2)),
      c: Number(close.toFixed(2)),
    });
    lastClose = close;
  }
  return candles;
}

const timeframeOptions = ["1M", "3M", "1Y", "5Y", "Max"] as const;

const timeframeMultipliers: Record<(typeof timeframeOptions)[number], number> = {
  "1M": 1,
  "3M": 1.01,
  "1Y": 1.03,
  "5Y": 1.06,
  Max: 1.08,
};

const lineTimeframePoints: Record<(typeof timeframeOptions)[number], number> = {
  "1M": 4,
  "3M": 5,
  "1Y": 6,
  "5Y": 8,
  Max: 8,
};

const barLabels = [
  "Gross Margin %",
  "Operating Margin %",
  "Net Margin %",
  "Debt-to-Equity",
  "ROE %",
];

export default function Home() {
  const sections = useDefaultSections();
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedCompany, setSelectedCompany] = useState<Company>(companies[0]);
  const [timeframe, setTimeframe] =
    useState<(typeof timeframeOptions)[number]>("1Y");

  const profile = companyProfiles[selectedCompany.ticker];

  const candles = useMemo(
    () => generateCandles(profile.seed, profile.drift, timeframe),
    [profile.seed, profile.drift, timeframe],
  );

  const linePoints =
    lineTimeframePoints[timeframe] ?? profile.revenueLabels.length;
  const lineLabels = profile.revenueLabels.slice(-linePoints);
  const revenueDataset = profile.revenue.slice(-linePoints);

  const multiplier = timeframeMultipliers[timeframe] ?? 1;
  const barData = [
    Number((profile.metrics.grossMargin * multiplier).toFixed(2)),
    Number((profile.metrics.operatingMargin * (1 + (multiplier - 1) * 1.1)).toFixed(2)),
    Number((profile.metrics.netMargin * (1 + (multiplier - 1) * 1.15)).toFixed(2)),
    Number((profile.metrics.debtEquity * (1 - (multiplier - 1) * 0.8)).toFixed(2)),
    Number((profile.metrics.roe * multiplier).toFixed(2)),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 space-y-6 lg:space-y-8">
          <MobileHeader
            sections={sections}
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
          <div className="flex flex-col gap-6" id="overview">
            <SearchBar
              key={selectedCompany.ticker}
              companies={companies}
              onSelect={(company) => setSelectedCompany(company)}
              selected={selectedCompany}
            />
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                    Multibagger Lens
                  </span>
                  <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                    {selectedCompany.name} ({selectedCompany.ticker})
                  </h1>
                  <p className="max-w-2xl text-sm text-slate-600 md:text-base">
                    {profile.overview.summary}
                  </p>
                  <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Sector
                      </p>
                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {selectedCompany.sector}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Market Cap
                      </p>
                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {selectedCompany.marketCap}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Growth Snapshot
                      </p>
                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {profile.overview.growth}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">
                      Market opportunity
                    </p>
                    <p>{profile.overview.marketSize}</p>
                    <ul className="grid gap-2 pt-2 text-sm text-slate-600 md:grid-cols-2">
                      {profile.overview.advantages.map((advantage) => (
                        <li
                          key={advantage}
                          className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700"
                        >
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <MultibaggerGauge
                  score={profile.gaugeScore}
                  factors={profile.factors}
                />
              </div>
            </section>
          </div>

          <section
            id="analytics"
            className="space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-lg md:space-y-8 md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                  Intelligent Analytics Studio
                </h2>
                <p className="text-sm text-slate-500 md:text-base">
                  Pan, zoom, and slice multi-horizon charts to interrogate price
                  action and fundamentals.
                </p>
              </div>
              <label className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 focus-within:border-teal-400 focus-within:text-teal-700">
                Timeframe
                <select
                  value={timeframe}
                  onChange={(event) =>
                    setTimeframe(event.target.value as (typeof timeframeOptions)[number])
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-700 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-100"
                >
                  {timeframeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4 shadow-inner lg:col-span-2">
                <h3 className="text-sm font-semibold text-slate-700">
                  OHLC Price Action
                </h3>
                <div className="mt-3 h-[360px] rounded-2xl bg-white p-4">
                  <CandlestickChart data={candles} timeframe={timeframe} />
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Scroll or pinch to zoom. Double-tap chart to reset view. Prices
                  simulated for demonstration.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50/70 p-4 shadow-inner">
                <h3 className="text-sm font-semibold text-slate-700">
                  Revenue growth YoY
                </h3>
                <div className="mt-3 h-[180px] rounded-2xl bg-white p-4">
                  <LineChart
                    labels={lineLabels}
                    dataset={revenueDataset}
                    label="Revenue ₹ Crore"
                    timeframe={timeframe}
                  />
                </div>
                <h3 className="mt-6 text-sm font-semibold text-slate-700">
                  Profitability Mix
                </h3>
                <div className="mt-3 h-[180px] rounded-2xl bg-white p-4">
                  <BarChart
                    labels={barLabels}
                    dataset={barData}
                    label="Performance"
                    timeframe={timeframe}
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="alerts" className="space-y-6">
            <NewsFeed items={profile.news} />
            <AlertsConfigurator />
          </section>

          <section id="risks" className="space-y-6">
            <RiskAssessment risks={profile.risks} />
            <MetricsTable rows={profile.metricsTable} />
          </section>

          <section id="account" className="space-y-6">
            <UserAccountSections />
          </section>

          <section id="help" className="space-y-6">
            <HelpCenter faqs={profile.faqs} />
          </section>

          <footer className="rounded-3xl border border-slate-100 bg-white p-6 text-xs text-slate-500 shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p>
                Data sources: SEBI filings, NSE/BSE disclosures, Bloomberg,
                industry research, and proprietary sentiment engines refreshed
                hourly.
              </p>
              <p className="font-semibold text-slate-600">
                © {new Date().getFullYear()} AstraMultibagger Intelligence.
              </p>
            </div>
            <p className="mt-3">
              Disclaimer: Analytics are AI-assisted scenario explorations and do
              not constitute investment advice. Assess risk appetite and consult
              certified advisors before allocating capital. Market investments
              are subject to risks including principal loss.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
