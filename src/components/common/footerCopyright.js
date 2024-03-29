import { FloatButton } from 'antd';
import payment from '../../assets/images/payment.png';

function FooterCopyright(){
    return(
        <div className="footerCopyright">
            <div className="container">
                <div className="copyright">@2024 Grocery Created by LinLin</div>
                <div className="toTop">
                    <img src={payment} alt="payment" />
                </div>
            </div>
        <FloatButton.BackTop></FloatButton.BackTop>
        </div>
    )
}
export default FooterCopyright;