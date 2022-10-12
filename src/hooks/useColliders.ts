import { useContext, useEffect, MutableRefObject } from "react";
import { GlobalContext } from "../contexts";
import { Collider } from "../utils";

export const useColliders = (collider: MutableRefObject<Collider>) => {
  const { setColliders } = useContext(GlobalContext);

  useEffect(() => {
    setColliders((colliders) => [...colliders, collider]);
  }, [collider, setColliders]);
};
