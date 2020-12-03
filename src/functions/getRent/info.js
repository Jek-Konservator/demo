import React, { useContext, useState } from "react";
import { DataContext } from "../../DataContext";
import { Button /*, TextField*/ } from "@material-ui/core";
import { Content, Info, StyledInfo } from "./styleInfo";

export const GetRentInfo = () => {
  const [length, setLength] = useState("");
  const [dataNew, setDataNew] = useState("");

  const [visableNew, setVisableNew] = useState(true);
  const [visablePanel, setVisablePanel] = useState(false);
  const [max, setMax] = useState();

  const { contract, account } = useContext(DataContext);

  const use = async () => {
    const data = await contract.methods.getRent(0).call({ from: account });
    const act = await contract.methods.getTenant(0).call({ from: account });
    setLength(data[0]);
    setVisableNew(false);
    setVisablePanel(true);
    if (act[2] !== false) {
      setDataNew(data);
    } else {
    }
  };

  const func = async (id) => {
    const dataNew = await contract.methods.getRent(id).call({ from: account });
    setDataNew(dataNew);
  };
  const SData = async () => {
    if (max === undefined) {
      if (1 < length) {
        var id = 0;
      }
    } else {
      if (max + 1 <= length - 1) {
        var id = max + 1;
      }
    }
    if (id !== undefined) {
      let act = await contract.methods.getTenant(id).call({ from: account });
      if (act[2] === true) {
        await func(id);
        setMax(id);
      } else {
        for (id; act[2] === false; id) {
          if (id + 1 < length) {
            id++;
            const acs = await contract.methods
              .getTenant(id)
              .call({ from: account });
            act = acs;
            if (act[2] === true) {
              func(id);
              setMax(id);
            }
          }
        }
      }
    }
  };

  const PData = async () => {
    if (max >= 0) {
      if (max - 1 >= 0) {
        let id = max - 1;
        let act = await contract.methods.getTenant(id).call({ from: account });
        if (act[2] === true) {
          await func(id);
          setMax(id);
        } else {
          for (id; act[2] === false; id) {
            if (id - 1 >= 0) {
              id--;
              const acs = await contract.methods
                .getTenant(id)
                .call({ from: account });
              act = acs;
              if (act[2] === true) {
                func(id);
                setMax(id);
              }
            }
            const dataNew = await contract.methods
              .getRent(max)
              .call({ from: account });
            if (dataNew[2] === true) {
              setDataNew(dataNew);
              break;
            }
          }
        }
      }
    }
  };

  const saleRent = async () => {
    contract.methods
      .SaleRent(dataNew[1])
      .send({ from: account, value: dataNew[5] * 1000000000000000000 });
  };

  return (
    <StyledInfo>
      <Info>
        {visablePanel && <b>ID квартиры: {dataNew[1]}</b>}
        {visablePanel && <b>Адрес владельца: {dataNew[2]}</b>}
        {visablePanel && <b>Общая квадратура {dataNew[3]}</b>}
        {visablePanel && <b>Квадратура кухни: {dataNew[4]}</b>}
        {visablePanel && <b>Цена: {dataNew[5]}</b>}
        {visablePanel && <b>Срок сдачи: {dataNew[6]}</b>}
        {visablePanel && (
          <Button onClick={saleRent}>Снять квартиру в аренду</Button>
        )}
      </Info>
      <Content>
        {visableNew && <Button onClick={use}>Вывести</Button>}
        {visablePanel && <Button onClick={PData}>Предидущая</Button>}
        {visablePanel && <Button onClick={SData}>Следующая</Button>}
      </Content>
    </StyledInfo>
  );
};
