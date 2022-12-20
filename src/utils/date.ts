// type Date =
//   `${number}${number}${number}${number}-${number}${number}-${number}${number}T${number}${number}:${number}${number}`; // regex를 이용한 변경 필요
type Date = string;

export const isRightDate = (date: string): date is Date => {
  const dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;
  return dateRegex.test(date);
};

export const getCurrentDate = (): Date => {
  const today = new Date();
  const padTwo = (num: number): string => num.toString().padStart(2, '0');

  const date = `${today.getFullYear()}-${padTwo(today.getMonth() + 1)}-${padTwo(
    today.getDate()
  )}T${padTwo(today.getHours())}:${padTwo(today.getMinutes())}`;

  if (!isRightDate(date))
    throw new Error('getCurrentDate 함수가 올바르게 동작하지 않습니다');
  return date;
};
