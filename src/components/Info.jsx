import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Info.css';
// import '../form-elements.scss';
import { setCurrentStep, updateData } from './redux/formSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const mobileButtonStyle = {
    
    '@media only screen and (max-width: 600px)': {
      display: 'none'
    }
  };
const Info = () => {

    const currentData = useSelector((state) => state.formData.data);
    const dispatch = useDispatch();

    const phoneRegex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

    const formik = useFormik({
        initialValues: {
            name: currentData.name,
            email: currentData.email,
            phone: currentData.phone,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required.').max(50, 'Name must be 50 characters or less.'),
            email: Yup.string().email('Invalid email address.').required('Email address is required.'),
            phone: Yup.string().matches(phoneRegex, 'Invalid phone number.').required('Phone number is required.'),
        }),
        onSubmit: (values) => {
            dispatch(updateData({
                ...currentData,
                name: values.name,
                email: values.email,
                phone: values.phone,
            }));
            dispatch(setCurrentStep(2));
        }
    });

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.selectplan').classList.add('slide-from-top')
        }, 100);
    }, []);
    const button = document.querySelector("#button")
  
    return (
        <>
            <div className='yourinfo slide-from-top'>
                <div className='stage-heading'>
                    <h1>Personal info</h1>
                    <p>Please provide your name, email address, and phone number.</p>
                </div>
                <form onSubmit={formik.handleSubmit} className='yourinfo__form'>
                    <div className='yourinfo__form__element'>
                        <div className='yourinfo__form__element__labels'>
                            <label htmlFor='name'>Name</label>
                            <span>{formik.errors.name && formik.touched.name ? formik.errors.name : ''}</span>
                        </div>
                        <input
                            type='text'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            placeholder='Stephen King'
                            data-error={formik.errors.name && formik.touched.name ? 'true' : 'false'}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='yourinfo__form__element'>
                        <div className='yourinfo__form__element__labels'>
                            <label htmlFor="email">Email Address</label>
                            <span>{formik.errors.email && formik.touched.email ? formik.errors.email : ''}</span>
                        </div>
                        <input
                            type='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder='e.g. stephenking@lorem.com'
                            data-error={formik.errors.email && formik.touched.email ? 'true' : 'false'}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    
                    <div className='yourinfo__form__element'>
                        <div className='yourinfo__form__element__labels'>
                            <label htmlFor="phone">Phone Number</label>
                            <span>{formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}</span>
                        </div>
                        <input
                            type='text'
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            placeholder='e.g. +1 234 567 890'
                            data-error={formik.errors.phone && formik.touched.phone ? 'true' : 'false'}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    
                    <button   id='button' type='submit' className='button-next'>Next Step</button>
                </form>
            </div>
            <div className='mobile-bottom-bar'>

            <button style={mobileButtonStyle}  onClick={formik.handleSubmit}  type='submit' id="Infonext" className='infonext'>Next Step</button>
               
        </div>
        </>
    );
};

export default Info;