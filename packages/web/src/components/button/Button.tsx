import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  size?: 'icon' | 'small' | 'medium' | 'large';
  colour?: string;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  className,
  size = 'medium',
  colour = 'primary',
  disabled = false,
}: ButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[size]} ${styles[colour]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
