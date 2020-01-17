import React from "react";

export default class EventsList extends React.Component<any> {
  state = {
    isChecked: new Map(),
    selectedEvents: []
  };
  onChange = (e: any, item: any) => {
    const target: {
      value: String;
      checked: boolean;
    } = e.target as HTMLInputElement;
    const val = target.value;
    const isItemChecked: boolean = target.checked;

    this.setState({
      isChecked: this.state.isChecked.set(val, isItemChecked)
    });

    if (isItemChecked) {
      this.setState((prevState: any) => {
        return {
          selectedEvents: prevState.selectedEvents.concat(item)
        };
      });
    } else {
      const updatedEvent = this.state.selectedEvents.filter((item: any) => {
        return item._id !== val;
      });

      this.setState({
        selectedEvents: updatedEvent
      });
    }
  };
  render() {
    const data = this.props.events.map((item: any, index: number) => {
      return (
        <tr key={item._id}>
          <td>
            <input
              type="checkbox"
              name="events"
              value={item._id}
              onChange={(e: any) => {
                this.onChange(e, item);
              }}
            />
          </td>
          <td>{index}</td>
          <td>
            {item.organizer.first} {item.organizer.last}
          </td>
          <td>{item.company}</td>
          <td>{item.about}</td>
          <td>{item.scheduled_at}</td>
          <td>{item.duration}</td>
          <td>{item.capacity}</td>
          <td>{item.capacity}</td>
        </tr>
      );
    });
    return (
      <>
        <h1>{"Events List"}</h1>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Sr.No.</th>
              <th>Organiser Name</th>
              <th>Company</th>
              <th>About</th>
              <th>Scheduled For</th>
              <th>Duration</th>
              <th>Capacity</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <button
          onClick={() => this.props.onAddEvent(this.state.selectedEvents)}
        >
          Add
        </button>
      </>
    );
  }
}
