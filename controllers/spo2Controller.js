// const SpO2 = require('../models/spo2Model');

// // Create an SpO2 entry
// exports.createSpO2 = async (req, res) => {
//     try {
//         const { spo2_level, patient_id, condition_status } = req.body;

//         const spo2Data = new SpO2({
//             spo2_level,
//             patient_id,
//             condition_status
//         });

//         const savedData = await spo2Data.save();
//         res.status(201).json(savedData);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Get all SpO2 entries
// exports.getSpO2Levels = async (req, res) => {
//   try {
//     // Fetch SpO2 levels where the SpO2 is >= 95 or <= 90
//     const data = await SpO2.find({
//       $or: [
//         { spo2_level: { $gte: 95 } }, // SpO2 95% or more
//         { spo2_level: { $lte: 90 } }  // SpO2 90% or less
//       ]
//     });
    
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

