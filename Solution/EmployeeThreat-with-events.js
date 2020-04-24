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
      allThreats: [],
      totalThreats: 0
    };

    this.addThreat = this.addThreat.bind(this);
    this.addThreat = this.addThreat.bind(this);
    this.checkThreat = this.checkThreat.bind(this);
    this.checkThreatsTotal = this.checkThreatsTotal.bind(this);
    this.startEventListeners = this.startEventListeners.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.startEventListeners();
  }

  addThreat() {
    const { totalThreats, dataLength, allThreats } = this.state;

    if (totalThreats >= dataLength) {
      Swal({
        title: "No more threats in data to add.",
        type: "error"
      });
      return;
    }

    let threat = eThreatData[totalThreats];
    threat.risk = parseFloat(Math.random() * 10).toFixed(0);
    threat.id = totalThreats;

    allThreats.push(
      <div className="eThreat-threat" key={threat.id}>
        <img className="threat-image" src={threat.image} alt={threat.name} />
        <div className="threat-name">{threat.name}</div>
        <div className="risk-add-container">
          <div className="threat-risk">{threat.risk} TRX</div>
          <button
            className="add-button"
            onClick={() => this.addThreat(threat.id, threat.risk)}
          >
            Add Threat
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

    this.setState({
      totalThreats: totalThreats + 1
    });

    Utils.contract.addThreat(threat.name, threat.risk).send({
      shouldPollResponse: true
    });
  }

  async checkThreatsTotal() {
    Utils.contract.checkThreatsTotal().send({
      callValue: 0
    });

    let checkTotal = await Utils.contract.Total().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `This contract has ${result.totalThreats} threats.`,
          type: "success"
        });
        checkTotal.stop();
      }
    });
  }

  async checkThreat(id) {
    Utils.contract.checkThreat(id).send({
      callValue: 0
    });

    let checkAvailability = await Utils.contract
      .Availability()
      .watch((err, { result }) => {
        if (err) return console.log("Failed to bind event listener", err);
        if (result) {
          Swal.fire({
            title: `Employee: ${result.employee}.`,
            type: result.employee ? "success" : "error"
          });
          checkAvailability.stop();
        }
      });
  }

  addThreat(id, risk) {
    Utils.contract.addThreat(id).send({
      shouldPollResponse: true,
      callValue: risk
    });
  }

  startEventListeners() {
    Utils.contract.Confirmed().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `${result.name} has been confirmed for ${result.risk}.`,
          html:
            `<p>Site: ${result.site}</p>` + `<p>Adder: ${result.adder}</p>`,
          type: "success"
        });
      }
    });

    Utils.contract.Added().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `${result.name} has been added for ${result.risk}.`,
          html:
            `<p>Site: ${result.site}</p>` +
            `<p>Added: ${result.exists}</p>` +
            `<p>Employee: ${result.employee}</p>`,
          type: "success"
        });
      }
    });
  }

  render() {
    const { allThreats, totalThreats } = this.state;
    return (
      <div className="eThreat-component-container">
        <div className="eThreat-component-dash">
          <div>Total Threats For Employee: {totalThreats}</div>
          <button onClick={this.checkThreatsTotal}>Total Contract Threats</button>
          <button onClick={this.addThreat}>Add Threat</button>
        </div>
        <div className="eThreat-threat-container">{allThreats}</div>
      </div>
    );
  }
}
