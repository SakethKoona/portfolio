import type { Project } from "./types";

const project: Project = {
  slug: "volatility-forecasting",
  title: "Volatility forecasting and trading",
  section: "earlier",
  order: 1,
  body: "Implied volatility solved with Newton-Raphson and Black-Scholes-Merton for 10,000 option contracts, LSTM forecasts of realized volatility for 30+ stocks, and a two-year backtester tracking P&L and drawdown. 4.57% annualized excess return, Sharpe 1.30.",
  summary:
    "Implied volatility for 10,000 option contracts, LSTM forecasts for 30+ stocks, and a two-year backtester. 4.57% annualized excess return, Sharpe 1.30.",
  tags: ["Python", "PyTorch", "TensorFlow", "NumPy"],
  links: {},
};

export default project;
