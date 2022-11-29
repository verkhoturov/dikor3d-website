import { Footer, Main, Menu } from "./index";

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Menu />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
