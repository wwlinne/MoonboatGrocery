import { Layout} from 'antd';import './App.css';
import{ Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import AppHeader from './components/common/header';
import AppHome from './pages/home';
import AppAbout from './pages/about';
import AppShop from './pages/shop';
import AppFaq from './pages/faq';
import AppContact from './pages/contact';
import FooterWidgt from './components/common/footerWidget';
import FooterCopyright from './components/common/footerCopyright';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
 <Layout >
      <Router>
      <Header >
        <AppHeader/>
      </Header>
      <Content >
       <Routes>
        <Route path='/' element = {<AppHome />} />
        <Route path='/pages/about' element = {<AppAbout />} />
        <Route path='/pages/shop' element = {<AppShop />} />
        <Route path='/pages/faq' element = {<AppFaq />} />
        <Route path='/pages/contact' element = {<AppContact />} />
       </Routes>
        </Content>
      </Router>
      <Footer >
        <FooterWidgt />
        <FooterCopyright />
      </Footer>
    </Layout>
    </div>
  );
}

export default App;
