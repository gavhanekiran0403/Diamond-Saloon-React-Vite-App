import React, { useCallback, useEffect, useState } from "react";
import "./CustomerList.css";
import { getAllUsers } from "../../../services/UserService";
// import { logoutUser } from "../../../services/LoginService";

const CustomerList = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH CUSTOMERS =================
  const getAllCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getAllUsers();
      setCustomers(res.data.data);

    } catch (error) {
      alert("❌ Failed to fetch customers. Please try again later!");
      console.log("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  // ================= FORCE LOGOUT =================
  // const handleForceLogout = async (userId) => {
  //   const confirmLogout = window.confirm(
  //     "Are you sure you want to force logout this customer?"
  //   );

  //   if (!confirmLogout) return;

  //   try {
  //     await logoutUser(userId);

  //     alert("✅ Customer logged out successfully!");
  //     getAllCustomers();

  //   } catch (error) {
  //     alert("❌ Failed to force logout. Try again!");
  //     console.log("Force logout error:", error);
  //   }
  // };

  return (
    <div className="customer-page">

      <h1 className="customer-title">Customer List</h1>

      <div className="customer-table-wrapper">
        {loading ? (
          <p className="customer-no-data">Loading customers... please wait</p>
        ) : customers.length === 0 ? (
          <p className="customer-no-data">No customers found</p>
        ) : (
          <table className="customer-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>

            <tbody>
              {customers.map((cust, index) => (
                <tr key={cust.userId}>
                  <td>{index + 1}</td>
                  <td>{cust.fullName}</td>
                  <td>{cust.email}</td>
                  <td>{cust.phone}</td>

                  <td>
                    <span
                      className={`customer-status-badge ${
                        cust.loginStatus ? "active" : "inactive"
                      }`}
                    >
                      {cust.loginStatus ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* <td>
                    <button
                      className="force-logout-btn"
                      onClick={() => handleForceLogout(cust.userId)}
                    >
                      Force Logout
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
