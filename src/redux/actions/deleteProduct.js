export const type = "deleteProduct";

const deleteProduct = (product) => {
  return {
    type,
    payload: product,
  };
};

export default deleteProduct;
