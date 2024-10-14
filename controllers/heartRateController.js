// const HeartRate = require("../models/heartRateModel");

// // Create a heart rate entry
// exports.createHeartRate = async (req, res) => {
//   try {
//     const { heart_rate, activity_status } = req.body;
//     //console all
//     console.log(req.body);

//     // Create a new heart rate record
//     const heartRateData = new HeartRate({
//       heart_rate,

//       activity_status,
//     });

//     const savedData = await heartRateData.save();
//     res.status(201).json(savedData);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Get all heart rate entries
// exports.getHeartRates = async (req, res) => {
//   try {
//     const data = await HeartRate.find();
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.getHeartRates = async (req, res) => {
//   try {
//     // Fetch heart rate data where the heart rate is either >= 100 or <= 50
//     const data = await HeartRate.find({
//       $or: [
//         { heart_rate: { $gte: 100 } }, // Heart rate 100 or more
//         { heart_rate: { $lte: 50 } }   // Heart rate 50 or less
//       ]
//     });
    
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// exports.getHeartRatesSpecific = async (req, res) => {
//   try {
//     // Fetch heart rate data where the heart rate is either >= 100 or <= 50
//     const data = await HeartRate.find({
//       $or: [
//         { heart_rate: { $gte: 100 } }, // Heart rate 100 or more
//         { heart_rate: { $lte: 50 } }   // Heart rate 50 or less
//       ]
//     });
    
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

