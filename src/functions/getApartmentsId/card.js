import React from "react";
import {Button} from "@material-ui/core";
import { StyledCard, StyleCardContent, StyleCardActions } from "./styledCard";
import {Link} from "react-router-dom";



export const GetApartmentsId = () => {

    return(<>
            <StyledCard>
               <StyleCardContent>
                   <b>Информация о ваших квартирах, сдать квартиру в аренду</b>
               </StyleCardContent>
                <StyleCardActions>
                    <Link to="/GetApartmentsId">
                        <Button>
                            <b>Использовать</b>
                        </Button>
                    </Link>
                </StyleCardActions>
            </StyledCard>
        </>
    )
}