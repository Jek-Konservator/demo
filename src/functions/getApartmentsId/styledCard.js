import styled from "styled-components"
import {CardActions,Card, CardContent} from "@material-ui/core";


export const StyledCard = styled(Card)`
width: 250px;
height: 300px;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 5px;
margin-left: 10px;
`

export const StyleCardContent = styled(CardContent)`
color: #000000;
font-size: 20px;
display: flex;
justify-content: center;
`
export const StyleCardActions = styled(CardActions)`
display: flex;
justify-content: center;

    Button{
    width: 150px;
    height: 35px;
    background-color: aliceblue;
    color: #6d6d6d;
    border: solid 3px #2e2e2e;
    }
`
