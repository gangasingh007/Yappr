import app from "./src";

const PORT : string = process.env.PORT as string || "3000";  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
