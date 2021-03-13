export const type = "flagCategory";

const flagCategorySelected = (bool) => {
  return {
    type,
    payload: bool,
  };
};

export default flagCategorySelected;
