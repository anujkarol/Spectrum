import React from "react";

const MembersList = (props: any): any => {
  const data = props.members.map((item: any, index: number) => {
    return (
      <tr key={item._id}>
        <td>{index}</td>
        <td>
          {item.name.first} {item.name.last}
        </td>
        <td>{item.age}</td>
        <td>{item.company}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.totalEvents}</td>
        <td>
          <button>Locate on Map</button>
        </td>
        <td>
          <button onClick={() => props.onAddEvent(item._id)}>Add Event</button>
        </td>
        <td>
          <button onClick={() => props.onDelete(item._id)}>Delete</button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <h1>{"Members List"}</h1>
      <table>
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>
              Name
              <i onClick={() => props.onSort("name")}>S</i>
            </th>
            <th>
              Age
              <i onClick={() => props.onSort("age")}>S</i>
            </th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>No. Of Events</th>
            <th>Locate</th>
            <th>Add Event</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </table>
    </>
  );
};

export default MembersList;
