import React, {useContext, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import { StyledCard, StyleCardContent, StyleCardActions } from "./styledCard";
import {DataContext} from "../../DataContext";
import {Link} from "react-router-dom";



export const GetApartment = () => {

    return(<>
            <StyledCard>
               <StyleCardContent>
                   <b>Информация о квартире</b>
               </StyleCardContent>
                <StyleCardActions>
                    <Link to="/GetApartment">
                        <Button>
                            <b>Использовать</b>
                        </Button>
                    </Link>
                </StyleCardActions>
            </StyledCard>
        </>
    )
}