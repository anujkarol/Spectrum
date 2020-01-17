import * as React from "react";
import MembersList from "../MembersList";
import Axios from "axios";
import EventsList from "../EventsList";
import { getData } from "../services/httpsservices";

export interface ILandingPageProps {}

export default class LandingPage extends React.Component<any> {
  state = {
    members: [],
    sort: false,
    events: [],
    selectedEvents: [],
    activeMember: ""
  };

  fetchMembers = () => {
    getData("NyNrlJTX8").then((response: any) => {
      console.log(response.data);
      this.setState({
        members: response.data
      });
    });
  };

  fetchEvents = () => {
    getData("Vk7OTypQ8").then((response: any) => {
      this.setState({
        events: response.data
      });
    });
  };

  // onSort = (param: any) => {
  //   //this.state.sort ? a[param] - b[param] : b[param] - a[param]
  //   this.setState((prev: any) => {
  //     return {
  //       sort: !this.state.sort,
  //       members: prev.members.sort((a: any, b: any) =>
  //         this.state.sort ? a[param] - b[param] : b[param] - a[param]
  //       )
  //     };
  //   });
  // };

  onSort = (param: any) => {
    //this.state.sort ? a[param] - b[param] : b[param] - a[param]
    this.setState((prev: any) => {
      return {
        sort: !this.state.sort,
        members: prev.members.sort((a: any, b: any) => {
          return this.state.sort
            ? (b[param]["first"] as String).localeCompare(a[param]["first"])
            : (a[param]["first"] as String).localeCompare(b[param]["first"]);
        })
      };
    });
  };

  onDelete = (id: any) => {
    const filteredMembers = this.state.members.filter((item: any) => {
      return item._id !== id;
    });

    this.setState({
      members: filteredMembers
    });
  };
  addEvent = (id: any) => {
    this.fetchEvents();
    this.setState({
      activeMember: id
    });
  };
  onAddEvent = (selectedEvents: any) => {
    const newEvents = this.state.members.filter(
      (x: any) => x._id === this.state.activeMember
    );

    const activeMember = newEvents[0];
    const updateActiveMember = Object.assign({}, activeMember, {
      events: selectedEvents,
      totalEvents: selectedEvents.length
    });

    const filterMembers = this.state.members.filter(
      (x: any) => x._id !== this.state.activeMember
    );

    const newMembers = filterMembers.concat(updateActiveMember);

    this.setState({
      members: newMembers
    });
  };

  // onSort = (param: any) => {
  //   const a = this.state.members.sort((a: any, b: any): any => {
  //     var nameA = a[param]["first"].toLowerCase(),
  //       nameB = b[param]["first"].toLowerCase();
  //     if (nameA > nameB) {
  //       return 1;
  //     } else if (nameA < nameB) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   this.setState({ memebers: a });
  // };
  render() {
    return (
      <>
        <button onClick={this.fetchMembers}>Member</button>
        <button onClick={this.fetchEvents}>Events</button>
        <MembersList
          members={this.state.members}
          onSort={this.onSort}
          onDelete={this.onDelete}
          numberofEvents={0}
          onAddEvent={this.addEvent}
        />
        <EventsList events={this.state.events} onAddEvent={this.onAddEvent} />
      </>
    );
  }
}
