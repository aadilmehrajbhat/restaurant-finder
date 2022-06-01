export const formatReviewDate = (dateStr: Date) => {
  const date = new Date(dateStr);

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
