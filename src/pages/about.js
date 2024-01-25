import aboutBanner from '../assets/images/aboutBanner.jpg'
import { Tabs } from 'antd';

function AppAbout(){
    return(
        <div className="block aboutPage">
            <div className="container">
                <h2>About</h2>
                <div className="bannerImage">
                <img src={aboutBanner} alt='banner'/>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                    {
                        label: 'About',
                        key: '1',
                        children: 'Welcome to Linlin\'s MoonBoat Grocery website, your one-stop destination for fresh and quality groceries.\nAt here, we are passionate about providing you with a diverse selection of handpicked fruits, succulent seafood, vibrant vegetables, and much more.Our commitment to quality extends from farm to table, ensuring that you receive only the freshest and finest products.\nExplore a world of culinary possibilities with us and experience the joy of wholesome, flavorful ingredients delivered right to your doorstep.',
                    },
                    {
                        label: 'Investors',
                        key: '2',
                        children: 'Invest in the future of convenience and quality with [Your Grocery Website]. As a leading player in the online grocery industry, we are dedicated to expanding our reach and enhancing the customer experience. We invite strategic investors who share our vision of redefining the grocery shopping landscape. By investing in LinLin\'s MoonBoat Grocery, you become a part of a forward-thinking company committed to innovation, sustainability, and delivering exceptional value to our customers. Join us on this exciting journey as we continue to grow and shape the future of online grocery retail.',
                    },
                    {
                        label: 'Careers',
                        key: '3',
                        children: 'Join the LinLin\'s MoonBoat family and embark on a rewarding career journey! We believe in fostering a dynamic and inclusive work environment where passion meets purpose. As a growing company, we are always on the lookout for dedicated individuals who share our enthusiasm for quality and customer satisfaction. Whether you\'re a seasoned professional or just starting your career, we offers a range of opportunities to learn, grow, and contribute to our shared success. Explore our current openings and discover how you can be a part of shaping the future of online grocery shopping.'
                    },
                    ]}
  />
            </div>
        </div>
    )
}
export default AppAbout;