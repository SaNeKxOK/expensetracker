import clsx from 'clsx';

const variantClasses = {
  primary: 'btn-primary',
  danger: 'btn-danger',
  ghost: 'btn-ghost',
};

const Button = ({ children, variant = 'primary', className, ...props }) => {
  return (
    <button className={clsx(variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
