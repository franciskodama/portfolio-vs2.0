'use client';

const Button = ({
  text = 'Click',
  align,
  onClick,
  className = 'btn btn--third-color',
}: {
  text?: string;
  align?: string;
  onClick: (e: any) => void;
  className?: string;
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      {...(align ? { style: { alignSelf: align } } : {})}
      type='button'
    >
      {text}
    </button>
  );
};

export default Button;
