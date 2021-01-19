export const type = "modifyProduct";

const modifyProduct = (amount, index) => {
  return {
    type,
    payload: { amount, index },
  };
};

export default modifyProduct;
