import "./style.css";

interface FloatingButtonProps {
    onClick?: () => void;
    isClose?: boolean;
    style?: React.CSSProperties;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, isClose, style }) => {
    return (
        <div className="floating-button_container" style={style}>
            <button className="floating-button_icon-container" onClick={onClick}>
                <div className={`floating-button_icon  ${!isClose && "floating - button_hide"}`}>
                    {isClose ? (
                        <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 21.32L21 3.32001"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            ></path>
                            <path
                                d="M3 3.32001L21 21.32"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            ></path>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 6H20M4 12H20M4 18H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    )}
                </div>
            </button>
        </div>
    );
};

export default FloatingButton;
