import React from 'react';

import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";


import "./checkoutsteps.css";

export const CheckoutSteps = ({activeStep}) => {

    const steps=[
        {
            label: <Typography>
                Shipping Details
            </Typography>,
            icon:<LocalShippingIcon/>

        },
        {
            label: <Typography>
                Confirm Order
            </Typography>,
            icon:<LibraryAddCheckIcon/>

        },
        {
            label: <Typography>
                Payment

            </Typography>,
            icon:<AccountBalanceIcon/>

        },

    ];

    const stepStyle = {
        boxSizing:"border-box",
    };

  return (
    <>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
            {
                steps.map((item,idx)=>(
                    <Step
                    key={idx}
                    active= {activeStep===idx ?true:false}
                    completed ={activeStep >=idx ?true:false
                    }
                    >
                    <StepLabel
                    icon={item.icon}
                    style={{
                        color:activeStep>=idx ?"tomato" :"rgba(0,0,0,0.65)",
                    }}
                    >
                        {item.label}
                    </StepLabel>

                    </Step>
                ))
            }
        </Stepper>
    </>
  )
}
