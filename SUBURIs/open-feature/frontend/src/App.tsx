import { useEffect, useState } from "react";
import "./App.css";
// import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import Typography from "@mui/material/Typography";

// pick value from location search
const regex = /\?flag=(\w+)/;

const getFlag = () => {
  const search = window.location.search;
  const match = regex.exec(search);

  return match ? toBoolean(match[1]) : false;
};

const toBoolean = (value: unknown) => {
  return value === "true";
};

function App() {
  const flagByQuery = getFlag();
  const [canUseNewFeature, setCanUseNewFeature] = useState(false);

  const { data: canUseNewFeatureData } = useQuery({
    queryKey: ["can_use_new_feature"],
    queryFn: async () => {
      const response = await ky.get(
        "http://localhost:3000/permission?can_use_new_feature=" + flagByQuery
      );
      return response.json<{ canUseNewFeature: boolean }>();
    },
  });
  const { data: newFeatureTextData, refetch } = useQuery({
    queryKey: ["feature", canUseNewFeature],
    queryFn: async () => {
      const response = await ky.get(
        "http://localhost:3000/feature?can_use_new_feature=" + canUseNewFeature
      );
      return response.json<{ text: string }>();
    },
  });

  useEffect(() => {
    console.log("canUseNewFeatureData", canUseNewFeatureData);
    setCanUseNewFeature(canUseNewFeatureData?.canUseNewFeature ?? false);
  }, [canUseNewFeatureData?.canUseNewFeature]);

  useEffect(() => {
    console.log("refetch");

    const runRefetch = async () => {
      if (canUseNewFeature) {
        await refetch();
      }
    };
    runRefetch();
  }, [canUseNewFeature]);

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFlag(event.target.checked);
  // };

  return (
    <>
      <h1>Open Feature</h1>
      <div>
        {/* <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked={flag} onChange={onChange} />}
            label="Use New Feature?"
          />
        </FormGroup> */}

        <Typography variant="h2" gutterBottom>
          {newFeatureTextData?.text}
        </Typography>
      </div>
    </>
  );
}

export default App;
