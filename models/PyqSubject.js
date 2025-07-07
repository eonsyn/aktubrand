// models/PyqSubject.js
import mongoose from 'mongoose';

const pyqSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode:{type:String},
  fullName: { type: String, required: true },
  semester: { type: Number, required: true }, // ✅ Use Number not Integer
  goto: { type: String, required: true },
});

export default mongoose.models.PyqSubject || mongoose.model('PyqSubject', pyqSchema);
