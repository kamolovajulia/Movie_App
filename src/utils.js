import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

export const getFormattedOverview = (overview) => {
  let text = [...overview];
  if (text.length > 210) {
    text = text.slice(0, 210).join('').split(' ');
    text.pop();
    text.push('...');
    return text.join(' ');
  }
  return text;
};

export const getFormattedReleaseDate = (date) => {
  if (date) {
    const newDate = date.replace(/-/g, ', ');
    return format(new Date(newDate), 'MMMM dd, yyyy', { locale: enGB }).toString();
  }
  return '';
};

export const getFormattedTitle = (title) => {
  if (title.length > 21) {
    const newTitle = title.slice(0, 20).split(' ');
    newTitle.pop();
    newTitle.push('...');
    return newTitle.join(' ');
  }
  return title;
};
