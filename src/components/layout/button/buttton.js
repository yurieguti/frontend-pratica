let Button = ({ children, primary, secundary }) => {
  console.log("primary", primary);
  return (
    <button
      className={
        primary ? "btn btn-primary" : "" && secundary ? "btn btn-primary" : ""
      }
    >
      {children}
    </button>
  );
};

export default Button;
