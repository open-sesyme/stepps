export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const weeksAgo = Math.floor(daysAgo / 7);
    const monthsAgo = Math.floor(daysAgo / 30);
  
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (minutesAgo < 60) return `${minutesAgo}m ago`;
    if (hoursAgo < 24) return `${hoursAgo}h ago`;
    if (daysAgo === 1) return `Yesterday`;
    if (daysAgo < 7) return `${daysAgo}d ago`;
    if (weeksAgo < 4) return `${weeksAgo}w ago`;
    if (monthsAgo < 12) return `${monthsAgo}M ago`;
  
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
};