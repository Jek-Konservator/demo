import React, {useContext} from "react"
import {HeaderStyle} from "./style";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core"
import {DataContext} from "../../DataContext";

export const Header = () => {

    const {account, getUsersRole} = useContext(DataContext);



    return(
        <HeaderStyle>
            <div>
            <div>Hello world</div>
                {account}
                <div>
                <Link to = "/user">
                    <Button onClick={getUsersRole}>Функции</Button>
                </Link>
                </div>
            </div>
        </HeaderStyle>
    )
}