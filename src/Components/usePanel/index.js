import React from "react";
import {CreateApartments} from "../../functions/createApartments/card";
import {StylePanel} from "./style";
import {GetApartment} from "../../functions/getApartment/card";
import {GetApartmentsId} from "../../functions/getApartmentsId/card";
import {GetRent} from "../../functions/getRent/card";

export const UsePanelUser = () => {

    return(
        <StylePanel>
            <CreateApartments/>
            <GetApartment/>
            <GetApartmentsId/>
            <GetRent/>
        </StylePanel>
    )
}