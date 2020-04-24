pragma solidity ^0.4.23;

contract EThreat {

    uint totalThreats;

    struct Threat {
        uint id;
        string name;
        uint risk;
        bool active;
        address employee;
        address site;
        bool exists;
    }

    mapping (uint => Threat) threats;

    event Confirmed(uint id, string name, address indexed employee, address indexed site, uint risk);
    event Added(uint id, string name, uint risk, address indexed employee, bool active, bool exists);
    event Total(uint totalThreats);
    event Availability(bool active);

    constructor () public {
        totalThreats = 0;
    }

    function checkThreatsTotal() public returns (uint total) {
        emit Total(totalThreats);
        return totalThreats;
    }

    function addThreat (string _name, uint _risk) public returns (bool success, uint id, string name, uint risk, address employee, bool active) {
        uint threatId = totalThreats;

        require(!threats[threatId].exists, "An threat already exists with this ID.");
        require(bytes(_name).length > 0, "Threat name cannot be empty.");
        require(_risk > 0, "Risk must be greater than zero (0).");

        address employeeAddress = msg.sender;


        threats[threatId] = Threat({
            id: threatId,
            name: _name,
            active: true,
            risk: (_risk * 1000000), // The conversion for TRX to sun is 1 : 1000000
            employee: employeeAddress,
            site: 0,
            exists: true
        });

        totalThreats += 1;

        emit Added(threats[threatId].id, threats[threatId].name, threats[threatId].risk, threats[threatId].employee, threats[threatId].active, threats[threatId].exists);
        return (true, threats[threatId].id, threats[threatId].name, threats[threatId].risk, threats[threatId].employee, threats[threatId].active);
    }

    function checkThreat(uint _id) public returns (uint threatId, string name, uint risk, bool active,  address employee, address site, bool exists) {
      emit Availability(threats[_id].active);
      return (threats[_id].id, threats[_id].name, threats[_id].risk, threats[_id].active, threats[_id].employee, threats[_id].site, threats[_id].exists);
    }

    function addThreat(uint _id) public payable returns (bool success, uint id, string name, address  employee, address  site, uint risk) {
        require(threats[_id].exists == true, "This threat does not exist. Please check the id and try again.");
        require(threats[_id].active == true, "This threat is no longer active.");
        require(threats[_id].employee != 0, "This threat has no employee");
        require(threats[_id].site == 0, "This threat is no longer active");
        require(threats[_id].risk == msg.value, "Not enough TRX to add this threat.");

        address _siteAddress = msg.sender;

        _handleConfirm(_id, _siteAddress, msg.value);

        emit Confirmed(_id, threats[_id].name, threats[_id].employee, threats[_id].site, threats[_id].risk);

        return (true, _id, threats[_id].name, threats[_id].employee, threats[_id].site, threats[_id].risk);
    }

    function _handleConfirm(uint _id, address _siteAddress, uint _value) internal {
        threats[_id].active = false;
        threats[_id].site = _siteAddress;
        threats[_id].employee.transfer(_value);
    }

}