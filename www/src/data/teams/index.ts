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
    year: "Fall 2023 - Spring 2024",
    list: Year2023
  }
];

export default teams;
