// data
import { courseDb } from '../../../../../database';
// API Guard
import { apiAuthGuard } from '../../../../../src/utils/apiGuard';

// ----------------------------------------------------------------------

export default function handler(req, res) {
    apiAuthGuard(req, res, ['GET','PUT','DELETE'], async (i18n, loggedInUser) => {
        const { method, body, query } = req;
        const { id } = query;
        try {
            if (method === 'GET') {
                const course = await courseDb.getCourseByUser(id , loggedInUser.id, null);
                if (course) {
                    return res.status(200).json(course);
                } else {
                    return res.status(404).json({ message: i18n.__('The course does not exist') });
                }
            } else if (method === 'PUT') {
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
                const result = await courseDb.updateCourseByUser(id, course_code, course_category, course_level, course_title, course_intro, course_html_content, course_html_footer, course_image, course_video, credit, allow_free_credit, loggedInUser.id, courseLanguages);
                if ((result?.error??'') === 'The course does not exist') {
                    return res.status(404).json({ message: i18n.__('The course does not exist') });
                } else {
                    return res.status(204).send();
                }    
            } else{
    
            }
        } catch(e) {
            console.log(e)
			return res.status(500).json({ message: i18n.__('unexpected-error-occurred') });
        }
    })
}
