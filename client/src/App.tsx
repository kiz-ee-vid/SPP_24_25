import React from 'react';
import {Container} from "react-bootstrap";
import RootNavigator from "./pages/RootNavigator";

const App: React.FC = () => {
    return (
        <Container className="min-vh-100 min-vw-100 bg-primary">
            <RootNavigator/>
        </Container>
    )
}

export default App;
