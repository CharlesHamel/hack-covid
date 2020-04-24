import React, { Component } from "react";
import Swal from "sweetalert2";

import Utils from "../../utils";
import eThreatData from "./eThreat-data";
import "./EThreat.scss";

const contractAddress = "TCmTkU2wj5kZszAv33dF4vp63uxs2H8M8r";

export default class EThreat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLength: eThreatData.length,
      allThreat: [],
      totalThreat: 0
    };

    this.addThreat = this.addThreat.bind(this);
    this.addThreat = this.addThreat.bind(this);
    this.checkThreat = this.checkThreat.bind(this);
    this.checkThreatTotal = this.checkThreatTotal.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
  }

  addThreat() {
    const { totalThreat, dataLength, allThreat } = this.state;

    if (totalThreat >= dataLength) {
      Swal({
        title: "No more threats in data to add.",
        type: "error"
      });
      return;
    }

    let threat = eThreatData[totalThreat];
    threat.risk = parseFloat(Math.random() * 10).toFixed(0);
    threat.id = totalThreat;

    allThreat.push(
      <div className="eThreat-threat" key={threat.id}>
        <img className="threat-image" src={threat.image} alt={threat.name} />
        <div className="threat-name">{threat.name}</div>
        <div className="risk-add-container">
          <div className="threat-risk">{threat.risk} TRX</div>
          <button
            className="add-button"
            onClick={() => this.addThreat(threat.id, threat.risk)}
          >
            Add
          </button>
          <button
            className="add-button"
            onClick={() => this.checkThreat(threat.id)}
          >
            Check
          </button>
        </div>
      </div>
    );

    Utils.contract
      .addThreat(threat.name, threat.risk)
      .send({
        shouldPollResponse: true
      })
      .then(res => {
        Swal.fire({
          title: `${res.name} was added at index ${res.id}`,
          html:
            `<p>Price: ${res.risk / 1000000} TRX (${res.risk} SUN)</p>` +
            `<p>Site: ${res.site}</p>` +
            `<p>Employee: ${res.employee}</p>`,
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Unable to add threat.",
          type: "error"
        });
      });

    this.setState({
      totalThreat: totalThreat + 1
    });
  }

  checkThreatTotal() {
    Utils.contract
      .checkThreatTotal()
      .send({
        callValue: 0
      })
      .then(res => {
        Swal.fire({
          title: `There are ${res.total} in this contract's store.`,
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Something went wrong in checking the total.",
          type: "error"
        });
      });
  }

  checkThreat(id) {
    Utils.contract
      .checkThreat(id)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
      .then(res => {
        Swal.fire({
          title: `Employee: ${res.employee}.`,
          type: res.employee ? "success" : "error"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Unable to check threat.",
          type: "error"
        });
      });
  }

  addThreat(id, risk) {
    Utils.contract
      .addThreat(id)
      .send({
        shouldPollResponse: true,
        callValue: risk * 1000000
      })
      .then(res => {
        Swal.fire({
          title: `You have confirmed ${res.name} for ${res.risk /
            1000000} TRX (${res.risk} SUN).`,
          html: `<p>Site: ${res.site}</p>` + `<p>Adder: ${res.adder}</p>`,
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Unable to confirm threat.",
          type: "error"
        });
      });
  }

  render() {
    const { allThreat, totalThreat } = this.state;
    return (
      <div className="eThreat-component-container">
        <div className="eThreat-component-dash">
          <div>Total Threat on Employee: {totalThreat}</div>
          <button onClick={this.checkThreatTotal}>Total Contract Threat</button>
          <button onClick={this.addThreat}>Add Threat</button>
        </div>
        <div className="eThreat-threat-container">{allThreat}</div>
      </div>
    );
  }
}
