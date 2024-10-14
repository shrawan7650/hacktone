// const mongoose = require('mongoose');

// const spo2Schema = new mongoose.Schema({
//     timestamp: { type: Date, default: Date.now }, // Date and time of recording
//     spo2_level: { type: Number, required: true }, // Oxygen saturation level in percentage
//     // patient_id: { type: String, required: false }, // Optional Patient ID
//     condition_status: { type: String, enum: ['at rest', 'during activity'], required: true } // Condition status
// },
// {
//   timestamps: true, // Adds createdAt and updatedAt fields automatically

// }

// );

// const SpO2 = mongoose.model('SpO2', spo2Schema);
// module.exports = SpO2;