// data
import { courseDb } from '../../../database';

// ----------------------------------------------------------------------

export default function handler(req, res) {
  const { id } = req.query;

  const filtered = courseDb.getCourses().find((course) => course.id === id);

  if (filtered) {
    res.status(200).json({
      ...filtered,
      courseReviews: courseDb.getCoursesReviews()
    });
  } else {
    res.status(404).json({ message: `Course with id: ${id} not found.` });
  }
}
