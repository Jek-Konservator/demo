import React, {useContext, useState} from "react";
import {DataContext} from "../../DataContext";
import {TextField} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {Content, Info, StyledInfo} from "./styleInfo";

export const GetApartmentInfo = () => {

    const [id, setId] = useState("");
    const [data, setData] = useState("");
    const [activ, setActiv] = useState("");

    const {contract, account} = useContext(DataContext);

    const use = async () => {
       const data = await contract.methods.getApartment(id).call({from:account});
        setData(data);
        if(data[3] === true){
            setActiv("Да")
        }
        else {
            setActiv("Нет")
        }
    }




    return(
            <StyledInfo>
                <Info>
                    <b>Адрес владельца: {data[0]}</b>
                    <b>Общая квадратура {data[1]}</b>
                    <b>Квадратура кухни: {data[2]}</b>
                    <b>Сдаёться: {activ}</b>
                </Info>
                <Content>
                    <TextField label={"ID квартиры"} onChange={(e) => setId(e.target.value)}/>
                    <Button onClick={use}>Вывести</Button>
                </Content>
            </StyledInfo>
    )

}