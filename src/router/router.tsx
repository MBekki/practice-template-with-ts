import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Shopping from '../pages/Shopping';
import { Navbar } from '../components';

const Root = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/shopping' element={<Shopping />} />
            </Routes>
        </>
    );
};
export default Root;
