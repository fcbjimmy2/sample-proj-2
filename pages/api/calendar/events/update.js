import { add, set, sub } from 'date-fns';
import value from '../../../../src/scss/_themes-vars.module.scss';
import _ from 'lodash';

let events = [
  {
    id: '5e8882f1f0c9216397e05a9b',
    course: 'Scrum Planning',
    start: sub(new Date(), { days: 12, hours: 0, minutes: 45 }),
    end: sub(new Date(), { days: 12, hours: 0, minutes: 30 }),
    teacher: 'Wong King Lai',
  },
  {
    id: '5e8882fcd525e076b3c1542c',
    start: sub(new Date(), { days: 8, hours: 0, minutes: 45 }),
    end: sub(new Date(), { days: 8, hours: 0, minutes: 30 }),
    course: 'Conference Call',
    teacher: 'Mary Johnson',
  },
  {
    id: '5e8882e440f6322fa399eeb8',
    start: sub(new Date(), { days: 6, hours: 6, minutes: 30 }),
    end: sub(new Date(), { days: 7, hours: 4, minutes: 30 }),
    course: 'New Contract Briefing',
    teacher: 'John Smith',
  },
  {
    id: '5e88830672d089c53c46ece3',
    start: set(new Date(), { hours: 10, minutes: 30 }),
    end: set(new Date(), { hours: 13, minutes: 30 }),
    course: 'Lunch Break',
    teacher: 'Susan Lee',
  },
  {
    id: '5e888302e62149e4b49aa609',
    start: add(new Date(), { days: 2, hours: 3, minutes: 30 }),
    end: add(new Date(), { days: 2, hours: 3, minutes: 20 }),
    course: 'Project Discussion',
    teacher: 'Wong King Lai',
  },
  {
    id: '5e888302e62149e4b49aa709',
    start: add(new Date(), { days: 2, hours: 2, minutes: 30 }),
    end: add(new Date(), { days: 2, hours: 3, minutes: 30 }),
    course: 'Birthday Celebration',
    teacher: 'Maria Garcia',
  },
  {
    id: '5e8882f1f0c9216396e05a9b',
    start: add(new Date(), { days: 2, hours: 3, minutes: 30 }),
    end: add(new Date(), { days: 2, hours: 4, minutes: 30 }),
    course: 'Scrum Meeting',
    teacher: 'Wong King Lai',
  },
  {
    id: '5e888302e62149e4b49aa610',
    start: add(new Date(), { days: 2, hours: 3, minutes: 45 }),
    end: add(new Date(), { days: 2, hours: 4, minutes: 50 }),
    course: 'Dinner Party',
    teacher: 'Paul Davis',
  },
  {
    id: '5e8882eb5f8ec686220ff131',
    start: add(new Date(), { days: 5, hours: 0, minutes: 0 }),
    end: add(new Date(), { days: 8, hours: 1, minutes: 0 }),
    course: '國畫班',
    teacher: 'Lai Chi Ying',
  },
  {
    id: '5e8882eb5f8ec686220ff131',
    teacher: 'Chris Lee',
    course: 'Effective Communication',
    start: add(new Date(), { days: 5, hours: 0, minutes: 0 }),
    end: add(new Date(), { days: 8, hours: 1, minutes: 0 }),
  },
  {
    id: '5e888302e62349e4b49aa609',
    course: 'Culinary Arts',
    start: add(new Date(), { days: 6, hours: 0, minutes: 15 }),
    end: add(new Date(), { days: 6, hours: 0, minutes: 20 }),
    teacher: 'Emily Yip',
  },
  {
    id: '5e888302e62149e4b49ab609',
    course: 'Project Management',
    start: add(new Date(), { days: 12, hours: 3, minutes: 45 }),
    end: add(new Date(), { days: 12, hours: 4, minutes: 50 }),
    teacher: 'Samantha Tan',
  },
];

export default function handler(req, res) {
  const { eventId, update } = req.body;

  events = _.map(events, (_event) => {
    if (_event.id === eventId) {
      _.assign(_event, { ...update });
    }

    return _event;
  });
  return res.status(200).json({ events });
}
