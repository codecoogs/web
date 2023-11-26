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

type Officers = Officer[];

const officers: Officers[] = [
  Fall2021,
  Spring2022,
  Fall2022,
  Spring2023,
  Fall2023
];

export default officers;
