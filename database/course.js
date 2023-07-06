import _mock from './mock/_mock';

export default function (mysqlPool) {
  
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
      videoPath: 'https://www.dropbox.com/s/zqzskvpthmbbbr0/zone_video_01.mp4?dl=0'
    }));
  }
  
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
  }
  
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
  }

  return {
    getCourses,
    getCoursesReviews, 
    getCoursesByCategories
  }
};