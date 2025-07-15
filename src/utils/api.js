export const submitCareerForm = async (data) => {
  return new Promise((resolve) => {
    console.log("Simulasi submit data ke backend:");
    console.log(data);
    setTimeout(() => resolve({ status: "success" }), 1000); // delay dummy
  });
};
