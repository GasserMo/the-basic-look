/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function Title({ children, type }) {
  const styles = {
    bold: "font-bold text-black mt-5 mb-5",
    thin: " font-thin text-3xl my-8",
  };

  return <p className={styles[type]}>{children}</p>;
}

export default Title;
