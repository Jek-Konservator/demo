import React from "react";
import {Button} from "@material-ui/core";
import { StyledCard, StyleCardContent, StyleCardActions } from "./styledCard";
import {Link} from "react-router-dom";



export const GetRent = () => {

    return(<>
            <StyledCard>
               <StyleCardContent>
                   <b>Предложения аренды квартиры</b>
               </StyleCardContent>
                <StyleCardActions>
                    <Link to="/GetRent">
                        <Button>
                            <b>Использовать</b>
                        </Button>
                    </Link>
                </StyleCardActions>
            </StyledCard>
        </>
    )
}