import { ReactNode } from "react";
import {HomeBannerComponent} from "../../components/banner";
import { HeaderComponent } from "../../components/common";
import FooterComponent from "../../components/common/footer";
const LandingPage = (): ReactNode => {

    return (
      <>
<HeaderComponent/>
<HomeBannerComponent/>
 <FooterComponent/>  
      </>

    )}
    export default LandingPage