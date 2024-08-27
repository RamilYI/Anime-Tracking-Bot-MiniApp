import {PageWrapper} from "./Layout.styled.tsx";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <PageWrapper>
            {children}
        </PageWrapper>
    );
};