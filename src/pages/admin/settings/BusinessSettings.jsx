import React, { useState, useEffect } from "react";
import {
  getBusinessSettings,
  saveBusinessSettings
} from "../../../services/SettingsService";

import "./BusinessSettings.css";

function BusinessSettings() {

  const [form, setForm] = useState({
    salonName: "",
    ownerName: "",
    email: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mapLocation: "",
    logo: null,
    logoPreview: ""
  });


  /* =========================
     LOAD SETTINGS
  ========================= */
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await getBusinessSettings();

      setForm({
        ...res.data,
        logoPreview: res.data.logoUrl || ""
      });

    } catch (err) {
      console.log("No settings found");
    }
  };


  /* =========================
     INPUT CHANGE
  ========================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  /* =========================
     LOGO UPLOAD
  ========================= */
  const handleLogo = (e) => {
    const file = e.target.files[0];

    setForm({
      ...form,
      logo: file,
      logoPreview: URL.createObjectURL(file)
    });
  };


  /* =========================
     SAVE SETTINGS
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const settingsDto = {
      salonName: form.salonName,
      ownerName: form.ownerName,
      email: form.email,
      phone: form.phone,
      altPhone: form.altPhone,
      address: form.address,
      city: form.city,
      state: form.state,
      country: form.country,
      pincode: form.pincode,
      mapLocation: form.mapLocation
    };

    await saveBusinessSettings(settingsDto, form.logo);

    alert("✅ Settings Saved!");
  };


  return (
    <div className="saloon-settings-page">

      <h2 className="saloon-settings-title">
        Business Settings
      </h2>

      <form
        className="saloon-settings-form"
        onSubmit={handleSubmit}
      >

        {/* ================= Logo ================= */}
        <div className="saloon-settings-logo-box">
          <div className="saloon-settings-logo-preview">
            {form.logoPreview ? (
              <img src={form.logoPreview} alt="logo" />
            ) : (
              <span>Logo</span>
            )}
          </div>

          <input type="file" onChange={handleLogo} />
        </div>


        {/* ================= Grid ================= */}
        <div className="saloon-settings-grid">

          <div className="saloon-settings-group">
            <label>Saloon Name</label>
            <input
              name="salonName"
              value={form.salonName}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>Owner Name</label>
            <input
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>Alternate Phone</label>
            <input
              name="altPhone"
              value={form.altPhone}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>State</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group">
            <label>Pincode</label>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group saloon-settings-full">
            <label>Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="saloon-settings-group saloon-settings-full">
            <label>Google Map Location</label>
            <input
              name="mapLocation"
              value={form.mapLocation}
              onChange={handleChange}
            />
          </div>

        </div>


        {/* ================= Map Preview ================= */}
        {form.mapLocation && (
          <iframe
            title="map"
            className="saloon-settings-map"
            src={form.mapLocation}
          />
        )}


        {/* ================= Buttons ================= */}
        <div className="saloon-settings-actions">
          <button
            type="submit"
            className="saloon-settings-save-btn"
          >
            Save Settings
          </button>

          {/* <button
            type="button"
            className="saloon-settings-cancel-btn"
            onClick={loadSettings}
          >
            Cancel
          </button> */}
        </div>

      </form>
    </div>
  );
}

export default BusinessSettings;
