import { useEffect } from "react";
import "./App.css";
import { SideMenu, Info } from "./components";
import Plan from "./pages/Plan";
import Addons from "./pages/Addons";
import Finishing from "./pages/Finishing";
import ThankYou from "./pages/ThankYou";
import { useSelector } from "react-redux";

function App() {
  const currentStep = useSelector((state) => state.formData.currentStep);
  function resizeBox() {
    const container = document.querySelector("#container");
    if (window.innerWidth <= 1024) {
      switch (currentStep) {
        case 1:
          container.style.height = "570px";
          break;
        case 2:
          container.style.height = "750px";
          break;
        case 3:
        case 4:
          container.style.height = "585px";
          break;
        case 5:
          container.style.height = "400px";
      }
      return;
    }
    container.removeAttribute("style");
  }

  useEffect(() => resizeBox(), [currentStep]);

  useEffect(() => {
    window.addEventListener("resize", () => resizeBox());
  }, []);
  console.log("testing", currentStep)
  return (
    <>
     
      <div className="top-bar">
        {[1, 2, 3, 4].map((number) => (
          <div
            className="sidebar__element-stage-number"
            data-active={currentStep === number ? "true" : "false"}
            key={number}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="container" id="container">
        <SideMenu />
        <div className="container__form">
        {currentStep === 1 &&
            <Info />
          }
          {currentStep === 2 &&
            <Plan />
          }
          {currentStep === 3 && 
            <Addons />
          }
          {
            currentStep === 4 && 
            <Finishing />
          }
         { currentStep === 5 &&
            <ThankYou />
         }
          {/* <SelectPlan />
                   
                        
                    
                        <Summary />
                   
                        <ThankYou />
                    */}
        </div>
      </div>
      <div className='mobile-bottom-bar'>
        
      </div>
       
    </>
  );
}

export default App;
