import React, { Component } from 'react';
import API from "./utils/API";
import './App.css';

class App extends Component {

  state = {
    carrierAndPlanName: "",
    companyId: "",
    phoneNumber: "",
    unmatchedPlans: {},
    closestMatch: [],
    filteredMatch: [],
    disabled: true,
    masterPlanId: "",
    aliasIndex: 0,
    index: 0
  }

  componentDidMount = () => {

    // Populating UI with a random Unmatched Plan
    let i = Math.floor(Math.random() * 4);   
    API.getUnmatchedPlans().then(res => {
      this.setState({
        unmatchedPlans: {
          carrier_name: res.data[i].carrier_name,
          plan_name: res.data[i].plan_name,
          company_id: res.data[i].company_id,
          company_phone: res.data[i].company_phone,
          id: res.data[i].id
        }
      });
    });

    // Retrieving all the Master Plans, and then sorting based on the loaded Unmatched Plan
    API.getMasterPlans().then(res => {
      this.setState({
        closestMatch: res.data,
        filteredMatch: res.data
      }, function() {
          const filterRes = this.filterMasterList(this.state.unmatchedPlans.plan_name);
          this.setState({
            filteredMatch: filterRes
          });
      });
    });

    // Retrieving Aliases just so I can get next ID value
    API.getAliases().then(res => {
      this.setState({
        aliasIndex: res.data.length + 1
      });
    });
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  } 

  // Handles the enabling and disabling of the match buttong depending on the Master Plan selection
  handleMatchEnable = event => {
    const index = event.target.selectedIndex;
    const el = event.target.childNodes[index];
    const option =  el.getAttribute('id');

    const {value} = event.target;
    if (value === "Select") {
      this.setState({disabled: true})
    }
    else {
    this.setState({
      disabled: false,
      masterPlanId: option
    });
    }
  }

  // Creating an Alias when the Match button is clicked
  createAlias = () => {
    let alias = {
      id: this.state.aliasIndex,
      plan_name: this.state.unmatchedPlans.plan_name,
      carrier_name: this.state.unmatchedPlans.carrier_name,
      unmatched_plan_id: this.state.unmatchedPlans.id,
      master_plan_id: this.state.masterPlanId
    }

    API.createAlias(alias).then(res => {
      alert("Alias has been created!");
    }).catch(err => {
      alert("Alias creation was not successful");
      throw err
    })
  }

  // Creating a Master Plan when the Create Insurance button is clicked
  createMasterPlan = () => {
    let masterArr = this.state.closestMatch;
    let id = Math.max(...masterArr.map(plan => plan.id)) + 1;

    let masterplan = {
      id: id,
      name: this.state.unmatchedPlans.carrier_name + " " + this.state.unmatchedPlans.plan_name
    }
    console.log(masterplan);
    API.createMasterPlan(masterplan).then(res => {
      alert("Master Plan has been successfully created");
    }).catch(err => {
      alert("Master Plan creation was not successful");
      throw err
    })
  }

  // This filters the selection of Master Plans based on the loaded Unmatched Plan 
  filterMasterList = (name) => {
    const results = this.state.closestMatch;
    const filteredResults = results.filter((plan) => {
      const masterPlan = plan.name;
      console.log(masterPlan);
      return masterPlan.toLowerCase().includes(name.toLowerCase());
    });
    return filteredResults;
  }

  render() {

    return (
      <div className="container">
        <h2 className="carrierAndPlanTitle">{this.state.unmatchedPlans.carrier_name} {this.state.unmatchedPlans.plan_name}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="carrierAndPlanName">Carrier and Plan Name</label>
            <input className="form-control" id="carrierAndPlanName"
              name="carrierAndPlanName"
              value={this.state.unmatchedPlans.carrier_name + " " + this.state.unmatchedPlans.plan_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyId">Company ID</label>
            <input className="form-control" id="companyId"
              name="companyId"
              value={this.state.unmatchedPlans.company_id}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input className="form-control" id="phoneNumber"
              name="phoneNumber"
              value={this.state.unmatchedPlans.company_phone}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Closest Match</label>
            <select onChange={this.handleMatchEnable} className="form-control">
              <option value="Select">Select</option>
              {this.state.filteredMatch.map((match, index) => {
                return (
                <option value={match.name} key={index} id={match.id}>{match.name}</option>
                )
              })}
            </select>
          </div>
          <button type="button" 
            className="btn btn-info float-right"
            onClick={this.createMasterPlan}
          >Create Insurance</button>
          <button type="button"
            onClick={this.createAlias}
            className={ this.state.disabled ? "btn btn-info float-right disabled" : "btn btn-info float-right"}
          >Match</button>
        </form>
      </div>
    );
  }
}

export default App;
