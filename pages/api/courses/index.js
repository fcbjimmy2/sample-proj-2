// data
import { courseDb } from '../../../database';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  res.status(200).json(courseDb.getCourses());
}
