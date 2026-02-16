import Header from "../components/Header/Header";

const HomePage = () => {
    return (
        <>
            <Header 
            isAuthenticated={true}
            userType={'visiteur'}
            userName={''}
            notifications={99}
            />
        </>
    );
};

export default HomePage;