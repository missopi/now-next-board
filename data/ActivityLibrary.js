// Static list of available activity cards
// Each activity includes id, name, and image
// Used by Library screen flatlist to render selectable cards

import Monday from "../assets/days-of-the-week/monday.svg";
import Tuesday from "../assets/days-of-the-week/tuesday.svg";
import Wednesday from "../assets/days-of-the-week/wednesday.svg";
import Thursday from "../assets/days-of-the-week/thursday.svg";
import Saturday from "../assets/days-of-the-week/saturday.svg";

export const activityLibrary = [
  {
    id: '1',
    name: 'Monday',
    image: Monday,
    category: 'Schedules',
  },
  {
    id: '2',
    name: 'Tuesday',
    image: Tuesday,
    category: 'Schedules',
  },
  {
    id: '3',
    name: 'Wednesday',
    image: Wednesday,
    category: 'Schedules',
  },
  {
    id: '4',
    name: 'Thursday',
    image: Thursday,
    category: 'Schedules',
  },
  {
    id: '5',
    name: 'Saturday',
    image: Saturday,
    category: 'Schedules',
  },
]