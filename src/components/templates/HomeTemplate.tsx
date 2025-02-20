import Header from "../organisms/Header";

interface Props {
    children?: React.ReactNode;
  }

const HomeTemplate: React.FC<Props> = ({children}) => {
    return (
        <main className="w-dvw h-dvh">
            <Header />
            <div className="flex items-center justify-center h-[90%]">
                {children}
            </div>
        </main>
    );
}

export default HomeTemplate;