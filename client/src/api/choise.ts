export const getChoices = async () => {
  try {
    const response = await fetch("/api/choices", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
  }
};
