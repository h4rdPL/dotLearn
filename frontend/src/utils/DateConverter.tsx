export const dateConverter = (dateString: string) => {
  const originalDate = new Date(dateString);
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Dodaj zero przed jednocyfrowymi miesiącami
  const day = originalDate.getDate().toString().padStart(2, "0"); // Dodaj zero przed jednocyfrowymi dniami
  const hours = originalDate.getHours().toString().padStart(2, "0"); // Dodaj zero przed jednocyfrowymi godzinami
  const minutes = originalDate.getMinutes().toString().padStart(2, "0"); // Dodaj zero przed jednocyfrowymi minutami

  const formattedDate = `${year}-${month}-${day} | ${hours}:${minutes}`;
  return formattedDate;
};
