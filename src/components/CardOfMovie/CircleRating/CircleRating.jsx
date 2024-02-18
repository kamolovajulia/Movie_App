import React from 'react';

import { Avatar } from 'antd';

import style from './CircleRating.module.css';

function CircleRating({ voted }) {
  const borderColorAvatar = (voted) => {
    if (voted <= 3) {
      return '#E90000';
    }
    if (voted <= 5) {
      return '#E97E00';
    }
    if (voted <= 7) {
      return '#E9D100';
    }
    if (voted > 7) {
      return '#66E900';
    }
  };

  return (
    <Avatar className={style.ratingCircle} style={{ borderColor: `${borderColorAvatar(voted)}` }} size="30px 30px">
      <p className={style.ratingGrade}>{voted.toFixed(1)}</p>
    </Avatar>
  );
}

export default CircleRating;
