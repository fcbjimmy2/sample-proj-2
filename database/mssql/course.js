import _mock from '../mock/_mock';
import { guidDb } from '../';

export default function (knex) {
  const teachers = [...Array(5)].map((_, index) => ({
    id: _mock.id(index),
    role: _mock.role(index),
    name: _mock.name.fullName(index),
    picture: _mock.image.avatar(index),
    courses: 48,
    reviews: 3458,
    students: 18000,
    ratings: 3.5 + index / 10,
  }));

  const lessons = [...Array(9)].map((_, index) => ({
    id: _mock.id(index),
    description: _mock.text.sentence(index),
    videoPath: 'https://www.dropbox.com/s/6trnqlpmih364l8/zone_video_02.mp4?dl=0',
    duration: 60 - index,
    title: `Lesson ${index + 1}`,
    isUnLock: index !== 0 && index !== 1,
  }));

  const getCourses = () => {
    return [...Array(12)].map((_, index) => ({
      id: _mock.id(index),
      createdAt: new Date(),
      slug: _mock.text.courseTitle(index),
      coverImg: _mock.image.course(index),
      category: _mock.text.jobCategories(index),
      description: _mock.text.description(index),
      price: (index % 2 && 159.99) || 269.99,
      priceSale: (index === 2 && 89.99) || (index === 5 && 69.99) || 0,
      lessons,
      teachers,
      quizzes: 100,
      resources: 12,
      totalHours: 100,
      reviews: 3458,
      students: 180000,
      ratings: 3.5 + index / 10,
      bestSeller: index === 2 || false,
      level:
        (index % 2 && 'Intermediate') ||
        (index % 4 && 'Expert') ||
        (index % 5 && 'All Levels') ||
        'Beginner',
      languages: ['Russian', 'Spanish', 'English'],
      skills: ['Photography', 'Design', 'Art', 'History', 'Museums', 'Creativity', 'Art History'],
      learnList: [
        'A fermentum in morbi pretium aliquam adipiscing donec tempus.',
        'Vulputate placerat amet pulvinar lorem nisl.',
        'Consequat feugiat habitant gravida quisque elit bibendum id adipiscing sed.',
        'Etiam duis lobortis in fames ultrices commodo nibh.',
        'Fusce neque. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit.',
        'Curabitur a felis in nunc fringilla tristique. Praesent congue erat at massa.',
      ],
      shareLinks: _mock.shareLinks,
      videoPath: 'https://www.dropbox.com/s/zqzskvpthmbbbr0/zone_video_01.mp4?dl=0',
    }));
  };

  // ----------------------------------------------------------------------

  const users = [...Array(12)].map((_, index) => ({
    id: _mock.id(index),
    name: _mock.name.fullName(index),
    avatarUrl: _mock.image.avatar(index),
  }));

  const reviews = [
    {
      id: _mock.id(0),
      name: users[0].name,
      avatarUrl: users[0].avatarUrl,
      message: _mock.text.sentence(1),
      postedAt: _mock.time(1),
      participants: [users[0], users[1], users[2]],
      rating: 3.5,
      helpful: 32,
      replies: [
        {
          id: _mock.id(1),
          userId: users[1].id,
          message: _mock.text.sentence(2),
          postedAt: _mock.time(2),
        },
        {
          id: _mock.id(2),
          userId: users[0].id,
          message: _mock.text.sentence(3),
          tagUser: users[1].name,
          postedAt: _mock.time(3),
        },
        {
          id: _mock.id(3),
          userId: users[2].id,
          message: _mock.text.sentence(4),
          postedAt: _mock.time(4),
        },
      ],
    },
    {
      id: _mock.id(4),
      name: users[4].name,
      avatarUrl: users[4].avatarUrl,
      message: _mock.text.sentence(5),
      postedAt: _mock.time(5),
      participants: [users[5], users[6], users[7]],
      rating: 4.5,
      helpful: 0,
      replies: [
        {
          id: _mock.id(5),
          userId: users[6].id,
          message: _mock.text.sentence(7),
          postedAt: _mock.time(7),
        },
        {
          id: _mock.id(6),
          userId: users[7].id,
          message: _mock.text.sentence(8),
          postedAt: _mock.time(8),
        },
      ],
    },
    {
      id: _mock.id(7),
      name: users[8].name,
      avatarUrl: users[8].avatarUrl,
      message: _mock.text.sentence(9),
      postedAt: _mock.time(9),
      rating: 4.5,
      helpful: 10,
      participants: [],
      replies: [],
    },
    {
      id: _mock.id(8),
      name: users[9].name,
      avatarUrl: users[9].avatarUrl,
      message: _mock.text.sentence(10),
      postedAt: _mock.time(10),
      rating: 5,
      helpful: 0,
      participants: [],
      replies: [],
    },
  ];

  const getCoursesReviews = () => {
    return reviews;
  };

  // ----------------------------------------------------------------------

  const NAMES = [
    'Python',
    'Design',
    'History',
    'Photoshop',
    'Management',
    'Cyber Security',
    'Web Development',
    'Machine Learning',
    'Photography',
  ];

  const getCoursesByCategories = () => {
    return [...Array(9)].map((_, index) => ({
      id: _mock.id(index),
      name: NAMES[index],
      students: 101 + index,
    }));
  };

  // ----------------------------------------------------------------------

  const createCourse = async (
    courseCode,
    courseCategory,
    courseLevel,
    courseTitle,
    courseIntro,
    courseHtmlContent,
    courseHtmlFooter,
    courseImage,
    courseVideo,
    credit,
    allowFreeCredit,
    createBy,
    contentLanguages = []
  ) => {
    const guid = await guidDb.get_guid();

    let trx = null;
    try {
      trx = await knex.transaction();

      await trx.raw(
        "EXEC sp_course_action @action='create',@course_guid=?,@course_code=?,@course_category=?,@course_level=?,@course_title=?,@course_intro=?,@course_html_content=?,@course_html_footer=?,@course_image=?,@course_video=?,@credit=?,@allow_free_credit=?,@active='1',@created_by=?",
        [
          guid,
          courseCode,
          courseCategory,
          courseLevel,
          courseTitle,
          courseIntro,
          courseHtmlContent,
          courseHtmlFooter,
          courseImage,
          courseVideo,
          credit,
          allowFreeCredit,
          createBy,
        ]
      );

      for (const contentLanguage of contentLanguages) {
        await trx.raw(
          "EXEC sp_course_content_lang_action @action='create',@course_guid=?,@course_lang=?,@course_title=?,@course_intro=?,@course_html_content=?,@course_html_footer=?,@course_image=?,@course_video=?",
          [
            guid,
            contentLanguage.courseLang,
            contentLanguage.courseTitle,
            contentLanguage.courseIntro,
            contentLanguage.courseHtmlContent,
            contentLanguage.courseHtmlFooter,
            contentLanguage.courseImage,
            contentLanguage.courseVideo,
          ]
        );
      }

      await trx.commit();

      return {
        guid: guid,
      };
    } catch (error) {
      console.log(error);
      if (trx && !trx.isCompleted()) {
        await trx.rollback();
      }
      throw error;
    }
  };

  const getCoursesByUser = async (user_guid, lang) => {
    let courses = [];
    if (!!lang && lang !== 'en') {
      courses = await knex
        .select(
          'c.course_guid',
          'c.course_code',
          knex.raw('ISNULL(l.course_title, c.course_title) as course_title')
        )
        .from('course as c')
        .leftJoin('course_content_lang AS l', 'c.course_guid', '=', 'l.course_guid')
        .where('c.created_by', user_guid)
        .andWhere('l.lang', lang);
    } else {
      courses = await knex
        .select('course_guid', 'course_code', 'course_title')
        .from('course')
        .where('created_by', user_guid);
    }
    return courses;
  };

  const getCourse = async (guid, lang) => {
    let course = await knex('course').first('*').where('course_guid', guid);
    if (!!lang) {
      if (lang !== 'en') {
      }
    } else {
    }
    return course;
  };

  const getCourseByUser = async (guid, user_guid, lang) => {
    let course = await knex('course')
      .first('*')
      .where('course_guid', guid)
      .andWhere('created_by', user_guid);
    if (course) {
      if (!!lang) {
        if (lang !== 'en') {
          let contentLanguage = await knex('course_content_lang')
            .first('*')
            .where('course_guid', guid)
            .andWhere('lang', lang);
          if (contentLanguage) {
            course = {
              ...course,
              course_title: contentLanguage.course_title,
              course_intro: contentLanguage.course_intro,
              course_html_content: contentLanguage.course_html_content,
              course_html_footer: contentLanguage.course_html_footer,
              course_image: contentLanguage.course_image,
              course_video: contentLanguage.course_video,
            };
          }
        }
      } else {
        let courseContentLanguages = await knex
          .select('*')
          .from('course_content_lang')
          .where('course_guid', guid);
        course = {
          ...course,
          content_languages: courseContentLanguages,
        };
      }
    }
    return course;
  };

  const updateCourseByUser = async (
    guid,
    courseCode,
    courseCategory,
    courseLevel,
    courseTitle,
    courseIntro,
    courseHtmlContent,
    courseHtmlFooter,
    courseImage,
    courseVideo,
    credit,
    allowFreeCredit,
    createBy,
    contentLanguages = []
  ) => {
    let trx = null;
    try {
      trx = await knex.transaction();

      const getCourse = await trx.raw("EXEC sp_course_action @action='get',@course_guid=?", [guid]);
      const foundCourseByUser = getCourse.find((el) => el.created_by === createBy);
      if (foundCourseByUser) {
        await trx.raw(
          "EXEC sp_course_action @action='edit',@course_guid=?,@course_code=?,@course_category=?,@course_level=?,@course_title=?,@course_intro=?,@course_html_content=?,@course_html_footer=?,@course_image=?,@course_video=?,@credit=?,@allow_free_credit=?,@active='1',@created_by=?",
          [
            guid,
            courseCode,
            courseCategory,
            courseLevel,
            courseTitle,
            courseIntro,
            courseHtmlContent,
            courseHtmlFooter,
            courseImage,
            courseVideo,
            credit,
            allowFreeCredit,
            createBy,
          ]
        );

        for (const contentLanguage of contentLanguages) {
          await trx.raw(
            "EXEC sp_course_content_lang_action @action='edit',@course_guid=?,@course_lang=?,@course_title=?,@course_intro=?,@course_html_content=?,@course_html_footer=?,@course_image=?,@course_video=?",
            [
              guid,
              contentLanguage.courseLang,
              contentLanguage.courseTitle,
              contentLanguage.courseIntro,
              contentLanguage.courseHtmlContent,
              contentLanguage.courseHtmlFooter,
              contentLanguage.courseImage,
              contentLanguage.courseVideo,
            ]
          );
        }

        await trx.commit();

        return {};
      } else {
        await trx.commit();

        return {
          error: 'The course does not exist',
        };
      }
    } catch (error) {
      console.log(error);
      if (trx && !trx.isCompleted()) {
        await trx.rollback();
      }
      throw error;
    }
  };

  
  const getAllCourses = async () => {
    const result = await knex.select('*').from('course');
    return result;
  };

  return {
    getCourses,
    getCoursesReviews,
    getCoursesByCategories,

    createCourse,
    getCoursesByUser,
    getCourse,
    getCourseByUser,
    updateCourseByUser,
    getAllCourses,
  };
}
