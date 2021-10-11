import React from "react";

type Users = {
  id: number;
  name: string;
};
interface SearchPanelProps {
  users: Users[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(e) => setParam({ ...param, name: e.target.value })}
      />
      <select
        value={param.personId}
        onChange={(e) => setParam({ ...param, personId: e.target.value })}
      >
        <option value={""}>负责人</option>
        {users.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SearchPanel;
