import Year2021 from "./2021Year";
import Year2022 from "./2022Year";
import Year2023 from "./2023Year";

type Team = {
  name: string,
  photo?: any,
  leads: string[],
  github: string
}

type Teams = {
  year: string;
  list: Team[];
}[];

const teams: Teams = [
  {
    year: "Fall 2021 - Spring 2022",
    list: Year2021
  },
  {
    year: "Fall 2022 - Spring 2023",
    list: Year2022
  },
  {
    year: "Fall 2023 - Spring 2024",
    list: Year2023
  }
];

export default teams;
