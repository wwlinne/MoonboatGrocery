import { NavLink } from 'react-router-dom';
import {Button, Drawer} from 'antd';
import React, {useState} from 'react';
import {
    MailOutlined,
   MobileOutlined,
   LinkedinOutlined,
   GithubOutlined,
   YoutubeOutlined,
   UserOutlined,
   MenuOutlined,
   ShoppingCartOutlined
} from '@ant-design/icons';

function AppHeader(){
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    
    
    return(
        <div className="container">
            <div className = "topBar">
                <div className="contactInfo">
                    <ul>
                        <li><a href="tel:613-255-6767"><span><MobileOutlined />613-255-6767</span></a></li>
                        <li><a href="mailto:wgh09@outlook.com"><span><MailOutlined />wgh09@outlook.com</span></a></li>
                    </ul>
                </div>
            <div className='otherInfo'>
                <ul className='socialMedia'>
                        <li><a href="https://www.linkedin.com/in/guohui-wan-6b4828252/"><span><LinkedinOutlined />LinkedIn</span></a></li>
                        <li><a href="https://github.com/wwlinne"><span><GithubOutlined />GitHub</span></a></li>
                        <li><a href="https://www.youtube.com/channel/UCIX0TE5zj0-UomeGysK95sA"><span><YoutubeOutlined />YouTube</span></a></li>
                        <li><NavLink to='/pages/account'><span><UserOutlined />Admin</span></NavLink></li>

                </ul>
            </div>
            </div>
            <div className='header separator'>
                <div className='logo'>MoonBoat Grocery</div>
                <div className='mobileVisible'>
                <Button type="primary" onClick={showDrawer}>
                    <MenuOutlined />
                </Button>
                <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                    <nav >
                        <ul>
                            <li><NavLink onClick={onClose} to='/'>Home</NavLink></li>
                            <li><NavLink onClick={onClose} to='/pages/about'>About</NavLink></li>
                            <li><NavLink onClick={onClose} to='/pages/shop'>Shop</NavLink></li>
                            <li><NavLink onClick={onClose} to='/pages/faq'>FAQ</NavLink></li>
                            <li><NavLink onClick={onClose} to='/pages/contact'>Contact</NavLink></li>
                            <li><NavLink onClick={onClose} to='../components/backend/shopping_cart'><span><ShoppingCartOutlined /></span></NavLink></li>
                        </ul>
                    </nav>
                </Drawer>
                </div>
                <nav className='mobileHidden'>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/pages/about'>About</NavLink></li>
                        <li><NavLink to='/pages/shop'>Shop</NavLink></li>
                        <li><NavLink to='/pages/faq'>FAQ</NavLink></li>
                        <li><NavLink to='/pages/contact'>Contact</NavLink></li>
                        <li><NavLink to='../components/backend/shopping_cart'><span><ShoppingCartOutlined /></span></NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
export default AppHeader;