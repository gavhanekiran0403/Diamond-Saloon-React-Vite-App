import React, { useState, useMemo } from "react";
import "./Reports.css";

export default function Reports() {
  const [activeReport, setActiveReport] = useState("Appointments");
  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("all");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ================= RESET ================= */
  const handleReset = () => {
    setSearch("");
    setFilterType("all");
    setDay("");
    setMonth("");
    setFromDate("");
    setToDate("");
  };

  /* ================= DATA ================= */
  const reportData = {
    Appointments: [
      { id: 1, customer: "John", service: "Haircut", date: "2026-01-16", status: "Completed" },
      { id: 2, customer: "Priya", service: "Facial", date: "2026-01-16", status: "Pending" },
      { id: 3, customer: "Anjali", service: "Manicure", date: "2026-01-15", status: "Completed" },
    ],
    Payments: [
      { id: 1, customer: "John", amount: "₹500", method: "Cash", date: "2026-01-16" },
      { id: 2, customer: "Priya", amount: "₹900", method: "UPI", date: "2026-01-16" },
      { id: 3, customer: "Anjali", amount: "₹700", method: "Card", date: "2026-01-15" },
    ],
    Orders: [
      { id: 1, product: "Shampoo", qty: 2, total: "₹850", date: "2026-01-16" },
      { id: 2, product: "Hair Serum", qty: 1, total: "₹1200", date: "2026-01-15" },
    ],
  };

  const data = reportData[activeReport];

  /* ================= DATE FILTER ================= */
  const dateFilteredData = useMemo(() => {
    return data.filter((row) => {
      const rowDate = new Date(row.date);

      if (filterType === "day" && day) return row.date === day;
      if (filterType === "month" && month) return row.date.startsWith(month);

      if (filterType === "range" && fromDate && toDate) {
        return rowDate >= new Date(fromDate) && rowDate <= new Date(toDate);
      }

      return true;
    });
  }, [data, filterType, day, month, fromDate, toDate]);

  /* ================= SEARCH ================= */
  const filteredData = dateFilteredData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  /* ================= TOTAL ================= */
  const totalAmount = useMemo(() => {
    if (activeReport !== "Payments") return 0;

    return filteredData.reduce(
      (sum, r) => sum + parseInt(r.amount?.replace("₹", "") || 0),
      0
    );
  }, [filteredData, activeReport]);

  /* ================= PAYMENT SUMMARY ================= */
  const paymentSummary = useMemo(() => {
    const summary = { cash: 0, upi: 0, card: 0 };

    if (activeReport !== "Payments") return summary;

    filteredData.forEach((row) => {
      const amt = parseInt(row.amount.replace("₹", ""));
      const m = row.method.toLowerCase();

      if (m === "cash") summary.cash += amt;
      if (m === "upi") summary.upi += amt;
      if (m === "card") summary.card += amt;
    });

    return summary;
  }, [filteredData, activeReport]);

  return (
    <div className="reports-page">
      <h1 className="reports-title">📈 Reports</h1>

      {/* ================= TABS ================= */}
      <div className="report-tabs">
        {["Appointments", "Payments", "Orders"].map((tab) => (
          <button
            key={tab}
            className={activeReport === tab ? "active" : ""}
            onClick={() => setActiveReport(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="report-actions">
        <input
          type="text"
          placeholder="🔍 Search report..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="day">Day wise</option>
          <option value="month">Month wise</option>
          <option value="range">Custom range</option>
        </select>

        {filterType === "day" && (
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} />
        )}

        {filterType === "month" && (
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
        )}

        {filterType === "range" && (
          <>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </>
        )}

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* ================= PAYMENT SUMMARY ================= */}
      {activeReport === "Payments" && (
        <div className="payment-summary">
          <div className="summary-card">💵 Cash ₹{paymentSummary.cash}</div>
          <div className="summary-card">📱 UPI ₹{paymentSummary.upi}</div>
          <div className="summary-card">💳 Card ₹{paymentSummary.card}</div>
          <div className="summary-card total">🧾 Total ₹{totalAmount}</div>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="report-table-box">
        <h2>{activeReport} Report</h2>

        <table className="report-table">
          <thead>
            <tr>
              {filteredData[0] &&
                Object.keys(filteredData[0]).map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  {Object.entries(item).map(([key, value], i) => (
                    <td key={i} data-label={key.toUpperCase()}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="no-data-row">
                <td colSpan="10" className="no-data-cell">
                  🔍 No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
