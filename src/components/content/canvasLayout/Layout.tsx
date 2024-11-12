import {ReactNode} from "react";

interface CanvasLayoutProps {
    children: ReactNode;
}

const CanvasLayout = ({children} :CanvasLayoutProps) => {
    return (
        <>
            {children}
        </>
    );
};

export default CanvasLayout;