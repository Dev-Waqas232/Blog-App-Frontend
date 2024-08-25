import React from "react";
import { formatDistanceToNow } from "date-fns";

interface TimeAgoProps {
  date: Date | string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  return (
    <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
  );
};

export default TimeAgo;
