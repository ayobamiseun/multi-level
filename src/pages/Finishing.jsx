import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Finishing.css';
import TextBuilder from './TextBuilder.js';
import { setCurrentStep } from "../components/redux/formSlice.js";

const Finishing = () => {

    const data = useSelector((state) => state.formData.data);
    const isAnyAddonSelected = data.addons.onlineService || data.addons.largerStorage
        || data.addons.customizableProfile;

    const dispatch = useDispatch();

    const text = TextBuilder();

    const getButtonsMargin = () => {
        let margin = 55;
        if(data.addons.onlineService) margin -= 45;
        if(data.addons.largerStorage) margin -= 90;
        if(data.addons.customizableProfile) margin = 15;
        return `${margin}px`;
    }

    const goBack = () => dispatch(setCurrentStep(3));

    function handleSubmit() {
        dispatch(setCurrentStep(5));
    }

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.finishing').classList.add('slide-from-top')
        }, 100);
    }, []);

    return (<>
        <div className='finishing'>
            <div className='stage-heading'>
                <h1>Finishing up</h1>
                <p>Double-check everything looks OK before confirming.</p>
            </div>
            <div className='finishing__elements'>
                <div className='finishing__elements__planinfo'>
                    <div style={{display: "flex"}}>
                        <h2>{text.plan}</h2>
                        <h3 style={{marginLeft:"auto"}}>{text.cost}</h3>
                          </div>
                          <div><span onClick={() => dispatch(setCurrentStep(2))}>Change</span>
                  </div>
                   
                </div>
                { isAnyAddonSelected && (
                    <>
                        <div className='horizontal-line'/>
                        <div className='finishing__elements__addons'>
                            {data.addons.onlineService && (
                                <div className='finishing__elements__addons-addon'>
                                <div style={{display:"flex"}}>
                                <p >Online service</p>
                                    <span style={{marginLeft:"auto"}}>{text.addonsCost.onlineService}</span>
                                
                                </div>
                                   </div>
                            )}
                            {data.addons.largerStorage && (
                                <div className='finishing__elements__addons-addon'>
                                <div style={{display:"flex"}}>
                                    <p>Larger storage</p>
                                    <span style={{marginLeft:"auto"}} >{text.addonsCost.largerStorageCost}</span>
                                    </div>
                                </div>
                            )}
                            {data.addons.customizableProfile && (
                                <div className='finishing__elements__addons-addon'>
                                <div style={{display:"flex"}}>
                                    <p>Customizable profile</p>
                                    <span  style={{marginLeft:"auto"}} >{text.addonsCost.customizableProfileCost}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div  style={{ marginTop:"50px"}}className='finishing__total'>
            <div style={{display:"flex"}}>

          
                <h4>Total { data.isYearlyRenewed ? '(per year)' : '(per month)' }</h4>
                <h5 style={{marginLeft:"auto", color:"blue",fontWeight:"900"}}>+{text.totalCost}</h5>
                </div>
            </div>
            <div
                className='plan-buttons'
                style={{
                    marginTop: getButtonsMargin()
                }}
            >
                <button
                    type='button'
                    className='button-back'
                    onClick={goBack}
                >Go Back</button>
                <button
                    type='button'
                    className='button-next'
                    onClick={handleSubmit}
                >Confirm</button>
            </div>
        </div>
        <div className='mobile-bottom-bar'>
        
        <button onSubmit={handleSubmit} type='button' className='button-back' onClick={goBack}>Go Back</button>
                    <button onSubmit={handleSubmit} type='submit' className='button-next' onClick={handleSubmit}>Confirm</button>
            
        
             
        </div>
    </>);
};

export default Finishing;