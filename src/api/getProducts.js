export const getProducts = async () => {
  const url = "https://fakestoreapi.com/products";
  const res = await fetch(url);
  return await res.json();
}