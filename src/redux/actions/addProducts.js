export const type = "addProducts";

const addProducts = (product) => {
  return {
    type,
    payload: product,
  };
};

export default addProducts;
