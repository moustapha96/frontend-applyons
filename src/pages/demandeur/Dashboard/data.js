const statisticChart1 = {
  series: [{ name: "This Month", data: [98, 85, 60, 80, 100, 150, 120] }],
  chart: { height: 90, type: "area", toolbar: { show: !1 } },
  grid: { show: false },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.4,
      opacityTo: 0,
    },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "stepline" },
  colors: ["#f97316"],
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};

const statisticChart2 = {
  series: [{ name: "This Month", data: [110, 79, 72, 89, 120, 150, 140] }],
  chart: { height: 90, type: "area", toolbar: { show: !1 } },
  grid: { show: false },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.4,
      opacityTo: 0,
    },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "stepline" },
  colors: ["#14b8a6"],
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};

const statisticChart3 = {
  series: [{ name: "This Month", data: [148, 100, 80, 92, 110, 160, 130] }],
  chart: { height: 90, type: "area", toolbar: { show: !1 } },
  grid: { show: false },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: !1,
      opacityFrom: 0.4,
      opacityTo: 0,
    },
  },
  dataLabels: { enabled: false },
  stroke: { curve: "stepline" },
  colors: ["#0ea5e9"],
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};

const statisticData = [
  {
    title: "Today Revenue",
    state: "$2100",
    change: 10.21,
    variant: "text-teal-500",
    chartOptions: statisticChart1,
  },
  {
    title: "Product Sold",
    state: "558",
    change: 5.05,
    variant: "text-red-500",
    chartOptions: statisticChart2,
  },
  {
    title: "New Customers",
    state: "65",
    change: 25.16,
    variant: "text-teal-500",
    chartOptions: statisticChart3,
  },
];

const sources = [
  {
    type: "Direct",
    session: 358,
    view: 250,
  },
  {
    type: "Referral",
    session: 501,
    view: 50,
  },
  {
    type: "Email",
    session: 460,
    view: 600,
  },
  {
    type: "Organic",
    session: 920,
    view: 150,
  },
];


const recentOrders = [
  {
    id: 98754,
    product: "ASOS Ridley High",
    customer: "Otto B",
    price: 79.49,
    status: "Pending",
  },
  {
    id: 98753,
    product: "Marco Lightweight Shirt",
    customer: "Mark P",
    price: 125.49,
    status: "Delivered",
  },
];

export { sources, statisticData, topPerformers, recentOrders };
