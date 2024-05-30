import { FC } from 'react';
interface ButtonType {
    title?: JSX.Element;
    width?: string;
    height?: number;
    borderRadius?: number;
    bgColor?: string;
    color?: string;
    fontSize?: number;
    onClick: () => void;
}

const Button: FC<ButtonType> = props => {
    return (
        <button
            style={{
                width: props.width,
                height: props.height,
                borderRadius: props.borderRadius,
                fontSize: props.fontSize,
                color: props.color,
                background: props.bgColor,
            }}
            onClick={() => props.onClick()}
            className='transition-all flex justify-center items-center'
        >
            {props.title}
        </button>
    );
};
export default Button;
