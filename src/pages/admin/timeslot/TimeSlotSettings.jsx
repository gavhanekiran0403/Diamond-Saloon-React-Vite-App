import React, { useState } from "react";
import "./TimeSlotSettings.css";

const TimeSlotSettings = () => {
  // ✅ Regular schedule (default)
  const [regularSchedule, setRegularSchedule] = useState({
    openTime: "10:00",
    closeTime: "20:00",
    slotDuration: 30,
    slots: [],
  });

  // ✅ Override for a particular date
  const [selectedDate, setSelectedDate] = useState("");
  const [dateOverrides, setDateOverrides] = useState([]);

  const [isOff, setIsOff] = useState(false);
  const [customStartTime, setCustomStartTime] = useState("");
  const [customEndTime, setCustomEndTime] = useState("");

  // ✅ Generate Regular Slots Automatically
  const generateRegularSlots = () => {
    const { openTime, closeTime, slotDuration } = regularSchedule;

    if (!openTime || !closeTime) return alert("Select open & close time ✅");

    const slots = [];
    const start = new Date(`1970-01-01T${openTime}:00`);
    const end = new Date(`1970-01-01T${closeTime}:00`);

    if (start >= end) return alert("Close time must be greater ✅");

    while (start < end) {
      const slotStart = start.toTimeString().slice(0, 5);
      start.setMinutes(start.getMinutes() + Number(slotDuration));
      const slotEnd = start.toTimeString().slice(0, 5);

      if (start <= end) slots.push(`${slotStart} - ${slotEnd}`);
    }

    setRegularSchedule((prev) => ({
      ...prev,
      slots,
    }));

    alert("Regular time slots generated ✅");
  };

  // ✅ Save Override Date
  const saveOverride = () => {
    if (!selectedDate) return alert("Select date first ✅");

    let overrideObj = {
      date: selectedDate,
      isOff: isOff,
      customSlots: [],
    };

    // ✅ if not OFF, add custom slot range
    if (!isOff) {
      if (!customStartTime || !customEndTime)
        return alert("Select custom start & end time ✅");

      if (customStartTime >= customEndTime)
        return alert("End time must be greater ✅");

      overrideObj.customSlots = [`${customStartTime} - ${customEndTime}`];
    }

    // ✅ replace existing override for same date
    const filtered = dateOverrides.filter((o) => o.date !== selectedDate);

    setDateOverrides([...filtered, overrideObj]);

    alert("Date override saved ✅");

    // reset
    setSelectedDate("");
    setIsOff(false);
    setCustomStartTime("");
    setCustomEndTime("");
  };

  // ✅ Delete Override
  const deleteOverride = (date) => {
    setDateOverrides(dateOverrides.filter((o) => o.date !== date));
  };

  return (
    <div className="timeslot-page">
      <h2 className="timeslot-title">Time Slot Settings</h2>

      {/* ✅ Regular Schedule */}
      <div className="card">
        <h3>✅ Regular Schedule (Common for All Days)</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Open Time</label>
            <input
              type="time"
              value={regularSchedule.openTime}
              onChange={(e) =>
                setRegularSchedule({
                  ...regularSchedule,
                  openTime: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Close Time</label>
            <input
              type="time"
              value={regularSchedule.closeTime}
              onChange={(e) =>
                setRegularSchedule({
                  ...regularSchedule,
                  closeTime: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Slot Duration</label>
            <select
              value={regularSchedule.slotDuration}
              onChange={(e) =>
                setRegularSchedule({
                  ...regularSchedule,
                  slotDuration: e.target.value,
                })
              }
            >
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="60">60 mins</option>
            </select>
          </div>

          {/* ✅ Button inside form-group for proper alignment */}
          <div className="form-group">
            <label style={{ visibility: "hidden" }}>Action</label>
            <button className="btn-generate" onClick={generateRegularSlots}>
              Generate Slots
            </button>
          </div>
        </div>

        {/* Slots Display */}
        <div className="slot-grid">
          {regularSchedule.slots.length === 0 ? (
            <p className="no-data">No slots generated yet</p>
          ) : (
            regularSchedule.slots.map((slot, index) => (
              <span key={index} className="slot-badge">
                {slot}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ✅ Date Overrides */}
      <div className="card">
        <h3>✅ Date Override (OFF / Custom Slots)</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="form-group markoff-group">
  <label>Mark OFF</label>

  <div className="markoff-center">
    <input
      type="checkbox"
      checked={isOff}
      onChange={(e) => setIsOff(e.target.checked)}
    />
  </div>
</div>


          {!isOff && (
            <>
              <div className="form-group">
                <label>Custom Start</label>
                <input
                  type="time"
                  value={customStartTime}
                  onChange={(e) => setCustomStartTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Custom End</label>
                <input
                  type="time"
                  value={customEndTime}
                  onChange={(e) => setCustomEndTime(e.target.value)}
                />
              </div>
            </>
          )}

          {/* ✅ Button inside form-group for alignment */}
          <div className="form-group">
            <label style={{ visibility: "hidden" }}>Action</label>
            <button className="btn-save" onClick={saveOverride}>
              Save Override
            </button>
          </div>
        </div>

        {/* Override List */}
        <div className="override-list">
          {dateOverrides.length === 0 ? (
            <p className="no-data">No overrides added yet</p>
          ) : (
            dateOverrides.map((o, index) => (
              <div key={index} className="override-item">
                <div>
                  <b>{o.date}</b> →{" "}
                  {o.isOff ? (
                    <span className="off-text">OFF</span>
                  ) : (
                    <span className="custom-text">
                      {o.customSlots.join(", ")}
                    </span>
                  )}
                </div>

                <button
                  className="btn-delete"
                  onClick={() => deleteOverride(o.date)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSettings;
