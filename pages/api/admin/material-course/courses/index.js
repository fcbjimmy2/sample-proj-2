// data
import { courseDb } from '../../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET', 'POST'], async (i18n, loggedInUser) => {
        try{
            const { method, body } = req;
            if (method === 'GET') {
                const courses = await courseDb.getCoursesByUser(loggedInUser.id);
                return res.status(200).json(courses);
            } else {
                const {
                    course_code,
                    course_category,
                    course_level,
                    course_title,
                    course_intro,
                    course_html_content,
                    course_html_footer,
                    course_image = null,
                    course_video = null,
                    credit,
                    allow_free_credit,
                    content_languages
                } = body;
                const courseLanguages = content_languages.map(el => {
                    return {
                        courseLang: el.lang, 
                        courseTitle: el.course_title, 
                        courseIntro: el.course_intro,
                        courseHtmlContent: el.course_html_content,
                        courseHtmlFooter: el.course_html_footer,
                        courseImage: el.course_image??null,
                        courseVideo: el.course_video??null,
                    }
                });
                const result = await courseDb.createCourse(course_code, course_category, course_level, course_title, course_intro, course_html_content, course_html_footer, course_image, course_video, credit, allow_free_credit, loggedInUser.id, courseLanguages);
                return res.status(200).json({ id: result.guid });
            }
        } catch(e) {
			return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    })
}
