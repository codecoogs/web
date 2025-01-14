import Fall2021 from "./2021Fall";
import Spring2022 from "./2022Spring";
import Fall2022 from "./2022Fall";
import Spring2023 from "./2023Spring";
import Fall2023 from "./2023Fall";
import Spring2024 from "./2024Spring";
import Fall2024 from "./2024Fall";
import Spring2025 from "./2025Spring";

type Officer = {
  name: string;
  position: string;
  photo?: any;
  video?: string;
  socials: {
    linkedin: string;
  };
};

type Officers = {
  semester: string;
  list: Officer[];
}[];

const officers: Officers = [
  {
    semester: "Fall 2021",
    list: Fall2021,
  },
  {
    semester: "Spring 2022",
    list: Spring2022,
  },
  {
    semester: "Fall 2022",
    list: Fall2022,
  },
  {
    semester: "Spring 2023",
    list: Spring2023,
  },
  {
    semester: "Fall 2023",
    list: Fall2023,
  },
  {
    semester: "Spring 2024",
    list: Spring2024,
  },
  {
    semester: "Fall 2024",
    list: Fall2024,
  },
  {
    semester: "Spring 2025",
    list: Spring2025,
  },
];

export default officers;
