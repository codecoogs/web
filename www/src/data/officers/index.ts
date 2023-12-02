import Fall2021 from "./2021Fall";
import Spring2022 from "./2022Spring";
import Fall2022 from "./2022Fall";
import Spring2023 from "./2023Spring";
import Fall2023 from "./2023Fall";

type Officer = {
  name: string,
  position: string,
  photo: any,
  video?: string,
  socials: {
    linkedin: string
  }
}

type Officers = {
  semester: string;
  list: Officer[];
}[];

const officers: Officers = [
  {
    semester: "Fall 2021", 
    list:Fall2021
  },
  {
    semester: "Spring 2022", 
    list: Spring2022
  },
  {
    semester: "Fall 2022", 
    list: Fall2022
  },
  {
    semester: "Spring 2023", 
    list: Spring2023
  },
  {
    semester: "Fall 2023", 
    list: Fall2023
  }
];

export default officers;
