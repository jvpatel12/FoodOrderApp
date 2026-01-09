export default function Button({ children, textOnly, className, ...props }) {
  let sCss = textOnly ? "text-button" : "button";

  sCss += " " + className;

  return (
    <>
      <button className={sCss} {...props}>
        {children}
      </button>
    </>
  );
}
