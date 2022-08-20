export const getProducts = async () => {
  const url = "https://api.escuelajs.co/api/v1/products";
  const res = await fetch(url);
  return await res.json();
}