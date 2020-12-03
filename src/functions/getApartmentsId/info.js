import React, { useContext, useState } from "react";
import { DataContext } from "../../DataContext";
import { Button, TextField } from "@material-ui/core";
import { Content, Info, StyledInfo } from "./styleInfo";

export const GetApartmentsIdInfo = () => {
  const [length, setLength] = useState("");
  const [data, setData] = useState("");
  const [dataNew, setDataNew] = useState("");
  const [index, setIndex] = useState(0);
  const [prise, setPrise] = useState(false);
  const [time, setTime] = useState(false);
  const [activ, setActiv] = useState("");
  const [rendOwnerID, setRendOwnerID] = useState(0);
  const [GetBlockTimestamp, setGetBlockTimestamp] = useState("");

  const [visableNew, setVisableNew] = useState(true);
  const [visablePanel, setVisablePanel] = useState(false);
  const [visableNewRent, setVisableNewRent] = useState(false);
  const [visableRent, setVisableRent] = useState(false);
  const [visableOwnerRend, setVisableOwnerRend] = useState(false);
  const [visableFinal, setVisableFinal] = useState(false);
  const [сansleRent, setCansleRent] = useState(false);

  const { contract, account } = useContext(DataContext);

  const func = async (id, DataNew, datas) => {
    setVisableRent(false);

    setVisableOwnerRend(false);

    setVisableFinal(false);

    setVisableNewRent(false);
    setCansleRent(false);

    if (DataNew[3] === true) {
      setActiv("Да");

      const rendOwner = await contract.methods
        .idRent(datas[id])
        .call({ from: account });
      const data1 = await contract.methods
        .getTenant(rendOwner)
        .call({ from: account });
      setRendOwnerID(data1);

      if (data1[0] !== "0x0000000000000000000000000000000000000000") {
        setVisableOwnerRend(true);
      }else{
        setCansleRent(true)
      }
    } else {
      if (DataNew[4] === true) {
        const rendOwner = await contract.methods
          .idRent(datas[id])
          .call({ from: account });
        const data1 = await contract.methods
          .getTenant(rendOwner)
          .call({ from: account });
        setRendOwnerID(data1);

        setVisableFinal(true);

        const GetBlockTimestamp = await contract.methods
          .getBlockTimestamp()
          .call({ call: account });
        setGetBlockTimestamp(GetBlockTimestamp);
        setActiv("Сдана в аренду");
      } else {
        setActiv("Нет");
        setVisableRent(true);
      }
    }
  };

  const use = async () => {
    const data1 = await contract.methods
      .getApartmentsId()
      .call({ from: account });
    const length = data1.length;
    setData(data1);
    setLength(length);

    const DataNew = await contract.methods
      .getApartment(data1[0])
      .call({ from: account });
    setDataNew(DataNew);

    setVisableNew(!visableNew);
    setVisablePanel(!visablePanel);
    setVisableRent(!visableRent);
    func(0, DataNew, data1);
  };

  const SData = async () => {
    let id = index + 1;
    if (id < length) {
      const DataNew = await contract.methods
        .getApartment(data[id])
        .call({ from: account });
      setDataNew(DataNew);
      setIndex(id);
      func(id, DataNew, data);
    }
  };

  const PData = async () => {
    let id = index - 1;
    if (id >= 0) {
      const DataNew = await contract.methods
        .getApartment(data[id])
        .call({ from: account });
      setDataNew(DataNew);
      setIndex(id);
      func(id, DataNew, data);
    }
  };

  const CreateRent = async () => {
    contract.methods
      .createRent(data[index], prise, time)
      .send({ from: account });
  };

  const NewRent = async () => {
    setVisableNewRent(!visableNewRent);
    setVisableRent(!visableRent);
  };

  const FinalRent = async () => {
    contract.methods.finishedRent(data[index]).send({ from: account });
    setVisableRent(false);
    setVisableFinal(true);
  };
  const CansleRent = async () => {
    contract.methods.cansleRent(data[index]).send({ from: account });
  };


  return (
    <StyledInfo>
      <Info>
        <b>ID квартиры: {data[index]}</b>
        <b>Адрес владельца: {dataNew[0]}</b>
        <b>Общая квадратура {dataNew[1]}</b>
        <b>Квадратура кухни: {dataNew[2]}</b>
        <b>Сдаёться: {activ}</b>

        {visableOwnerRend && <b>Адрес арендующего: {rendOwnerID[0]}</b>}
        {visableFinal && <b>Адрес арендующего: {rendOwnerID[0]}</b>}
        {visableFinal && (
          <b>Осталось дней: {(rendOwnerID[1] - GetBlockTimestamp) / 86400}</b>
        )}
        {visableRent && (
          <Button onClick={NewRent}>Сдать квартиру в аренду</Button>
        )}
        {visableOwnerRend && (
          <Button onClick={FinalRent}>Подтвердить сдачу квартиры</Button>
        )}
        {сansleRent && (
          <Button onClick={CansleRent}>Отменить предложение об аренде</Button>
        )}

        {visableNewRent && (
          <TextField
            label={"Цена"}
            onChange={(e) => setPrise(e.target.value)}
          />
        )}
        {visableNewRent && (
          <TextField label={"Срок"} onChange={(e) => setTime(e.target.value)} />
        )}
        {visableNewRent && (
          <Button onClick={CreateRent}>Сдать квартиру в аренду</Button>
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
