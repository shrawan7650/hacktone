// const BloodPressure = require('../models/bloodPressureModel');

// // Create a Blood Pressure entry
// exports.createBloodPressure = async (req, res) => {
//     try {
//         const { systolic_bp, diastolic_bp, patient_id } = req.body;

//         const bpData = new BloodPressure({
//             systolic_bp,
//             diastolic_bp,
          
//             patient_id
//         });

//         const savedData = await bpData.save();
//         res.status(201).json(savedData);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Get all Blood Pressure entries
// exports.getBloodPressureLevels = async (req, res) => {
//   try {
//     // Fetch Blood Pressure data where systolic >= 140 or diastolic <= 60
//     const data = await BloodPressure.find({
//       $or: [
//         { systolic_bp: { $gte: 140 } },   // Systolic BP 140 or more
//         { diastolic_bp: { $lte: 60 } }    // Diastolic BP 60 or less
//       ]
//     });
    
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

