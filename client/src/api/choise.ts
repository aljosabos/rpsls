export const getChoices = async () => {
  try {
    const response = await fetch("/api/choices", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
