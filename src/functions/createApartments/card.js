import React, {useContext, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import { StyledCard, StyleCardContent, StyleCardActions } from "./styledCard";
import {DataContext} from "../../DataContext";



export const CreateApartments = () => {

    const {contract, account} = useContext(DataContext);

    const [owner, setOwner] = useState("");
    const [square, setSquare] = useState("");
    const [squareKitchen, setSquareKitchen] = useState("");

    const use = async () => {
        contract.methods.createApartments(owner,square,squareKitchen).send({from:account});
    }


    return(<>
            <StyledCard>
               <StyleCardContent>
                   <b>Создание квартиры</b>
               </StyleCardContent>

                <TextField label={"Адрес владельца"} onChange={(e) => setOwner(e.target.value)}/>
                <TextField label={"Общая квадратура"} onChange={(e) => setSquare(e.target.value)}/>
                <TextField label={"Квадратура кухни"} onChange={(e) => setSquareKitchen(e.target.value)}/>
                <StyleCardActions>
                    <Button onClick={use}>
                        <b>Создать</b>
                    </Button>
                </StyleCardActions>
            </StyledCard>
        </>
    )
}