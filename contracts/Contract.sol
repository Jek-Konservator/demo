pragma solidity 0.5.16;

contract Alex {

    struct apartment {
        uint id;
        address owner;
        uint square;
        uint squareKitchen;
        bool rent;
        bool fin;
    }

    struct rent {
        uint idApartment;
        address payable owner;
        address tenant;
        uint prise;
        bool activ;
        bool finished;
        uint time;
        uint deadLine;
    }

    address defaultAddress = 0x0000000000000000000000000000000000000000;
    address admin = msg.sender;

    apartment[] Apartment;
    rent[] Rent;

    mapping (address => uint) userRole;
    mapping (address => uint[]) userapArtments;
    mapping (uint => uint) public idRent;

    constructor() public {
        userRole[msg.sender] = 1;
        userRole[0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2] = 1;
        userRole[0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db] = 1;
        userRole[0xe6eE81433d9a0B800b03e89164d08871F889b10D] = 1;

        userapArtments[0x617F2E2fD72FD9D5503197092aC168c91465E7f2].push(Apartment.length);
        Apartment.push(apartment(Apartment.length, 0x617F2E2fD72FD9D5503197092aC168c91465E7f2, 45,5, false, false));
        userapArtments[0x17F6AD8Ef982297579C203069C1DbfFE4348c372].push(Apartment.length);
        Apartment.push(apartment(Apartment.length, 0x17F6AD8Ef982297579C203069C1DbfFE4348c372, 90,18, false, false));
        userapArtments[0x17F6AD8Ef982297579C203069C1DbfFE4348c372].push(Apartment.length);
        Apartment.push(apartment(Apartment.length, 0x17F6AD8Ef982297579C203069C1DbfFE4348c372, 200,30, false, false));
    }

    function getApartmentsId() public view returns(uint[] memory) {
        return(userapArtments[msg.sender]);
    }
    function getBlockTimestamp() public view returns(uint) {
        return(block.timestamp);
    }

    function getUsersRole() public view returns(uint) {
        return(userRole[msg.sender]);
    }
    function getApartment(uint id) public view returns(address,uint,uint,bool,bool) {
        return(Apartment[id].owner, Apartment[id].square, Apartment[id].squareKitchen, Apartment[id].rent,Apartment[id].fin);
    }

    function createApartments(address owner, uint square, uint squareKitchen) public {
        require(userRole[msg.sender] == 1);
        userapArtments[owner].push(Apartment.length);
        Apartment.push(apartment(Apartment.length, owner, square, squareKitchen, false, false));
    }

    function createRent (uint id, uint prise, uint time) public{
        require(Apartment[id].owner == msg.sender);
        require(Apartment[id].rent == false);
        idRent[id] = Rent.length;
        Rent.push(rent(id,msg.sender,defaultAddress, prise*1000000000000000000, true,false, time, 0));
        Apartment[id].rent = true;
    }

    function getTenant (uint i) public view returns(address, uint,bool){
        return(Rent[i].tenant,Rent[i].deadLine, Rent[i].activ);
    }

    function getRent (uint i) public view returns(uint, uint, address,uint, uint,uint, uint){
                uint id = Rent[i].idApartment;
                return(Rent.length, Apartment[id].id, Apartment[id].owner, Apartment[id].square, Apartment[id].squareKitchen, Rent[i].prise/1000000000000000000, Rent[i].time);
    }

    function SaleRent (uint id) public payable{
        require(msg.value == Rent[idRent[id]].prise);
        Rent[idRent[id]].activ = false;
        Rent[idRent[id]].tenant = msg.sender;
    }

    function getMyRent (uint id) public view returns(uint, address, uint, bool,bool){
        require(Rent[idRent[id]].owner == msg.sender);
        return(Rent[idRent[id]].idApartment, Rent[idRent[id]].tenant, Rent[idRent[id]].prise/1000000000000000000,Rent[idRent[id]].activ, Rent[idRent[id]].finished);
    }

    function cansleRent (uint id) public {
        require(Apartment[id].rent == true);
        require(Rent[idRent[id]].owner == msg.sender);
        require(Rent[idRent[id]].activ == true);
        Rent[idRent[id]].activ = false;
        Apartment[id].rent = false;
    }

    function cansleSaleRent (uint id) public payable {
        require(Apartment[id].rent == true);
        require(Rent[idRent[id]].tenant == msg.sender);
        require(Rent[idRent[id]].activ == false);
        Rent[idRent[id]].activ = true;
        msg.sender.transfer(Rent[idRent[id]].prise);
    }


    function finishedRent(uint id) payable public {
        require(Apartment[id].rent == true);
        require(Rent[idRent[id]].activ == false);
        require(Rent[idRent[id]].finished == false);
        require(Rent[idRent[id]].owner != defaultAddress);
        Rent[idRent[id]].finished = true;
        Apartment[id].rent = false;
        Apartment[id].fin = true;
        Rent[idRent[id]].owner.transfer(Rent[idRent[id]].prise);
        Rent[idRent[id]].deadLine = Rent[idRent[id]].time*86400 + block.timestamp;
    }


}