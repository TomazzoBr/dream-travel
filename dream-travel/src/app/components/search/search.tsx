"use client";

import { useState } from "react";
import Button from "../shared-components/button/button";
import styles from "./search.module.scss";

export default function Search({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div
      className={`${styles.SearchContainer} flex flex-col items-center space-y-4`}
    >
      <p className="text-3xl text-center">The places you dream of</p>
      <p className="text-lg text-gray-600">Let’s live new adventures</p>

      <div className="flex items-center mt-4 border rounded-full shadow-md overflow-hidden w-full max-w-md">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search trips"
          className="flex-1 px-4 py-2 text-gray-700 outline-none"
        />
        <Button
          text="Search"
          mode="dark"
          onClick={() => handleSearchClick()}
          type={"button"}
        />
      </div>
    </div>
  );
}
