import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Task } from "../todo";

interface DropDownProps {
  selectedFilter: string;
  updateTasksByFilter: (filter: string) => void;
}
function DropDown({ selectedFilter, updateTasksByFilter }: DropDownProps) {
  const handleFilterSelection = (filter: string) => {
    updateTasksByFilter(filter);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="lg">
        {selectedFilter}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleFilterSelection("All")}>
          All
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("Completed")}>
          Completed
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterSelection("Incomplete")}>
          Incomplete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
